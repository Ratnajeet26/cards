import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function ProtectedRoute({ children }) {
  const { state } = useContext(GlobalContext);
  if (!state.user) return <Navigate to="/signup" replace />;
  return children;
}
