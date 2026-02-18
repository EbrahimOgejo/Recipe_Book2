import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard.jsx";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/favorites")
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p style={{ textAlign: "center" }}>You have no favorite recipes yet.</p>
      ) : (
        <div className="horizontal-arrangement">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
