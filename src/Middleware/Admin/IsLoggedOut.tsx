
import React from "react"
import { Navigate } from "react-router-dom"
function isLoggedOut({children}:{children : React.ReactNode}) {
 let cookies = localStorage.getItem('adminToken')
  if (cookies) {
    return <Navigate to='/admin/'/>
  }else{
    return <>{children}</>
  }
}

export default isLoggedOut