import { Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Instructors/Dashboard";
import Courses from "../Pages/Instructors/Courses";
import Chapter from "../Pages/Instructors/Chapter";
import Login from "../Pages/Instructors/Login";
import Signup from "../Pages/Instructors/SignUp";
import ProfilePage from "../Pages/Instructors/ProfilePage";
import IsLoggedIn from "../Middleware/Instructor/IsLoggedIn";
import IsLoggedOut from "../Middleware/Instructor/IsLoggedOut";
import EditProfilePage from "../Pages/Instructors/EditProfilePage";
import EnrollmentPage from "../Pages/Instructors/EnrollmentPage";
import Chat from "../Pages/Instructors/Chat";
import { initSocket, socket } from "../Config/socket";
import Video from "../Pages/Instructors/VideoPage";
import QuestionPage from "../Pages/Instructors/QuestionList";
import QuestionManagement from "../Pages/Instructors/QuestionManagement";
import NotFound from "../Pages/Instructors/NotFound";
import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { InstructorType } from "../Interface/interfaces";


function InstructorRoute() {
  const instructor = useSelector((state:InstructorType)=> state.instructor.instructor)
 
 useEffect(()=>{
  initSocket(instructor?._id as string)

  

  return ()=>{
    socket.disconnect()
  }

 
 },[])


 
  return (
    <Routes>
      <Route
        path="/"
        element={
          <IsLoggedIn>
            <Dashboard />
          </IsLoggedIn>
        }
      />
      <Route
        path="/courses"
        element={
          <IsLoggedIn>
            <Courses />
          </IsLoggedIn>
        }
      />
      <Route
        path="/addchapter/:id"
        element={
          <IsLoggedIn>
            <Chapter />
          </IsLoggedIn>
        }
      />
      <Route
        path="/login"
        element={
          <IsLoggedOut>
            <Login />
          </IsLoggedOut>
        }
      />
      <Route
        path="/signup"
        element={
          <IsLoggedOut>
            <Signup />
          </IsLoggedOut>
        }
      />
      {/* <Route path="/otp" element={<Otp forgot={false} who="instructor" />} /> */}
      <Route
        path="/profile"
        element={
          <IsLoggedIn>
            <ProfilePage />
          </IsLoggedIn>
        }
      />
      <Route
        path="/editprofile"
        element={
          <IsLoggedIn>
            <EditProfilePage />
          </IsLoggedIn>
        }
      />
      <Route path="/enrollments/:id" element={<IsLoggedIn><EnrollmentPage /></IsLoggedIn>} />
      <Route path="/chats" element={<Chat />} />
      <Route path="/video/:roomId" element={<IsLoggedIn><Video /></IsLoggedIn>} />
      <Route path="/questions" element={<QuestionPage />} />
      <Route path="/questionmanagement/:courseId" element={<IsLoggedIn><QuestionManagement /></IsLoggedIn>} />
      {/* <Route path="/changepassword" element={<IsLoggedIn><ChangePasswordPage/></IsLoggedIn>}/> */}
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default InstructorRoute;
