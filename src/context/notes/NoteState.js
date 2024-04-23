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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyMjg1N2FlYWRjY2E0ZTllZTYxNTQ4In0sImlhdCI6MTcxMzUzODYyN30.xXbJaKRFO5IAbS1xjEM1ozHVVnt2udIxP1RuoE6bbgE",
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyMjg1N2FlYWRjY2E0ZTllZTYxNTQ4In0sImlhdCI6MTcxMzUzODYyN30.xXbJaKRFO5IAbS1xjEM1ozHVVnt2udIxP1RuoE6bbgE",
      },

      // body data type must match "Content-Type" header
      body: JSON.stringify({ title, description, tag }),
    });
    // parses JSON response into native JavaScript objects
    const json = response.json();
    console.log(json);

    const note = {
      "_id": "66228665eadcca454e9ee6155f",
      "user": "6622857aeadcca4e9ee61548",
      "title": title,
      "description": description,
      "tag": tag,
      "date": 1713538661241,
      "__v": 0,
    };

    // state that concatinate the note wih notes state:
    setnotes(notes.concat(note));
  };

  // Edit a note:
  const editNote = async (id, title, description, tag) => {
    //API call:
    const url = `/api/note/updatenotes/${id}`;
    const response = await fetch(`${host}${url}`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyMjg1N2FlYWRjY2E0ZTllZTYxNTQ4In0sImlhdCI6MTcxMzUzODYyN30.xXbJaKRFO5IAbS1xjEM1ozHVVnt2udIxP1RuoE6bbgE",
      },

      // body data type must match "Content-Type" header
      body: JSON.stringify({ title, description, tag }),
    });
    // parses JSON response into native JavaScript objects
    const json = response.json();
    console.log(json);

    // logic to edit a note:
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];

      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyMjg1N2FlYWRjY2E0ZTllZTYxNTQ4In0sImlhdCI6MTcxMzUzODYyN30.xXbJaKRFO5IAbS1xjEM1ozHVVnt2udIxP1RuoE6bbgE",
      },

      // body data type must match "Content-Type" header
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
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
