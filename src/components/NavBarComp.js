import React from 'react'
import Link from "next/link"
function NavBarComp() {
  return (
    <div className="navbar bg-base-100">
    <div className="navbar-start">
      <Link href={"/"} className="btn btn-ghost normal-case text-xl">SnapStock</Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
      <li><Link href={"/"}>Home</Link></li>
        <li tabIndex={0}>
        <Link href={"/categories"}>
        Categories
           
          </Link>

        </li>
        <li><Link href={"/about"}>About Us</Link></li>
      <li><Link href={"/contact"}>Contact Us</Link></li>
      </ul>
    </div>
    <div className="navbar-end">
    <button class="mx-2 btn btn-primary"><Link href={"/login"}>Login</Link></button>
    <button class="mx-2 btn btn-primary"><Link href={"/signup"}>Create An Account</Link></button>
    </div>
  </div>
  )
}

export default NavBarComp