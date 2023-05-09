import React from 'react'

function Signup() {
  return (
    <div className='my-4 flex justify-center items-center h-screen flex-col'>
      <h1>Create An Account</h1>

      <div className="form-control w-[50%] h-screen">
        <label className="label">
          <span className="label-text">Full Name: </span>
        </label>
        <input type="text" placeholder="" className="input input-bordered w-full" />
      </div>


      <div className="form-control w-[50%] h-screen">
        <label className="label">
          <span className="label-text">Email Address: </span>
        </label>
        <input type="email" placeholder="" className="input input-bordered w-full" />
      </div>


      <div className="form-control w-[50%] h-screen">
        <label className="label">
          <span className="label-text">Password: </span>
        </label>
        <input type="password" placeholder="" className="input input-bordered w-full" />
      </div>


      <div className="form-control w-[50%] h-screen">
        <label className="label">
          <span className="label-text">Repeat Password: </span>
        </label>
        <input type="password" placeholder="" className="input input-bordered w-full" />
      </div>



    <button className='w-[50%] btn btn-primary'>Create Account</button>


    </div>
  )
}

export default Signup;