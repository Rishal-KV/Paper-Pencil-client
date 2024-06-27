import AddChapter from '../../Components/InstructorComponent/AddChapter';
import Course from '../../Components/InstructorComponent/CourseCrud'
import Footer from '../../Components/InstructorComponent/Footer';
import Navbar from '../../Components/InstructorComponent/NavBar';



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