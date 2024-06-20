import React from "react";
import { Navigate } from "react-router-dom";
function isLoggedOut({ children }: { children: React.ReactNode }) {
  let cookies = localStorage.getItem("instructorToken");
  

  if (cookies) {
    return <Navigate to="/instructor/" />;
  } else {
    return <>{children}</>;
  }
}

export default isLoggedOut;
