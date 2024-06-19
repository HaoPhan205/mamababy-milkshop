/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, redirectTo }) => {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default React.memo(PublicRoute);
