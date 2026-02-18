import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Fetch recipes dynamically based on search term
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data.meals || []))
      .catch((err) => console.error(err));
  }, [search]);

  // Apply category filter locally
  const filtered = recipes.filter(
    (recipe) => category === "All" || recipe.strCategory === category
  );

  return (
    <div className="container">
      {/* Search and category filter */}
      <div className="filters">
        <SearchBar setSearch={setSearch} />
        <CategoryFilter setCategory={setCategory} />
      </div>

      {/* No recipes found */}
      {filtered.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No recipes found.
        </p>
      )}

      {/* Horizontal arrangement of recipe cards per row */}
      <div className="horizontal-arrangement">
        {filtered.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default Home;
