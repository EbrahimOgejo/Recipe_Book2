import { useState } from "react";
import toast from "react-hot-toast";

function AddRecipe() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    instructions: "",
    image: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    toast.success("Recipe added successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input placeholder="Title" onChange={(e)=>setForm({...form,title:e.target.value})}/>
      <input placeholder="Category" onChange={(e)=>setForm({...form,category:e.target.value})}/>
      <input placeholder="Image URL" onChange={(e)=>setForm({...form,image:e.target.value})}/>
      <textarea placeholder="Instructions" onChange={(e)=>setForm({...form,instructions:e.target.value})}/>
      <button>Add Recipe</button>
    </form>
  );
}

export default AddRecipe;
