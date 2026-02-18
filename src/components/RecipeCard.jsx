import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function RecipeCard({ recipe }) {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    fetch("http://localhost:3001/favorites")
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((err) => console.error(err));
  }, []);

  // Toggle favorite
  const toggleFavorite = () => {
    const isFav = favorites.some((fav) => fav.idMeal === recipe.idMeal);

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
            (fav) => fav.idMeal !== recipe.idMeal
          );
          setFavorites(updatedFavorites);
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          Swal.fire("Removed!", `${recipe.strMeal} was removed.`, "success");
        }
      });
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      Swal.fire(
        "Added!",
        `${recipe.strMeal} was added to favorites.`,
        "success"
      );
    }
  };

  const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);

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
      </div>
    </div>
  );
}

export default RecipeCard;
