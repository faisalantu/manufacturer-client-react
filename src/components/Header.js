import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CustomLink from "./CustomLink";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import useAdmin from "../hooks/useAdmin";
import { MdSpaceDashboard } from "react-icons/md";

const Header = () => {
  const [user] = useAuthState(auth);
  // eslint-disable-next-line
  const [isAdmin, isAdminLoading, fetchAdmin] = useAdmin(user);

  useEffect(() => {
    fetchAdmin();
    // eslint-disable-next-line
  }, [user]);

  return (
    <div
      style={{ zIndex: "99" }}
      className='bg-base-200 sticky top-0 shadow-md'
    >
      <div className='navbar bg-base-200 container mx-auto'>
        <div className='flex-1'>
          <Link to={"/"} className='btn btn-ghost normal-case text-xl'>
            Paint IT
          </Link>
        </div>
        <div className='flex-none gap-2'>
          <div>
            <ul className='flex gap-4 items-center'>
              <li>
                <CustomLink to={"/"}> Home</CustomLink>
              </li>
              <li>
                <CustomLink to={"/blogs"}> Blogs</CustomLink>
              </li>
              <li>
                <div className='navbar-end w-full text-right text-black'>
                  <label
                    tabIndex='1'
                    htmlFor='dashboard-sidebar'
                    className='btn btn-ghost lg:hidden text-white bg-primary  rounded-full'
                  >
                    <MdSpaceDashboard />
                  </label>
                </div>
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
                  <CustomLink to={"/portfolio"}> Portfolio</CustomLink>
                </li>

                {user ? (
                  <li>
                    <Link to={"/dashboard"} className='justify-between'>
                      Dashboard
                    </Link>
                  </li>
                ) : null}
                <li>
                  <button
                    onClick={() => {
                      signOut(auth);
                      localStorage.removeItem("accessToken");
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
    </div>
  );
};

export default Header;
