import { useFormik } from "formik";
import changePasswordSchema from "../../Validations/Instructor/changePasswordSchema";

import { useSelector } from "react-redux";
import { InstructorType } from "../../Interface/interfaces";
import { toast } from "sonner";
import instructorAPI from "../../API/instructor";

const ChangePassword: React.FC = () => {
  const instructor = useSelector((state: InstructorType) => state.instructor);
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: ({ currentPassword, newPassword }) => {
      instructorAPI
        .changePassword(
          instructor.instructor.email as string,
          currentPassword,
          newPassword
        )
        .then((res) => {
          console.log(res, "ress");

          if (res.status) {
            formik.resetForm();
            toast.success(res.message);
          } else {
            formik.resetForm();
            toast.error(res.message);
          }
        });
    },
  });

  return (
    <div className="col-span-4 sm:col-span-9">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex  py-10">
          <form className="max-w-2xl" onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap px-10">
              <h2 className="text-xl font-Poppins text-gray-600 dark:text-gray-300 ">
                Change Password:
              </h2>

              <div className="flex flex-col gap-2 w-full border-gray-400">
                <div>
                  <label className="text-gray-600 dark:text-gray-400">
                    old password
                  </label>
                  <input
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                    type="password"
                    name="currentPassword"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.currentPassword &&
                  formik.errors.currentPassword ? (
                    <div className="text-red-500">
                      {formik.errors.currentPassword}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="text-gray-600 dark:text-gray-400">
                    New Password
                  </label>
                  <input
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                    type="password"
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className="text-red-500">
                      {formik.errors.newPassword}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="text-gray-600 dark:text-gray-400">
                    confirm password
                  </label>
                  <input
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                    type="password"
                    name="confirmNewPassword"
                    value={formik.values.confirmNewPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.newPassword &&
                  formik.errors.confirmNewPassword ? (
                    <div className="text-red-500">
                      {formik.errors.confirmNewPassword}
                    </div>
                  ) : null}
                </div>

                <div className="flex justify-end">
                  <button
                    className="py-1.5 px-3 m-1 font-Poppins text-center bg-base-100 border rounded-md text-white  hover:bg-base-100 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                    type="submit"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
