import  { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { studentLogout } from "../../Redux/slice/student";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import Action from "../Common/Action";
import NavLinks from "../Common/NavLinks";
import SearchBar from "./Search";

interface Search {
  setSearch?: (value: string) => void;
  courses?: string;
}

function NavBar({ setSearch, courses }: Search) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const student = useSelector((state: any) => state.student);
  const navigate = useNavigate();

  function logOut() {
    dispatch(studentLogout());
    localStorage.removeItem("studentToken");
    navigate("/login");
  }

  return (
    <div className="hover:cursor-pointer justify-between px-6 flex md:justify-between h-15 items-center shadow-md sticky top-0 z-50 bg-white">
      <div>
        <img
          onClick={() => navigate("/")}
          className="h-16"
          src="../images/ppBlue.png"
          alt="paper-pencil-logo"
        />
      </div>
      <div className="md:flex sm:block hidden">
        <NavLinks path="/enrolledcourses" link="My courses" />
        <NavLinks path="/chats" link="Chats" />
        <NavLinks path="/courses" link="Courses" />
      </div>
      {courses ? (
        <div className="lg:block hidden w-96">
          {<SearchBar setSearch={setSearch} />}
        </div>
      ) : null}
      <div className="flex items-center justify-end">
        <div className="mr-10">
          {/* <FaHeart
            onClick={() => navigate("/wishlist")}
            color="blue"
            size={30}
          /> */}
          {/* <img onClick={()=>navigate('/wishlist')} width="35" height="35" src="https://img.icons8.com/material-outlined/24/like--v1.png" alt="like--v1"/> */}
          <FaRegHeart onClick={()=>navigate('/wishlist')} size={30} color="black" />
        </div>
        <div className="lg:flex sm:block hidden">
          <Action student={student} onLogout={logOut} />
        </div>
      </div>
      <div className="md:hidden">
        <div onClick={() => setDropdownOpen(!dropdownOpen)}>
        <svg  className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>

        </div>
      </div>
      {dropdownOpen && (
        <div className="absolute top-16 right-0 mt-2 w-full bg-white shadow-lg rounded-lg z-50">
          <ul className="w-full font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/enrolledcourses"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                My courses
              </Link>
            </li>
            <li>
              <Link
                to="/chats"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Chats
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Courses
              </Link>
            </li>
            {student.student ? (
              <li>
                <Link
                  to="/profile"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Profile
                </Link>
              </li>
            ) : (
              ""
            )}

            <li>
              {student.student ? (
                <Link
                  to="/login"
                  onClick={logOut}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavBar;
