import React from "react";
import { motion } from "motion/react";
import { useState } from "react";

function SubmitButton({ children, className }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      type="submit"
      className={` relative text-center rounded-full bg-red-500 cursor-pointer overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ scale: 1 }}
      animate={hovered ? { scale: 1.02 } : { scale: 1 }}
    >
      <div className="relative z-2">{children}</div>
      <motion.div
        className="absolute bg-red-700 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full z-1 "
        initial={{ height: 0, width: 0 }}
        animate={
          hovered ? { height: "100%", width: "100%" } : { height: 0, width: 0 }
        }
      ></motion.div>
    </motion.button>
  );
}

export default SubmitButton;
