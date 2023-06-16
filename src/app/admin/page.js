"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async() => {
    const data = {
      email: email,
      password: password
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const returnedData = await response.json();

    toast(`${returnedData.message}`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

      if (returnedData.type == "success") {
        setTimeout(() => {
         router.push("/admin/dashboard")
        }, 3000);
        
     }
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
    <h1>Admin Login</h1>



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