import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const { user, authChecked } = useSelector((state) => state.auth);

  if (!authChecked) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return  <> {children}</>
};

export default ProtectedRoute;
