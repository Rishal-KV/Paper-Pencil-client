import { useNavigate, useParams } from "react-router-dom";
import studentAPi from "../../API/studentAPI";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Student {
  student: {
    _id: string;
  };
}

function succesfull() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const student: Student = useSelector((state: any) => state.student);
  const studentId: string = student.student._id;
  const [instructor, setInstructor] = useState<string>();

  const enroll = async () => {
    try {
      await studentAPi.enroll(id, studentId);
    } catch (error) {
      console.log(error);
    }
  };

  const getInstructor = async () => {
    try {
      const res = await studentAPi.getInstructor(id);
      setInstructor(res.instructorId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInstructor();
  }, []);

  useEffect(() => {
    if (instructor) {
      createChat();
    }
  }, [instructor]);

  const createChat = async () => {
    try {
      await studentAPi.createChat(studentId, instructor);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    enroll();
  }, []);

  return (
    <div className="h-screen bg-white flex justify-center items-center">
      <div className=" w-3/4 h-2/3 sm:h-2/3  sm:w-1/2 shadow-lg items-center flex flex-col  justify-center">
        <div className="w-52">
          <img src="../images/success_4192798.png" alt="checked" />
        </div>
        <div className="mb-4">
          <h1 className="text-gray-800 font-extrabold text-2xl">
            enrolled successfully
          </h1>
        </div>

        <button
          onClick={() => navigate("/enrolledcourses")}
          className="btn bg-blue-600 border-0 hover:bg-blue-600 text-white "
        >
          Start Learning
        </button>
      </div>
    </div>
  );
}

export default succesfull;
