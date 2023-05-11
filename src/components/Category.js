import React from 'react'

import { useRouter } from 'next/navigation';

function Category(props) {

  const router = useRouter();
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
    <figure className="px-10 pt-10">
      <img src={props.image} alt="Shoes" className="rounded-xl" />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{props.title}</h2>
      {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
      <div className="card-actions">
        <button onClick={()=>{
  router.push(`/categories/${props.title.toLowerCase()}`);       
        }}  className="btn btn-primary">Open</button>
      </div>
    </div>
  </div>
  )
}

export default Category