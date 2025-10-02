import React from "react";
import Note from "../components/Note";
import { getAllNotes, createNote } from "../utils/api";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

function NotesPage() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getAllNotes().then(setItems).catch(console.error);
  }, []);

  return (
    <>
      <form action="submit">
        <button>
          <Search />
        </button>
        <input type="text" className="border-1 border-white" />
      </form>
      <ul className="w-full grid grid-cols-1 gap-15 items-center">
        {items.length < 1 ? (
          <p>Loading</p>
        ) : (
          items.data.map((item) => (
            <li key={item.noteId} className="block w-full">
              <a href={`/note/${item.noteId}`}>
                <Note>
                  <p className="">{item.note}</p>
                  <div className="flex mt-auto justify-between">
                    <span>- {item.username}</span>
                    <span>
                      {new Date(item.createdAt).toLocaleDateString("sv-SE")}
                    </span>
                  </div>
                </Note>
              </a>
            </li>
          ))
        )}
      </ul>
      <a href="/note/create" className="border-2 border-white">
        create
      </a>
    </>
  );
}

export default NotesPage;
