import { useParams } from "react-router-dom";
import instructorAPI from "../../API/instructor";
import { useEffect, useState } from "react";
import { Enrollment } from "../../Interface/interfaces";
import { format } from "date-fns";
function Enrollments() {
  const { id }: any = useParams();

  const [enrollment, setEnrollments] = useState<Enrollment[]>();
  const fetchEnrollments = async () => {
    try {
      const response = await instructorAPI.enrollments(id);

      setEnrollments(response.enrollments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEnrollments();
  }, []);
  const formatDate = (timeStamp: any) => {
    const formattedDate = format(new Date(timeStamp), "dd/MM/yyyy");
    return <span>{formattedDate}</span>;
  };
  console.log(formatDate("2024-05-09T15:51:08.226+00:00"));

  return (
    <div className="min-h-screen bg-white   ">
      <div className="p-4  ">
      <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-Poppins font-bold border-teal-400  text-gray-800">
    Enrollments
</h1>
        <div className="p-4  dark:border-gray-700 bg-white">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50"
                    >
                      student Name
                    </th>
                    <th scope="col" className="px-6 py-3 bg-white">
                      enrollment Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {enrollment?.map((enroll: any) => (
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                      >
                        {enroll.studentId.name}
                      </th>

                      <td className="px-6 py-4">
                        {formatDate(enroll.enrolled)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enrollments;
