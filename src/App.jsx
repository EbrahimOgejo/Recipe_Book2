import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import RecipeDetails from "./Pages/RecipeDetails.jsx";
import Favorites from "./Pages/Favorites.jsx";
import AddRecipe from "./Pages/AddRecipe.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
      </Routes>
    </>
  );
}

export default App;
