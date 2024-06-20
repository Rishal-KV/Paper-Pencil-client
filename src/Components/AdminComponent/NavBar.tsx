

import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar() {
    let navigate = useNavigate()
    function logoutAdmin(){
         localStorage.removeItem('adminToken')
         navigate("/admin/login")


    }
  let admin = useSelector((state:any)=>state.admin)
  console.log(admin);
  
    
    return (
      <div className="navbar bg-white">
      <div className="flex-1">

      </div>
      <div className="flex-none gap-2">
        
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-30 rounded-full ">
              <img alt="Tailwind CSS Navbar component" src="https://avatar.iran.liara.run/public/boy" />
            </div>
          </div>
          <ul  tabIndex={0} className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-white rounded-box w-52 ">
           
           
            <li onClick={logoutAdmin} className="cursor-pointer text-black font-Poppins" >Logout</li>
          </ul>
        </div>
      </div>
    </div>
    );
}

export default Navbar;
