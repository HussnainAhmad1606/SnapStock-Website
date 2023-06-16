"use client"

import React, {useState, useEffect} from 'react'
import jwt from "jsonwebtoken";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import AdminCard from '@/components/AdminCard';
import Link from 'next/link';
function page() {

  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const antIcon  = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");


    if (token != null) {
      const data = jwt.decode(token, process.env.NEXT_JWT_TOKEN);
      setFullName(data.fullName);
    }

    setIsLoading(false);

    
  }, [])
  
  return (
<>
{
  isLoading?<div className='flex justify-center items-center w-full h-screen'><Spin indicator={antIcon} /></div>:(
    <div
    className='flex justify-center items-center w-full h-[125vh] flex-col'
    style={{
      minWidth: "100vh"
    }}>
  
<h1 className='my-5 text-center text-[50px] font-bold'>Dashboard</h1>
<h1 className='my-5 text-center text-2xl font-bold'>Welcome, {fullName}</h1>



<div className="flex justify-between items-center flex-row">
  <AdminCard title={"Images"} body={"20"}/>
  <AdminCard title={"Visitors"} body={"10k"}/>
  <AdminCard title={"Earning"} body={"100$"}/>
</div>



<h1 className='my-20 text-center text-[40px] font-bold'>Actions</h1>


<div className='my-10 flex justify-center items-center flex-row'>
<Link href={"/admin/add-image"} className="btn btn-primary">Add New Image</Link>
<Link href={"/admin/add-category"} className="mx-2 btn btn-primary">Add New Category</Link>
</div>
</div>
  )
}


    </>
  )
}

export default page;