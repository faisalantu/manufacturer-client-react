import React from "react";
import { Link } from "react-router-dom";
import CustomLink from "./CustomLink";
import { BsPerson } from "react-icons/bs";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const Header = () => {
  const [user] = useAuthState(auth);
  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <Link to={"/"} className='btn btn-ghost normal-case text-xl'>
          daisyUI
        </Link>
      </div>
      <div className='flex-none gap-2'>
        <div>
          <ul className='flex gap-4 items-center'>
            <li>
              <CustomLink to={"/"}> Home</CustomLink>
            </li>
            <li>
              <CustomLink to={"/Blogs"}> Blogs</CustomLink>
            </li>
            {user ? null : (
              <li>
                <CustomLink to={"/login"}> Login</CustomLink>
              </li>
            )}
          </ul>
        </div>
        {user ? (
          <div className='dropdown dropdown-end'>
            <label tabIndex='0' className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 h-10 rounded-full'>
                <img
                  src='https://api.lorem.space/image/face?hash=33791'
                  alt='se'
                />
              </div>
            </label>
            <ul
              tabIndex='0'
              className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
            >
              <li>
                <Link to={"/"} className='justify-between'>
                  Profile
                  <span className='badge'>New</span>
                </Link>
              </li>
              <li>
                <Link to={"/"}>Settings</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    signOut(auth);
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;