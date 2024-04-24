import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitems = (props) => {
  // dcrypt note from NoteState.js
  const { note, updateNote, showAlert } = props;

  const context = useContext(noteContext);

  // dcrypt deleteNote from NoteState.js
  const { deleteNote } = context;

  return (
    <div className="col-md-3 my-2">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(note._id , showAlert("Note Deleted","success"));
              }}
            ></i>
            <i
              className="fa-regulzar fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitems;
