import Link from 'next/link'
import React from 'react'

function NavBar() {
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">SnapStock</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><Link href={"/"}>Home</Link></li>
      <li tabIndex="0">
        <Link href={"/popular"}>
          Categories
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </Link>
        <ul className="p-2 bg-base-100">
          <li><Link href={"#"}>Nature</Link></li>
          <li><Link href={"#"}>Bikes</Link></li>
          <li><Link href={"#"}>See More...</Link></li>
        </ul>
      </li>
      <li><Link href={"/about"}>About Us</Link></li>
      <li><Link href={"/contact"}>Contact Us</Link></li>
    </ul>
    <button className="mx-2 btn btn-primary"><Link href={"/login"}>Login</Link></button>
    <button className="mx-2 btn btn-primary"><Link href={"/signup"}>Create An Account</Link></button>
  </div>
</div>
  )
}

export default NavBar