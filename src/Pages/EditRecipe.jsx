import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/recipes/${id}`)
      .then(res => res.json())
      .then(setForm);
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      toast.success("Recipe Updated");
      navigate("/");
    });
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="p-6 max-w-lg mx-auto space-y-4"
    >
      <input className="border p-2 w-full"
        value={form.title || ""}
        onChange={e => setForm({...form, title: e.target.value})}
      />

      <textarea className="border p-2 w-full"
        value={form.instructions || ""}
        onChange={e => setForm({...form, instructions: e.target.value})}
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Update Recipe
      </button>
    </form>
  );
}

export default EditRecipe;
