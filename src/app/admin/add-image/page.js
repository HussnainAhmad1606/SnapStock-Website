"use client"
import { Card, List, Image, Progress } from 'antd'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import React, { useState } from 'react'
import { storage } from '../../../../firebase/firebaseStorage';
const axios = require('axios')
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {checkImageForAdultContent} from '../../../components/ImageDetection';
import jwt from "jsonwebtoken";
const UploadImageToStorage = () => {
  const [imageFile, setImageFile] = useState();
  const [downloadURL, setDownloadURL] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [progressUpload, setProgressUpload] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isAdultContent, setIsAdultContent] = useState(false);
  const handleSelectedFile = (files, e) => {

    if (files && files[0].size < 10000000) {
      setImageFile(files[0])

      console.log(files[0])
    } else {
      message.error('File size to large')
    }
  }


  const checkForAdultContent = async(url) => {
    setAdultCheckingMessage("Checking for adult content...");
    setButtonDisabled(true);
    const result = await checkImageForAdultContent(url);
    setIsAdultContent(result);
    if (result) {
      setAdultCheckingMessage("This image contains adult/explicit content but you can add it to the website and user will see label of Explicit/Adult.")

    }
    else {
      setAdultCheckingMessage("Image is safe to upload")
    }
    setButtonDisabled(false);
  }

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name
      const storageRef = ref(storage, `image/${name}`)
      const uploadTask = uploadBytesResumable(storageRef, imageFile)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          setProgressUpload(progress) // to show progress upload

          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          message.error(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //url is download url of file
            setDownloadURL(url);
            checkForAdultContent(url);
          })
        },
      )
    } else {
      message.error('File not found')
    }
  }

  const handleRemoveFile = () => setImageFile(undefined);


  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [adultCheckingMessage, setAdultCheckingMessage] = useState("");


  
async function uploadPhoto(e) {

  const token = localStorage.getItem("jwt_token");
  const token_data = jwt.decode(token, process.env.NEXT_JWT_TOKEN);

  const data = {
    title: title,
    slug: slug,
    description: description,
    category: category,
    image: downloadURL,
    authorName: token_data.fullName,
    authorBio: token_data.bio,
    authorAvatar: token_data.avatar,
    isAdultOrExplicit: isAdultContent
  }
  console.log(data);
  // Default options are marked with *
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/images/add-image`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  const res = await response.json();
  toast.success(`${res.message}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

   
   
}
 
  const handleOnChange = (e) => {
if (e.target.name == "title") {
  setTitle(e.target.value);
}
else if (e.target.name == "slug") {
  setSlug(e.target.value);
}

else if (e.target.name == "desc") {
setDescription(e.target.value);
}

else if (e.target.name == "category") {
  setCategory(e.target.value);
}
  }

  return (
    <>
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
    <h1 className='text-3xl text-center font-bold'>Add a Image</h1>
    <div style={{
      marginLeft: "-100px"
    }} className='flex justify-between flex-col items-center w-full h-[150vh]'>

    <div className=''>
    <div className=" mb-2 block">
      <label
        htmlFor="title"
        value="Product Title: "
        />
    </div>
    <input
    value={title}
    className="w-[200%] input input-bordered" 
      id="productTitle"
      type="text"
      name='title'
      onChange={handleOnChange}
      required={true}
      placeholder='Enter Image Title'
    />
  </div>

  <div>
    <div className="mb-2 block">
      <label
        htmlFor="slug"
        value="Product Slug"
      />
    </div>
    <input
      id="slug"
      name="slug"
      className="w-[200%] input input-bordered" 
      type="text"
      onChange={handleOnChange}
      placeholder='Enter Image Slug'
       
      required={true}
      />
  </div>


  <div id="textarea">
  <div className="mb-2 block">
    <label
      htmlFor="description"
      value="Product Description"
    />
  </div>
  <input
    id="desc"
    name="desc"
    placeholder="Enter Description..."
    required={true}
    className="w-[200%] input input-bordered" 
    onChange={handleOnChange}
    
    rows={4}
    />
</div>



<div>
    <div className="mb-2 block">
      <label
        htmlFor="category"
        value="Product Category: "
        />
    </div>
    <input
      id="category"
      name="category"
      type="text"
      placeholder='Enter Image Category'
      className="w-[200%] input input-bordered"
      required={true}
      onChange={handleOnChange}
      
      />
  </div>


  <div>
    <div className="mb-2 block">
      <label
        htmlFor="productPhoto"
        value="Product Photo: "
        />
    </div>
    <div className="container mt-5">
      <div className="col-lg-8">
        <input
          type="file"
          className='file-input input-bordered w-[150%]'
          placeholder="Select file to upload"
          accept="image/png"
          onChange={(files) => handleSelectedFile(files.target.files)}
        />

        <div className="mt-5 w-[200%]">
          <Card>
            {
              imageFile?"":"Your Image will be shown here after you upload it" 
            }
            {imageFile && (
              <>
                <List.Item
                  extra={[
                    <button
                    className='btn btn-primary'
                      key="btnRemoveFile"
                      onClick={handleRemoveFile}
                      type="text"
                      value={"Remove Image"}
                    >Remove Image</button>,
                  ]}
                >
                  <List.Item.Meta
                    title={imageFile.name}
                    description={`Size: ${(imageFile.size / 1024).toFixed(2)} KB`}
                  />
                </List.Item>

                <div className="text-right mt-3">
                  <button
                  className='btn btn-primary'
                  loading={isUploading}
                    type="primary"
                    onClick={handleUploadFile}
                    >
                    Upload
                  </button>
                  <br/>

                  <progress className="progress progress-primary w-56" value={progressUpload} max="100"></progress>
                </div>
              </>
            )}

            {downloadURL && (
              <>
                <Image
                  src={downloadURL}
                  alt={downloadURL}
                  style={{ width: 200, height: 200, objectFit: 'cover' }}
                  />
              
              </>
            )}
            {
              downloadURL && (
                <>
                <br/>
                <br/>
                <span className='text-center'>{adultCheckingMessage}</span>
                </>
              )
            }
            <p></p>
          </Card>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="mb-2 block">
      <label
        htmlFor="photo"
        value="Photo Link"
      />
    </div>
    <input
    value={downloadURL}
      id="photoCover"
      type="text"
      required={true}
      className="w-[200%] input input-bordered" 
      disabled
      />
  </div>
  <button className='btn btn-primary' disabled={buttonDisabled} onClick={uploadPhoto} type="submit">
    Upload Photo
  </button>


   
                  </div>
      </>
  )
}

export default UploadImageToStorage;