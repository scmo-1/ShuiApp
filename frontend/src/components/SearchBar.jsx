import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";

function SearchBar({ handleSearch }) {
  const [query, setQuery] = useState("");

  return (
    <form onSubmit={(e) => handleSearch(e, query)}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button>
        <Search />
      </button>
    </form>
  );
}
export default SearchBar;
