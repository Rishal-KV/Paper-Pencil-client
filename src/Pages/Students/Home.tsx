import Content from "../../Components/StudentComponent/Content";
import Banner from "../../Components/StudentComponent/Banner";
import NavBar from "../../Components/StudentComponent/NavBar";
import Footer from "../../Components/StudentComponent/Footer";
import Card from "../../Components/StudentComponent/Card";
import studentAPi from "../../API/studentAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  useEffect(() => {
       studentAPi.fetchCourse("","").then((res)=>{
        console.log(res.data.course,"hmmm");
        
        setCourse(res.data.course.courses)
        
       })
  }, []);

 console.log(course,"course");
 

  const courseToShow = course && course.slice(0, 3);
  return (
    <div className="bg-white">
      <NavBar />

      <Banner />

      <Content />

      <div className="bg-gray-50 py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8">
            Popular Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courseToShow.map((course) => (
              <Card course={course} />
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-10 cursor-pointer">
          <div
            onClick={() => navigate("/courses")}
            className=" bg-blue-500 text-white py-2 rounded-md   px-3"
          >
            More Courses
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
