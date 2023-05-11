"use client"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Signup() {
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");


  const [allSet, setAllSet] = useState(true);


  const createAccount = async () => {
    const data = {
      fullName: fullName,
      email: email,
      password: password,
      isAdmin: false,
      isBlocked: false
    }
    // Default options are marked with *
   if (allSet && !(fullName == "" || email == "" || password == "")) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const returnedData = await response.json();

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
   
   else {
    alert("Please check your fields and try again");
   }

  }

  const onChange = (e) => {
    if (e.target.name == "fullName") {
      setFullName(e.target.value);
    }

   
  }

  const checkPassword = (e) => {
     if (e.target.name == "password") {
      setPassword(e.target.value);
    }

    else if (e.target.name == "repeatPassword") {
      setRepeatPassword(e.target.value);
    }


    if (password == repeatPassword) {
      setAllSet(true);
      setPasswordMessage("Passwords Match");
    }
    else {
      setAllSet(false);
      setPasswordMessage("Passwords do not match");
    }
  }

  const checkEmailAddress = async(e) => {
    setEmail(e.target.value);
    const data = {
      email: e.target.value
    }
    // Default options are marked with *
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/checkEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const returnedData = await response.json();

    if (returnedData.message == "Exist") {
      setEmailMessage("Email Exist, please type another one.");
      setAllSet(false);
      
    }
    else {
      setEmailMessage("Looks Great!")
      setAllSet(true);
    }
    console.log(returnedData)
    console.log(email)
  }
  return (
    <div className='my-4 flex justify-center items-center h-screen flex-col'>
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
      <h1>Create An Account</h1>

      <div className="form-control w-[50%] h-screen">
        <label className="label">
          <span className="label-text">Full Name: </span>
        </label>
        <input value={fullName} name="fullName" onChange={onChange} type="text" placeholder="" className="input input-bordered w-full" required />
      </div>


      <div className="form-control w-[50%] h-screen">
        <label className="label">
          <span className="label-text">Email Address: </span>
        </label>
        <input value={email} onChange={checkEmailAddress} type="email" placeholder="" className="input input-bordered w-full" required />

        <label className='label-right'>
          <span className="label-text">{emailMessage}</span>

        </label>
      </div>


      <div className="form-control w-[50%] h-screen">
        <label className="label">
          <span className="label-text">Password: </span>
        </label>
        <input name="password" value={password} onChange={checkPassword} type="password" placeholder="" className="input input-bordered w-full" required />
      </div>


      <div className="form-control w-[50%] h-screen">
        <label className="label">
          <span className="label-text">Repeat Password: </span>
        </label>
        <input  name="repeatPassword" value={repeatPassword} onChange={checkPassword} type="password" placeholder="" className="input input-bordered w-full" required />
        <label className='label-right'>
          <span className="label-text">{passwordMessage}</span>

        </label>
      </div>



    <button onClick={createAccount} className='w-[50%] btn btn-primary'>Create Account</button>


    </div>
  )
}

export default Signup;