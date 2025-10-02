import React from "react";

import { getAllNotes } from "../utils/api";
import { useEffect, useState } from "react";
import { Search, SquarePen } from "lucide-react";
import EditNoteModal from "./EditNoteModal";
import CreateNoteModal from "./CreatNoteModal";
import MainPageContent from "./MainPageContent";

function MainPage() {
  const [editModal, setEditModal] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <section className="w-full flex flex-col items-center max-w-md md:max-w-3xl lg:max-w-6xl mx-auto relative">
      <form action="submit" className="mb-10">
        <button>
          <Search />
        </button>
        <input type="text" className="border-1 border-white" />
      </form>

      <MainPageContent open={setEditOpen} note={setEditModal} />

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
