import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-orange-500 p-4 flex justify-between text-white">
      <h1 className="font-bold text-xl">🍲 Recipe Book</h1>
      <div className="space-x-6">
        <Link to="/">Home</Link>
        <Link to="/add">Add Recipe</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </nav>
  );
}

export default Navbar;
