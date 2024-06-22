import React, { useEffect, useState } from "react";
import Search from "./Search";
import Card from "../Common/Cards";
import { Course } from "../../Interface/interfaces";
import { category } from "../../Interface/interfaces";
import studentAPi from "../../API/studentAPI";

interface CoursesProps {
  courses: Course[];
  setSearch: (value: string) => void;
  selectCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectPrice: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setSelectedPage: any;
  totalPages: number;
  page: number;
  category?: string;
  price?: string;
}

function Courses({
  courses,
  setSearch,
  selectCategory,
  selectPrice,
  totalPages,
  page,

  setSelectedPage,
}: CoursesProps) {
  const [categoryList, setCategoryList] = useState<category[]>([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");

  const fetchCategory = async () => {
    try {
      const response = await studentAPi.getCategory();
      console.log(response);

      if (response?.data) {
        setCategoryList(response.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const resetFilter = () => {
    setSelectedCategory("");
    setSelectedPrice("asc");
    selectCategory({ target: { value: "" } } as React.ChangeEvent<HTMLSelectElement>);
    selectPrice({ target: { value: "asc" } } as React.ChangeEvent<HTMLSelectElement>);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    selectCategory(e);
    
    
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrice(e.target.value);
    selectPrice(e);
   
    
  };

  return (
    <div className="h-full bg-white">
      <div className="flex flex-col md:flex-row">
        {/* Filter Button for Mobile */}
        <button
          onClick={toggleSidebar}
          className="block md:hidden bg-blue-500 text-white px-4 py-2 m-2 rounded-md"
        >
          {sidebarVisible ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Sidebar */}
        <div
          className={`bg-white shadow-lg w-full md:w-1/5 ${
            sidebarVisible ? "block" : "hidden"
          } md:block`}
        >
          <div className="max-w-sm mx-auto w-44 py-10">
            <button
              onClick={resetFilter}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Reset
            </button>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
            >
              Sort By
            </label>
            <select
              onChange={handlePriceChange}
              value={selectedPrice}
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="asc">Lowest</option>
              <option value="desc">Highest</option>
            </select>

            <label
              htmlFor="category"
              className="block mb-2 mt-3 text-sm font-bold text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              onChange={handleCategoryChange}
              value={selectedCategory}
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Choose a category
              </option>
              {categoryList.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-4/5 min-h-screen py-20 px-8">
          <div className="lg:hidden">
            <Search setSearch={setSearch} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 py-10">
            {courses.length > 0 ? (
              courses.map((course: Course) => (
                <div key={course._id} className="flex justify-start">
                  <Card
                    favourites={false}
                    learning={false}
                    mycourse={false}
                    course={course}
                  />
                </div>
              ))
            ) : (
              <div>No courses found.</div>
            )}
          </div>
          {
            courses.length > 0 &&  
            <div className="flex items-center justify-center">

            
            <ul className="inline-flex">
              <li>
                <button
                  onClick={() => setSelectedPage(1)}
                  className="h-8 px-5 text-blue-400 font-bold transition-colors duration-15 border border-r-0 border-gray-500 rounded-l-lg focus:shadow-outline hover:bg-indigo-100"
                >
                  First
                </button>
              </li>
              {courses && Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1}>
                  <button
                    onClick={() => setSelectedPage(index + 1)}
                    className={`h-8 px-5 ${
                      index + 1 === page
                        ? "bg-blue-400 text-white"
                        : "text-indigo-400"
                    } font-bold transition-colors duration-150  border border-r-0 border-gray-500 focus:shadow-outline hover:bg-indigo-100`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                {page !== totalPages ? (
                  <button
                    onClick={() => setSelectedPage((prev:number) => prev + 1)}
                    className="h-8 px-5 text-blue-400 font-bold transition-colors duration-150 bg-white border border-gray-500 rounded-r-lg focus:shadow-outline "
                  >
                    Next
                  </button>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
          }
     
        </div>
      </div>
    </div>
  );
}

export default Courses;
