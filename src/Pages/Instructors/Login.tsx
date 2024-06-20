import { useNavigate } from "react-router-dom";
import loginSchema from "../../Validations/Instructor/login";
import { useFormik } from "formik";
import instructorAPI from "../../API/instructor";
import { toast } from "sonner";
import { instructorLogin } from "../../Redux/slice/instructor";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
function Login() {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res);

      try {
        const googleResponse = await instructorAPI.googleAuth(userInfo.data);
        

        if (googleResponse.data.status) {
          console.log(googleResponse);

          dispatch(
            instructorLogin({
              instructor: googleResponse.data.instructor,
            })
          );
          localStorage.setItem("instructorToken", googleResponse.data.token);
          navigate("/instructor");
          toast.success(googleResponse.data.message);
        }
      } catch (error: any) {
        if (!error.response.data.status) {
          console.log(error);

          toast.error(error.response.data.message);
        }
      }
    },
  });
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let submitForm = async (data: any) => {
    try {
      let loginData = await instructorAPI.login(data);
      console.log(loginData, "hehe");

      if (loginData.data.verifiedInstructor.status) {
        console.log(loginData.data, "datata");

        dispatch(
          instructorLogin({
            instructor: loginData.data.verifiedInstructor.instructor,
          })
        );
        console.log(loginData.data.verifiedInstructor.token, "hmmm");

        localStorage.setItem(
          "instructorToken",
          loginData.data.verifiedInstructor.token
        );
        navigate("/instructor");
      }
    } catch (error: any) {
      console.log(error);
      
      console.log("errr");
      
      if (!error.response.data.status) {
        toast.error(error.response.data.message);
      }
    }
  };

  let { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: submitForm,
    });

  return (
    <div className="flex h-screen justify-center items-center bg-gray-200    ">
      <div className=" bg-white flex  ">
        <div className="mx-auto md:block hidden">
          {/* <img

           className="w-5/6"
            src="../images/test.avif"
            alt=""
          /> */}
          <img src="../images/bg-2.jpg" alt="side image" />
        </div>
        <div className="mx-auto flex-cols justify-center px-10">
          <div className="py-4">
            <h1 className="text-2xl font-bold text-center text-black">
              Log in
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 ">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                className="shadow border-blue-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                value={values.email}
                type="text"
                placeholder="email"
              />
              {touched.email && errors.email ? (
                <p className="text-red-500">{errors.email}</p>
              ) : (
                ""
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                className="shadow appearance-none border-1 border-blue-500 rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="********"
              />
              {touched.password && errors.password ? (
                <p className="text-red-500">{errors.password}</p>
              ) : (
                ""
              )}
            </div>
            <p className=" text-sm text-gray-600">
              New to here? please{" "}
              <a
                href="/instructor/signup"
                className="text-blue-600 font-semibold"
              >
                signup
              </a>
              .
            </p>
            <button
              type="submit"
              className="mt-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Login
            </button>
            <div
              onClick={() => {
                googleLogin();
              }}
              className="flex items-center border-2  justify-center mt-3 w-full h-10 text-black font-bold rounded-lg text-sm  me-2 mb-2 focus:outline-none "
            >
              <img
                className="w-6"
                src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
                alt="Google Logo"
              />
              <h1 className="text-black ml-2">Login with Google</h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
