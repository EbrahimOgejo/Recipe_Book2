function CategoryFilter({ setCategory }) {
  return (
    <select
      onChange={(e) => setCategory(e.target.value)}
      className="filter"
    >
      <option value="All">All</option>
      <option value="Side">Side</option>
      <option value="Vegetarian">Vegetarian</option>
      <option value="Beef">Beef</option>
      <option value="Dessert">Dessert</option>
      <option value="Chicken">Chicken</option>
      <option value="Pasta">Pasta</option>
      <option value="Seafood">Seafood</option>

    </select>
  );
}

export default CategoryFilter;
