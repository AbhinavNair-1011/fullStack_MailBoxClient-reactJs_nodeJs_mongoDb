import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = ({children}) => {
  return (
    <div className="min-h-screen ">

        <Outlet />
    </div>
  );
};

export default AuthLayout;