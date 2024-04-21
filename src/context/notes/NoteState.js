import noteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {

    const notesInitial = [
    {
      "_id": "6622865aeadcca4e9ee6155d",
      "user": "6622857aeadcca4e9ee61548",
      "title": "New CROW",
      "description": "i am a crow and i am very thirstysss",
      "tag": "general",
      "date": 1713538650852,
      "__v": 0
    },
    {
      "_id": "66228665eadcca4e9ee6155f",
      "user": "6622857aeadcca4e9ee61548",
      "title": "CROW 2",
      "description": "2 i am a crow and i am very thirsty",
      "tag": "general 2",
      "date": 1713538661241,
      "__v": 0
    }
  ]

  const [notes , setnotes] = useState(notesInitial);
 
    return (
        <noteContext.Provider value={{notes , setnotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;