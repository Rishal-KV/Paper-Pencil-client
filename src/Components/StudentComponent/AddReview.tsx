import { useFormik } from "formik";
import ReactStars from "react-stars";
import reviewValidation from "../../Validations/Student/review";
import { Review, Student } from "../../Interface/interfaces";
import { initFlowbite } from "flowbite";
import { useEffect, useRef } from "react";
import studentAPi from "../../API/studentAPI";
import { useSelector } from "react-redux";
interface StudentType{
  student : {
    student : Student
  }
}
const AddReview: React.FC<{
  courseId: string | undefined;
  load: boolean;
  setLoad: (value: boolean) => void;
}> = ({ courseId, load, setLoad }) => {
  const student = useSelector((state:StudentType) => state.student);
  const buttonRef = useRef<HTMLButtonElement>(null);
  let submit = async (reviewdata: Review) => {
    try {
      const response = await studentAPi.review(reviewdata, student.student._id as string);
      console.log(response);
      
      if (response.data.status) {
        console.log("reached");
        
        setLoad(!load);
        buttonRef.current?.click();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      review: "",
      rating: 0,
      courseId: courseId || null,
    },
    validationSchema: reviewValidation,
    onSubmit: submit,
  });

  useEffect(() => {
    initFlowbite();
    setFieldValue("courseId", courseId || null);
  }, [courseId]);

  const setRate = (newRaring: number) => {
    setFieldValue("rating", newRaring);
  };
  return (
    <div
      id={`rate${courseId}`}
      tabIndex={-1}
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add Review
                </h3>
            <button
              ref={buttonRef}
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide={`rate${courseId}`}
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5">
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="review"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Add Review
                  </label>
                  <textarea
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="review"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write product description here"
                  ></textarea>
                  <p className="text-red-400">
                    {errors.review && touched.review ? errors.review : ""}
                  </p>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="rate"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Rating
                  </label>
                  <ReactStars
                    onChange={setRate}
                    count={5}
                    size={24}
                    color2={"#ffd700"}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddReview;
