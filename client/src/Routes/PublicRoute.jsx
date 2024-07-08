import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children, redirectTo }) => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default React.memo(PublicRoute);
