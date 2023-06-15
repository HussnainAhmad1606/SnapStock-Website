"use client"
import React, { useState, useEffect } from 'react'
import Link from "next/link"
function NavBarComp() {

  const [username, setUsername] = useState("");
  const [loggedIn, isLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState("");

  const logout = () => {
    
    localStorage.removeItem("username");
    localStorage.removeItem("jwt_token");
    setUsername("");
    isLoggedIn(false);
  }


  useEffect(() => {

    let usernameStorage = localStorage.getItem("username");

    if (usernameStorage != null) {
      setUsername(username);
      isLoggedIn(true);
      setAvatar("https://wakatime.com/photo/bcededad-96a6-4a0c-882f-84ea0a604508?s=420&cache=false&time=1686858120.3998978")
    }
  }, [])


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
        {
          loggedIn ? "" : (
            <>
              <button className="mx-2 btn btn-primary"><Link href={"/login"}>Login</Link></button>
              <button className="mx-2 btn btn-primary"><Link href={"/signup"}>Create An Account</Link></button>
            </>
          )
        }
        {
          loggedIn ? (
            <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={avatar} />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <Link href={"/profile"} className="justify-between">
                Profile
              </Link>
            </li>
            <li><button onClick={logout}>Logout</button></li>
          </ul>
        </div>
          ):""
        }
      </div>
    </div>
  )
}

export default NavBarComp