import React from "react";

import { Navigate } from "react-router-dom";
function isLoggedIn({ children }: { children: React.ReactNode }) {
  let cookie = localStorage.getItem("instructorToken");
  if (cookie) {
    return <>{children}</>;
  } else {
    return <Navigate to="/instructor/login" />;
  }
}

export default isLoggedIn;
