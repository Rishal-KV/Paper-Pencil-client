import { Routes, Route } from "react-router-dom";
import Students from "../Pages/Admin/Students";
import Instructor from "../Pages/Admin/Instructors";
import Category from "../Pages/Admin/Catgeory";
import Login from "../Pages/Admin/Login";
import IsLoggedIn from "../Middleware/Admin/IsLoggedIn";
import IsLoggedOut from '../Middleware/Admin/IsLoggedOut';
import CourseList from "../Pages/Admin/Course";
import CourseDetails from "../Pages/Admin/CourseDetails";
import DashboardPage from "../Pages/Admin/DashboardPage";
function AdminRoute() {
  return (
    <Routes>
      <Route path="/login" element={<IsLoggedOut><Login/></IsLoggedOut>}/>
      <Route path="/students" element={<IsLoggedIn><Students /></IsLoggedIn>} />
      <Route path="/instructors" element={<IsLoggedIn><Instructor/></IsLoggedIn>}/>
      <Route path="/category" element={<IsLoggedIn><Category/></IsLoggedIn>}/>
      <Route path="/courses" element={<IsLoggedIn><CourseList/></IsLoggedIn>}/>
      <Route path="/coursedetails/:id" element={<IsLoggedIn><CourseDetails/></IsLoggedIn>}/>
      <Route path="/dashboard" element={<IsLoggedIn><DashboardPage/></IsLoggedIn>}/>
    </Routes>
  );
}
export default AdminRoute;
