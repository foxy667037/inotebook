import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials , setcredentials] = useState({name: "" , email: "" , password: "" , cpassword: ""});  

  const {showAlert} = props;

  let navigate = useNavigate();
  

  const handleSignupCLick = async(e) => {
        const {name , password , email} = credentials;
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            // *GET, POST, PUT, DELETE, etc.
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              },
            body: JSON.stringify({ name , email , password }),
        });

        const json = await response.json();
        console.log(json);

        if(json.success){
          // Save the auth-token and redirect:
          localStorage.setItem('token' , json.authtoken);
          navigate('/');
          showAlert("Signup Successfully" , "success");
        }
        else{
          showAlert("Wrong Credentials" , "danger");
        }
  
  };



  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };



  return (
    <>
      <div className="container">
        <form onSubmit={handleSignupCLick}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Name"
              id="name"
              name='name'
              required
              minLength={3}
              aria-describedby="emailHelp"
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your Email"
              id="email"
              name='email'
              required
              aria-describedby="emailHelp"
              onChange={onchange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name='password'
              required
              minLength={5}
              placeholder="type password"
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name='cpassword'
              placeholder="confirm password"
              onChange={onchange}
            />
          </div>
          <button disabled={credentials.password !== credentials.cpassword} type="submit" className="btn btn-primary">
            Signup
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
