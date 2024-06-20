import { initFlowbite } from "flowbite";
import { useEffect, useState } from "react";
import instructorAPI from "../../API/instructor";

import ApexChart from "./Chart";
import { useSelector } from "react-redux";
import { InstructorType } from "../../Interface/interfaces";

function Dashboard() {
  const [profit, setProfit] = useState();
  const [courseCount, setCourseCount] = useState();
  const instructor = useSelector((state: InstructorType) => state.instructor);
  useEffect(() => {
    initFlowbite();
    async function fetch() {
      try {
        let response = await instructorAPI.dashboard();
        console.log(response, "ressss");

        setCourseCount(response.data.course.length);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
    instructorAPI
      .fetchProfit(instructor.instructor._id as string)
      .then((res) => {
        setProfit(res.totalIncome);
      });
  }, []);
  return (
    <div className=" bg-white">
      <div className="p-4  ">
        <div className="p-4  dark:border-gray-700">
          {/* <div className="  flex flex-col items-center justify-center  md:flex-row md:items-center md:justify-evenly h-48 mb-4 rounded-md bg-blue-500">
            <p className="text-lg text-white font-bold  ">
              Jump Into Course Creation
            </p>
            <AddCourse />

            <button
              data-modal-target="crud-modal"
              data-modal-toggle="crud-modal"
              className="font-bold  text-white border px-4 py-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="button"
            >
              Create Course
            </button>
          </div> */}

          <div className="bg-gray-200 rounded shadow-md ">
            <div className="grid gap-4 lg:gap-8 md:grid-cols-2 p-8 pt-20">
              <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-green-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4m4-4l4-4 4 4"
                    />
                  </svg>
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Total Earnings</h3>
                  <p className="text-3xl">{profit}</p>
                </div>
              </div>
              <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 12h7.5M12 18h7.5M4.5 6H20M4.5 6V3.5A1.5 1.5 0 016 2h12a1.5 1.5 0 011.5 1.5V6M4.5 6L3 20h18L19.5 6H4.5z"
                    />
                  </svg>
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Total no. of courses</h3>
                  <p className="text-3xl">{courseCount}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center  mb-4 rounded bg-gray-50 dark:bg-gray-800 mt-4">
            <ApexChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
