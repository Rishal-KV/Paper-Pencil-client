import EditProfile from "../../Components/InstructorComponent/EditProfile"
import Navbar from "../../Components/InstructorComponent/NavBar"
import SideBar from "../../Components/InstructorComponent/SideBar"


function EditProfilePage() {
  return (
    <div >
        <Navbar/>
      <SideBar/>
        <EditProfile/>
    </div>
  )
}

export default EditProfilePage