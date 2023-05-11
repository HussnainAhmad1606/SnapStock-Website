import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import "daisyui"
import Category from '../components/Category'
import Statistics from '../components/Statistics'
import HeaderImg from "../../public/header.png"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
     
     <div className='flex justify-center items-center w-full h-screen'>
      <div>
      <h1>Discover the perfect image for every project</h1>
      <button className='my-4 btn btn-primary'>Explore SnapStock</button>
      </div>
      <Image style={{
        width: "600px",
        height: "600px"
      }} src={HeaderImg}/>
     </div>

    <Statistics/>
    </div>
  )
}
