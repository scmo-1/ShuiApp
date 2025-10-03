import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

function SearchBar({ handleSearch }) {
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);

  return (
    <form onSubmit={(e) => handleSearch(e, query)} className="">
      <div className="relative flex items-center gap-3  outline-2 outline-black rounded-full">
        <motion.label
          htmlFor="name"
          className="absolute z-2 left-4 bg-[#846b56] text-black"
          initial={{ y: 0 }}
          animate={focus ? { y: -24 } : { y: 0 }}
        >
          namn
        </motion.label>
        <input
          id="name"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="focus:outline-none  px-4 py-2 rounded-full"
        />
        <button className="bg-black rounded-full p-3 cursor-pointer">
          <Search size={20} />
        </button>
      </div>
    </form>
  );
}
export default SearchBar;
