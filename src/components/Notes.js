import React , {useContext} from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitems from './Noteitems';

const Notes = () => {
    
  const context = useContext(noteContext);
  const {notes, setnotes} = context;

  return (
    <div className='row my-2'>
       <h3>Your notes</h3>
        {notes.map((note)=> {
          return <Noteitems note={note}/>;
        })}
    </div>
  )
}

export default Notes
