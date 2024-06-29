interface Chapter {
  title: string;
  order: string | number;
  id: string;
  chapterLoad?: boolean;
  setChapterLoad?: (value: boolean) => void;
  description: string;
}

import { useEffect } from "react";
import chapterSchema from "../../Validations/Instructor/chapter";
import { useFormik } from "formik";
import instructorAPI from "../../API/instructor";
import { toast } from "sonner";
import { useRef } from "react";
import { chapter } from "../../Interface/interfaces";
function EditChapter({
  title,
  order,
  id,
  description,

  chapterLoad,
  setChapterLoad,
}: Chapter) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    setFieldValue("title", title);
    setFieldValue("order", order);
    setFieldValue("id", id);
    setFieldValue("description", description);
  }, []);


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
      title: title || "",
      order: order || "",
      description: description || "",
      _id: id,
    },
    validationSchema: chapterSchema,
    onSubmit: (data: chapter) => {
      console.log(data,"hmmm");
      
      instructorAPI.updateChapter(data).then((res) => {
        if (res.data.status) {
          if (buttonRef) {
            buttonRef.current?.click();
          }
          if (setChapterLoad) {
            setChapterLoad(!chapterLoad);
          }
          toast.success(res.data.message);
        }
      });
    },
    enableReinitialize : true
    
  });
  console.log(errors,"erros");
  return (
    <div
      id={`edit-chapter${id}`}
      tabIndex={-1}
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit chapter
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle={`edit-chapter${id}`}
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
              <span ref={buttonRef} className="sr-only">
                Close modal
              </span>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  onBlur={handleBlur}
                  value={values.title}
                  onChange={handleChange}
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type chapter name"
                />
                {errors.title && touched.title ? (
                  <p className="text-red-500">{errors.title}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  onBlur={handleBlur}
                  value={values.description}
                  onChange={handleChange}
                  name="description"
                  id="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type chapter name"
                />
                {errors.description && touched.description ? (
                  <p className="text-red-500">{errors.description}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="order"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Order
                </label>
                <input
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.order}
                  type="number"
                  name="order"
                  id="order"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type chapter order"
                />
                {errors.order && touched.order ? (
                  <p className="text-red-500">{errors.order}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <button
              type="submit"
              className="text-white  inline-flex items-center dakr:bg-base-100 bg-gray-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
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
              Save & continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditChapter;
