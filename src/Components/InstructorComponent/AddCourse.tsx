import courseValidationSchema from "../../Validations/Instructor/courseAddValidation";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import instructorAPI from "../../API/instructor";

import "cropperjs/dist/cropper.css";
import { PulseLoader } from "react-spinners";
import { useFormik } from "formik";
import CropperModal from "./CropperModal";

function AddCourse({
  setLoad,
  load,
}: {
  setLoad: (value: boolean) => void;
  load: boolean;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  const reset = () => {
    resetForm();
    setCroppedImage(undefined); // Clear cropped image on form reset
  };

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [value, setValue] = useState<File | undefined>(undefined);
  const [croppedImage, setCroppedImage] = useState<File | undefined>(undefined);

  const [modalStatus, setStatus] = useState<Boolean>(false);
  async function submitForm(formdata: any) {
    try {
      setLoading(true);
      let response = await instructorAPI.addCourse(formdata);
      if (response.data.status) {
        setLoading(false);
        setLoad(!load);
        closeRef && closeRef.current && closeRef.current.click();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  const clickRef = useRef<HTMLDivElement>();
  if (modalStatus) {
    if (clickRef.current) {
      clickRef.current.click();
    }
  }
  useEffect(() => {
    async function fetchCategory() {
      try {
        let response = await instructorAPI.getCategory();
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
    resetForm,
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

  //image selection

  const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setValue(e?.target.files[0]);
      console.log(e.target.files[0],"okiee");
      
      setStatus(true)
    }
  };
 const selectRef = useRef<HTMLInputElement>(null);
 const clickImage = () => {
  if (selectRef.current) {
      selectRef.current.click()
  }
 }
  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-base-100 rounded-lg shadow dark:bg-white-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-white-600">
            <h3 className="text-lg font-semibold text-white dark:text-white">
              Create New Course
            </h3>
            <button
              onClick={() => reset()}
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
                  Category +{" "}
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
            {/* {value && (
              <div>
                <Cropper
                  src={URL.createObjectURL(value.file as Blob)}
                  style={{ height: 400, width: "100%" }}
                  initialAspectRatio={16 / 9}
                  guides={false}
                  ref={cropperRef}
                />
                <button
                  type="button"
                  onClick={onCrop}
                  className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm px-5 py-2.5 mt-4"
                >
                  Crop Image
                </button>
              </div>
            )} */}
            <div className="flex items-center my-8">
              <div className="col-span-2">
                <figure className="max-w-lg">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-bold text-white dark:text-white"
                  >
                    Image
                  </label>

                  <img
                    width={150}
                    onClick={clickImage}
                    src={`${croppedImage ? URL.createObjectURL(croppedImage) : "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?t=st=1719424317~exp=1719424917~hmac=0edf3d7ae44236fa46bd38cbdd34e1ada2b7fbe35bd4ba0d89c2947bc658be57"}`}
                    className="h-auto max-w-full rounded-lg"
                    alt="image description"
                  />
                </figure>
                <input id="image" name="image"  onBlur={handleBlur} onChange={selectImage} ref={selectRef} type="file" hidden />
              </div>
              {errors.image && touched.image ? (
                <p className="text-orange-400 ml-3">{errors.image}</p>
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              className={`text-white inline-flex ${
                loading ? "btn-disabled" : ""
              } items-center focus:ring-1 focus:outline-none focus:ring-blue-400 font-bold rounded-lg text-sm px-5 py-2.5 text-center border `}
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
      <CropperModal
        setValue={setValue}
        setCroppedImage={setCroppedImage}
        modalStatus={modalStatus}
        setStatus={setStatus}
        value={value}
        setFieldValue={setFieldValue}
      />
    </div>
  );
}

export default AddCourse;
