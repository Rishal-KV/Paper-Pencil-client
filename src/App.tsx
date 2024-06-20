import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentRoute from "./Routes/StudentRoute";
import InstructorRoute from "./Routes/InstructorRoute";
import AdminRoute from "./Routes/AdminRoute";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<StudentRoute />} />
        <Route path="/instructor/*" element={<InstructorRoute/>}/>
        <Route path="/admin/*" element={<AdminRoute/>} />/
      </Routes>
    </Router>
    
  );
}

export default App;
