import React, { useEffect, useRef, useState } from "react";
import adminAPI from "../../API/adminAPI";
import { useFormik } from "formik";
import { initFlowbite } from "flowbite";
import { toast } from "sonner";
interface EditCategory {
  categoryId: string;
  name: string;
  refresh : boolean;
  setRefresh : (value:boolean) => void;
}
const EditCategory: React.FC<EditCategory> = ({ categoryId, name ,refresh,setRefresh}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  async function update(name: any) {
    try {
     
      const response = await adminAPI.editCategory(name,categoryId);
      if (response.data.status) {
        setRefresh(!refresh)
        if (buttonRef?.current) {
         
          buttonRef.current.click();
        }
        toast.success(response.data.message)
      }
    } catch (error:any) {
      console.log(error);
      
      if (!error.response.data.status) {
        
        
        toast.error(error.response.data.message)
      }
    }
  }
 
  const { values, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "" || name,
      },

      onSubmit: update,
    });
  const [category, setCategory] = useState();
  const fetch = async (categoryId: string) => {
    try {
      const response = await adminAPI.getSpecific(categoryId);
      if (response.data.category) {
        setCategory(response.data.category.name);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    initFlowbite();
    fetch(categoryId);
    if (category) {
      setFieldValue("name", category);
    }
  }, []);

  return (
    <div
      id={`category${categoryId}`}
      tabIndex={-1}
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Category
            </h3>
            <button
              ref={buttonRef}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide={`category${categoryId}`}
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

          <div className="p-4 md:p-5 space-y-4">
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="Category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    id="name"
                    value={values.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
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
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
