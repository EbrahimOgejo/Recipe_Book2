import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const [apiRecipes, setApiRecipes] = useState([]);
  const [localRecipes, setLocalRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then(res => res.json())
      .then(data => setApiRecipes(data.meals || []));
  }, [search]);

  useEffect(() => {
    fetch("http://localhost:3001/recipes")
      .then(res => res.json())
      .then(setLocalRecipes);
  }, []);

  const merged = [
    ...localRecipes.filter(r =>
      r.title?.toLowerCase().includes(search.toLowerCase())
    ),
    ...apiRecipes
  ];

  const filtered = category
    ? merged.filter(r =>
        (r.strCategory || r.category) === category
      )
    : merged;

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6">
        <input
          className="border p-2 w-full"
          placeholder="Search recipe..."
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="border p-2"
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="Seafood">Seafood</option>
          <option value="Chicken">Chicken</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(recipe => (
          <RecipeCard
            key={recipe.idMeal || recipe.id}
            recipe={recipe}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
