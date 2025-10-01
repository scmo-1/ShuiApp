import React from "react";
import { useState, useEffect } from "react";
import { createNote } from "../utils/api";

function SingleNotePage() {
  const [username, setUsername] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { username, note };
    const response = await createNote(formData);
    console.log(response);
  };
  return (
    <section className="bg-blue-700">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <textarea
          name="note"
          className="border-2 border-white"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-white"
        />
        <button type="submit">Create</button>
      </form>
    </section>
  );
}

export default SingleNotePage;
