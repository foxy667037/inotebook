import noteContext from "./noteContext";
import { useState } from "react";

// notestate:
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setnotes] = useState(notesInitial);

  // Get all note:
  const getNotes = async () => {
    // api call:
    const url = "/api/note/fetchnotes";
    const response = await fetch(`${host}${url}`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);
    // set state:
    setnotes(json);

  };

  // Add a note:
  const addNote = async (title, description, tag) => {
    // TODO api call:
    const url = "/api/note/addnotes";
    const response = await fetch(`${host}${url}`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },

      // body data type must match "Content-Type" header
      body: JSON.stringify({ title, description, tag }),
    });
    
    // state that concatinate the note wih notes state:
    const note = await response.json();
    setnotes(notes.concat(note));

  };

  
  // Edit a note:
  const editNote = async (id, title, description, tag) => {
    //API call:
    const url = `/api/note/updatenotes/${id}`;
    const response = await fetch(`${host}${url}`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },

      // body data type must match "Content-Type" header
      body: JSON.stringify({ title, description, tag }),
    });
    // parses JSON response into native JavaScript objects
    const json = await response.json();
    console.log(json)

    let newNotes =  JSON.parse(JSON.stringify(notes))
    // logic to edit a note:
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);

  };

  // Delete a note:
  const deleteNote = async (id, title, description, tag) => {
    // TODO api call:
    const url = `/api/note/deletenotes/${id}`;
    const response = await fetch(`${host}${url}`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },

      // body data type must match "Content-Type" header
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    console.log("deleting note with id " + id);

    // delete function:
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });

    // state that delete the note wih notes state:
    setnotes(newNotes);

  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
