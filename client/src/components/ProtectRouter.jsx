import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectRouter = ({ children, canAccess, redirect = "/login" }) => {
  if (!canAccess) return <Navigate to={redirect} replace />;
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectRouter;
