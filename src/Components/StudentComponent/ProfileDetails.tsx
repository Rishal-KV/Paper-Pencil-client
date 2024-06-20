import { useEffect, useState } from "react";
import { Student, studentType } from "../../Interface/interfaces";
import { useSelector } from "react-redux";
import studentAPi from "../../API/studentAPI";
function ProfileDetails() {
  const [student, setStudent] = useState<Student>();
  const studentDetails = useSelector((state: studentType) => state.student);
  useEffect(() => {
    studentAPi
      .get_studentProfile(studentDetails.student._id as string)
      .then((res) => {
        setStudent(res?.data.student);
      });
  }, []);
  return (
    <div className="p-4 sm:ml-64 bg-white min-h-screen">
      <div className="p-4 rounded-lg dark:border-gray-700">
        <div className="flex items-center justify-center mb-4 rounded shadow-md dark:bg-gray-800">
          <div className="w-full p-6">
            <h1 className="text-black text-2xl sm:text-3xl  font-Poppins mb-2 dark:text-white">
              Profile
            </h1>
            <form>
              <div className="w-full rounded-md py-6 bg-[url('https://marketplace.canva.com/EAFm9cdFi94/1/0/1600w/canva-bright-cartoon-green-and-brown-school-books-pattern-desktop-wallpaper-yBscg6QYXac.jpg')] bg-cover bg-center bg-no-repeat items-center">
                <div
                  className="mx-auto flex justify-center w-36 h-36 bg-blue-300/20 rounded-full 
                
                      bg-cover bg-center bg-no-repeat"
                  
                  style={{
                    backgroundImage: `url(${student?.profileImage ? student.profileImage : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"})`
                  }}
                ></div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-center w-full">
                <div className="w-full mb-4 mt-6">
                  <label
                    htmlFor="name"
                    className="mb-2 dark:text-gray-300 font-Poppins text-lg text-black"
                  >
                    {" "}
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={student?.name}
                    className="mt-2 p-4 w-full   bg-gray-50 border border-gray-200 rounded-md shadow-sm text-black"
                    placeholder="name"
                    disabled
                  />
                </div>
                <div className="w-full mb-4 mt-6">
                  <label
                    htmlFor="number"
                    className="dark:text-gray-300 text-black font-Poppins text-lg"
                  >
                    Number
                  </label>
                  <input
                    type="number"
                    id="number"
                    className="mt-2 p-4 w-full  bg-gray-50 border border-gray-200 rounded-md shadow-sm text-black"
                  
                    value={student?.number}
                    disabled
                  />
                </div>
              </div>
              <div className="w-full mb-4 mt-6">
                <label
                  htmlFor="About"
                  className="block mb-2  font-medium text-gray-900 text-lg font-Poppins dark:text-white"
                >
                  About
                </label>
                <textarea
                disabled
                  id="about"
                  rows={6}
                  className="block p-2.5 w-full text-sm   bg-gray-50  border-gray-200 rounded-md shadow-sm border text-black"
                  placeholder="Write about you here"
                  value={student?.about}
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
