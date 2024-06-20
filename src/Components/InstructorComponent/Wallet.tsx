import { useSelector } from "react-redux";
import instructorAPI from "../../API/instructor";
import { Instructor } from "../../Interface/interfaces";
import { useEffect, useState } from "react";
interface InstructorInfo {
  instructor: {
    instructor: Instructor;
  };
}

function Wallet() {
  const [profit, setProfit] = useState();

  const instructor = useSelector((state: InstructorInfo) => state.instructor);

  useEffect(() => {
    instructorAPI
      .fetchProfit(instructor.instructor._id as string)
      .then((res) => {
        setProfit(res.totalIncome);
      });
  }, []);

  return (
    <div className="w-full h-42  p-3 bg-gradient-to-r from-sky-400 to-indigo-600 rounded-lg">
      <h1 className="text-3xl font-semibold text-white pb-4">Wallet</h1>

      <span className="text-lg font-semibold  text-white shadow-2xl">
        {instructor.instructor.name}
      </span>

      <div className="flex justify-between items-center pt-4">
        <div className="flex flex-col">
          <span className="text-md text-white font-bold">
            Profit : {profit && Math.round(profit)}{" "}
          </span>
        </div>

        <img
          src="https://img.icons8.com/offices/80/000000/sim-card-chip.png"
          width="48"
        />
      </div>
    </div>
  );
}

export default Wallet;
