import { useEffect, useState } from "react";
import adminAPI from "../../API/adminAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function CourseTable() {
    const [totalPage, setTotalPage] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
  let navigate = useNavigate();
  let [load, setLoad] = useState(false);
  async function action(id: string) {
    try {
      let response = await adminAPI.courseAction(id);
      if (response.data.status) {
        setLoad(!load);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const [course, setCourse] = useState([]);
  useEffect(() => {
    async function fetch_course() {
      try {
        let response = await adminAPI.fetchCourse(page as number);
        console.log(response,"okk");

        setCourse(response.data.course);
        setTotalPage(response.data.totalPage)
        
      } catch (error) {
        console.log(error);
      }
    }
    fetch_course();
  }, [load,page]);
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs bg-white text-gray-900 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              coursename name
            </th>
            <th scope="col" className="px-6 py-3">
              instructor
            </th>
            <th scope="col" className="px-6 py-3">
              price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {course.map((course: any) => (
            <tr className="bg-white dark:bg-gray-800">
              <th
                onClick={() => navigate(`/admin/coursedetails/${course._id}`)}
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {course.name}
              </th>
              <td className="px-6 py-4">{course?.instructor?.name}</td>
              {/* <td className="px-6 py-4">
                 {course.category.name}
                    </td> */}
              <td className="px-6 py-4">{course.price}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    action(course._id);
                  }}
                  className={`border-2 px-2 py-2 rounded-lg font-bold ${
                    course.approved
                      ? "border-green-400 bg-green-400 text-white"
                      : "border-yellow-200 bg-white"
                  }`}
                >
                  {course.approved ? "Approved" : "Approve"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center p-4">
            {/* <nav className="bg-gray-200 rounded-full px-4 py-2">
              <ul className="flex text-gray-600 gap-4 font-medium py-2">
                {Array.from({ length: totalPage }, (_, index) => (
                  <li>
                    <p onClick={()=>setPage(index+1)}className={`rounded-full px-4 py-2 ${page === index  + 1 ? " bg-white" : ""} text-gray-600 cursor-pointer`}>
                      {index + 1}
                    </p>
                  </li>
                ))}
              </ul>
            </nav> */}
            <div className="mt-8">
            <div className="flex justify-center p-5">
                
                <p
                  onClick={() => setPage(page - 1)}
                  className={`mx-1 px-3 py-2 bg-gray-200 ${page == 1  ? 'hidden' : ''} text-gray-500 font-medium rounded-md cursor-pointer`}
                >
                  Previous
                </p>

                {  Array.from({ length: totalPage }, (_, index) => (
                  <p
                    onClick={() => setPage(index + 1)}
                    className={`mx-1 px-3  ${
                      index + 1 == page ? "bg-white text-black" : "bg-gray-200"
                    } py-2   font-medium  rounded-md cursor-pointer`}
                  >
                    {index + 1}
                  </p>
                ))}

                <p
                  className={`mx-1 px-3 py-2   ${totalPage == page ? "hidden" : ""} bg-gray-200 text-gray-500 font-medium rounded-md cursor-pointer`}
                  onClick={() => setPage(page + 1)}
                >
                 Next
                </p>
              </div>
</div>
          </div>
    </div>
  );
}

export default CourseTable;
