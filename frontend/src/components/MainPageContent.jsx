import React from "react";
import { useEffect, useState } from "react";
import Note from "./Note";
import { getAllNotes } from "../utils/api";

function MainPageContent({ open, note }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllNotes().then(setItems).catch(console.error);
  }, []);
  return (
    <ul className="w-full grid grid-cols-1 gap-15 items-center md:grid-cols-2 lg:grid-cols-3">
      {items.length < 1 ? (
        <p>Loading</p>
      ) : (
        items.data.map((item) => (
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
        ))
      )}
    </ul>
  );
}

export default MainPageContent;
