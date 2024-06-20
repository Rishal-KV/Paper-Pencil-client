import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
function isLoggout({ children }: { children: ReactNode }) {
  let cookie = localStorage.getItem("studentToken");
  if (cookie) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
  
}

export default isLoggout