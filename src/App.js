import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import React, { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';



const App = () => {
  
  const [alert, setalert] = useState(null);
  const showAlert = (message, type) => {
    setalert({
          msg: message,
          type: type
        })
        setTimeout(()=>{
          setalert(null);
        },3000);
      }

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar/>
          <Alert alert={alert} />
          <Routes>  
            <Route exact path='/' element={<Home showAlert={showAlert}/>}></Route>
            <Route exact path='/login' element={<Login showAlert={showAlert}/>}></Route>
            <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}></Route>
            <Route exact path='/about' element={<About/>}></Route>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App
