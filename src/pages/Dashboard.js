import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Loading from "../components/Loading";
import CustomLink from "./../components/CustomLinkDashboard";

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
        <div className='text-2xl font-bold text-stone-400 flex md:block justify-between text-center px-1 my-5'>
          <span>Dashboard</span>
        </div>

        <Outlet></Outlet>
      </div>
      <div className='drawer-side'>
        <label htmlFor='dashboard-sidebar' className='drawer-overlay'></label>
        <ul className='menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content'>
          <div className='mt-1'>
            <CustomLink to='/dashboard'>My Profile</CustomLink>
          </div>
          {!isAdmin && (
            <div className='mt-1'>
              <CustomLink to='/dashboard/addreview'>Add Review</CustomLink>
            </div>
          )}
          {!isAdmin && (
            <div className='mt-1'>
              <CustomLink to='/dashboard/orders'>My Orders</CustomLink>
            </div>
          )}
          {isAdmin && (
            <>
              <div className='mt-1'>
                <CustomLink to='/dashboard/allorders'>All Orders</CustomLink>
              </div>
              <div className='mt-1'>
                <CustomLink to='/dashboard/addproduct'>Add Product</CustomLink>
              </div>
              <div className='mt-1'>
                <CustomLink to='/dashboard/allproducts'>
                  Manage Products
                </CustomLink>
              </div>
              <div className='mt-1'>
                <CustomLink to='/dashboard/manageadmins'>
                  Manage Admins
                </CustomLink>
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
