"use client"
import "../../css/images.css";
import Category from '../../components/Category'
import React, { useEffect, useRef, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Macy from 'macy';
function Categories() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

const [fullName, setFullName] = useState("");
const [isLoaded, setIsLoaded] = useState(false);
  const gridElement = useRef();


  const tokenVerification = async()=> {
    let localToken = localStorage.getItem("jwt_token");
    if (localToken!== null) {
      console.log(localToken);
    const data = {
      token: localToken==null?"":localToken
    }
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/verifyToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const returnedData = await response.json();
    if (returnedData.message == "success") {
      setFullName(returnedData.data.fullName);
      setIsLoggedIn(true);
      
    } 
    }
    else {
      toast(`You need to login to your account in order to see content`, {
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
  }

  const router = useRouter();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [images, setImages] = useState([])


  const getData = async () => {
   
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/images/all-images`)
   const data = await res.json();
    setImages(data.img);

    setIsLoaded(true);

  }

  useEffect(() => {

    tokenVerification();
   getData();

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
  if (isLoaded) {
    macyInstance.recalculate();
  }
   


  

  }, [isLoaded])
  return (
    <>
    
    <center>
      <h1>
        Images
      </h1>
    </center>
    
    {
          images.length == 0?<div className='flex justify-center items-center w-full h-screen'><Spin indicator={antIcon} /></div>: ""
        }
    
        <div ref={gridElement} style={{
          margin: "0px 0px",
          marginTop: "50px",
          minHeight: "100vh",
          
    
        }} id='grid' className=''>
    
    
        {
          images.map((cat, index) => {
            console.log(cat.title, " : ",typeof cat.isAdultOrExplicit)
            return (
              <div style={{
                position: "relative"
                
              }} className="img">
                <p  onClick={()=>{
                  router.push(`/images/${cat.slug}`)
                          }} style={{
    background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))",
    backgroundColor: `${cat.isAdultOrExplicit=="true"?"black":"transparent"}`,
                  color: "white",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: `${cat.isAdultOrExplicit=="true"?"flex":"none"}`,
                  justifyContent:  `${cat.isAdultOrExplicit=="true"?"center":""}`,
                  alignItems:  `${cat.isAdultOrExplicit=="true"?"center":""}`,
                }} className='message'>
                  {cat.isAdultOrExplicit=="true"?"This photo contain explicit or adultry content":cat.title}
                  </p>
                <img key={index} width={400} src={cat.image}/>

              </div>
            )
          })
        }
      </div>
      
    
      </>
  )
}

export default Categories;