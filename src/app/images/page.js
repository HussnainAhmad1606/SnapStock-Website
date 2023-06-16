"use client"
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
      toast(`You are logged in`, {
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
    else {
      toast(`You need to login to your account`, {
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
    setTimeout(() => {
      macyInstance.recalculate();
      console.log("Recalculated")
    }, 1000);
   


  

  }, [])
  return (
    <>
    
    <center>
      <h1>
        Images
      </h1>
    </center>
    
    {
          images.length == 0?<Spin indicator={antIcon} />: ""
        }
    
        <div ref={gridElement} style={{
          margin: "0px 0px",
          marginTop: "50px",
          
    
        }} id='grid' className=''>
    
    
        {
          images.map((cat, index) => {
            return <img key={index} width={400} src={cat.image} onClick={()=>{
    router.push(`/images/${cat.slug}`)
            }}/>
          })
        }
      </div>
      
    
      </>
  )
}

export default Categories;