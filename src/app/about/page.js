import React from 'react'
import Link from 'next/link';
function About() {
  return (
   <div style={{
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
   }}>

<div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">About Us</h1>
      <p className="py-6">Welcome to SnapStock, your go-to destination for high-quality, royalty-free stock images. We believe that visual content is a powerful tool for storytelling, design, and creativity. That's why we've built a platform that provides a vast collection of stunning images, completely free for personal and commercial use.</p>
      <Link href={"/images"} className="btn btn-primary">Explore Images</Link>
    </div>
  </div>
</div>

   </div>
  )
}

export default About;