import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

// function to add a note:
const AddNote = (props) => {
  // using context:
  const context = useContext(noteContext);

  // decrypt addNote function from noteContext:
  const { addNote } = context;

  const {showAlert} = props;

  // using state to add note:
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  // functon to add a note
  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: "" });
    showAlert("Note Added Successfully" , "success");
  };

  // function to change description or title while typing:

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h3>Add a note</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={note.description}
            className="form-control"
            id="description"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            name="tag"
            value={note.tag}
            className="form-control"
            id="tag"
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleAddNote}
          disabled={note.title.length < 5 || note.description.length < 5}
        >
          Add Note
        </button>
      </form>
    </>
  );
};

export default AddNote;
