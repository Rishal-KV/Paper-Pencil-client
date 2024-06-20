
import { motion} from "framer-motion";
import BannerImage from "../Common/BannerImage";
import { Card1, Card2, Card3 } from "../Common/CustomeDiv";

function Banner() {




  return (
    <div className="flex">
      <div className="flex h-1/2 w-full bg-blue-200 px-10">
        
        <BannerImage />
        <div className="w-3/5 lg:flex hidden">
          <div className="lg:flex items-center flex-row">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 2}}
              className="hidden lg:block"
            >
              <Card1 title="Amazing Instructors" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 2, delay: 0.1 }}
              className="hidden lg:block"
            >
              <Card2 title="Live Chat with instructors" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 2, delay: 0.2 }}
              className="hidden lg:block"
            >
              <Card3 title="Learn From Anywhere" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
