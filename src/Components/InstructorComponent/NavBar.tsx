
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { instructorLogout } from '../../Redux/slice/instructor';
import { InstructorType } from '../../Interface/interfaces';

function Navbar() {
  const instructor = useSelector((state:InstructorType) => state.instructor);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(instructorLogout());
    navigate('/instructor/login');
    localStorage.removeItem('instructorToken');
  };

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50">
  <div className="flex-1">
    <img onClick={()=>navigate('/instructor')} className="btn btn-ghost text-xl" src="/../images/PaperPencil.png" />
  </div>
  <div className="flex-none">
    <div className="menu menu-horizontal p-0 md:block hidden">
      <Link to="/instructor/" className="btn btn-ghost text-white">Dashboard</Link>
      <Link to="/instructor/courses" className="btn btn-ghost text-white">Courses</Link>
      <Link to="/instructor/chats" className="btn btn-ghost text-white">Chats</Link>
      <Link to="/instructor/questions" className="btn btn-ghost text-white">Questions</Link>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle md:hidden">
        <div className="indicator">
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </div>
      </div>
      <div tabIndex={0} className="mt-3 z-50 card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <Link to="/instructor/" className="btn  btn-ghost  text-white font-Poppins">Dashboard</Link>
          <Link to="/instructor/courses" className="btn btn-ghost text-white font-Poppins">Courses</Link>
          <Link to="/instructor/chats" className="btn btn-ghost text-white font-Poppins">Chats</Link>
          <Link to="/instructor/questions" className="btn btn-ghost text-white font-Poppins">Questions</Link>
          <Link to="/instructor/profile" className="btn btn-ghost text-white font-Poppins">Profile</Link>
         
          <Link onClick={()=>localStorage.removeItem('instructorToken')} to="/instructor/login"className="btn btn-ghost text-white font-Poppins">logout</Link>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end md:block hidden">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="User avatar" src={instructor.instructor.imageUrl ? instructor.instructor.imageUrl : `https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1718777702~exp=1718781302~hmac=84104a32957c743ad77b802cd300b5e2aac6c355000b71fb704dd9d54ac143ce&w=740`} />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link to="/instructor/profile" className="justify-between">
            Profile
            
          </Link>
        </li>
        {/* <li><Link to="/instructor/editprofile">profile Settings</Link></li> */}
        <li><a onClick={logout}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

  );
}

export default Navbar;
