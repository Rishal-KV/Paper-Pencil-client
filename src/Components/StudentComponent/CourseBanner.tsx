import { Course} from "../../Interface/interfaces";
import studentAPi from "../../API/studentAPI";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import AddReview from "./AddReview";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
interface Student {
  student: {
    student: {
      name: string;
      _id: string;
      email: string;
    };
  };
}
function CourseBanner({
  coursedetails,
  enrolled,
  avgRating,
  load,
  setLoad,
  review,
}: {
  coursedetails: Course | undefined;
  enrolled: boolean;
  avgRating: number;
  load: boolean;
  setLoad: (value: boolean) => void;
  review: any;
}) {
  const navigate = useNavigate();
  const [reviewDone, setReviewDone] = useState(false);
  const student = useSelector((state: Student) => state.student);


  const Review = async (courseId: string | undefined) => {
    try {
      const response = await studentAPi.checkReview(
        courseId,
        student.student?._id
      );

      if (response.data.status) {
        setReviewDone(response.data.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (coursedetails) {
      Review(coursedetails?._id);
    }
  }, [coursedetails?._id, load]);

  const enroll = async () => {
    try {
      let response = await studentAPi.stripePayment(coursedetails,student.student._id);
      if (response.data.sessionId) {
        let sessionId = response.data.sessionId;
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
        stripe?.redirectToCheckout({ sessionId });
      }else if(response.data.paid){
        toast.warning(response.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div >
      <div
        className="h-96 w-full flex flex-col justify-center rounded-md"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url(${
            coursedetails && coursedetails.image
          })`,
        }}
      >
        <div className="px-10 py-5">
          <h1 className="text-white font-bold text-3xl">
            {coursedetails && coursedetails.name}
          </h1>
          <h2 className="text-white font-bold">
            Price : {coursedetails && coursedetails.price}
          </h2>
          <h2 className="text-white font-bold">
            Catgeory:{" "}
            {coursedetails &&
              typeof coursedetails.category == "object" &&
              coursedetails?.category?.name}{" "}
          </h2>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ms-2 text-sm font-bold text-white dark:text-white">
              {avgRating}
            </p>
            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
            <p className="text-sm font-medium  underline hover:no-underline dark:text-white text-white">
              {review.length} reviews
            </p>
          </div>
        </div>
        <div className="px-10">
          {enrolled ? (
            <button className="bg-blue-500  text-white font-bold py-2 px-4 rounded opacity-100 cursor-not-allowed">
              enrolled
            </button>
          ) : (
            <button
              onClick={() => {
                student.student ? enroll() : navigate("/login");
              }}
              className="btn text-black border-none  bg-white hover:bg-sky-600 hover:text-white "
            >
              enroll now
            </button>
          )}

          {enrolled && !reviewDone ? (
            <button
              data-modal-target={`rate${coursedetails && coursedetails._id}`}
              data-modal-toggle={`rate${coursedetails && coursedetails._id}`}
              data-modal-show={`rate${coursedetails && coursedetails._id}`}
              className="ml-2 bg-green-500  text-white font-bold py-2 px-4 rounded opacity-100 "
            >
              Rate Now
            </button>
          ) : !enrolled ? (
            <button
              data-modal-target={`preview${coursedetails && coursedetails._id}`}
              data-modal-toggle={`preview${coursedetails && coursedetails._id}`}
              data-modal-show={`preview${coursedetails && coursedetails._id}`}
              className=" ml-2 btn text-black border-none bg-white hover:bg-sky-600 hover:text-white "
            >
              Preview
            </button>
          ) : null}
        </div>
      </div>
      <AddReview
        load={load}
        setLoad={setLoad}
        courseId={coursedetails && coursedetails._id}
      />
      
    </div>
  );
}
export default CourseBanner;
