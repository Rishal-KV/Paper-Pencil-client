
import { useFormik } from "formik";
import validationSchema from "../../Validations/Admin/login";
import { useNavigate } from "react-router-dom";
import adminAPI from "../../API/adminAPI";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../Redux/slice/admin";
import { toast } from "sonner";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: submitForm,
  });

  async function submitForm(data:any) {
    try {
      let loginResponse = await adminAPI.login(data);

      if (loginResponse.data.status) {
        console.log(loginResponse);

        dispatch(
          adminLogin({
            admin: loginResponse.data.admin,
          })
        );
        localStorage.setItem('adminToken', loginResponse.data.token);
        navigate("/admin/dashboard");
      }
    } catch (error:any) {
      if (!error.response.data.status) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div className="bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/008/176/789/non_2x/education-is-the-way-to-success-3d-render-illustration-free-photo.jpg')" }}>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl font-Poppins text-black mb-8 text-center">Admin Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email && touched.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className={`border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.password && touched.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
             
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="bg-base-100 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
