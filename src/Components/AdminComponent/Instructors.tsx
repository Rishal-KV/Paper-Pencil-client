import Table from "../Common/Table";
import adminAPI from "../../API/adminAPI";
import { useEffect, useState } from "react";
function Instructors() {
  const [Action, setAction] = useState(false);
  async function instructorAction(id: string) {
    try {
       await adminAPI.instructorAction(id);
      setAction(!Action);
    } catch (error) {
      console.log(error);
    }
  }
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    async function fetchStudent() {
      try {
        let instructorsResponse = await adminAPI.instructors();
        console.log(instructorsResponse,"ejkrekrkerjej");
        
     

        if (instructorsResponse) {
        

          setInstructors(instructorsResponse.data);
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
              <Table action={instructorAction} data={instructors} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instructors;
