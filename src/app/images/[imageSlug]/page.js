"use client"
import {} from "firebase/storage";
import React, { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Spin } from 'antd';
import {storage} from '../../../../firebase/firebaseStorage';
var FileSaver = require('file-saver');
import Image from 'next/image';


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
  const [originalImageTitle, setOriginalImageTitle] = useState("");
  const [imageDownloadURL, setImageDownloadURL] = useState("");


  const downloadImage = async() => {
    console.log(originalImageTitle);
    console.log(Image)
    download(Image);
  }


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
        setOriginalImageTitle(data.img[0].originalImageTitle)
        console.log(Image)
    })
  }, [])
  return (
    <div className='flex justify-center items-center w-full h-screen'>




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
    </div>
  )
}

export default Categories;