import React from "react";
import { useEffect, useState } from "react";
import { Search, SquarePen } from "lucide-react";
import EditNoteModal from "./EditNoteModal";
import CreateNoteModal from "./CreatNoteModal";
import MainPageContent from "./MainPageContent";
import HoverButton from "./HoverButton";

function MainPage() {
  const [editModal, setEditModal] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <section className="w-full flex flex-col items-center max-w-md md:max-w-3xl lg:max-w-6xl mx-auto relative">
      <MainPageContent open={setEditOpen} note={setEditModal} />

      <HoverButton
        onClick={() => setCreateModalOpen(true)}
        className=" p-4 fixed bottom-5 right-5"
        color="green"
      >
        <SquarePen size={42} />
      </HoverButton>
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
