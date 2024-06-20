import { useEffect, useState } from "react";
import instructorAPI from "../../API/instructor";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Course, Question } from "../../Interface/interfaces";
const QuestionList: React.FC = () => {
  const [question, setQuestion] = useState<Question[]>([]);
  const navigate = useNavigate();
  const [totalPage, setTotalPage] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  useEffect(() => {
    instructorAPI.getCourse(page).then((res) => {
      setQuestion(res.data.course);
      setTotalPage(res.data.totalPage);
      setPage(res.data.page)
    });
  }, [page]);
  console.log(question,"heheh");
  

  return (
    <div className="h-screen bg-white ">
      <div className="p-4  ">
      <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-Poppins font-bold border-teal-400  text-gray-800">
    Questions
</h1>
        <div className="p-4  dark:border-gray-700">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      CourseName
                    </th>
                    <th scope="col" className="px-6 py-3">
                      No of Questions
                    </th>
                    <th scope="col" className="px-6 py-3">
                      View Questions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {question && question.map((course: Course) => (
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                      >
                        {course.name}
                      </th>

                      <td className="px-6 py-4">{course.questions && course.questions.length}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            navigate(
                              `/instructor/questionmanagement/${course._id}`
                            )
                          }
                          className="btn btn-sm  bg-base-100"
                        >
                          <FontAwesomeIcon className="text-white" icon={faEye} />
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
    </div>
  );
};

export default QuestionList;
