"use client"
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt from "jsonwebtoken"
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [fullName, setFullName] = useState("")

  const tokenVerification = async()=> {
    let localToken = localStorage.getItem("jwt_token");
    if (localToken!== null) {
      console.log(localToken);
    const data = {
      token: localToken==null?"":localToken
    }
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/verifyToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const returnedData = await response.json();

    if (returnedData.message == "success") {
      toast(`You are logged in`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } 
    else {
      toast(`You need to login to your account`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    }
    
  }
  useEffect(() => {
    tokenVerification();
 }, [])
  

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
    localStorage.setItem("jwt_token", returnedData.token);
    localStorage.setItem("username", returnedData.name);
    toast(`${returnedData.message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
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
    <>
    <div className='my-4 flex justify-between items-center h-[80vh] flex-col'>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
{/* Same as */}
<ToastContainer />

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
</>
  )
  }

export default Login;