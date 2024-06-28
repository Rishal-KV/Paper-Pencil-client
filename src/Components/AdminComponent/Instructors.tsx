import Table from "../Common/Table";
import adminAPI from "../../API/adminAPI";
import { useEffect, useState } from "react";
function Instructors() {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
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
        let instructorsResponse = await adminAPI.instructors(page as number);

        if (instructorsResponse) {
          console.log(instructorsResponse, "ress");

          setInstructors(instructorsResponse.data.instructor);
          setTotalPage(instructorsResponse.data.totalPage);
        }
      } catch (error) {}
    }
    // console.log(stud);

    fetchStudent();
  }, [Action,page]);
  return (
    <div>
      <div className="h-screen ">
        <div className="p-4 sm:ml-64 ">
          <div className="p-4  dark:border-gray-700">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <Table action={instructorAction} data={instructors} />
              <div className="flex justify-center p-5">
                <p
                  onClick={() => setPage(page - 1)}
                  className={`mx-1 px-3 py-2 bg-gray-200 ${page == 1  ? 'hidden' : ''} text-gray-500 font-medium rounded-md cursor-pointer`}
                >
                  Previous
                </p>

                {Array.from({ length: totalPage }, (_, index) => (
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
      </div>
    </div>
  );
}

export default Instructors;
