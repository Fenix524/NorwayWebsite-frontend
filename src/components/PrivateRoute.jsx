import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoute = ({
  component: Component,
  redirectTo = "/",
  userRoleProtect = undefined,
}) => {
  const { isLoggedIn, userRole } = useAuth();

  console.log(userRoleProtect, userRole);
  if (!isLoggedIn) return <Navigate to={redirectTo} />;
  console.log(1);
  if (userRoleProtect && userRoleProtect !== userRole)
    return <Navigate to={redirectTo} />;
  console.log(2);

  return <Component />;
};
