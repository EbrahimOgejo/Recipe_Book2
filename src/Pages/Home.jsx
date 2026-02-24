import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";

function Home() {
  const [apiRecipes, setApiRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const loadUserRecipes = () => {
      const savedRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];
      setUserRecipes(savedRecipes);
    };

    loadUserRecipes();
    window.addEventListener("recipes-updated", loadUserRecipes);
    window.addEventListener("storage", loadUserRecipes);

    return () => {
      window.removeEventListener("recipes-updated", loadUserRecipes);
      window.removeEventListener("storage", loadUserRecipes);
    };
  }, []);

  // Fetch recipes dynamically based on search term
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((res) => res.json())
      .then((data) => setApiRecipes(data.meals || []))
      .catch((err) => console.error(err));
  }, [search]);

  const matchesSearch = (recipe) => {
    if (!search.trim()) return true;
    return recipe.strMeal.toLowerCase().includes(search.toLowerCase());
  };

  const allRecipes = [...userRecipes, ...apiRecipes];

  // Apply category filter locally
  const filtered = allRecipes.filter(
    (recipe) =>
      (category === "All" || recipe.strCategory === category) &&
      matchesSearch(recipe)
  );

  const handleDeleteRecipe = (idMeal) => {
    const updatedRecipes = userRecipes.filter(
      (recipe) => String(recipe.idMeal) !== String(idMeal)
    );
    setUserRecipes(updatedRecipes);
    localStorage.setItem("userRecipes", JSON.stringify(updatedRecipes));
    window.dispatchEvent(new Event("recipes-updated"));
  };

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
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onDelete={String(recipe.idMeal).startsWith("local-") ? handleDeleteRecipe : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
