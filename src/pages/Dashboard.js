import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Loading from "../components/Loading";
import CustomLink from './../components/CustomLinkDashboard';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [isAdmin, isAdminLoading, fetchAdmin] = useAdmin(user);
  useEffect(() => {
    fetchAdmin();
    // eslint-disable-next-line
  }, [user]);

  if (isAdminLoading) return <Loading />;

  return (
    <div class='drawer drawer-mobile'>
      <input id='dashboard-sidebar' type='checkbox' class='drawer-toggle' />
      <div class='drawer-content'>
        <h2 className='text-2xl font-bold text-stone-400 text-center'>
          Dashboard
        </h2>
        <div className='navbar-end'>
          <label
            tabIndex='1'
            for='dashboard-sidebar'
            className='btn btn-ghost lg:hidden'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </label>
        </div>
        <Outlet></Outlet>
      </div>
      <div class='drawer-side'>
        <label for='dashboard-sidebar' class='drawer-overlay'></label>
        <ul class='menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content'>
        <li>
            <CustomLink to='/dashboard/review'>My Profile</CustomLink>
          </li>
          <li>
            <CustomLink to='/dashboard/addreview'>Add Reviews</CustomLink>
          </li>
          <li>
            <CustomLink to='/dashboard/reviews'>My Reviews</CustomLink>
          </li>

          {isAdmin && (
            <>
              <li>
                <CustomLink to='/dashboard/addproduct'>Add Product</CustomLink>
              </li>
              <li>
                <CustomLink to='/dashboard/allproducts'>Manage Products</CustomLink>
              </li>
              <li>
                <CustomLink to='/dashboard/manageadmins'>Manage Admins</CustomLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
