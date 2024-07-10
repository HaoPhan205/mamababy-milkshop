import React from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!Cookies.get("token"); // Check if token exists

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? <Element /> : <Navigate to="/sign-in" replace />
      }
    />
  );
};

export default ProtectedRoute;
