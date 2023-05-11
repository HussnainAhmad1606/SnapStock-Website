"use client"
import Category from '../../components/Category'
import React, { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Image from 'next/image';



function Categories() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [images, setImages] = useState([])


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/images/all-images`)
    .then(res => res.json())
    .then(data => {
        setImages(data.img)
    })
  }, [])
  return (
    <div className='flex justify-center items-center w-full h-screen'>
    {
      images.length == 0?<Spin indicator={antIcon} />: ""
    }
    {
      images.map((cat) => {
        return <img width={300} src={cat.image}/>
      })
    }
    </div>
  )
}

export default Categories;