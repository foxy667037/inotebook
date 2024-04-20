import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Home = () => {
  
  const a = useContext(noteContext); 
  
  return (
    <>
      <div className='container text-center my-5'>
        <h1>This is iNotebook - Home</h1>
        <h1>Inotebook</h1>
        This is {a.name} and i am at class {a.class}
      </div>
    </>
  )
}

export default Home
