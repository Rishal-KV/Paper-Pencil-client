import AddChapter from '../../Components/InstructorComponent/AddChapter';
import Course from '../../Components/InstructorComponent/CourseCrud'
import Navbar from '../../Components/InstructorComponent/NavBar';
import Footer from '../../Components/StudentComponent/Footer';


function Chapter() {
  return (
    <div>
     
     
      <Navbar/>
      <Course/>
      <AddChapter/>
      <Footer/>
    </div>
  )
}

export default Chapter