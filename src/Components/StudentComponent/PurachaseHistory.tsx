import React, { useEffect, useState } from 'react';
import { Enrollment, Student } from '../../Interface/interfaces';
import studentAPi from '../../API/studentAPI';
import { useSelector } from 'react-redux';

interface StudentType {
  student: {
    student: Student;
  };
}

const PurchaseHistory: React.FC = () => {
  const student = useSelector((state: StudentType) => state.student);
  const [history, setHistory] = useState<Enrollment[] | []>([]);

  useEffect(() => {
    studentAPi.enrolledCourse(student.student._id).then((res) => {
      setHistory(res.data.courses);
    });
  }, [student.student._id]);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4 sm:ml-64 bg-white min-h-screen">
    <div className="p-4 rounded-lg dark:border-gray-700">
      <div className="flex items-center justify-center mb-4 rounded-lg bg-gray-50 shadow-md dark:bg-gray-800">
     <div className=" w-screen px-10 py-10 bg-gray-100">
      <div className="  p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-Poppins text-black  mb-6 text-center">Purchase History</h1>
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="text-center text-gray-600 text-lg">
              No purchases found.
            </div>
          ) : (
            history.map((purchase: Enrollment) => (
              <div key={purchase._id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
                <div className="flex flex-col">
                  <span className="font-Poppins text-black">{purchase.course.name}</span>
                  <span className="text-sm text-gray-600">{formatDate(purchase.enrolled)}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-green-600">{purchase.course.price}</span>
                  
                    <button onClick={()=>studentAPi.invoice(student.student._id as string, purchase.course._id as string)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                      Download Invoice
                    </button>
                  
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
      </div>
    </div>
  </div>

    
  );
};

export default PurchaseHistory;
