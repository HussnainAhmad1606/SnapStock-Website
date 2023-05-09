import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import "daisyui"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <h1>Home</h1>
  )
}
