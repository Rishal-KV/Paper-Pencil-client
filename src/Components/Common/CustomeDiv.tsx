
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser,  faBook } from '@fortawesome/free-solid-svg-icons';
import { faRocketchat } from '@fortawesome/free-brands-svg-icons';

const Card1 = ({ title }:{title:string}) => {
  return (
    <div className="border-2 h-20 w-52 bg-gradient-to-r from-blue-400 to-indigo-700 rounded-md text-center p-2">
      <FontAwesomeIcon icon={faChalkboardUser} className="text-3xl text-white" />
      <h1 className="text-md text-sm text-white font-bold">{title}</h1>
    </div>
  );
};

const Card2 = ({ title }:{title:string}) => {
  return (
    <div className="border-2 h-20 w-52 bg-gradient-to-r from-blue-400 to-indigo-700 m-8 mb-60 rounded-md text-center p-2">
      <FontAwesomeIcon icon={faRocketchat} className="text-3xl text-white" />
      <h1 className="text-md text-sm text-white font-bold">{title}</h1>
    </div>
  );
};

const Card3 = ({ title }:{title:string}) => {
  return (
    <div className="border-2 h-20 w-52 bg-gradient-to-r from-blue-400 to-indigo-700 mt-40 rounded-md text-center p-2">
      <FontAwesomeIcon icon={faBook} className="text-3xl text-white" />
      <h1 className="text-white text-sm font-bold">{title}</h1>
    </div>
  );
};

export { Card1, Card2, Card3 };