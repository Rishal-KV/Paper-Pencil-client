import { useNavigate } from "react-router-dom";
import { Favourites, Enrollment, chapter } from "../../Interface/interfaces";
import { useEffect, useState } from "react";
import studentAPi from "../../API/studentAPI";
import { useSelector } from "react-redux";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";
import { toast } from "sonner";
import { IoMdDownload } from "react-icons/io";

interface CardProps {
  course: any;
  mycourse: boolean;
  learning?: boolean;
  favourites?: boolean;
  setLoadFav?: (value: boolean) => void;
  loadfav?: boolean;
}

const Card: React.FC<CardProps> = ({
  course,
  mycourse,
  learning,
  loadfav,
  setLoadFav,
}) => {
  const student = useSelector((state: any) => state.student);
  const [progress, setProgress] = useState<Enrollment | null>(null);
  const [favourite, setFavourite] = useState<Favourites | null>(null);
  const [load, setLoad] = useState<boolean>(true);
  const [chapters, setChapters] = useState<chapter[]>([]);

  useEffect(() => {
    studentAPi.checkProgress(course._id, student.student?._id).then((res) => {
      setProgress(res?.enrolledCourse);
    });
  }, [course?._id, student.student?._id]);

  const addToFavourite = async (courseId: string, studentId: string) => {
    const res = await studentAPi.addToFavourite(courseId, studentId);
    toast.success(res.message);
    setLoad(!load);
    if (setLoadFav) {
      setLoadFav(!loadfav);
    }
  };

  useEffect(() => {
    studentAPi.fetchFavourite(student.student?._id).then((res) => {
      setFavourite(res.favourites);
    });

    studentAPi.fetchChapter(course._id).then((res) => {
      setChapters(res.data.chapters);
    });
  }, [load]);

  const isCourseInFavourites = (courseId: string) => {
    return favourite?.favourites.some(
      (fav: any) => fav._id.toString() === courseId
    );
  };

  const navigate = useNavigate();

  const handleClick = () => {
    if (learning) {
      navigate(`/learning/${course._id}`);
    } else {
      navigate(`/coursedetails/${course._id}`);
    }
  };

  const calculateProgress = () => {
    if (progress && progress.completedChapters && chapters.length > 0) {
      return (progress.completedChapters.length / chapters.length) * 100;
    }
    return 0;
  };

  return (
    <div className="flex justify-center">
      <div className="w-68 h-72 shadow-md p-5 rounded-md mb-5 mr-5">
        <div className="w-48" onClick={handleClick}>
          <img className="rounded-2xl" src={course?.image} alt="course image" />
        </div>
        <div className="mt-2">
          <h1 className="font-extrabold text-lg text-black">{course?.name}</h1>
          {!mycourse && (
            <p className="font-semibold text-md text-black">
              Price : ₹{course?.price}
            </p>
          )}
          <p className="font-semibold text-black">
            Created by: {course?.instructor?.name}
          </p>
        </div>
        {learning && (
          <div className="w-full bg-gray-200 rounded-full mt-2">
            <div
              className="bg-customBlue text-xs  font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${calculateProgress()}%` }}
            >
              {Math.floor(calculateProgress())}%
            </div>
          </div>
        )}
        <div className="flex items-center justify-between   mt-2">
          {learning && progress?.courseStatus ? (
            <button
              onClick={() =>
                studentAPi.generateCertificate(student.student._id, course._id)
              }
              type="button"
              className="flex items-center text-white mt-4  bg-customBlue font-semibold rounded-md text-sm px-5 py-2.5 me-2 mb-2"
            >
              <span className="mr-2">Certificate</span>
              <IoMdDownload />
            </button>
          ) : (
            <button
              onClick={handleClick}
              type="button"
              className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              {mycourse ? "Start Learning" : "Enroll Now"}
            </button>
          )}
          {!learning && (
            <FontAwesomeIcon
              onClick={() => addToFavourite(course._id, student.student._id)}
              className={`text-2xl text-blue-600 hover:cursor-pointer ${
                isCourseInFavourites(course._id) ? "" : "text-regular"
              }`}
              icon={isCourseInFavourites(course._id) ? faBookmark : farBookmark}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
