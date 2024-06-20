import courseValidationSchema from "../../Validations/Instructor/courseAddValidation";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import instructorAPI from "../../API/instructor";
import { FileInputButton, ExtFile, FileCard } from "@files-ui/react";

import { PulseLoader } from "react-spinners";

import {  useFormik } from "formik";


function AddCourse({setLoad,load}:{setLoad : (value:boolean)=> void;load:boolean}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  
  const reset = () => {
    resetForm()
  }

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  async function submitForm(formdata: any) {
    try {
      setLoading(true);
      let response = await instructorAPI.addCourse(formdata);
      if (response.data.status) {
        setLoading(false);
       setLoad(!load)
        closeRef && closeRef.current && closeRef.current.click()
        toast.success(response.data.message);
  
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    async function fetchCategory() {
      try {
        let response = await instructorAPI.getCategory();
        console.log(response,"ress");
        
        setCategory(response.category);
      } catch (error) {
        console.log(error);
      }
    }
console.log(category);

    fetchCategory();
  }, []);

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm
  } = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      image: null,
      category: "",
    },
    validationSchema: courseValidationSchema,
    onSubmit: submitForm,
  });
  console.log(values);
  
  const [value, setValue] = React.useState<ExtFile | undefined>(undefined);

  const updateFiles = (incommingFiles: ExtFile[]) => {
    setValue(incommingFiles[0]);
    setFieldValue("image", incommingFiles[0]);
  };
  const removeFile = () => {
    setValue(undefined);
  };
  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative  bg-base-100 rounded-lg shadow dark:bg-white-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-white-600">
            <h3 className="text-lg font-semibold  text-white dark:text-white">
              Create New Course
            </h3>
            <button 
            onClick={()=>reset()}
              type="button"
              className="text-white bg-transparent hover:bg-white hover:text-white-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:text-black"
              data-modal-toggle="crud-modal"
              ref={closeRef}
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
          {/* Modal body */}
          <form onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-bold text-white dark:text-white"
                >
                  Name
                </label>
                <input
                  onBlur={handleBlur}
                  value={values.name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-50 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type course name"
                  required
                />
                {errors.name && touched.name ? (
                  <p className="text-orange-400">{errors.name}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-bold text-white dark:text-white"
                >
                  Price
                </label>
                <input
                  onBlur={handleBlur}
                  value={values.price}
                  onChange={handleChange}
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-white-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-50 dark:border-white-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="₹2999"
                  required
                />
                {errors.price && touched.price ? (
                  <p className="text-orange-400">{errors.price}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-bold text-white dark:text-white"
                >
                  Category
                </label>
                <select
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id="category"
                  name="category"
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-blue-50 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value={values.category} selected>
                    Select category
                  </option>
                  {category.map((cat: any) => (
                    <option value={cat._id}>{cat.name}</option>
                  ))}
                </select>
                {errors.category && touched.category ? (
                  <p className="text-orange-400">{errors.category}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-bold  text-white dark:text-white"
                >
                  Course Description
                </label>
                <textarea
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  id="description"
                  name="description"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-50 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write course description here"
                ></textarea>
                {errors.description && touched.description ? (
                  <p className="text-orange-400">{errors.description}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex items-center my-8   ">
              {value ? (
                <FileCard
                  className="shadow-lg bg-white"
                  {...value}
                  onDelete={removeFile}
                  preview
                />
              ) : (
                <FileInputButton
                  style={{ background: "transparent", border: "1px" }}
                  value={value ? [value] : []}
                  onChange={updateFiles}
                  id="image"
                  name="image"
                  onBlur={handleBlur}
                />
              )}
              {/* <FileCard {...sampleFileProps} info/> */}
              {errors.image && touched.image ? (
                <p className="text-orange-400 ml-3">{errors.image}</p>
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              className={`text-white inline-flex ${loading ? 'btn-disabled' : ''} items-center focus:ring-1 focus:outline-none focus:ring-blue-400 font-bold rounded-lg text-sm px-5 py-2.5 text-center border `}
            >
              {loading ? (
                <PulseLoader size={10} loading color="#ffffff" />
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
                  Add new course
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
