import { useEffect, useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/favorites")
      .then(res => res.json())
      .then(setFavorites);
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {favorites.map(fav => (
        <div key={fav.id} className="shadow p-4">
          <h3>{fav.strMeal || fav.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default Favorites;
