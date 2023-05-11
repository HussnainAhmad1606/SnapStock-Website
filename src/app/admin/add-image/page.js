"use client"
import { Card, Input, List, message, Image, Progress } from 'antd'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import React, { useState } from 'react'
import { storage } from '../../../../../firebase/firebaseStorage'
import "flowbite"
import { ToastContainer, toast } from 'react-toastify'
import { Label, TextInput, Button, Textarea } from "flowbite-react";
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
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState("");


  
async function uploadPhoto(e) {

  e.preventDefault();
  const data = {
    title: title,
    slug: slug,
    description: description,
    category: category,
    image: downloadURL
  }
  // Default options are marked with *
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/product/addProduct`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  toast.success('Product Added Successfully', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

  return response.json();

   
   
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
      <form method='POST' className="mx-5 flex flex-col gap-4">
    <div>
    <div className="mb-2 block">
      <Label
        htmlFor="title"
        value="Product Title: "
      />
    </div>
    <TextInput
    value={title}
      id="productTitle"
      type="text"
      name='title'
      onChange={handleOnChange}
      required={true}
    />
  </div>

  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="slug"
        value="Product Slug"
      />
    </div>
    <TextInput
      id="slug"
      name="slug"
      type="text"
      onChange={handleOnChange}

      required={true}
    />
  </div>


  <div id="textarea">
  <div className="mb-2 block">
    <Label
      htmlFor="description"
      value="Product Description"
    />
  </div>
  <Textarea
    id="desc"
    name="desc"
    placeholder="Enter Description..."
    required={true}
    onChange={handleOnChange}

    rows={4}
  />
</div>



<div>
    <div className="mb-2 block">
      <Label
        htmlFor="category"
        value="Product Category: "
      />
    </div>
    <TextInput
      id="category"
      name="category"
      type="text"
      required={true}
      onChange={handleOnChange}

    />
  </div>


  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="productPhoto"
        value="Product Photo: "
      />
    </div>
    <div className="container mt-5">
      <div className="col-lg-8 offset-lg-2">
        <Input
          type="file"
          placeholder="Select file to upload"
          accept="image/png"
          onChange={(files) => handleSelectedFile(files.target.files)}
        />

        <div className="mt-5">
          <Card>
            {imageFile && (
              <>
                <List.Item
                  extra={[
                    <Button
                      key="btnRemoveFile"
                      onClick={handleRemoveFile}
                      type="text"
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
                  <Button
                    loading={isUploading}
                    type="primary"
                    onClick={handleUploadFile}
                  >
                    Upload
                  </Button>

                  <Progress percent={progressUpload} />
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
      <Label
        htmlFor="photo"
        value="Photo Link"
      />
    </div>
    <TextInput
    value={downloadURL}
      id="photoCover"
      type="text"
      required={true}
      disabled
    />
  </div>
  <Button onClick={uploadPhoto} type="submit">
    Upload Photo
  </Button>
</form>

   
                  </>
  )
}

export default UploadImageToStorage;