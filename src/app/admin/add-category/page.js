"use client"
import { Card, List, Image, Progress } from 'antd'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import React, { useState } from 'react'
import { storage } from '../../../../firebase/firebaseStorage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const UploadImageToStorage = () => {
  const [imageFile, setImageFile] = useState();
  const [downloadURL, setDownloadURL] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [progressUpload, setProgressUpload] = useState(0);

  const handleSelectedFile = (files, e) => {

    if (files && files[0].size < 10000000) {
      setImageFile(files[0])

      console.log(files[0])
    } else {
      message.error('File size to large')
    }
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
            setDownloadURL(url)
          })
        },
      )
    } else {
      message.error('File not found')
    }
  }

  const handleRemoveFile = () => setImageFile(undefined);


  const [title, setTitle] = useState("");


  
async function addCategory(e) {

  e.preventDefault();
  const data = {
    title: title,
    image: downloadURL
  }
  // Default options are marked with *
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/category/add-category`, {
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
      <form method='POST' className="mx-5 flex flex-col gap-4">
        <h1>Add New Category</h1>
    <div>
    <div className="mb-2 block">
      <label
        htmlFor="title"
        value="Product Title: "
      />
    </div>
    <input
    value={title}
    className="input input-bordered w-full max-w-xs" 
      id="productTitle"
      type="text"
      name='title'
      onChange={handleOnChange}
      required={true}
      placeholder='Category Title'
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
      <div className="col-lg-8 offset-lg-2">
        <input
          type="file"
          className='file-input w-full max-w-xs'
          placeholder="Select file to upload"
          accept="image/png"
          onChange={(files) => handleSelectedFile(files.target.files)}
        />

        <div className="mt-5">
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
                      icon={<i className="fas fa-times"></i>}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={imageFile.name}
                    description={`Size: ${imageFile.size}`}
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
      className="w-full input input-bordered w-full max-w-xs" 
      disabled
    />
  </div>
  <button className='btn btn-primary' onClick={addCategory} type="submit">
    Add Category
  </button>
</form>

   
                  </>
  )
}

export default UploadImageToStorage;