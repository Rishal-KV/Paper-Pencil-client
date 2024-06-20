
import NavBar from "../../Components/StudentComponent/NavBar";
import ProfileSideBar from "../../Components/StudentComponent/ProfileSideBar";
import PurachaseHistory from "../../Components/StudentComponent/PurachaseHistory";

const PurachseHistoryPage: React.FC = () => {
  return (
    <div>
      <NavBar />
   <ProfileSideBar/>
      <PurachaseHistory />
      
    </div>
  );
};
export default PurachseHistoryPage