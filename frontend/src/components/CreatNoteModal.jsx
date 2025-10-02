import React from "react";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import Note from "./Note";

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
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Skapa</button>
      </form>
    </Modal>
  );
}

export default CreateNoteModal;
