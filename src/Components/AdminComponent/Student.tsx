import Table from "../Common/Table";
import adminAPI from "../../API/adminAPI";
import { useEffect, useState } from "react";
function Student() {
  const [Action, setAction] = useState(false);
  async function studentAction(id: string) {
    try {
      await adminAPI.studentAction(id);
      setAction(!Action);
    } catch (error) {
      console.log(error);
    }
  }
  const [student, setStudent] = useState([]);
  useEffect(() => {
    async function fetchStudent() {
      try {
        let studentResponse = await adminAPI.students();
        console.log(studentResponse);

        if (studentResponse) {
          console.log(studentResponse.data);

          setStudent(studentResponse.data);
        }
      } catch (error) {}
    }
    // console.log(stud);

    fetchStudent();
  }, [Action]);
  return (
    <div>
      <div className="h-screen ">
        <div className="p-4 sm:ml-64 ">
          <div className="p-4  dark:border-gray-700">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <Table action={studentAction} data={student} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
