import React from "react";
import { useState, useEffect } from "react";
import { createNote } from "../utils/api";
import Note from "../components/Note";

function CreateNotePage() {
  const [username, setUsername] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { username, note };
    const response = await createNote(formData);
    console.log(response);
  };
  return (
    <section className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Note>
          <textarea
            name="note"
            className=""
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Skriv din anteckning"
          ></textarea>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ditt namn"
            className="border-b-2 border-black mt-auto"
          />
        </Note>
        <button type="submit">Create</button>
      </form>
    </section>
  );
}

export default CreateNotePage;
