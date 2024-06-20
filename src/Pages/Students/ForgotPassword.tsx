import NavBar from "../../Components/StudentComponent/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import validationSchema from "../../Validations/Student/forgotpassword";
import studentAPi from "../../API/studentAPI";
import Otp from "../../Components/Common/Otp";
import { useState } from "react";

function ForgotPassword() {
  const [status, setStatus] = useState<boolean>()


  async function submit(data: any) {
    try {
      let response = await studentAPi.forgotPassword(data);
      if (response.data.status) {
      setStatus(response.data.status)
        localStorage.setItem('forgPassToken',response.data.token);
      }
   
    } catch (error) {
      throw error
    }
  }
  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: {
        email: "",
      },
      validationSchema: validationSchema,
      onSubmit: submit,
    }
  );
  return (
    <>
      <NavBar />
      {
        !status ?   <div className="h-screen  flex  justify-center items-center bg-white ">
        <div className="w-2/6 h-2/4 bg-white shadow-xl flex flex-col justify-center items-center">
          <FontAwesomeIcon className="text-2xl " icon={faLock} />
          <h1 className="font-bold text-black">Trouble logging in?</h1>
          <p className="font-normal text-black">
            Enter your email to get back your account
          </p>
          <div className="mt-7">
            <form onSubmit={handleSubmit}>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="email"
                type="text"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              />
              {errors.email && touched.email ? (
                <p className="text-red-500">{errors.email}</p>
              ) : (
                ""
              )}
              <button
                type="submit"
                className="mt-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div> : <Otp who="student" forgot={true} />
      }
    
    </>
  );
}

export default ForgotPassword;
