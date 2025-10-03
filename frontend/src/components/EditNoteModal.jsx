import React from "react";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import Note from "./Note";
import SubmitButton from "./SubmitButton";
import { updateNote } from "../utils/api";

function EditNoteModal({ note, open, onClose }) {
  const [noteText, setNoteText] = useState("");
  useEffect(() => {
    if (open && note) {
      setNoteText(note.note);
    }
  }, [open, note]);
  const handleSumbit = async (e) => {
    e.preventDefault();
    const response = await updateNote(note.noteId, noteText);
    console.log(response);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <form
        onSubmit={handleSumbit}
        className="flex flex-col gap-5 items-center"
      >
        <Note>
          <div className="flex flex-col h-80 w-70 md:h-100 md:w-90 mt-10">
            <textarea
              value={noteText || ""}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full focus:outline-none focus:border-dashed focus:border-1 border-neutral-600"
            ></textarea>
            <div className="flex mt-auto justify-between">
              <span>- {note.username}</span>
              <span>
                {new Date(note.createdAt).toLocaleDateString("sv-SE")}
              </span>
            </div>
          </div>
        </Note>
        <SubmitButton className="py-2 px-5">Uppdatera</SubmitButton>
      </form>
    </Modal>
  );
}

export default EditNoteModal;
