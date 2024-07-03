import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import adminAPI from "../../API/adminAPI";
import ApexChart from "./Chart";

const Dashboard: React.FC = () => {
  const [courses, setCourses] = useState<number>();
  const [instructor, setInstructor] = useState<number>();
  const [student, setStudent] = useState<number>();
  console.log(instructor,"insns")
  useEffect(() => {
    async function fetch() {
      try {
        const [courseResponse, instructorResponse, studentResponse] =
          await Promise.all([
            adminAPI.fetchCourse(),
            adminAPI.instructors(),
            adminAPI.students(),
          ]);
console.log(instructorResponse,"course")
        setCourses(courseResponse.data.course.length);
        setInstructor(instructorResponse.data.instructor.length);
        setStudent(studentResponse.data.student.length)
      
        
      } catch (error) {}
    }
    fetch();
  }, []);
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl font-bold text-black">
              <FontAwesomeIcon icon={faPerson} />
              No. of Students : {student}
            </p>
          </div>
          <div className="flex  items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-black font-bold">
              <FontAwesomeIcon icon={faChalkboardTeacher} />
              No. of Insturctors : {instructor}
            </p>
          </div>
          <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-black font-bold">
              <FontAwesomeIcon icon={faBook} />
              No. of Courses : {courses}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center  mb-4 rounded bg-gray-50 dark:bg-gray-800">
         <ApexChart/>
        </div>
        
       
      
      </div>
    </div>
  );
};

export default Dashboard;
