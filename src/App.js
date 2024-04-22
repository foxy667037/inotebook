import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';



const App = () => {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar/>
          <Alert message="This is good react course"/>
          <Routes>  
            <Route exact path='/' element={<Home/>}></Route>
            <Route exact path='/about' element={<About/>}></Route>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App
