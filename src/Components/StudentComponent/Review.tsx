import ReactStars from "react-stars";
import {  Student } from "../../Interface/interfaces";
interface ReviewProps {
  Review :{
    _id: string;
  reviewText: string;
  rating: number;
  studentId: Student;
  createdAt:Date;

  }
 
  
}
const Review: React.FC<ReviewProps> = ({Review}) => {
  const date =  new Date(Review.createdAt);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    
    timeZone: "UTC"
  });
  console.log(formattedDate);
  
  return (
    <div className="swiper-slide bg-white shadow-md h-64 w-full p-4">
      <article>
        <div className="flex items-center mb-4">
          <img
            className="w-10 h-10 me-4 rounded-full"
            src={Review.studentId && Review.studentId.profileImage ? Review.studentId.profileImage : `../images/user-avatar_5561205.png`}
            alt="student"
          />
          <div className="font-medium dark:text-white">
            <p>
             {Review && Review.studentId?.name}
              <time
                dateTime="2014-08-16 19:00"
                className="block text-sm font-Poppins text-gray-500 dark:text-gray-400"
              >
               {formattedDate}
              </time>
            </p>
          </div>
        </div>
        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
          <ReactStars size={18} value={Review && Review.rating} edit={false} />
        </div>

        <p className="mb-3 text-gray-500 dark:text-gray-400">
         {Review && Review.reviewText}
        </p>
      </article>
    </div>
  );
};

export default Review;
