import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "./Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/crm/login" />;
};

export default ProtectedRoute;

