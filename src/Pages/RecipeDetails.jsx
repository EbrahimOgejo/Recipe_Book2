import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.meals) {
          setRecipe(data.meals[0]);
        } else {
          fetch(`http://localhost:3001/recipes/${id}`)
            .then(res => res.json())
            .then(setRecipe);
        }
      });
  }, [id]);

  if (!recipe) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {recipe.strMeal || recipe.title}
      </h2>

      <img
        src={recipe.strMealThumb || recipe.image}
        className="w-full max-w-md"
      />

      <p className="mt-4">
        {recipe.strInstructions || recipe.instructions}
      </p>
    </div>
  );
}

export default RecipeDetails;
