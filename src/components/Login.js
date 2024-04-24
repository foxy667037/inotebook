import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  const [credentials , setcredentials] = useState({email: "" , password: ""});  
  let navigate = useNavigate();
  

  const handleLoginClick = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/loginuser", {
            // *GET, POST, PUT, DELETE, etc.
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              },
            body: JSON.stringify({ email : credentials.email , password : credentials.password }),
        });
        const json = await response.json();
        console.log(json);

        if(json.success){
          // Save the auth-token and redirect:
          localStorage.setItem('token' , json.authtoken);
          navigate('/');
        }
        else{
          alert("Wrong Credentials:");
        }
  
  }  

  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>  <div className="container">
            <form  onSubmit={handleLoginClick}> 
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onchange} aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"  className="form-control"  id="password" name='password' value={credentials.password} onChange={onchange}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    </>
  )
}

export default Login;
