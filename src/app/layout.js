import FooterComp from '../components/FooterComp'
import NavBar from '../components/NavBarComp'
import '../css/globals.css'
export const metadata = {
  title: 'SnapStock - Free High Quality Images for Your Creative Projects',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html  data-theme="light" lang="en">
      <body>
      <NavBar/>
        {children}

        <FooterComp/>
        </body>
    </html>
  )
}
