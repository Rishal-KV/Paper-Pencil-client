import { useFormik } from "formik";
import editSchema from "../../Validations/Student/edits";
import React, { useEffect, useState } from "react";
import { Student, studentType } from "../../Interface/interfaces";
import studentAPi from "../../API/studentAPI";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { PulseLoader } from "react-spinners";
function EditProfile() {
  const studentDetails = useSelector((state: studentType) => state.student);
  const [student, setStudent] = useState<Student>();
  const [file,setFile] = useState<File|null>(null)
  const [load,setLoad] = useState<boolean>()
  const [preview, setPreview] = useState<string | null>(null);
  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile)
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };
 const updateImage = () => {
  setLoad(true)
    studentAPi.updateImage(file as File).then((res)=>{
        
        if (res.data.status) {
          setPreview("")
          setLoad(false)
          toast.success(res.data.message)
        }
    })
 }
  useEffect(() => {
    studentAPi
      .get_studentProfile(studentDetails.student._id as string)
      .then((res) => {
        setStudent(res?.data.student);
      });
  }, [studentDetails.student._id,load]);

  const { values,errors,handleChange,  handleSubmit } =
    useFormik({
      initialValues: {
        name: student?.name || "",
        about: student?.about || "",
        number : student?.number || ""
      },
      validationSchema: editSchema,
      onSubmit: (studentData: Student) => {
        studentAPi
          .update_profile(studentData, student?._id as string)
          .then((res) => {
            if (res.data.status) {
              toast.success(res.data.message);
            }
          });
      },
      enableReinitialize: true,
    });

  return (
    <div className="p-4 sm:ml-64 bg-white min-h-screen">
      <div className="p-4 rounded-lg dark:border-gray-700">
        <div className="flex items-center justify-center mb-4 rounded-lg bg-gray-5 shadow-md dark:bg-gray-800">
          <div className="w-full p-6">
            <h1 className="text-2xl font-Poppins sm:text-3xl   mb-2 text-black">
              Edit Profile
            </h1>
           
              <div  className="w-full  h-[200px] rounded-md py-6 bg-[url('https://marketplace.canva.com/EAFm9cdFi94/1/0/1600w/canva-bright-cartoon-green-and-brown-school-books-pattern-desktop-wallpaper-yBscg6QYXac.jpg')] bg-cover bg-center bg-no-repeat items-center">
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
               
              </div>
              {preview ? (
                <div className="flex justify-center mt-2">
                  <button  onClick={updateImage} className={`btn ${load ? 'btn-disabled' : ''}`}>{load ? <PulseLoader color="#36d7b7" /> : "Uplaod"}</button>
                </div>
              ) : (
                ""
              )}

              <h2 className="text-center mt-1 font-Poppins text-black">
                Update your profile Image
              </h2>
              <form onSubmit={handleSubmit}>
              <div className="flex flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full mb-4 mt-6">
                  <label htmlFor="name" className="mb-2 text-black font-Poppins text-lg">
                    Name
                  </label>
                  <input
                  onChange={handleChange}
                    
                    value={values.name}
                    type="text"
                    id="name"
                    className="mt-2 p-4 w-full   bg-gray-50 border border-gray-200  shadow-sm  rounded-lg text-black"
                  />
                     {errors.name && <p className="text-red-400">{errors.name}</p>}
                </div>
                    
             
                <div className="w-full mb-4 lg:mt-6">
                  <label htmlFor="number" className="text-black font-Poppins text-lg">
                    Phone
                  </label>
                  <input
                  onChange={handleChange}
                    type="number"
                    id="number"
                    value={values.number}
                    className="mt-2 p-4 w-full   bg-gray-50 border border-gray-200 rounded-md shadow-sm text-black"
                  />
                    {errors.number && <p className="text-red-400">{errors.number}</p>}     
                </div>
              
              </div>
              
             
      <div className="flex flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full">
                  <label
                    htmlFor="About"
                    className="block mb-2 font-Poppins  font-medium text-gray-900 text-lg"
                  >
                    About
                  </label>
                  <textarea
                    value={values.about}
                    onChange={handleChange}
                    id="about"
                    rows={6}
                    className="block p-2.5 w-full text-sm    bg-gray-50 border border-gray-200 rounded-md shadow-sm text-black"
                    placeholder="Write about you here"
                  ></textarea>
                </div>
              </div>
              <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                <button type="submit" className="w-full p-4">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
