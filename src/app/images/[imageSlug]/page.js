"use client"

import React, { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Image from 'next/image';



function Categories({params}) {
  const { imageSlug } = params;
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [Image, setImage] = useState("")


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
        console.log(Image)
    })
  }, [])
  return (
    <div className='flex justify-center items-center w-full h-screen'>
    {
     Image==""?<Spin indicator={antIcon} />:<div>
      <img src={Image} width={400}/>
      <a href={Image} className='btn btn-primary' download={"title"}>Download</a>
     </div>
    }

  


    </div>
  )
}

export default Categories;