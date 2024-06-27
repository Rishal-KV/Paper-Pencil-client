import { useFormik } from "formik";
import editSchema from "../../Validations/Student/edits";
import  { useEffect, useState } from "react";
import { Student, studentType } from "../../Interface/interfaces";
import studentAPi from "../../API/studentAPI";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { studentLogin } from "../../Redux/slice/student";
function EditProfile() {
  const studentDetails = useSelector((state: studentType) => state.student);
  const [student, setStudent] = useState<Student>();
  const dispatch = useDispatch()
  useEffect(() => {
    studentAPi
      .get_studentProfile(studentDetails.student._id as string)
      .then((res) => {
        setStudent(res?.data.student);
      });
  }, [studentDetails.student._id]);

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: student?.name || "",
      about: student?.about || "",
      number: student?.number || "",
    },
    validationSchema: editSchema,
    onSubmit: (studentData: Student) => {
      studentAPi
        .update_profile(studentData, student?._id as string)
        .then((res) => {
          if (res.data.status) {
            
            dispatch(studentLogin({
              student : res.data.updated
            }))
            toast.success(res.data.message);
          }
        });
    },
    enableReinitialize: true,
  });

  return (
    <div className="col-span-4 sm:col-span-9">
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
            <div className="w-full mb-4 mt-6">
              <label
                htmlFor="name"
                className="mb-2 text-black font-Poppins text-lg"
              >
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
              <label
                htmlFor="number"
                className="text-black font-Poppins text-lg"
              >
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
  );
}

export default EditProfile;
