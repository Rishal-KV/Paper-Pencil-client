import CourseTable from "./CourseTable"

function Course() {
  return (
    <div>
    <div className="h-screen ">
      <div className="p-4 sm:ml-64 ">
        <div className="p-4  dark:border-gray-700">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <CourseTable/>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Course