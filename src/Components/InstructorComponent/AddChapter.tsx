import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import chapterSchema from "../../Validations/Instructor/chapter";
import instructorAPI from "../../API/instructor";
import { useRef } from "react";
import { toast } from "sonner";
import { chapter } from "../../Interface/interfaces";
interface AddChapterProps {
  setChapter?: React.Dispatch<React.SetStateAction<chapter[]>>;
}
const AddChapter: React.FC<AddChapterProps> = ({ setChapter }) => {
  const closeRef: any = useRef(null);

  let { id } = useParams();
  async function add(chapter: chapter) {
    let response = await instructorAPI.addChapter(chapter, id);

    if (response.data.chapterSaved) {
      if (setChapter) {
        setChapter((prevChapters: chapter[]) => [
          ...prevChapters,
          response.data.chapterSaved,
        ]);
      }

      closeRef?.current.click();
      toast.success(response.data.message);
    }
  }

  let { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        order: 0,
        description: "",
      },
      validationSchema: chapterSchema,
      onSubmit: add,
    });

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add Chapter
            </h3>
            <button
              ref={closeRef}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
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
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type chapter name"
                />
              </div>
              {errors.title && touched.title ? (
                <p className="text-red-500">{errors.title}</p>
              ) : (
                ""
              )}
            </div>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <input
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="description"
                  id="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type description"
                />
              </div>
              {errors.description && touched.description ? (
                <p className="text-red-500">{errors.description}</p>
              ) : (
                ""
              )}
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
                  value={values.order}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  name="order"
                  id="order"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type chapter order"
                />
              </div>
              {errors.order && touched.order ? (
                <p className="text-red-500">{errors.order}</p>
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-base-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              Add new Chapter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChapter;
