import React, { useState } from "react";
import Modal from "./Modal";
import Note from "./Note";
import HoverButton from "./HoverButton";
import { createNote } from "../utils/api";

function CreateNoteModal({ open, onClose }) {
  const [username, setUsername] = useState("");
  const [note, setNote] = useState("");
  const [created, setCreated] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const formData = { username, note };
      await createNote(formData);

      setCreated(true);
      setUsername("");
      setNote("");
    } catch (err) {
      console.error("Error creating note:", err);

      // Generellt felmeddelande för 400
      if (err.response && err.response.status === 400) {
        setError(
          "Fel i anteckning och/eller namn. Kontrollera att fälten är korrekt ifyllda."
        );
      } else {
        setError("Ett oväntat fel uppstod. Försök igen senare.");
      }
    }
  };

  const handleClose = () => {
    setCreated(false);
    setError("");
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
                className="w-full h-full p-2 border-neutral-600 rounded focus:outline-none border-dashed border-1 resize-none"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ditt namn"
                className="border-b-2 border-dashed border-black mt-2 focus:outline-none p-1"
              />
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>
          </Note>
          <HoverButton type="submit" className="px-10 py-2" color="green">
            Skapa
          </HoverButton>
        </form>
      ) : (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border-2 border-black bg-white text-black p-6 rounded shadow-lg flex flex-col items-center gap-4">
          <p className="font-semibold text-lg">Anteckning skapad!</p>
          <HoverButton onClick={handleClose} className="py-2 px-10" color="red">
            Stäng
          </HoverButton>
        </div>
      )}
    </Modal>
  );
}

export default CreateNoteModal;
