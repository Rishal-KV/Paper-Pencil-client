import instructorAPI from "../../API/instructor";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import _ from "lodash";
import { Course } from "../../Interface/interfaces";
import AddCourse from "./AddCourse";
import { initFlowbite } from "flowbite";
function CourseList() {
  const [load, setLoad] = useState(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
 
  
  async function list_unlist(id: string) {
    try {
      let response = await instructorAPI.list(id);
      if (response?.data.status) {
        setLoad(!load);
        // toast.success(response.data.message);
      } else {
        setLoad(!load);
      }
      // toast.success(response?.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  let navigate = useNavigate();
  async function publish(id: string) {
    try {
      let response = await instructorAPI.publish(id);
      if (response.data.status) {
        setLoad(!load);
        toast.success(response.data.message);
      }
    } catch (error: any) {
      console.log(!error.response.data.status);
      toast.error(error.response.data.message);
    }
  }

  const [courses, setCourses] = useState([]);
  function shortenDescription(description: string, length: number) {
    return _.truncate(description, {
      length: length,
      separator: " ", // Ensure it doesn't cut words in half
      omission: "...",
    });
  }
  useEffect(() => {
    initFlowbite()
    instructorAPI.getCourse(page).then((res) => {
      setCourses(res.data.course);
      setTotalPage(res.data.totalPage);
      setPage(res.data.page)
    });
  }, [load,page]);

  return (
    <div className="min-h-screen bg-white ">
      <div className="p-4  ">
        <div className="flex justify-between">
        <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-Poppins font-bold border-teal-400  text-gray-800">
          Courses
        </h1>
        <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" type="button" className="max-w-[140px] py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
    <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z">
        </path>
    </svg>
    Upload
</button>
        </div>
     
        <div className="p-4  dark:border-gray-700">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3  text-left  font-lg text-black uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-lg text-black uppercase tracking-wider">
                      description
                    </th>

                    <th className="px-6 py-3 text-left text-lg font-lg text-black uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-lg text-black uppercase tracking-wider">
                      Enrollments
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-lg text-black uppercase tracking-wider">
                      Action
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map((course: Course) => (
                    <tr key={course._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {course.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {shortenDescription(course.description as string, 30)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 ${
                            course.listed ? "text-green-800" : "text-red-800"
                          } `}
                        >
                          {(course.listed as boolean) ? "active" : "not active"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                       <button  onClick={()=>navigate(`/instructor/enrollments/${course._id}`)} className="btn text-white">View</button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button onClick={()=>publish(course._id as string)} className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                          <span>
                            <img
                              width="20"
                              height="20"
                              src={
                                course.publish
                                  ? "https://img.icons8.com/arcade/64/approval.png"
                                  : "https://img.icons8.com/tiny-color/16/upload.png"
                              }
                              alt="upload"
                            />
                          </span>
                          <span className="hidden md:inline-block">
                            {course.publish ? "published" : "Publish"}
                          </span>
                        </button>
                        <button
                          onClick={() => list_unlist(course._id as string)}
                          className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border-y border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center"
                        >
                          <span>
                            <img
                              width="20"
                              height="20"
                              src={
                                !course.listed
                                  ? "https://img.icons8.com/ios/50/FA5252/unpin-2.png"
                                  : "https://img.icons8.com/ios/50/40C057/pin-2.png"
                              }
                              alt="unpin-2"
                            />
                          </span>
                          <span className="hidden md:inline-block">
                            {course.listed ? "Unlist" : "List"}
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            navigate(`/instructor/addchapter/${course._id}`);
                          }}
                          className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                        >
                          <span>
                            <img
                              width="20"
                              height="20"
                              src="https://img.icons8.com/pulsar-gradient/48/view-file.png"
                              alt="view-file"
                            />
                          </span>
                          <span className="hidden md:inline-block">View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <nav className="bg-gray-200 rounded-full px-4 py-2">
              <ul className="flex text-gray-600 gap-4 font-medium py-2">
                {Array.from({ length: totalPage }, (_, index) => (
                  <li>
                    <p onClick={()=>setPage(index+1)}className={`rounded-full px-4 py-2 ${page === index  + 1 ? " bg-white" : ""} text-gray-600 cursor-pointer`}>
                      {index + 1}
                    </p>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <AddCourse load={load} setLoad={setLoad}/>
 
    </div>
  );
}

export default CourseList;
