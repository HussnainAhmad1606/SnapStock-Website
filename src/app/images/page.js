"use client"
import Category from '../../components/Category'
import React, { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import macy from 'macy';
function Categories() {
  const router = useRouter();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [images, setImages] = useState([])


  useEffect(() => {
    const macyInstance = macy({
      container: "#grid",
      breakAt: {
        1600: 4,
        1200: 4,
        900: 3,
        600: 2,
        400: 1,
      },
      margin: {
        x: 20,
        y: 20,
      },
    })

    fetch(`${process.env.NEXT_PUBLIC_URL}/api/images/all-images`)
    .then(res => res.json())
    .then(data => {
        setImages(data.img)
  
    })
  }, [])
  return (
    <>
    <center>
      <h1>
        Images
      </h1>
    </center>
    <div style={{
      margin: "0px 0px",
      marginTop: "50px"

    }} id='grid' className='flex justify-center items-center w-full h-screen'>
    {
      images.length == 0?<Spin indicator={antIcon} />: ""
    }
    {
      images.map((cat) => {
        return <img width={400} src={cat.image} onClick={()=>{
router.push(`/images/${cat.slug}`)
        }}/>
      })
    }
    </div>
      </>
  )
}

export default Categories;