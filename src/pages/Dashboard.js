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


  if (!user) return <Loading />;
  if (isAdminLoading) return <Loading />;

  return (
    <div className='drawer drawer-mobile'>
      <input id='dashboard-sidebar' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content '>
        <div className='text-2xl font-bold text-stone-400 flex md:block justify-between text-center px-1'>
          <span>Dashboard</span>
          <div className='navbar-end w-full text-right text-black'>
          <label
            tabIndex='1'
            htmlFor='dashboard-sidebar'
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
        </div>
        
        <Outlet></Outlet>
      </div>
      <div className='drawer-side'>
        <label htmlFor='dashboard-sidebar' className='drawer-overlay'></label>
        <ul className='menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content'>
        <div className="mt-1">
            <CustomLink to='/dashboard/profile'>My Profile</CustomLink>
          </div>
          <div className="mt-1">
            <CustomLink to='/dashboard/addreview'>Add Reviews</CustomLink>
          </div>
          <div className="mt-1">
            <CustomLink to='/dashboard/reviews'>My Reviews</CustomLink>
          </div>

          {isAdmin && (
            <>
              <div className="mt-1">
                <CustomLink to='/dashboard/addproduct'>Add Product</CustomLink>
              </div>
              <div className="mt-1">
                <CustomLink to='/dashboard/allproducts'>Manage Products</CustomLink>
              </div>
              <div className="mt-1">
                <CustomLink to='/dashboard/manageadmins'>Manage Admins</CustomLink>
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
