import { useNavigate } from "react-router-dom"
function Logout({user,action,userType}:any) {
 
  const navigate = useNavigate()
  
  return (
    <div className="dropdown dropdown-end ">
  <div tabIndex={0} role="button" className="btn btn-primary hover:bg-white  bg-white text-black m-1 ">{userType === "instructor"?user.instructor.name:user?.admin}</div>
  <ul tabIndex={0} className="dropdown-content  z-[1] menu p-2 shadow bg-white rounded-box w-52">
   {
  userType === "instructor" ? (
    <>
      <li className="text-black" onClick={() =>navigate('/instructor/profile') }><a>Profile</a></li>
      <li className="text-black" onClick={() => action()}><a>Log out</a></li>
    </>
  ) : (
    <li onClick={() => action()}><a>Log out</a></li>
  )
}

    
   
  </ul>
</div>
  )
}

export default Logout