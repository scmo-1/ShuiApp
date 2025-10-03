import React from "react";
import { useEffect, useState } from "react";
import Note from "./Note";
import { getAllNotes, getNoteByName } from "../utils/api";
import SearchBar from "./SearchBar";
import { motion } from "motion/react";
import { Bouncy } from "ldrs/react";
import "ldrs/react/Bouncy.css";

function MainPageContent({ open, note }) {
  const [items, setItems] = useState([]);
  const [sortItems, setSortItems] = useState("desc");
  const [loading, setLoading] = useState(false);

  const fetchNotes = async (search = "") => {
    setLoading(true);
    try {
      let res;
      if (search) {
        res = await getNoteByName(search);
      } else {
        res = await getAllNotes();
      }
      setItems(res.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setItems([]);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const sortedNotes = [...items].sort((a, b) => {
    return sortItems === "desc"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt);
  });

  const handleSearch = async (e, query) => {
    e.preventDefault();
    fetchNotes(query);
  };

  return (
    <section className="w-full flex flex-col gap-5 items-center">
      <SearchBar handleSearch={handleSearch} />
      <div>
        <label htmlFor="sort">Sortera:</label>
        <select
          id="sort"
          value={sortItems}
          onChange={(e) => setSortItems(e.target.value)}
        >
          <option value="desc">Nyast först</option>
          <option value="asc">Äldst först</option>
        </select>
      </div>

      {loading ? (
        <Bouncy size="45" speed="1.75" color="black" />
      ) : sortedNotes.length < 1 ? (
        <p>Inga anteckningar hittades</p>
      ) : (
        <ul className="w-full grid grid-cols-1 gap-15 items-center md:grid-cols-2 lg:grid-cols-3">
          {sortedNotes.map((item) => (
            <motion.li
              initial={{ rotate: 0, scale: 1 }}
              whileHover={{
                rotate: 0.6,
                scale: 1.03,
              }}
              transition={{
                type: "spring",
                damping: 15,
                mass: 1,
                duration: 0.2,
              }}
              key={item.noteId}
              className="block w-full cursor-pointer"
              onClick={() => {
                note(item);
                open(true);
              }}
            >
              <Note>
                <p className="">{item.note}</p>
                <div className="flex mt-auto justify-between">
                  <span>- {item.username}</span>
                  <span>
                    {new Date(item.createdAt).toLocaleDateString("sv-SE")}
                  </span>
                </div>
              </Note>
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default MainPageContent;

// Default values shown
