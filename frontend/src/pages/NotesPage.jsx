import React from "react";
import Note from "../components/Note";
import { getAllNotes, createNote } from "../utils/api";
import { useEffect, useState } from "react";

function NotesPage() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getAllNotes().then(setItems).catch(console.error);
  }, []);

  return (
    <>
      <ul className="w-full flex flex-col gap-5 items-center">
        {items.length < 1 ? (
          <p>Loading</p>
        ) : (
          items.data.map((item) => (
            <li key={item.noteId}>
              <a href={`/note/${item.noteId}`}>
                <Note
                  note={item.note}
                  username={item.username}
                  date={item.createdAt}
                />
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
