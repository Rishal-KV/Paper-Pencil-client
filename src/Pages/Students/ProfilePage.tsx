import ProfileSideBar from "../../Components/StudentComponent/ProfileSideBar";

import NavBar from "../../Components/StudentComponent/NavBar";

import ProfileDetails from "../../Components/StudentComponent/ProfileDetails";

function ProfilePage() {
  return (
    <div>
      <NavBar />
      <ProfileSideBar/>
      <div>
      <ProfileDetails/>
      
      </div>
   
    </div>
  );
}

export default ProfilePage;
