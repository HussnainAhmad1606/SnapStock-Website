import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import "daisyui"
import Category from '../components/Category'
import Statistics from '../components/Statistics'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <h1>Home</h1>

    <Statistics/>
    </div>
  )
}
