import { useDispatch } from "react-redux";
import { studentLogout } from "../../Redux/slice/student";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Action({ student }: any) {
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logOut() {
    localStorage.removeItem('studentToken');
    dispatch(studentLogout());
    navigate("/login");
  
  }
 
  return (

    <div>
      {
        student && student.student ?     <div className="dropdown dropdown-end md:block hidden">

         
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        {
            student.student.profileImage ? 
            <div className="w-10 rounded-full">
            <img alt="User avatar" src={student.student.profileImage} />
          </div> : 
      <span className="inline-flex items-center justify-center size-[46px] text-lg font-semibold leading-none rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
      {student.student.name.substring(0,1)}
    </span>
          }
        
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <Link to="/profile" className="justify-between">
              Profile
             
            </Link>
          </li>
      
          <li><a onClick={logOut} >Logout</a></li>
        </ul>
      </div> : <div className="flex items-center justify-end gap-3">
        <Link to="/login">  <p className="hidden  font-Poppins items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-blue-500 shadow-sm ring-1 ring-inset ring-blue-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                    >Login</p></Link>
               
              
            </div>
      }
    </div>

  );
}

export default Action;
