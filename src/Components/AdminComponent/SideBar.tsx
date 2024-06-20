import SideBarLinks from "../Common/SideBarLinks";
import {
  faUserGraduate,
  faChalkboardTeacher,
  faChartLine,
  faList,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

function SideBar({}) {
  const sideBarProps = [
    {
      icon: faChartLine,
      text: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      icon: faUserGraduate,
      text: "Students",
      link: "/admin/students",
    },
    {
      icon: faChalkboardTeacher,
      text: "Instructors",
      link: "/admin/instructors",
    },
    { icon: faList, text: "Category", link: "/admin/category" },
    { icon: faBook, text: "Course", link: "/admin/courses" },
   
  ];

  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 border-1 bg-gray-950    z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto side-style ">
          <div className="flex items-center ">
            <img src="../images/PaperPencil.png" alt="" />
          </div>
          <ul className="space-y-2 font-medium  mt-5">
            {sideBarProps.map((props, index) => (
              <SideBarLinks user="admin" key={index} links={props} />
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default SideBar;
