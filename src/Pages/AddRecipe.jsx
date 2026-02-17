import { useState } from "react";
import toast from "react-hot-toast";

function AddRecipe() {
  const [form, setForm] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => toast.success("Recipe Created"));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-lg mx-auto space-y-4"
    >
      <input className="border p-2 w-full"
        placeholder="Title"
        onChange={e => setForm({...form, title: e.target.value})}
      />

      <textarea className="border p-2 w-full"
        placeholder="Instructions"
        onChange={e => setForm({...form, instructions: e.target.value})}
      />

      <input className="border p-2 w-full"
        placeholder="Image URL"
        onChange={e => setForm({...form, image: e.target.value})}
      />

      <button className="bg-orange-500 text-white px-4 py-2 rounded">
        Add Recipe
      </button>
    </form>
  );
}

export default AddRecipe;
