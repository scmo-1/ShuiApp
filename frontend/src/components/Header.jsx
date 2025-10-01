import React from "react";
import { Search } from "lucide-react";

function Header() {
  return (
    <header className="flex justify-between px-3 py-5 fixed top-0 w-full z-99 bg-red-400">
      <div>LOGO</div>
      <form action="submit">
        <button>
          <Search />
        </button>
        <input type="text" className="border-1 border-black" />
      </form>
    </header>
  );
}

export default Header;
