import React from "react";

function FilterDropdown({ genres, onFilter }) {
  return (
    <div className="filter-dropdown">
      <select onChange={(e) => onFilter(e.target.value)} defaultValue="">
        <option value="">Select Genre</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterDropdown;
