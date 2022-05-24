import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Loading from "./Loading";
import useAdmin from "../hooks/useAdmin";
import { useEffect } from "react";

const AdminAuthRequired = ({ children }) => {

  const [user, loading] = useAuthState(auth);
  const [isAdmin, isAdminLoading, fetchAdmin] = useAdmin(user);
  const location = useLocation();

  useEffect(() => {
    fetchAdmin();
    // eslint-disable-next-line
  }, [user]);

  if (loading || isAdminLoading || isAdmin === undefined ) {
    return <Loading />;
  }
  if (!isAdmin) {
    return <Navigate to='/dashboard' state={{ from: location }} replace />;
  }
  return children;
};

export default AdminAuthRequired;
