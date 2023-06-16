"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import jwt from "jsonwebtoken";
function About() {

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [bio, setBio] = useState('');
const [avatar, setAvatar] = useState('');
const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const data = localStorage.getItem("jwt_token");
    if (data != null) {
      const token = jwt.decode(data, process.env.NEXT_JWT_TOKEN );
      setName(token.fullName);
      setEmail(token.email);
      setBio(token.bio);
      setAvatar("https://wakatime.com/photo/bcededad-96a6-4a0c-882f-84ea0a604508?s=420&cache=false&time=1686858120.3998978");
      setIsLoading(true);
    }
  }, [])
  return (
    <>
   <div className='bg-base-200' >
    <h1 className='text-center font-bold py-10'>Your Profile</h1>
{
  isLoading ? (
  <div className="-my-20 hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className='avatar'>
    <img src={avatar} style={{
      width: "70%"
    }} className="w-[20%] rounded-full shadow-2xl" />
    </div>
    <div className=''>
      <h1 className="text-3xl font-bold">Hi, {name}</h1>
      <p className="py-6">{bio}</p>
      <Link href={"/profile/my-images"} className="btn btn-primary">My Images</Link>
      <Link href={"/images"} className="mx-3 btn btn-error">Delete Account</Link>
    </div>
  </div>
</div>
): (
  <span className="loading loading-spinner loading-lg"></span>
  
)
}

   </div>
  </>
  )
}

export default About;