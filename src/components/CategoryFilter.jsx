function CategoryFilter({ setCategory }) {
  return (
    <select
      onChange={(e) => setCategory(e.target.value)}
      className="filter"
    >
      <option value="All">All</option>
      <option value="Breakfast">Breakfast</option>
      <option value="Lunch">Lunch</option>
      <option value="Dinner">Dinner</option>
      <option value="Dessert">Dessert</option>
    </select>
  );
}

export default CategoryFilter;
