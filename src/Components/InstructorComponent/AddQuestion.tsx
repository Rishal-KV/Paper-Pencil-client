import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import validationSchema from "../../Validations/Instructor/question";
import { initFlowbite } from "flowbite";
import instructorAPI from "../../API/instructor";
import { Question } from "../../Interface/interfaces";

interface Props {
  courseId: string;
  setQuestion: (value: any) => void;
}

const AddQuestion: React.FC<Props> = ({ courseId, setQuestion }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    initFlowbite();
  }, []);

  const formik = useFormik({
    initialValues: {
      question: "",
      options: ["", "", "", ""],
      correctOption: "",
      courseId: courseId,
    },
    validationSchema: validationSchema,
    onSubmit: (values: Question) => {
      instructorAPI.addQuestion(values).then((res) => {
        if (res.status) {
          setQuestion((prev: any) => [...prev, res.questions]);
          closeRef.current?.click();
          formik.resetForm();
        }
      });
    },
  });

  const { errors, values, handleChange, handleSubmit, handleBlur, touched, setFieldValue } =
    formik;

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...values.options];
    newOptions[index] = value;
    setFieldValue("options", newOptions);
  };

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
              Add Question
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

          <form method="post" onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="col-span-2">
              <label
                htmlFor="question"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Question
              </label>
              <textarea
                id="question"
                name="question"
                rows={3}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="What is JavaScript?"
                value={values.question}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.question && (
                <div className="text-red-600 text-sm">{errors.question}</div>
              )}
            </div>

            <div className="grid gap-4 mb-4 grid-cols-2">
              {values.options.map((opt: string, index: number) => (
                <div key={index} className={`col-span-2 sm:col-span-1  ${opt}`}>
                  <label
                    htmlFor={`options-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Option-{index + 1}
                  </label>
                  <input
                    type="text"
                    name={`options[${index}]`}
                    id={`options-${index}`}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder=""
                    value={values.options[index]}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errors.options && errors.options[index] && (
                    <div className="text-red-600 text-sm">
                      {errors.options[index]}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="col-span-2">
              <label
                htmlFor="correctOption"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Correct Option
              </label>
              <input
                type="text"
                name="correctOption"
                id="correctOption"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={values.correctOption}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.correctOption && touched.correctOption && (
                <div className="text-red-600 text-sm">
                  {errors.correctOption}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="mt-3 text-white inline-flex items-center   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-700  dark:bg-base-100"
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
                />
              </svg>
              Add Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
