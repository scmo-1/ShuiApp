import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateNote, getNoteById } from "../utils/api";

function EditNotePage() {
  const [fetchedNote, setFetchedNote] = useState([]);
  const [noteText, setNoteText] = useState("");
  const params = useParams();

  useEffect(() => {
    getNoteById(params.id)
      .then((res) => {
        setFetchedNote(res);
        setNoteText(res.note);
      })
      .catch(console.error);
  }, [params.id]);

  const handleSumbit = async (e) => {
    e.preventDefault();
    const response = await updateNote(fetchedNote.noteId, noteText);
    console.log(response);
  };

  return (
    <section>
      <p>{fetchedNote.username}</p>
      <form onSubmit={handleSumbit}>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="border-2 border-white text-white"
        ></textarea>
        <button type="submit">update</button>
      </form>
    </section>
  );
}

export default EditNotePage;
