"use client"
import {} from "firebase/storage";
import React, { useEffect, useState, useRef } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Spin } from 'antd';

import Macy from 'macy';


var download = require("downloadjs")
function Categories({params}) {


  const { imageSlug } = params;
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [Image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category,setCategory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorBio, setAuthorBio] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState("");
  const [imageDownloadURL, setImageDownloadURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [relatedImgs, setRelatedImgs] = useState([]);

  
  const gridElement = useRef();

  const downloadImage = async() => {
    console.log(Image)
    download(Image);
  }

  useEffect(() => {
    const macyInstance =  Macy({
      waitForImages: true,
      container: "#grid",
      breakAt: {
        1600: 4,
        1200: 4,
        900: 3,
        600: 2,
      },
      margin: {
        x: 20,
        y: 20,
      },
    })
  
    macyInstance.recalculate();
  
  }, [loading])
  


  useEffect(() => {
   
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/images/get-image`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    slug: imageSlug
  })
})
    .then(res => res.json())
    .then(data => {
        setImage(data.img[0].image)
        setTitle(data.img[0].title)
        setDescription(data.img[0].description)
        setCategory(data.img[0].category)
        setAuthorName(data.img[0].authorName)
        setAuthorBio(data.img[0].authorBio)
        setAuthorAvatar(data.img[0].authorAvatar)
        console.log(Image);
        setRelatedImgs(data.relatedImgs);
        console.log(relatedImgs)
        setLoading(true);
    })
  }, [])
  return (
    <>
    <div className='flex flex-col justify-center items-center w-full h-screen'>




{
  loading?(
    <div className="card lg:card-side bg-base-100 shadow-2xl">
  <figure><img src={Image} alt="Album"/></figure>
  <div className="card-body">
    <h1 className="text-4xl card-title">{title}</h1>
    <p>{description}</p>
    <p><b>Category:</b> {category}</p>

<h2 className='text-2xl font-bold'>Uploader: </h2>
    <div className="shadow-xl rounded-lg w-[50%] hero">
  <div className="hero-content flex-col lg:flex-row">
    <img src={authorAvatar} className="w-[40%] max-w-sm rounded-full shadow-2xl" />
    <div>
      <h3 className="font-bold">{authorName}</h3>
      <p className="py-2">{authorBio}</p>
    </div>
  </div>
</div>
    <div className="card-actions justify-end">
      <button onClick={downloadImage} className='btn btn-primary' download>Download Now</button>
    </div>
  </div>
</div>
  ): (<>Loading...<Spin indicator={antIcon} /></>)
}


    </div>

    <h1 className="text-3xl text-center font-bold my-5">Related Images</h1> 


<div ref={gridElement} style={{
          margin: "0px 0px",
          marginTop: "50px",
          
          
        }} id='grid' className=''>
{
  relatedImgs.map((cat, index) => {
    if (cat.slug != imageSlug) {
      return <img key={index} width={400} src={cat.image} onClick={()=>{
        router.push(`/images/${cat.slug}`)
                }}/>
    }
          })
        }
</div>
              </>
  )
}

export default Categories;