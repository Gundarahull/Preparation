import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Login from "./Login";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token") || "something";
  return <>{token ? <Outlet /> : <Navigate to="/login" replace />}</>;
};

export default ProtectedRoute;
