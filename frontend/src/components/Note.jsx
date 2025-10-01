import React from "react";

function Note({ note, username, date }) {
  return (
    <div className="bg-amber-600 ">
      <span>{username}</span>
      <p>{note}</p>
      <span> {date} </span>
    </div>
  );
}

export default Note;
