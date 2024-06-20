import instructorAPI from "../../API/instructor";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Instructor, InstructorType } from "../../Interface/interfaces";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import editSchema from "../../Validations/Instructor/edit";
import { toast } from "sonner";
function Profile() {
  const [instructorData, setInstructor] = useState<Instructor>();
  const instructor = useSelector((state: InstructorType) => state.instructor);
  const navigate = useNavigate();
  const { errors, values, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        name: instructorData?.name || "",
        about: instructorData?.about || "",
        phone: instructorData?.phone || "",
      },
      validationSchema: editSchema,
      onSubmit: (instructorData: Instructor) => {
        instructorAPI
          .updateProfile(instructor.instructor._id as string, instructorData)
          .then((res) => {
            if (res.data.status) {
              setInstructor(res.data.update);
              navigate("/instructor/profile");
              toast.success(res.data.message);
            }
          });
      },
      enableReinitialize: true,
    });
  useEffect(() => {
    if (!instructor?.instructor?.email) return;
    const fetchProfile = async () => {
      try {
        const res = await instructorAPI.fetchProfile(
          instructor.instructor.email
        );
        if (res.data) {
          setInstructor(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [instructor?.instructor?.email]);

  return (
    <div className="p-4 sm:ml-64 bg-white min-h-screen">
      <div className="p-4 rounded-lg dark:border-gray-700">
        <div className="flex items-center justify-center mb-4 rounded-lg bg-gray-5 shadow-md dark:bg-gray-800"></div>
        <div className="bg-white shadow-lg p-5">
          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Profile
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          type="text"
                          name="name"
                          id="name"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.name && touched.name && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          type="text"
                          name="phone"
                          id="phone"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.phone && touched.phone && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      About
                    </label>
                    <div className="mt-2">
                      <textarea
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.about}
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                      {errors.about && touched.about && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.about}
                        </p>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Write a few sentences about yourself.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={() => navigate(-1)}
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Back
              </button>
              <button
                type="submit"
                className="rounded-md bg-base-100 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-base-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
