import React from 'react';

const Login = () => {

  const handleLoginClick = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/loginusera", {
            // *GET, POST, PUT, DELETE, etc.
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              },
              
            body: JSON.stringify({ email, password }),
        });
        const json = await response.json();
        console.log(json);
  }  

  return (
    <>  <div className="container">
            <form  onSubmit={handleLoginClick}> 
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    </>
  )
}

export default Login;
