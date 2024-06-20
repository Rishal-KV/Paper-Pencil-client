import { useFormik } from "formik";
import { toast } from "sonner";
import NavBar from "../../Components/StudentComponent/NavBar";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import validationSchema from "../../Validations/Student/loginValidation";
import studentAPi from "../../API/studentAPI";
import { useNavigate } from "react-router-dom";
import { studentLogin } from "../../Redux/slice/student";
import { Link } from "react-router-dom";

function Login() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      try {
        const googleResponse = await studentAPi.googleAuth(userInfo);

        if (googleResponse.data.status) {
          localStorage.setItem("studentToken", googleResponse.data.token);
          console.log(googleResponse.data.studentData);

          toast.success(googleResponse.data.message);
          dispatch(
            studentLogin({
              student: googleResponse.data.studentData,
            })
          );
          localStorage.setItem("studentToken", googleResponse.data.token);
          navigate("/");
        }
      } catch (error: any) {
        console.log(error);

        if (!error.response.data.status) {
          toast.error(error.response.data.message);
        }
      }
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: validationSchema,
      onSubmit: submit,
    });

  async function submit(loginData: any) {
    try {
      let loginResponse = await studentAPi.login(loginData);

      if (loginResponse.data.verifiedStudent.status) {
        toast.success(loginResponse.data.verifiedStudent.message);
        dispatch(
          studentLogin({
            student: loginResponse.data.verifiedStudent.student,
          })
        );
        localStorage.setItem(
          "studentToken",
          loginResponse.data.verifiedStudent.token
        );
        navigate("/");
      }
    } catch (error: any) {
      if (!error.response.data.status) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div>
      <NavBar />
      <div
        className="h-screen flex justify-center items-center  bg-columbia"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="flex justify-evenly items-center bg-white w- p-11 rounded-xl shadow-xl ">
          <div>
            <div className="text-center mb-2 font-bold">
              <h1 className="font-lexend text-lg font text-black">Login</h1>
              <p className="font-medium text-black">
                We are glad to see you back with us.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block font-bold text-sm text-gray-900 dark:text-black"
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
                  className={`input-style ${
                    errors.email && touched.email
                      ? "border-2 border-solid border-red-700"
                      : ""
                  } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                  placeholder="Email"
                />
                {errors.email && touched.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="mt-3">
                <label
                  htmlFor="password"
                  className="block font-bold text-sm text-gray-900 dark:text-black"
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
                  className={`input-style text-sm rounded-lg block w-full p-2.5 ${
                    errors.password && touched.password
                      ? "border-2 border-solid border-red-700"
                      : ""
                  }`}
                  placeholder="Password"
                />
                {errors.password && touched.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="mt-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Login
              </button>

              <span className="text-sm">
                <p className="text-center text-black">
                  New to here?{" "}
                  <Link to="/signup" className="underline text-blue-700">
                    Sign Up
                  </Link>
                </p>
                <p className="text-center ">
                  <Link
                    className="underline text-blue-600"
                    to="/forgotpassword"
                  >
                    forgot password ?
                  </Link>
                </p>
              </span>
            </form>

            <div  className="flex items-center border-2 cursor-pointer  justify-center mt-3 w-full h-10 text-black font-bold rounded-lg text-sm  me-2 mb-2 focus:outline-none ">
              <img
                className="w-6"
                src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
                alt="Google Logo"
              />
              <h1
                onClick={() => {
                  googleLogin();
                }}
                className="text-black ml-2"
              >
                Login with Google
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
