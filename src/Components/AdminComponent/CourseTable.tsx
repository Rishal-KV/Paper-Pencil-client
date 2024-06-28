import { useEffect, useState } from "react";
import adminAPI from "../../API/adminAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function CourseTable() {
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
        let response = await adminAPI.fetchCourse();
        console.log(response);

        setCourse(response.data.course);
      } catch (error) {
        console.log(error);
      }
    }
    fetch_course();
  }, [load]);
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
    </div>
  );
}

export default CourseTable;
