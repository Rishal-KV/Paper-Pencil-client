
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
function SideBarLinks({links,user}:any) {
const navigate = useNavigate()
  return (
   <>
      <li>
            <a  onClick={() => {
              if (typeof links.link === "function") {
                links.link();
              } else if (typeof links.link === "string") {
                navigate(links.link);
              }
            }}  className={`flex items-center p-2 ${user === "admin" ? 'text-white' : 'text-black'} rounded-md font-Poppins hover:text-white hover:bg-base-100 group`}>
            <FontAwesomeIcon icon={links.icon}  />
               <span className="ms-3  font-Poppins">{links.text}</span>
            </a>
         </li>
   </>
  )
}

export default SideBarLinks
