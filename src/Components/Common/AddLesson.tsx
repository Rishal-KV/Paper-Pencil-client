import { FileInputButton, FileCard } from "@files-ui/react";
import { useEffect, useRef, useState } from "react";
import instructorAPI from "../../API/instructor";
import { useFormik } from "formik";
import validationSchema from "../../Validations/Instructor/lesson";
import { PulseLoader } from "react-spinners";
import { initFlowbite } from "flowbite";
import { toast } from "sonner";
function AddLesson({ chapterId, lessonLoad, setLessonLoad }: any) {
  let ref: any = useRef(null);
  const [loading, setLoading] = useState(false);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      lesson: null,
    },
    validationSchema: validationSchema,
    onSubmit: add,
  });

  const [value, setValue] = useState<any>(undefined);
  async function add(form: any) {
    try {
      setLoading(true);
      let response = await instructorAPI.addLesson(form, chapterId);
      if (response.data.status) {
        setLessonLoad(!lessonLoad);
        setLoading(false);
        ref.current.click();
        toast.success(response.data.message)
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const updateFiles = (incommingFiles: any) => {
    console.log("incomming extFiles", incommingFiles);
    setValue(incommingFiles[0]);
    setFieldValue("lesson", incommingFiles[0].file);
  };
  useEffect(() => {
    initFlowbite();
  }, []);

  const removeFile = () => {
    setValue(undefined);
  };
  return (
    <div
      id="add-lesson"
      tabIndex={-1}
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add Lesson
            </h3>
            <button
              ref={ref}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="add-lesson"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-bold text-black dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="title"
                  id="title"
                  value={values.title}
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-50 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type title"
                  required
                />
                {errors.title && touched.title ? (
                  <p className="text-red-500">{errors.title}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-span-2">
                {value ? (
                  <FileCard {...value} onDelete={removeFile} info />
                ) : (
                  <FileInputButton
                    onBlur={handleBlur}
                    id="lesson"
                    name="lesson"
                    value={value ? [value] : []}
                    onChange={updateFiles}
                  />
                )}
                {/* <FileCard {...sampleFileProps} info /> */}
                {errors.lesson && touched.lesson ? (
                  <p className="text-red-500">{errors.lesson}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-base-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? (
                <PulseLoader size={10} color="#ffffff" loading={loading} />
              ) : (
                <>
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add new Lesson
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLesson;
