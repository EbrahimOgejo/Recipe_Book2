import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard.jsx";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p style={{ textAlign: "center" }}>You have no favorite recipes yet.</p>
      ) : (
        <div className="horizontal-arrangement">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              onFavoritesChange={setFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
