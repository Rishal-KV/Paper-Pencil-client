import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { BsPersonFillGear } from "react-icons/bs";

import { RiLockPasswordFill } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";

function ProfileSideBar() {
  useEffect(() => {
    initFlowbite();
  });
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm  rounded-lg sm:hidden  "
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className="fixed  top-0 left-0 z-40 w-64  transition-transform -translate-x-full sm:translate-x-0 "
        aria-label="Sidebar "
      >
        <div className=" px-3 py-4  h-screen overflow-y-auto bg-white shadow-lg  ">
          <ul className="space-y-2 font-medium mt-16">
            <li>
              <p
                onClick={() => navigate("/profile")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BsFillPersonFill fontSize={20} />
                <span className="ms-3 font-Poppins text-sm">Profile</span>
              </p>
            </li>
            <li>
              <p
                onClick={() => navigate("/editprofile")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BsPersonFillGear fontSize={20} />
                <span className="flex-1 ms-3  text-sm whitespace-nowrap font-Poppins">
                  Edit Profile
                </span>
              </p>
            </li>
            {/* <li>
              <p
                onClick={() => navigate("/certificates")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <PiCertificateFill fontSize={20} />
                <span className="flex-1 ms-3  text-sm whitespace-nowrap font-Poppins">
                  Certificates
                </span>
              </p>
            </li> */}
            <li>
              <p
                onClick={() => navigate("/changepassword")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <RiLockPasswordFill fontSize={20} />
                <span className="flex-1 ms-3 text-sm whitespace-nowrap font-Poppins">
                  change password
                </span>
              </p>
            </li>
            <li>
              <p
                onClick={() => navigate("/purchasehistory")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaHistory fontSize={20} />
                <span className="flex-1 ms-3 whitespace-nowrap  text-sm font-Poppins">
                  purachase history
                </span>
              </p>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default ProfileSideBar;
