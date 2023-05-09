"use client"
import React, { useState } from 'react'

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async() => {
    const data = {
      email: email,
      password: password
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const returnedData = await response.json();

    alert(returnedData.message);
  }



  const onChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }

    else {
      setPassword(e.target.value);
    }
  }



  return (
    <div className='my-4 flex justify-between items-center h-[80vh] flex-col'>
    <h1>Login</h1>



    <div className="form-control w-[50%] h-screen">
      <label className="label">
        <span className="label-text">Email Address: </span>
      </label>
      <input value={email} name='email' onChange={onChange} type="email" placeholder="" className="input input-bordered w-full" required />

    </div>


    <div className="form-control w-[50%] h-screen">
      <label className="label">
        <span className="label-text">Password: </span>
      </label>
      <input name="password" value={password} onChange={onChange} type="password" placeholder="" className="input input-bordered w-full" required />
    </div>




  <button onClick={login} className='w-[50%] btn btn-primary'>Login</button>


  </div>
  )
}

export default Login;