function SearchBar({ setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={(e) => setSearch(e.target.value)}
      className="search-bar"
    />
  );
}

export default SearchBar;
