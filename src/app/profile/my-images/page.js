"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import jwt from "jsonwebtoken";
import ImageCard from '@/components/ImageCard';

function About() {

const [name, setName] = useState('');
const [isLoading, setIsLoading] = useState(true);

const [authorData, setAuthorData] = useState([]);


  useEffect(() => {
    const data = localStorage.getItem("jwt_token");
    if (data != null) {
      const token = jwt.decode(data, process.env.NEXT_JWT_TOKEN );
      const {fullName} = token;
      setName(fullName);
       
    }

    
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/images/image-by-author`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({author: name})
  })
  .then(res => res.json())
  .then(data => {
    setAuthorData(data.imgs);
    setIsLoading(false);

  })
  }, [authorData])
  return (
    
     
   <div className='bg-base-200' >
    <h1 className='text-center font-bold py-10'>Your Images</h1>
{
  isLoading ?<div className='text-center'>Loading...<span className="loading loading-spinner loading-lg"></span></div>:""
}

<div style={{
  display: "grid",
  gridGap: "1rem",
  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
  justifyContent: "center",
  alignItems: "center"
}}  >

{
  authorData.map((img) => {
    return <ImageCard key={img._id} slug={img.slug} image={img.image} title={img.title} />
  })
}
</div>
  


   </div>
  
  )
}

export default About;