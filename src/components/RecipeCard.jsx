import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

function RecipeCard({ recipe, onFavoritesChange, onDelete }) {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Toggle favorite
  const toggleFavorite = () => {
    const recipeId = String(recipe.idMeal);
    const isFav = favorites.some((fav) => String(fav.idMeal) === recipeId);

    if (isFav) {
      // SweetAlert confirmation before removing
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
          if (onFavoritesChange) onFavoritesChange(updatedFavorites);
          Swal.fire("Removed!", `${recipe.strMeal} was removed.`, "success");
        }
      });
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      window.dispatchEvent(new Event("favorites-updated"));
      if (onFavoritesChange) onFavoritesChange(updatedFavorites);
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

  const handleDelete = () => {
    if (!onDelete) return;

    Swal.fire({
      title: "Delete recipe?",
      text: `${recipe.strMeal} will be permanently removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(recipe.idMeal);
        Swal.fire("Deleted!", `${recipe.strMeal} was removed.`, "success");
      } else {
        toast("Deletion cancelled");
      }
    });
  };

  return (
    <div className="card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      <span className="category">{recipe.strCategory}</span>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "10px",
        }}
      >
        <Link to={`/recipe/${recipe.idMeal}`} className="details-btn">
          View Details
        </Link>
        <button
          onClick={toggleFavorite}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            background: isFavorite ? "#f44336" : "#1e88e5",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
            transition: "background 0.3s ease",
          }}
        >
          {isFavorite ? "Remove Favorite" : "Add to Favorites"}
        </button>
        {onDelete && (
          <button
            onClick={handleDelete}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "none",
              background: "#f44336",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
              transition: "background 0.3s ease",
            }}
          >
            Delete Recipe
          </button>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
