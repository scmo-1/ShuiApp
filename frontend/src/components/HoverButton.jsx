import React from "react";
import { useState } from "react";

function HoverButton({ children, className, color = "", onClick }) {
  const [hovered, setHovered] = useState(false);

  const colors = {
    green: "bg-green-700 hover:bg-green-800",
    red: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button
      type="submit"
      className={`  text-center rounded-full text-white  cursor-pointer overflow-hidden ${className} ${colors[color]} transition ease-in-out duration-300`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default HoverButton;
