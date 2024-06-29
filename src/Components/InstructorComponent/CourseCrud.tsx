import Lesson from "./Lesson";
import Chapter from "../Common/Chapter";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AddLesson from "../Common/AddLesson";
import instructorAPI from "../../API/instructor";
import { initFlowbite } from "flowbite";
import AddChapter from "./AddChapter";
import { chapter } from "../../Interface/interfaces";
import { Course } from "../../Interface/interfaces";
import { category } from "../../Interface/interfaces";
import studentAPi from "../../API/studentAPI";
import editCourseValidationSchema from "../../Validations/Instructor/editCourseValidation";
import { useFormik } from "formik";
import { toast } from "sonner";
import { RefObject } from "react";
import CropperModal from "./CropperModal";
function AddChapters() {
  const [chapterId, setChapterId] = useState("");
  const [chapters, setChapter] = useState<chapter[]>([]);
  const [chapterLoad, setChapterLoad] = useState(false);
  const [lessonLoad, setLessonLoad] = useState(false);
  const [course, setCourse] = useState<any>();
  const [category, setCategory] = useState<category[]>();
  const [loadCourse, setLoadCourse] = useState<boolean>(false);
  const closeRef: RefObject<HTMLButtonElement> = useRef(null);
  const [select, setSelectedImage] = useState<File | undefined>();
  const [croppedImage, setCroppedImage] = useState<File | undefined | Blob>(
    undefined
  );
  const [modalStatus, setStatus] = useState<Boolean>(false);
  let { id } = useParams();
  useEffect(() => {
    initFlowbite();
    fetchCourse(id);
  }, [loadCourse]);
  const {
    errors,
    touched,
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
  } = useFormik({
    initialValues: {
      name: course?.name,
      price: course?.price,
      category: "" || course?.category,
      description: course?.description,
      questions: [],
    },
    validationSchema: editCourseValidationSchema,
    onSubmit: (courseData: Course) => {
      instructorAPI.updateCOurse(id, courseData).then((res) => {
        if (res?.data.status) {
          if (closeRef.current) {
            closeRef.current.click();
          }
          setLoadCourse(!loadCourse);
          toast.success(res?.data.message);
        }
      });
    },
  });

  function onCLoseModal() {
    setCroppedImage(undefined);
  }
  useEffect(() => {
    get_Chapter(id);
  }, [chapterLoad, lessonLoad]);

  useEffect(() => {
    fetchCategory();

    setFieldValue("name", course?.name);
    setFieldValue("price", course?.price);
    setFieldValue(
      "category",
      typeof course?.category == "object" && course?.category._id
    );
    setFieldValue("description", course?.description || "");
  }, [course]);

  async function get_Chapter(id: string | undefined) {
    try {
      let response = await instructorAPI.getChapters(id);

      setChapter(response.data.chapters);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCourse = async (id: string | undefined) => {
    try {
      const response = await instructorAPI.getSpecificCourse(id);
      if (response.data.courses) {
        setCourse(response.data.courses);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const imageRef = useRef<HTMLInputElement>(null);
  function selectImage() {
    if (imageRef.current) {
      imageRef.current.click();
    }
  }

  const changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setSelectedImage(selectedFile);
      setStatus(true);
      setCroppedImage(undefined);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await studentAPi.getCategory();
      if (response?.data) {
        setCategory(response.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(croppedImage, "slecttt");

  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="p-4 ">
        <div className="border-1   h-ful p-10 ">
          <div className="grid grid-cols-1 sm:grid-cols-1 ">
            {/* Column for the image */}
            {/* <div className="h-96 w-full flex flex-col justify-center rounded-md relative"> */}
            {/* <div
      className="h-full w-full bg-cover bg-center rounded-md"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url(${course && course?.image})`,
      }}
    >
      <div className="absolute top-3 left-2">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="flex items-center justify-center w-full sm:w-auto px-4 sm:px-5 py-2 text-sm sm:text-base text-gray-700 transition-colors duration-200 bg-base-100 border rounded-lg gap-x-2 dark:hover:bg-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 rtl:rotate-180 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span className="text-white font-Poppins">Go back</span>
        </button>
      </div>
      <div className="absolute top-3 right-2">
        <button
          data-modal-target={`editcourse${course?._id}`}
          data-modal-toggle={`editcourse${course?._id}`}
          className="btn bg-gray-700 text-white"
        >
          Edit
        </button>
      </div>
      <div className="px-4">
        <p className="font-bold text-white">Title :</p>
        <h1 className="font-extrabold text-2xl text-white">
          {course && toUpper(course?.name)}
        </h1>
      </div>
    </div>
  </div> */}

            <div className="relative flex w-full flex-col  md:flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="relative m-0  md:w-2/5   shrink-0 overflow-hidden rounded-xl md:rounded-r-none bg-white bg-clip-border text-gray-700">
                <img
                  src={typeof course?.image === "string" ? course.image : ""}
                  alt="Course Image"
                />
              </div>
              <div className="p-6">
                {/* <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
        {course?.name}
      </h6> */}
                <h4 className="mb-2 capitalize block font-Poppins text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {course && course.name}
                </h4>
                <span className="bg-red-100   text-red-800 text-sm font-medium me-2 px-2.5 py-2 rounded dark:bg-red-900 dark:text-red-300">{course?.category && course?.category?.name}</span>
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-2 rounded dark:bg-indigo-900 dark:text-indigo-300">{`₹ ${course?.price as string}`}</span>
                <p className="mb-8 mt-4 block font-popins text-base font-normal leading-relaxed text-gray-700 antialiased">
                  {course?.description}
                </p>

                <button
                  className="bg-gray-700 flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs dark:bg-base-100 text-white font-bold uppercase  hover:bg-gray-700 transition-all hover:bg-base-100 hover:text-white  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  data-modal-target={`editcourse${course?._id}`}
                  data-modal-toggle={`editcourse${course?._id}`}
                >
                  Edit
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 3.038a2.727 2.727 0 0 1 3.846 3.846L7.965 19.627a1.364 1.364 0 0 1-.568.347l-4.09 1.17a.273.273 0 0 1-.338-.338l1.17-4.09a1.364 1.364 0 0 1 .347-.568L16.862 3.038z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg flex justify-between px-10 py-5 items-center mt-3">
            <div>
              <h1 className="font-bold text-black">Add Chapter</h1>
            </div>
            <div>
              <button
                data-modal-target="crud-modal"
                data-modal-toggle="crud-modal"
                className="dakr:bg-base-100 bg-gray-700 text-white px-5 font-bold rounded-lg py-2"
              >
                Add
              </button>
            </div>
          </div>
          {chapters?.map((chapter: chapter) => (
            <div className="bg-white shadow-lg rounded-md">
              <div className="flex flex-col md:flex-row justify-between px-5 md:px-10 py-5 items-center mt-3">
                <Chapter
                  key={chapter._id}
                  chapter={chapter}
                  chapterLoad={chapterLoad}
                  setChapterLoad={setChapterLoad}
                />
                <button
                  onClick={() => setChapterId(chapter._id as string)}
                  data-modal-target="add-lesson"
                  data-modal-toggle="add-lesson"
                  className="btn btn-base bg-gray-700 text-white font-Poppins"
                >
                  Add lesson
                </button>
              </div>
              <div className="flex flex-col px-5 md:px-8 h-52 overflow-auto">
                {chapter && chapter.lessons && chapter?.lessons.length > 0 ? (
                  chapter?.lessons.map((lesson: any, lessonIndex: number) => (
                    <div key={lessonIndex} className="mb-2">
                      <Lesson
                        lessonLoad={lessonLoad}
                        setLessonLoad={setLessonLoad}
                        chapterId={chapter._id}
                        lesson={lesson}
                      />
                    </div>
                  ))
                ) : (
                  <p>No lessons available for this chapter.</p>
                )}
              </div>
              <AddLesson
                lessonLoad={lessonLoad}
                setLessonLoad={setLessonLoad}
                chapterId={chapterId}
              />
            </div>
          ))}
        </div>
      </div>
      <AddChapter setChapter={setChapter} />
      <div
        id={`editcourse${course?._id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative rounded-lg shadow  dark:bg-base-100 bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold  text-white dark:text-white">
                Edit Course
              </h3>
              <button
                onClick={onCLoseModal}
                ref={closeRef}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide={`editcourse${course?._id}`}
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

            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Name
                  </label>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    name="name"
                    id="name"
                    value={values.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-500">{errors.name}</p>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 text-white"
                  >
                    Price
                  </label>
                  <input
                    onChange={handleChange}
                    value={values.price}
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                  />
                  {errors.price && touched.price && (
                    <p className="text-red-500">{errors.price}</p>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 text-white"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    onChange={handleChange}
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    {category?.map((cat) => (
                      <option
                        key={cat._id}
                        selected={
                          typeof course?.category == "object" &&
                          course?.category?.name == cat.name
                            ? true
                            : false
                        }
                        value={cat._id}
                      >
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <figure className="max-w-lg">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 text-white"
                    >
                      Image
                    </label>

                    <img
                    width={150}
                      onClick={selectImage}
                      className="h-auto max-w-full rounded-lg"
                      src={
                        croppedImage
                          ? URL.createObjectURL(croppedImage as File)
                          : course
                          ? course.image
                          : ""
                      }
                      alt="image description"
                    />
                  </figure>
                  <input
                  accept="image/png, image/gif, image/jpeg"
                    onChange={changeImage}
                    ref={imageRef}
                    type="file"
                    hidden
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Course Description
                  </label>
                  <textarea
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="description"
                    value={values.description}
                    id="description"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write product description here"
                  ></textarea>
                  {errors.description && touched.description && (
                    <p className="text-red-500">{errors.description}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="text-black   bg-white  inline-flex items-center focus:ring-4 focus:outlin font-bold rounded-lg text-sm px-5 py-2.5 text-center "
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
                Save & Continue
              </button>
            </form>
          </div>
        </div>
        <CropperModal
          modalStatus={modalStatus}
          setFieldValue={setFieldValue}
          setCroppedImage={setCroppedImage}
          setStatus={setStatus}
          setValue={setSelectedImage}
          value={select}
        />
      </div>
    </div>
  );
}

export default AddChapters;
