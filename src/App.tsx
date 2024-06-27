import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentRoute from "./Routes/StudentRoute";
import InstructorRoute from "./Routes/InstructorRoute";
import AdminRoute from "./Routes/AdminRoute";
import VideoPage from "./Pages/Instructors/VideoPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<StudentRoute />} />
        <Route path="/instructor/*" element={<InstructorRoute/>}/>
        <Route path="/admin/*" element={<AdminRoute/>} />
        <Route path="/video/:roomId" element={<VideoPage/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
