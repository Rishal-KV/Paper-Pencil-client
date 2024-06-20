import { useSelector } from "react-redux";
import Card from "../Common/Cards";
import { Student } from "../../Interface/interfaces";
import studentAPi from "../../API/studentAPI";
import { useEffect, useState } from "react";
import { Course } from "../../Interface/interfaces";

interface studentType {
  student: {
    student: Student;
  };
}
interface courseProps {
  _id: string;
  studentId: string;
  course: {
    course: Course;
  };
}
const EnrolledCourse: React.FC = () => {
  const [course, setCourse] = useState<courseProps[]>();
  const student = useSelector((state: studentType) => state.student);

  const fetchCourse = async (studentId: string | undefined) => {
    console.log(course);

    try {
      const response = await studentAPi.enrolledCourse(studentId);
      console.log(response);

      if (response.data.status) {
        setCourse(response.data.courses);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(course);

  useEffect(() => {
    fetchCourse(student.student._id);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <div className="grid   md:grid-cols-3 gap-4 justify-items-center py-10">
        {course && course?.length > 0 ? (
          course?.map((course) => (
            <Card
              favourites={false}
              learning={true}
              mycourse={true}
              course={course.course}
            />
          ))
        ) : (
          <h1 className=" font-bold">No course Purchased</h1>
        )}
      </div>
    </div>
  );
};
export default EnrolledCourse;
