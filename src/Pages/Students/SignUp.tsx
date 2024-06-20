import { useFormik } from "formik";
import signUpSchema from "../../Validations/Student/signUp";
import { toast } from "sonner";
import NavBar from "../../Components/StudentComponent/NavBar";
import studentAPi from "../../API/studentAPI";
import Otp from "../../Components/Common/Otp";
import { useState } from "react";
interface LoginData {
  name: string;
  email: string;
  password: string;
}
function Signup() {
  const [state, setStatus] = useState<boolean>();
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

  async function submit(formData: LoginData) {
    try {
      // let signUpData = await studentAPi.signup(formData);
      studentAPi
        .signup(formData)
        .then((res) => {
          if (res.data.status) {
            localStorage.setItem("studentOtpToken", res.data.Token);
            setStatus(res.data.status);
          }
        })
        .catch((err) => {
          console.log(err.response);

          if (err.response.data.not_verified) {
            console.log("ook");
            
            setStatus(err.response.data.not_verified);
            localStorage.setItem("studentOtpToken", err.response.data.token);
          } else if (!err.response.data.status) {
            console.log(err, "Errrr");
            toast.error(err.response.data.message);
           
          }
        });
      // navigate("/otp");
    } catch (error: any) {
      if (error.response.status == 401) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <>
      {!state ? (
        <div>
          <NavBar />
          <div
            className="min-h-screen flex justify-center items-center bg-columbia "
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            }}
          >
            <div className="flex justify-evenly items-center p-11 rounded-2xl shadow-xl bg-white">
              <div>
                <div className="text-center mb-2 font-bold">
                  <h1 className="font-lexend text-2xl font text-black">Sign Up</h1>
                  <p className="font-lexend text-black">
                    We are glad to see you back with us.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-md text-sm text-gray-900 dark:text-black "
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      type="text"
                      className={`mb-1 input-style text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.name && touched.name
                          ? "border-solid border-red-500 border-2"
                          : ""
                      } `}
                      placeholder="name"
                      autoCapitalize="off"
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-500 text-xs">{errors.name}</p>
                    )}
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor="email"
                      className="block font-medium text-sm text-gray-900 dark:text-black"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      type="email"
                      className={`mb-1 input-style text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.email && touched.email
                          ? "border-solid border-red-500 border-2"
                          : ""
                      }`}
                      placeholder="email"
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor="password"
                      className="block font-medium text-sm text-gray-900 dark:text-black"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      type="password"
                      className={`mb-1 input-style text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.password && touched.password
                          ? "border-solid border-red-500 border-2"
                          : ""
                      }`}
                      placeholder="password"
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-500 text-xs">{errors.password}</p>
                    )}
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block font-medium text-sm text-gray-900 dark:text-black"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      type="password"
                      className={`mb-1 input-style text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "border-solid border-red-500 border-2"
                          : ""
                      }`}
                      placeholder="confirm Password"
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="text-red-500 text-xs">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="mt-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Otp who="student" forgot={false} />
      )}
    </>
  );
}

export default Signup;
