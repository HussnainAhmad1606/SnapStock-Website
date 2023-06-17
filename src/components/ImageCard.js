
import Link from 'next/link'
import React from 'react'
import {useRouter} from "next/navigation";
function ImageCard({title, image, slug}) {
  const deletePhoto = () => {
fetch(`${process.env.NEXT_PUBLIC_URL}/api/images/delete-image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({slug: slug})
}).then(res => res.json())
.then(data => {
  alert(data.message);
 
})
  }
  const router = useRouter();
  return (
    <>
    
    <div style={{
      maxHeight: "400px"
    }} className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={image} /></figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <div className="card-actions justify-end">
      <button onClick={()=>{
        router.push(`/images/${slug}`)
      }} className="btn btn-primary">View Image</button>
      <button onClick={deletePhoto} className="btn btn-error">Delete</button>
    </div>
  </div>
</div>
      </>
  )
}

export default ImageCard