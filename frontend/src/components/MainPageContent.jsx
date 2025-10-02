import React from "react";
import { useEffect, useState } from "react";
import Note from "./Note";
import { getAllNotes, getNoteByName } from "../utils/api";
import SearchBar from "./SearchBar";

function MainPageContent({ open, note }) {
  const [items, setItems] = useState([]);
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

  const handleSearch = async (e, query) => {
    e.preventDefault();
    fetchNotes(query);
  };

  return (
    <section className="w-full flex flex-col gap-5 items-center">
      <SearchBar handleSearch={handleSearch} />

      {loading ? (
        <p>Loading...</p>
      ) : items.length < 1 ? (
        <p>Inga anteckningar hittades</p>
      ) : (
        <ul className="w-full grid grid-cols-1 gap-15 items-center md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.noteId}
              className="block w-full"
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
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default MainPageContent;
