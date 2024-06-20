
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function isLoggedIn({ children }: { children: ReactNode }) {
  const studentToken = localStorage.getItem("studentToken");

  
  if (studentToken) {
    return <>{ children }</>;
  } else {
    return <Navigate to="/login" />;
  }
}

export default isLoggedIn;
