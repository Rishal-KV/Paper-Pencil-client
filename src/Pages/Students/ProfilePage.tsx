

import NavBar from "../../Components/StudentComponent/NavBar";

import ProfileDetails from "../../Components/StudentComponent/ProfileDetails";
import Footer from "../../Components/StudentComponent/Footer";

function ProfilePage() {
  return (
    <div>
      <NavBar />
      {/* <ProfileSideBar/> */}
      <div>
      <ProfileDetails/>
      
      </div>
   <Footer/>
    </div>
  );
}

export default ProfilePage;
