import React from 'react'
import {BsTelephoneForward} from "react-icons/bs";
import {HiOutlineMail} from "react-icons/hi"
import {IoLocationOutline} from "react-icons/io5";
import dynamic from 'next/dynamic';


function Contact() {
  const Map = React.useMemo(() => dynamic(
    () => import('../../components/Map'), // replace '@components/map' with your component's location
    { 
      loading: () => <><span className="loading loading-spinner loading-lg"></span>Loading Map...</>,
      ssr: false // This line is important. It's what prevents server-side render
    }
  ), [])
  return (
    <div className="flex justify-evenly items-center w-full h-[150vh] flex-col">
    <h1>Contact Us</h1>


    <div className="my-5 contact-div w-full flex justify-evenly items-center text-center sm:flex-col md:flex-row lg:flex-row xl:flex-row">

      <div className="flex justify-center items-center flex-col">
       <span>
        <BsTelephoneForward className='my-5' style={{
        fontSize: "50px",
        color: "#1b4699"
       }} />
       </span>
        <p>+92 324 8824376</p>
      </div>


      <div className="flex justify-center items-center flex-col">
        <HiOutlineMail className='my-5' style={{
        fontSize: "50px",
        color: "#1b4699"
       }}/>
        <p>hussnainahmad1606@gmail.com</p>
      </div>


      <div className="flex justify-center items-center flex-col">
        <IoLocationOutline className='my-5' style={{
        fontSize: "50px",
        color: "#1b4699"
       }}/>
        <p>Lahore, Pakistan</p>
      </div>


    </div>

    <Map/>

    
</div>
  )
}

export default Contact;