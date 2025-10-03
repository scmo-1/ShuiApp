import React from "react";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import Note from "./Note";
import SubmitButton from "./SubmitButton";

function CreateNoteModal({ open, onClose }) {
  const [username, setUsername] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { username, note };
    const response = await createNote(formData);
    console.log(response);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5"
      >
        <Note>
          <div className="flex flex-col h-80 w-70 md:h-100 md:w-90 mt-10">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Skriv din anteckning"
              className="w-full focus:outline-none focus:border-dashed focus:border-1 border-neutral-600"
            ></textarea>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ditt namn"
              className="border-b-2 border-dashed border-black mt-auto focus:outline-none"
            />
          </div>
        </Note>
        <SubmitButton className="px-10 py-2">Skapa</SubmitButton>
      </form>
    </Modal>
  );
}

export default CreateNoteModal;
