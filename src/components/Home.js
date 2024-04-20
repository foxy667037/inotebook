import React from 'react';
import { useContext } from 'react';
import { useEffect} from 'react';
import noteContext from '../context/notes/noteContext';

const Home = () => {
  
  const a = useContext(noteContext); 
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])
  
  return (
    <>
      <div className='container text-center my-5'>
        <h1>This is iNotebook - Home</h1>
        <h1>Inotebook</h1>
        This is {a.state.name} and i am in class {a.state.class}
      </div>
    </>
  )
}

export default Home
