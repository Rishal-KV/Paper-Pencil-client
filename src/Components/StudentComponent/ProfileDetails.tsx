import { useEffect, useState } from "react";
import { Enrollment, Student, studentType } from "../../Interface/interfaces";
import { useDispatch, useSelector } from "react-redux";
import studentAPi from "../../API/studentAPI";
import EditProfile from "./EditProfile";
import { toast } from "sonner";
import { PulseLoader } from "react-spinners";
import PurchaseHistory from "./PurachaseHistory";
import { studentLogin } from "../../Redux/slice/student";
import ChangePassword from "./ChangePassword";
function ProfileDetails() {
  function formatDateOnly(dateString: Date) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
 
  
  const dispatch = useDispatch();
  const [student, setStudent] = useState<Student>();
  const studentDetails = useSelector((state: studentType) => state.student);
  const [enrolled, setEnrolled] = useState<Enrollment[]>([]);
  const [page, setPage] = useState("profile");
  const [file, setFile] = useState<File | null>(null);
  const [load, setLoad] = useState<boolean>();
  const [preview, setPreview] = useState<string | null>(null);
  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };
  
  function navigateTo(link: string) {
    switch (link) {
      case "profile":
        setPage(link);
        break;
      case "edit_profile":
        setPage(link);
        break;
      case "purchase_history":
        setPage(link);
        break;
      case "change_password":
        setPage(link)
        break;
      default:
        setPage("profile");
        break;
    }
  }
  const updateImage = () => {
    setLoad(true);
    studentAPi.updateImage(file as File).then((res) => {
      console.log(res, "resss");

      if (res.data.updated) {
        dispatch(
          studentLogin({
            student: res.data.updated,
          })
        );
        setPreview("");
        setLoad(false);
        toast.success(res.data.message);
      }
    });
  };
  useEffect(() => {
    studentAPi
      .get_studentProfile(studentDetails.student._id as string)
      .then((res) => {
        setStudent(res?.data.student);
      });

    studentAPi.enrolledCourse(studentDetails.student._id).then((res) => {
      setEnrolled(res.data.courses);
    });
  }, [load]);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <div
                  className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full     bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${
                      preview
                        ? preview
                        : student?.profileImage
                        ? student.profileImage
                        : `https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg`
                    })`,
                  }}
                >
                  <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                    <input
                      type="file"
                      name="profile"
                      onChange={selectImage}
                      id="upload_profile"
                      hidden
                    />
                    <label htmlFor="upload_profile">
                      <svg
                        className="w-6 h-5 text-blue-700"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
                {preview ? (
                  <>
                    <div className="flex justify-center mt-2">
                      <button
                        onClick={updateImage}
                        className={`btn ${load ? "btn-disabled" : ""}`}
                      >
                        {load ? <PulseLoader color="#36d7b7" /> : "Upload"}
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}

                <h1 className="text-xl font-medium font-Poppins text-gray-500">
                  {student?.name}
                </h1>
                <p className="text-gray-700">{student?.email}</p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => navigateTo("edit_profile")}
                    className="btn btn-ghost"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
              {/* <div className="w-full rounded-md py-6 bg-cover bg-center bg-no-repeat items-center">
             
              </div> */}
              <hr className="my-6 border-t border-gray-300" />
              <div className="flex flex-col">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                  Links
                </span>
                <ul>
                  <li
                    onClick={() => navigateTo("profile")}
                    className="mb-2 font-Poppins text-gray-500 underline"
                  >
                    Profile
                  </li>
                  {!studentDetails?.student?.googleAuth ? (
                    <li
                      onClick={() => navigateTo("change_password")}
                      className="mb-2 font-Poppins text-gray-500 underline"
                    >
                      Change Password
                    </li>
                  ) : (
                    ""
                  )}

                  <li
                    onClick={() => navigateTo("purchase_history")}
                    className="mb-2 font-Poppins text-gray-500 underline"
                  >
                    Purchase History
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {page === "profile" && (
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold  text-lg mb-2"
                      htmlFor="name"
                    >
                      Name:
                    </label>
                    <input
                      value={student?.name}
                      disabled
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2 text-lg"
                      htmlFor="phone"
                    >
                      Phone:
                    </label>
                    <input
                      value={student?.number}
                      disabled
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="number"
                      type="number"
                    />
                  </div>
                </div>
                <h2 className="text-lg font-bold text-gray-600 mb-4">
                  About Me
                </h2>
                <p className="text-gray-700">{student?.about}</p>

                <h2 className="text-xl font-bold text-gray-600 mt-6 mb-4">
                  Recently completed Courses
                </h2>
                {enrolled
                  .filter((course) => course.courseStatus === true)
                  .map((course) => (
                    <div key={course._id} className="mb-6 shadow-md p-10">
                      <div className="flex justify-between flex-wrap gap-2 w-full">
                        <span className="text-gray-700 font-bold">
                          {course.course.name}
                        </span>
                        <p>
                          <span className="text-gray-700">
                            {formatDateOnly(course.completedDate)}
                          </span>
                        </p>
                      </div>
                      <p className="mt-2">{course.course.description}</p>
                    </div>
                  ))}

                {enrolled.filter((course) => course.courseStatus === true)
                  .length === 0 && (
                  <p className="text-gray-500 text-center mt-4">
                    No completed courses.
                  </p>
                )}
              </div>
            </div>
          )}

          {page === "edit_profile" && <EditProfile />}
          {page === "purchase_history" && <PurchaseHistory />}
          {page === "change_password" && <ChangePassword/>}
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
