import Footer from "../../Components/StudentComponent/Footer";
import NavBar from "../../Components/StudentComponent/NavBar";
import studentAPi from "../../API/studentAPI";
import { Favourites } from "../../Interface/interfaces";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../Components/Common/Cards";

const Favourite: React.FC = () => {
  const student = useSelector((state: any) => state.student);
  const studentId = student.student._id;
  const [favourites, setFavourites] = useState<Favourites>();
  const [loadfav,setLoadFav] = useState<boolean>(false)
  useEffect(() => {
    studentAPi.fetchFavourite(studentId).then((res) => {
      setFavourites(res.favourites);
    });
  }, [loadfav]);

  

  return (
    <>
      <NavBar />
      <div className="min-h-screen h-full bg-white">
        <div className="grid   md:grid-cols-3 gap-4 justify-items-center py-10">
          {favourites && favourites.favourites?.length > 0 ? (
            favourites.favourites?.map((course) => (
              <Card loadfav={loadfav} setLoadFav={setLoadFav}    favourites={true} learning={false} mycourse={false} course={course} />
            ))
          ) : (
            <h1 className="font-bold">No Favourites</h1>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Favourite;
