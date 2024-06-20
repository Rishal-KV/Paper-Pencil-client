import React from "react";
import { Navigate } from "react-router-dom";
function isLoggedIn({ children }: { children: React.ReactNode }) {
  let cookie = localStorage.getItem("adminToken");
  if (cookie) {
    return <>{children}</>;
  } else {
    return <Navigate to="/admin/login" />;
  }
}

export default isLoggedIn;
