import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Note from "./Note";
import HoverButton from "./HoverButton";
import { updateNote, deleteNoteById } from "../utils/api";

function EditNoteModal({ note, open, onClose }) {
  const [noteText, setNoteText] = useState("");
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (open && note) {
      setNoteText(note.note);
      setUpdated(false);
    }
  }, [open, note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateNote(note.noteId, noteText);
      setUpdated(true);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleClose = () => {
    setUpdated(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {!updated ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 items-center"
        >
          <Note>
            <div className="flex flex-col h-80 w-70 md:h-100 md:w-90 mt-10">
              <textarea
                value={noteText || ""}
                onChange={(e) => setNoteText(e.target.value)}
                className="w-full h-full p-2  border-neutral-600 rounded focus:outline-none border-dashed border-1 resize-none"
              />
              <div className="flex mt-auto justify-between text-sm text-gray-600">
                <span>- {note.username}</span>
                <span>
                  {new Date(note.createdAt).toLocaleDateString("sv-SE")}
                </span>
              </div>
            </div>
          </Note>
          <HoverButton color="green" className="py-2 px-5">
            Uppdatera
          </HoverButton>
        </form>
      ) : (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border-2 border-black bg-white text-black p-6 rounded shadow-lg flex flex-col items-center gap-4">
          <p className="font-semibold text-lg">Anteckning ändrad!</p>
          <HoverButton onClick={handleClose} className="px-4 py-2" color="red">
            Stäng
          </HoverButton>
        </div>
      )}
    </Modal>
  );
}

export default EditNoteModal;
