import React , { useContext } from 'react';
import noteContext from '../context/notes/noteContext';


const Home = () => {

  const context = useContext(noteContext);
  const {notes, setnotes} = context;

   return (
    <>
      <div className='container my-5'>
        <h3>Add a note</h3>
          <form>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
              <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        <h3 className='my-4'>Your notes</h3>
        {notes.map((note)=> {
          return note.title;
        })}
      </div>
    </>
  )
}

export default Home;
