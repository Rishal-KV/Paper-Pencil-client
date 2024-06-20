import { useEffect, useState } from "react";
import adminAPI from "../../API/adminAPI";
import EditCategory from "./EditCategory";
import AddCategory from "./AddCatgeory";
function Category() {
  const [refresh, setRefresh] = useState(false);
  async function Action(id: string) {
    try {
       await adminAPI.categoryAction(id);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetch() {
    try {
      let response = await adminAPI.getCategory();

      setCategory(response.data.category);
    } catch (error) {
      console.log(error);
    }
  }
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch();
  }, [refresh]);
  return (
    <div className="h-[100%]">
      <div className="p-4 sm:ml-64">
        <div className="p-4 ">
          <button
            data-modal-target="crud-modal"
            data-modal-toggle="crud-modal"
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Add Category
          </button>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S_no
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {category.map((cat: any, index) => (
                  <tr className="bg-white border-b  ">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{cat.name}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => Action(cat._id)}
                        type="button"
                        className={`text-white ${
                          cat.is_blocked ? "bg-yellow-500" : "bg-red-500"
                        } font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
                      >
                        {cat.is_blocked ? "list" : "unlist"}
                      </button>
                      <button
                        data-modal-target={`category${cat._id}`}
                        data-modal-toggle={`category${cat._id}`}
                        data-modal-show={`category${cat._id}`}
                        className="btn "
                      >
                        Edit
                      </button>
                      <EditCategory
                        refresh={refresh}
                        setRefresh={setRefresh}
                        name={cat.name}
                        categoryId={cat._id}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      ></div>
      <AddCategory refresh={refresh} setRefresh={setRefresh} />
    </div>
  );
}
export default Category;
