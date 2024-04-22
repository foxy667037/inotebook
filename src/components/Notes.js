import React , {useContext} from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitems from './Noteitems';
import AddNote from './AddNote';

const Notes = () => {
    
  const context = useContext(noteContext);
  const {notes, setnotes} = context;

  return (
    <>
      <AddNote/>
      <div className='row my-2'>
        <h3>Your notes</h3>
          {notes.map((note)=> {
            return <Noteitems key={note._id} note={note} />;
          })}
      </div>
    </>
  )
}

export default Notes
