import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateNote, getNoteById } from "../utils/api";
import Note from "../components/Note";

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
    <div className="w-full">
      <form action="flex flex-col items-center justify-center max-h-[300px]">
        <Note>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="w-full"
          ></textarea>
          <div className="flex mt-auto justify-between">
            <span>- {fetchedNote.username}</span>
            <span>
              {new Date(fetchedNote.createdAt).toLocaleDateString("sv-SE")}
            </span>
          </div>
        </Note>
        <button type="submit" className="mt-20 self-center">
          Uppdatera
        </button>
      </form>
    </div>
  );
}

export default EditNotePage;
