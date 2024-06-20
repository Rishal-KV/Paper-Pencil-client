import SideBar from "../../Components/AdminComponent/SideBar";
import Navbar from "../../Components/AdminComponent/NavBar";
import Category from "../../Components/AdminComponent/Category";
import AddCategory from "../../Components/AdminComponent/AddCatgeory";

function Catgeory() {
  return (
    <div>
      <SideBar />
      <Navbar/>
      <AddCategory />
      <Category />
     
    </div>
  );
}

export default Catgeory;
