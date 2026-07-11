import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = ({children}) => {
const { user, authChecked } = useSelector((state) => state.auth);

if (!authChecked) {
    return <h1>Loading...</h1>;
}

if (user) {
  return <Navigate to="/inbox" replace />;
}


  return  <> {children}</>
};

export default AuthRoute;