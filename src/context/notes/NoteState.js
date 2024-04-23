import noteContext from './noteContext';
import { useState } from 'react';

// notestate:
  const NoteState = (props) => {

    const notesInitial = [
    {
      "_id": "6622865aeadcca43e9ee6155d",
      "user": "6622857aeadcca4e9ee61548",
      "title": "New CROW",
      "description": "i am a crow and i am very thirstysss",
      "tag": "general",
      "date": 1713538650852,
      "__v": 0
    },
    {
      "_id": "66228665eadcca4e9e4e6155f",
      "user": "6622857aeadcca4e9ee61548",
      "title": "CROW 2",
      "description": "2 i am a crow and i am very thirsty",
      "tag": "general 2",
      "date": 1713538661241,
      "__v": 0
    },
    {
        "_id": "66228665eadcca454e9ee6155f",
        "user": "6622857aeadcca4e9ee61548",
        "title": "CROW 2",
        "description": "2 i am a crow and i am very thirsty",
        "tag": "general 2",
        "date": 1713538661241,
        "__v": 0
      }
  ]

    const [notes , setnotes] = useState(notesInitial);

    // Add a note:
    const addNote = (title, description, tag) => {
        // TODO api call:

        const note = {
          "_id": "66228665eadcca454e9ee6155f",
          "user": "6622857aeadcca4e9ee61548",
          "title": title,
          "description": description,
          "tag": tag,
          "date": 1713538661241,
          "__v": 0
        };

        // state that concatinate the note wih notes state:
        setnotes(notes.concat(note));
    }
    
    // Edit a note:
    const editNote = (id, title, description, tag) => {
        //API call:
        
        // logic to edit a note:
        for(let index=0; index < notes.length; index++){
          
          const element = notes[index];
          
          if(element._id === id){
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
        }
    }
    
    // Delete a note:
    const deleteNote = (id) => {
      // TODO api call:
      console.log("deleting note with id " + id);

      // delete function:
      const newNotes = notes.filter((note)=>{return note._id !== id});

      // state that delete the note wih notes state:
      setnotes(newNotes);
    }

    return (
        <noteContext.Provider value={{notes , addNote , editNote, deleteNote}}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;