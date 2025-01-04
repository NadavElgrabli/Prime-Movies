import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(query); // Trigger search on "Enter"
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearchSubmit}>Search</button>
    </div>
  );
}

export default SearchBar;
