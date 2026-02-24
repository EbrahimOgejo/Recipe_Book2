import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  // Fetch recipe by id from API
  useEffect(() => {
    if (String(id).startsWith("local-")) {
      const localRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];
      const foundRecipe = localRecipes.find(
        (localRecipe) => String(localRecipe.idMeal) === String(id)
      );
      setRecipe(foundRecipe || null);
      return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.meals[0]))
      .catch((err) => console.error(err));
  }, [id]);

  if (!recipe) return <p style={{ textAlign: "center" }}>Loading...</p>;

  // Ingredients
  const getIngredients = () => {
    if (String(id).startsWith("local-")) {
      return [];
    }

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  // Instructions as bullet points
  const getInstructions = () => {
    if (!recipe.strInstructions) return [];
    // Split by newline or periods followed by newline
    return recipe.strInstructions
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  };

  // Favorites toggle
  const toggleFavorite = () => {
    const recipeId = String(recipe.idMeal);
    const isFav = favorites.some((fav) => String(fav.idMeal) === recipeId);

    if (isFav) {
      Swal.fire({
        title: "Remove from favorites?",
        text: `${recipe.strMeal} will be removed.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedFavorites = favorites.filter(
            (fav) => String(fav.idMeal) !== recipeId
          );
          setFavorites(updatedFavorites);
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          window.dispatchEvent(new Event("favorites-updated"));
          Swal.fire("Removed!", `${recipe.strMeal} was removed.`, "success");
        }
      });
    } else {
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      window.dispatchEvent(new Event("favorites-updated"));
      Swal.fire(
        "Added!",
        `${recipe.strMeal} was added to favorites.`,
        "success"
      );
    }
  };

  const isFavorite = favorites.some(
    (fav) => String(fav.idMeal) === String(recipe.idMeal)
  );

  return (
    <div className="container details">
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />

      <p>
        <strong>Category:</strong> {recipe.strCategory} | <strong>Area:</strong>{" "}
        {recipe.strArea}
      </p>

      <button
        onClick={toggleFavorite}
        style={{
          padding: "8px 15px",
          borderRadius: "8px",
          border: "none",
          background: isFavorite ? "#f44336" : "#1e88e5",
          color: "white",
          cursor: "pointer",
          fontSize: "14px",
          marginBottom: "20px",
        }}
      >
        {isFavorite ? "Remove Favorite" : "Add to Favorites"}
      </button>

      <h3>Ingredients:</h3>
      {getIngredients().length > 0 ? (
        <ul>
          {getIngredients().map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
      ) : (
        <p>No ingredients listed for this recipe.</p>
      )}

      <h3>Instructions:</h3>
      <ul>
        {getInstructions().map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeDetails;
