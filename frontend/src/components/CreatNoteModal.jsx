import React, { useState } from "react";
import Modal from "./Modal";
import Note from "./Note";
import SubmitButton from "./SubmitButton";
import { createNote } from "../utils/api";

function CreateNoteModal({ open, onClose }) {
  const [username, setUsername] = useState("");
  const [note, setNote] = useState("");
  const [created, setCreated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = { username, note };
      await createNote(formData);
      setCreated(true);
      setUsername("");
      setNote("");
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Kunde inte skapa anteckning. Försök igen.");
    }
  };

  const handleClose = () => {
    setCreated(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {!created ? (
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
                className="w-full h-full p-2  border-neutral-600 rounded focus:outline-none border-dashed border-1 resize-none"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ditt namn"
                className="border-b-2 border-dashed border-black mt-2 focus:outline-none p-1"
              />
            </div>
          </Note>
          <SubmitButton className="px-10 py-2">Skapa</SubmitButton>
        </form>
      ) : (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border-2 border-black bg-white text-black p-6 rounded shadow-lg flex flex-col items-center gap-4">
          <p className="font-semibold text-lg">Anteckning skapad!</p>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
          >
            Stäng
          </button>
        </div>
      )}
    </Modal>
  );
}

export default CreateNoteModal;
