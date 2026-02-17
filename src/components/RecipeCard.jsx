import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

function RecipeCard({ recipe }) {
  const isLocal = recipe.id && !recipe.idMeal;

  const deleteRecipe = () => {
    Swal.fire({
      title: "Delete Recipe?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/recipes/${recipe.id}`, {
          method: "DELETE",
        }).then(() => {
          toast.success("Recipe Deleted");
          window.location.reload();
        });
      }
    });
  };

  const addFavorite = () => {
    fetch("http://localhost:3001/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    }).then(() => toast.success("Added to Favorites"));
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <img
        src={recipe.strMealThumb || recipe.image}
        alt=""
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">
          {recipe.strMeal || recipe.title}
        </h3>

        <div className="flex justify-between mt-4 text-sm">
          <Link
            className="text-blue-500"
            to={`/recipe/${recipe.idMeal || recipe.id}`}
          >
            View
          </Link>

          <button className="text-green-600" onClick={addFavorite}>
            ❤️
          </button>

          {isLocal && (
            <>
              <Link
                className="text-yellow-500"
                to={`/edit/${recipe.id}`}
              >
                Edit
              </Link>

              <button
                className="text-red-500"
                onClick={deleteRecipe}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
