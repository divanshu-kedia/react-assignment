import React from "react";
import './style.scss';
export default function SearchBar({ onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by username..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
