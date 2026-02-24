import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const updateFavoritesCount = () => {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavoritesCount(savedFavorites.length);
    };

    updateFavoritesCount();

    window.addEventListener("favorites-updated", updateFavoritesCount);
    window.addEventListener("storage", updateFavoritesCount);

    return () => {
      window.removeEventListener("favorites-updated", updateFavoritesCount);
      window.removeEventListener("storage", updateFavoritesCount);
    };
  }, []);

  return (
    <nav className="navbar">
      <h2>ABBET Kitchen</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add-recipe">Add Recipe</Link>
        <Link to="/favorites" className="favorites-link">
          Favorites
          {favoritesCount > 0 && (
            <span className="favorites-badge">{favoritesCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
