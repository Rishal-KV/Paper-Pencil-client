import Courses from "../../Components/StudentComponent/Courses";
import NavBar from "../../Components/StudentComponent/NavBar";
import Footer from "../../Components/StudentComponent/Footer";
import studentAPi from "../../API/studentAPI";

import React, { useEffect, useState } from "react";

function Course() {
  const [search, setSearch] = useState<string | undefined>("");
  const [category, setCategory] = useState<string | undefined>("");
  const [price, setPrice] = useState<string | undefined>("");
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [page, setPage] = useState<number | null>();
  const [selectedPage, setSelectedPage] = useState<number>(1);

  const selectCategory: React.ChangeEventHandler<HTMLSelectElement> = async (
    e
  ) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    // const response = await studentAPi.fetchCourse(search, selectedCategory);
    // setCourses(response.data.course);
  };

  const selectPrice: React.ChangeEventHandler<HTMLSelectElement> = async (
    e
  ) => {
    const selectedPrice = e.target.value;
    setPrice(selectedPrice);
  };
  let [courses, setCourses] = useState([]);

  const fetchCourse = async () => {
    try {
      let response = await studentAPi.fetchCourse(
        search,
        category,
        price,
        selectedPage as number
      );

      setCourses(response.data.course.courses);

      setTotalPages(response.data.course.totalPages);
      setPage(response.data.course.page);
    } catch (error) {
      console.log(error);
    }
  };
console.log(selectedPage,"---> sele");

  useEffect(() => {
    fetchCourse();
  }, [search, category, price, selectedPage]); // Include category in the dependency array

  return (
    <>
      <NavBar setSearch={setSearch} courses="courses" />
      <Courses
        setSelectedPage={setSelectedPage}
        page={page as number}
        totalPages={totalPages as number}
        selectPrice={selectPrice}
        selectCategory={selectCategory}
        setSearch={setSearch}
        courses={courses}
      />
      <Footer />
    </>
  );
}

export default React.memo(Course);
