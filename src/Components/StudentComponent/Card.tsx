
import { Course } from "../../Interface/interfaces"

import { useNavigate } from "react-router-dom"
const Card = ({course}:{course:Course}) =>  {
    const navigate = useNavigate()
  return (
 
  

    <>
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="relative overflow-hidden">
                    <img className="object-cover w-full h-full" src={course.image} alt="course"/>
                    
                   
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4">{course.name}</h3>
                <p className="text-gray-500 text-sm mt-2">{course.description}</p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-900 font-bold text-lg">₹ {course.price}</span>
                    <button onClick={()=>navigate(`/coursedetails/${course._id}`)} className="bg-blue-500 text-white py-2 px-4 rounded-full font-bold">Enroll Now</button>
                </div>
            </div>
         
      
    
        
            </>
  )
}

export default Card