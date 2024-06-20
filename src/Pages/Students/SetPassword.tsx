import NavBar from "../../Components/StudentComponent/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import validationSchema from "../../Validations/Student/setPassword";
import studentAPi from "../../API/studentAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function SetPassword() {
  let navigate = useNavigate();
  async function submit(data: any) {
    try {
      let response = await studentAPi.setPassword(data);
      console.log(response,"rreihiehr");
      
      if (response.data.status) {
        toast.success(response.data.message);
        localStorage.removeItem("forgPassToken");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      validationSchema: validationSchema,
      onSubmit: submit,
    }
  );
  return (
    <>
      <NavBar />
      <div className="h-screen bg-white  flex  justify-center items-center ">
        <div className="w-2/6 h-2/4 bg-white shadow-xl flex flex-col justify-center items-center">
          <FontAwesomeIcon className="text-2xl " icon={faLock} />
          <h1 className="font-bold">Create new password</h1>

          <div className="mt-7">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="new password"
                  type="password"
                  id="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                />
                {errors.password && touched.password ? (
                  <p className="text-sm text-red-500">{errors.password}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-3">
                <input
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="confirm password"
                  type="password"
                  id="confirmpassword"
                  name="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <button
                type="submit"
                className="mt-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SetPassword;
