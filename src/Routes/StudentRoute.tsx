import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Students/Home";
import Login from "../Pages/Students/Login";
import Signup from "../Pages/Students/SignUp";
import IsLoggout from "../Middleware/Student/IsLoggedOut";
import IsLoggedIn from "../Middleware/Student/IsLoggedIn";
import { initSocket, socket } from "../Config/socket";
import ForgotPassword from "../Pages/Students/ForgotPassword";
import SetPassword from "../Pages/Students/SetPassword";
import Course from "../Pages/Students/Course";
import CourseDetails from "../Pages/Students/CourseDetails";
import ProfilePage from "../Pages/Students/ProfilePage";
import SuccessPage from "../Pages/Students/SuccessPage";
import EnrolledCoursePage from "../Pages/Students/EnrolledCoursePage";
import Learning from "../Pages/Students/Learning";
import Chat from "../Pages/Students/Chat";
import Favourite from "../Pages/Students/FavouritePage";
import PurachseHistoryPage from "../Pages/Students/OrderHistoryPage";
import NotFound from "../Pages/Students/NotFound";

import { useSelector } from "react-redux";
import { studentType } from "../Interface/interfaces";
import { useEffect } from "react";
function StudentRoute() {
  const student = useSelector((state: studentType) => state.student.student);
  useEffect(() => {
    initSocket(student?._id as string);
   

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route
        path="/login"
        element={
          <IsLoggout>
            <Login />
          </IsLoggout>
        }
      />
      <Route
        path="/signup"
        element={
          <IsLoggout>
            <Signup />
          </IsLoggout>
        }
      />
      {/* <Route path="/otp" element={<Otp who="student" forgot={false} />} />
      <Route path="/forgot_otp" element={<Otp who="student" forgot={true} />} /> */}
      <Route path="/setpassword" element={<SetPassword />} />
      <Route path="/courses" element={<Course />} />
      <Route path="/coursedetails/:id" element={<CourseDetails />} />
      <Route
        path="/profile"
        element={
          <IsLoggedIn>
            <ProfilePage />
          </IsLoggedIn>
        }
      />

      <Route
        path="/enrolledsuccess/:id"
        element={
          <IsLoggedIn>
            <SuccessPage />
          </IsLoggedIn>
        }
      />
      <Route
        path="/enrolledcourses"
        element={
          <IsLoggedIn>
            <EnrolledCoursePage />
          </IsLoggedIn>
        }
      />
      <Route
        path="/learning/:id"
        element={
          <IsLoggedIn>
            <Learning />
          </IsLoggedIn>
        }
      />
      <Route
        path="/chats"
        element={
          <IsLoggedIn>
            <Chat />
          </IsLoggedIn>
        }
      />
      <Route
        path="/wishlist"
        element={
          <IsLoggedIn>
            <Favourite />
          </IsLoggedIn>
        }
      />
      <Route
        path="/purchasehistory"
        element={
          <IsLoggedIn>
            <PurachseHistoryPage />
          </IsLoggedIn>
        }
      />
    
      <Route path="*" Component={NotFound} />
    </Routes>
  );
}

export default StudentRoute;
