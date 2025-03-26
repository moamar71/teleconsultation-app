import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || (requiredRole && role !== requiredRole)) {
    toast.error("Veuillez vous connecter en tant qu'admin");
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;