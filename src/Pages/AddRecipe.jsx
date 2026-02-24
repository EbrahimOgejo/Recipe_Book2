import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddRecipe() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "",
    instructions: "",
    image: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.instructions || !form.image) {
      toast.error("Please fill in all fields");
      return;
    }

    const newRecipe = {
      idMeal: `local-${Date.now()}`,
      strMeal: form.title,
      strCategory: form.category,
      strInstructions: form.instructions,
      strMealThumb: form.image,
    };

    const existing = JSON.parse(localStorage.getItem("userRecipes")) || [];
    const updatedRecipes = [newRecipe, ...existing];
    localStorage.setItem("userRecipes", JSON.stringify(updatedRecipes));
    window.dispatchEvent(new Event("recipes-updated"));

    toast.success("Recipe added successfully!");
    navigate("/");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="search-bar"
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="search-bar"
        />
        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="search-bar"
        />
        <textarea
          placeholder="Instructions"
          value={form.instructions}
          onChange={(e) => setForm({ ...form, instructions: e.target.value })}
          className="search-bar"
          rows="6"
        />
        <button
          type="submit"
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            background: "#1e88e5",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
