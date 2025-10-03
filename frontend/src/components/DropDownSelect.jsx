import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DropDownSelect({ setSortItems }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Nyast först");

  const options = [
    { label: "Nyast först", value: "desc" },
    { label: "Äldst först", value: "asc" },
  ];

  const handleSelect = (option) => {
    setSelected(option.label);
    setSortItems(option.value);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left text-white">
      <div
        className="border-2 border-white px-5 py-2 cursor-pointer select-none rounded-2xl"
        onClick={() => setOpen((prev) => !prev)}
      >
        Sortera: {selected}
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-1 w-full   bg-white text-black shadow-lg z-10 rounded-2xl"
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-2xl"
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DropDownSelect;
