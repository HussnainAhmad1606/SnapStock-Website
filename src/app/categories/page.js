"use client"
import Category from '../../components/Category'
import React, { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function Categories() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [categories, setCategories] = useState([])


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/category/all-category`)
    .then(res => res.json())
    .then(data => {
      setCategories(data.cat)
    })
  }, [])
  return (
    <div className='flex justify-center items-center w-full h-screen'>
    {
      categories.length == 0?<Spin indicator={antIcon} />: ""
    }
    {
      categories.map((cat) => {
        return <Category title={cat.title} image={cat.image}/>
      })
    }
    </div>
  )
}

export default Categories;