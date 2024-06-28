import studentAPi from "../../API/studentAPI";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swiper from "swiper";
import ConfettiExplosion from "react-confetti-explosion";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PiCheckCircleFill } from "react-icons/pi";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import {
  chapter,
  Enrollment,
  Lesson,
  Question,
  Student,
} from "../../Interface/interfaces";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

interface studentDetails {
  student: {
    student: Student;
  };
}

function CoursePlay() {
  const student = useSelector((state: studentDetails) => state.student);
  const [chapterData, setChapterData] = useState<chapter[]>();
  const [selectedLesson, setLesson] = useState<Lesson>();
  const [thumbnail, setThumbnail] = useState<string>();
  const studentId = student.student._id as string;
  const [enrolled, setEnrolled] = useState<Enrollment>();
  const [load, setLoad] = useState<boolean>(false);
  const [showLesson, setShowLesson] = useState<string | null>();
  const [questions, setQuestions] = useState([]);
  const [swiper, setSwiper] = useState<Swiper | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [description, setDescription] = useState<string>();
  const [answer, setAnswer] = useState<string>();
  const [questionId, setQuestionId] = useState<string>();
  const [correct, setCorrect] = useState<Boolean>(false);
  const [completedQuestion, setCompletedQuestion] = useState<String[]>();
  const [chapters, setChapters] = useState<chapter[]>();
  const [chapterDescription, setChapterDescription] = useState<String>("");

  const { id }: any = useParams();

  useEffect(() => {
    studentAPi.fetchChapter(id).then((res) => {
      setChapters(res.data.chapters);
    });
  }, []);

  const selectAnswer = (answer: string, questionId: string) => {
    setAnswer(answer);
    setQuestionId(questionId);
  };

  const submitAnswer = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    studentAPi
      .answerToTheQuestion(
        questionId as string,
        answer as string,
        id as string,
        studentId
      )
      .then((res) => {
        if (res.status) {
          setCorrect(res.status);
          setLoad(!load);
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      });
  };

  useEffect(() => {
    const swiperInstance = new Swiper(".swiper-question-container", {
      direction: "horizontal",
      loop: false,
      allowTouchMove: false,
    });
    setSwiper(swiperInstance);
  }, []);

  const handleNext = () => {
    if (swiper) {
      swiper.slideNext();
      setCurrentSlide(swiper.activeIndex);
    }
  };

  const handlePrev = () => {
    if (swiper) {
      swiper.slidePrev();
      setCurrentSlide(swiper.activeIndex);
    }
  };

  const toggleChapter = (
    chapterId: string | undefined,
    description: string
  ) => {
    setShowLesson((prevId) => (prevId === chapterId ? null : chapterId));
    setChapterDescription(description);
  };

  const checkCompletedQuestions = (questionId: string) => {
    return completedQuestion?.includes(questionId);
  };

  const fetchEnroll = async (
    courseId: string,
    studentId: string | undefined
  ) => {
    try {
      const response = await studentAPi.checkProgress(courseId, studentId);
      setEnrolled(response.enrolledCourse);

      setCompletedQuestion(response.enrolledCourse.attendedQuestions);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsCompleted = (lessonId: string) => {
    return (enrolled?.completedLessons as string[])?.includes(lessonId);
  };

  const checkChapterComplted = (chapterId: string) => {
    return (enrolled?.completedChapters as string[])?.includes(chapterId);
  };

  

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await studentAPi.fetchSpecificCourse(id);
        if (response) {
          console.log(response, "ress");

          setThumbnail(response.data.courses.image);
          setQuestions(response.data.questions);
          setDescription(response.data.courses.description);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchChapter = async () => {
      try {
        const response = await studentAPi.fetchChapter(id);
        if (response) {
          setChapterData(response.data.chapters);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourse();
    fetchChapter();
    fetchEnroll(id, student.student._id);
    console.log(chapters?.length === enrolled?.completedChapters.length, "ook");
  }, [id, load]);

  if (chapters && enrolled?.completedChapters) {
    if (chapters.length === enrolled.completedChapters.length) {
      studentAPi.saveCourseProgress(
        student.student._id as string,
        id as string,
        new Date()
      );
    }
  }

  const handleLessonEnd = async (lessonId: string | undefined) => {
    try {
      if (lessonId && enrolled?.completedLessons) {
        const completedLessons: string[] = enrolled.completedLessons;

        if (!completedLessons.includes(lessonId)) {
          await studentAPi.saveProgress(studentId, id, lessonId);
          setLoad(!load);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  
  return (
    <div className="h-full bg-white">
      <div className="flex flex-col lg:flex-row justify-between py-10 px-4 md:px-10 h-full lg:h-screen gap-5 lg:gap-0">
        <div className="flex flex-col lg:w-3/5 gap-5">
          <div
            className="h-48 lg:h-2/3 bg-cover bg-center relative"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url(${thumbnail})`,
            }}
          >
            <div className="absolute inset-0">
              <MediaPlayer
                key={selectedLesson?._id}
                title={selectedLesson?.title}
                src={selectedLesson?.videoUrl as string}
                onEnded={() => handleLessonEnd(selectedLesson?._id)}
                style={{ width: "100%", height: "100%" }}
              >
                <MediaProvider />
                <DefaultVideoLayout icons={defaultLayoutIcons} />
              </MediaPlayer>
            </div>
          </div>
          <div className="py-10 px-5 md:px-10 shadow-md h-52 overflow-y-auto">
            <h1 className="font-bold text-2xl text-black">
              {!chapterDescription
                ? "Course Description"
                : "Chapter Description"}
            </h1>
            <p className="text-lg text-black">
              {!chapterDescription ? description : chapterDescription}
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:w-2/6 bg-white shadow-md h-auto px-3 py-3">
          <h1 className="font-bold text-2xl text-black">Curriculum</h1>
          {chapterData?.map((chapter) => (
            <div
              key={chapter._id}
              className="md:w-auto px-3 py-2 shadow-md bg-white-100 mt-2"
            >
              <div className="flex items-center justify-between">
                <h1 
                  onClick={() =>
                    toggleChapter(chapter?._id, chapter.description)
                  }
                  className="font-extrabold text-gray-600 cursor-pointer"
                >
                  {chapter.title}
                </h1>
                {checkChapterComplted(chapter._id as string) && (
                  <PiCheckCircleFill color="green" size={30} />
                )}
              </div>
              {showLesson === chapter._id &&
                chapter.lessons?.map((lesson) => (
                  <div
                    key={lesson._id}
                    className="bg-gray-200 cursor-pointer px-2 py-1 mt-3 rounded-md flex items-center justify-between"
                  >
                    <p
                     
                      onClick={() => {
                        setLesson((prevState) => ({ ...prevState, ...lesson }));
                      }}
                      className="font-semibold text-gray-700"
                    >
                      {lesson.title}
                    </p>
                    {checkIsCompleted(lesson._id) && (
                      <img
                        width="20"
                        height="20"
                        src="https://img.icons8.com/emoji/48/check-mark-emoji.png"
                        alt="check-mark-emoji"
                      />
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="swiper-question-container px-4 md:px-10 py-10 overflow-hidden">
        {correct && (
          <ConfettiExplosion
            style={{ position: "fixed", top: "50%", left: "50%" }}
            force={0.8}
            duration={5000}
            particleCount={250}
            width={1600}
            zIndex={1000}
            onComplete={() => setCorrect(false)}
          />
        )}
        <div className="swiper-wrapper">
          {questions.map((question: Question, index: number) => (
            <form
              onSubmit={submitAnswer}
              key={index}
              className="h-auto md:h-96 shadow-md px-4 md:px-10 py-5 swiper-slide"
            >
              <h1 className="text-lg font-bold mb-4 text-black">Quiz</h1>
              <div className="mb-4">
                <h2 className="text-lg  text-black font-semibold mb-2">
                  {question.question} ?
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option: string, optionIndex: number) => (
                  <div
                    key={optionIndex}
                    className="bg-gray-300 flex items-center rounded-md py-2 px-2"
                  >
                    {!checkCompletedQuestions(question._id as string) && (
                      <input
                        onChange={(e) =>
                          selectAnswer(
                            e.target.value as string,
                            question._id as string
                          )
                        }
                        type="radio"
                        hidden
                        className="mr-2 "
                        name={`question${question._id}`}
                        value={optionIndex + 1}
                      />
                    )}
                    <p className="text-black">{option}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                {currentSlide > 0 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                  >
                    Previous
                  </button>
                )}
                <div>
                  {checkCompletedQuestions(question._id as string) ? (
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-10 py-3 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                      Answered <FontAwesomeIcon icon={faSmile} />
                    </span>
                  ) : (
                    <button
                      className={`px-4 py-2 mr-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                        checkCompletedQuestions(question._id as string)
                          ? "btn-disabled"
                          : ""
                      }`}
                    >
                      Submit
                    </button>
                  )}
                  {currentSlide < questions.length - 1 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className={`px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                        checkCompletedQuestions(question._id as string)
                          ? ""
                          : "btn-disabled"
                      }`}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursePlay;
