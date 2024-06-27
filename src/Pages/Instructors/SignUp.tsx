import { useFormik } from "formik";
import signUpSchema from "../../Validations/Student/signUp";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import instructorAPI from "../../API/instructor";
import Otp from "../../Components/Common/Otp";
import { useState } from "react";

function Signup() {
  const [status, setStatus] = useState<boolean>();
  async function submit(data: any) {
    try {
      let signUpResponse = await instructorAPI.signUp(data);
      setStatus(signUpResponse.data.status);
      localStorage.setItem("instructorOtpToken", signUpResponse.data.Token);
    } catch (error: any) {
      console.log(error.response, "errroooror");

      if (error.response.data.not_verified) {
        setStatus(error.response.data.not_verified);
        localStorage.setItem("instructorOtpToken", error.response.data.Token);
      } else if (!error.response.data.status) {
        toast.error(error.response.data.message);
      }
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: signUpSchema,
      onSubmit: submit,
    });



  return (
    <>
      {!status ? (
        <div className="h-screen flex justify-center items-center px-5 lg:px-0 bg-white">
          <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
            <div className="flex-1  text-center hidden md:flex">
              <div
                className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat rounded-3xl"
                style={{
                  backgroundImage: `url(../images/bg-2.jpg)`,
                }}
              ></div>
            </div>
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
              <div className=" flex flex-col items-center">
                <div className="text-center">
                  <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-500">
                    Instructor Sign up
                  </h1>
                  <p className="text-[12px] text-gray-500">
                    Hey enter your details to create your account
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="w-full flex-1 mt-8">
                  <div className="mx-auto max-w-xs flex flex-col gap-4">
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="name"
                      value={values.name}
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-400 text-sm">{errors.name}</p>
                    )}
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      id="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-400 text-sm">{errors.email}</p>
                    )}
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      placeholder="password"
                      name="password"
                      id="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-400 text-sm">{errors.password}</p>
                    )}
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="confirm password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirmPassword}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="text-red-400 text-sm">
                        {errors.confirmPassword}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Sign Up</span>
                    </button>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      Already have an account?{" "}
                      <Link to="/instructor/login">
                        <span className="text-blue-400 font-semibold">
                          Sign in
                        </span>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Otp forgot={false} who="instructor" />
      )}
      
    </>
  );
}

export default Signup;
``;
