import React from "react";
import Note from "./Note";
import { getAllNotes } from "../utils/api";
import { useEffect, useState } from "react";
import { Search, SquarePen } from "lucide-react";
import EditNoteModal from "./EditNoteModal";
import CreateNoteModal from "./CreatNoteModal";

function MainPage() {
  const [items, setItems] = useState([]);
  const [editModal, setEditModal] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    getAllNotes().then(setItems).catch(console.error);
  }, []);

  return (
    <section className="w-full flex flex-col items-center max-w-md md:max-w-3xl lg:max-w-6xl mx-auto relative">
      <form action="submit" className="mb-10">
        <button>
          <Search />
        </button>
        <input type="text" className="border-1 border-white" />
      </form>
      <ul className="w-full grid grid-cols-1 gap-15 items-center md:grid-cols-2 lg:grid-cols-3">
        {items.length < 1 ? (
          <p>Loading</p>
        ) : (
          items.data.map((item) => (
            <li
              key={item.noteId}
              className="block w-full"
              onClick={() => {
                setEditModal(item);
                setEditOpen(true);
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
      <button
        onClick={() => setCreateModalOpen(true)}
        className="bg-red-500 rounded-xl p-2 fixed bottom-5 right-5"
      >
        <SquarePen size={42} />
      </button>
      <EditNoteModal
        note={editModal}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
      <CreateNoteModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </section>
  );
}

export default MainPage;
