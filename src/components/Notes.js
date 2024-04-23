import React, { useContext, useEffect, useRef, useState} from "react";
import noteContext from "../context/notes/noteContext";
import Noteitems from "./Noteitems";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  // dcrypt notes and getNotes:
  const { notes, getNotes } = context;

  // useEffect to change notes:
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });
  
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});

  };

  const handleUpdateNote = (e) => {
    e.preventDefault();
    console.log("note update", note);
    // addNote(note.title, note.description, note.tag);
  };

  // function to change description or title while typing:

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };


  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  value={note.etitle}
                  aria-describedby="emailHelp"
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  name="edescription"
                  className="form-control"
                  value={note.edescription}
                  id="edescription"
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  name="etag"
                  value={note.etag}
                  className="form-control"
                  id="etag"
                  onChange={onChange}
                />
              </div>
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdateNote}>Save note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-2">
        <h3>Your notes</h3>
        {notes.map((note) => {
          return (
            <Noteitems key={note._id} note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
