import React from "react";

function Note({ children }) {
  return (
    <div className="[filter:drop-shadow(4px_8px_8px_rgba(0,0,0,0.3))] w-full h-full">
      <div className="bg-[#f7de3a] text-black w-full h-full [clip-path:polygon(0%_0%,_85%_0%,_100%_15%,_100%_100%,_0%_100%)] p-4 pt-10 flex flex-col  min-h-80">
        {children}
      </div>
    </div>
  );
}

export default Note;
