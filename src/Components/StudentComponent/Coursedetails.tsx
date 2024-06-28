import CourseBanner from "./CourseBanner";
import Chapter from "./Chapter";
import studentAPi from "../../API/studentAPI";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { chapter, Course, Review } from "../../Interface/interfaces";
import Preview from "./Preview";
import { initFlowbite } from "flowbite";
import Lesson from "./Lesson";
import { useSelector } from "react-redux";
import "swiper/swiper-bundle.css";
import Swiper from "swiper";
import Reviews from "./Review";

interface Student {
  student: {
    _id: string;
    name: string;
    email: string;
    number: number;
    is_blocked: boolean;
    is_Verified: boolean;
    about: string;
    googleId: string;
    profileImage: string;
  };
}
function Coursedetails() {
  const [enrolled, setEnrolled] = useState<boolean>(false);

  const { id }: any = useParams();
  const [course, setCourses] = useState<Course>();

  const [chapters, setChapters] = useState<chapter[] | null>([]);
  const [video, setVideo] = useState("");
  const [showLesson, setShow] = useState<string | null>();
  const student: Student = useSelector((state: any) => state.student);
  const [load, setLoad] = useState<boolean>(false);
  const studentId = student.student?._id;
  const [review, setReview] = useState([]);

  const fetchReview = async (courseId: string) => {
    try {
      const response = await studentAPi.getReview(courseId);

      if (response) {
        setReview(response.data.reviews);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const calculateAvg = (arr: Review[]): number => {
    if (arr.length == 0) {
      return 0;
    }
    const total = arr.reduce((total, item: Review) => total + item.rating, 0);
    const avg = total / arr.length;
    return avg;
  };
  const avgRating = calculateAvg(review);

  useEffect(() => {
    fetchReview(id);
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 10,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      loop: true,
    });
    async function fetchSpecificCourse() {
      try {
        const response1 = await studentAPi.fetchSpecificCourse(id);
        const response2 = await studentAPi.fetchChapter(id);
        const enrollResponse = await studentAPi.checkEnroll(studentId, id);
        if (enrollResponse?.data.enrolled) {
          setEnrolled(enrollResponse.data.enrolled);
        }

        if (response1.data.status) {
          setCourses(response1.data.courses);
        }

        setChapters(response2.data.chapters);
        setVideo(response2.data.chapters[0].lessons[0].videoUrl);
      } catch (error) {
        console.log(error);
      }
    }
    initFlowbite();
    fetchSpecificCourse();
    return () => {
      swiper.destroy();
    };
  }, [load, id]);
  const toggleChapter = (chapterId: string | undefined) => {
    setShow((prevId) => (prevId === chapterId ? null : chapterId));
  };


  return (
    <div className="px-5 py-10 bg-white">
      <div className=" md:flex justify-between gap-5  ">
        <div className="flex flex-col md:w-1/2 space-x-reverse mt-2  ">
          <CourseBanner
            review={review}
            load={load}
            setLoad={setLoad}
            avgRating={avgRating}
            enrolled={enrolled}
            coursedetails={course}
          />
        </div>
        <div className=" md:w-1/2 px-3 py-2 shadow-md bg-gray-100 mt-2 ">
          <h1 className="font-Poppins text-black text-2xl">Curriculam</h1>
          {chapters?.map((chapters: chapter, index: number) => (
            <div key={index} className="bg-white px-2 py-3  mt-2 rounded-md cursor-pointer  ">
              <Chapter toggleChapter={toggleChapter} chapter={chapters} />
              {showLesson === chapters._id &&
                chapters.lessons?.map((lesson) => (
                  <Lesson
                    lessonId={lesson._id}
                    enrolled={enrolled}
                    name={lesson.title}
                    videoUrl={lesson.videoUrl}
                  />
                ))}
            </div>
          ))}
        </div>

        <Preview courseId={id} video={video} />
      </div>
      <section className="bg-gray-100 rounded-md">
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 mt-3 ">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
                <h2 className="text-3xl font-Poppins text-gray-900 sm:text-4xl">About Course</h2>
                <p className="mt-4 text-gray-600 text-lg">{course?.description}</p>
             
            </div>
    </div>
    </div>
</section>
      <section className="bg-gray-100 rounded-md">
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 mt-3">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
                <h2 className="text-3xl font-Poppins  text-gray-900 sm:text-4xl">About Instructor</h2>
                <p className="mt-4 text-gray-600 text-lg">{course?.instructor?.about}</p>
             
            </div>
            {
              course?.instructor?.imageUrl &&          <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-blue-400">
              <div className="relative py-3 px-3">
                {
                  course?.instructor?.imageUrl &&   <img className="w-full h-48 rounded-md object-cover" src={course?.instructor?.imageUrl} alt="Profile Image"/>
                }
              
              </div>
              <div className="px-6 py-4">
                <div className="text-xl font-semibold text-gray-800">{course?.instructor?.name}</div>
              
              </div>
             
            
            </div>
            }
   
        </div>
    </div>
</section>

      <div>
        <h1 className="text-black font-Poppins mt-10 ">Reviews And Ratings</h1>
      </div>
      <div className="swiper-container  overflow-hidden mt-3">
        <div className="swiper-wrapper px-2 py-2">
          { review.length == 0 ? <p className="text-black">No review and Rating</p> : review.map((review, index) => (
            <Reviews key={index} Review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Coursedetails;
