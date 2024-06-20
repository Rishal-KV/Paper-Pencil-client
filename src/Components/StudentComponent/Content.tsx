import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 3 } },
};

function Content() {
  const navigate = useNavigate()
  return (
    <>
      <div className=" w-full bg-blue-300  p-10">
        <div className="grid gap-14 md:grid-cols-3 md:gap-5">
          <motion.div
            className="rounded-xl bg-white p-6 text-center shadow-xl "
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
              >
                <path
                  d="M12 2C6.48 2 2 5.48 2 10C2 12.72 3.47 15.13 5.74 16.54C5.57 17.08 5.14 18.66 5 19C5 19 5.55 18.67 7.29 17.76C8.45 18.15 10 18.5 12 18.5C17.52 18.5 22 14.98 22 10C22 5.48 17.52 2 12 2Z"
                  fill="white"
                />
              </svg>
            </div>
            <h1 className="text-black mb-3 text-xl font-medium lg:px-14">
              CHAT WITH INSTRUCTOR
            </h1>
            <p className="px-4 text-black ">
              Get personalized help by chatting directly with your instructor.
              Available for guidance, doubt resolution, and tailored advice.
            </p>
          </motion.div>

          <motion.div
            className="rounded-xl bg-white p-6 text-center shadow-xl"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            data-aos-delay="150"
          >
            <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-rose-500 shadow-rose-500/40">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
              >
                <path
                  d="M21 6.5V17.5C21 19.43 19.43 21 17.5 21H6.5C4.57 21 3 19.43 3 17.5V6.5C3 4.57 4.57 3 6.5 3H17.5C19.43 3 21 4.57 21 6.5ZM9 8V16L15 12L9 8Z"
                  fill="white"
                />
              </svg>
            </div>
            <h1 className="text-black mb-3 text-xl font-medium lg:px-14">
              VIDEO TUTORIALS
            </h1>
            <p className="px-4 text-black">
              Watch and learn with our extensive library of video tutorials.
              From beginner to advanced topics, we have something for everyone.
            </p>
          </motion.div>

          <motion.div
            className="rounded-xl bg-white p-6 text-center shadow-xl"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            data-aos-delay="150"
          >
            <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-rose-500 shadow-rose-500/40">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
              >
                <path
                  d="M19 4H5C3.9 4 3 4.9 3 6V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V6C21 4.9 20.1 4 19 4ZM19 18H5V8H19V18ZM5 6H19V6.01H5V6Z"
                  fill="white"
                />
              </svg>
            </div>
            <h1 className="text-black mb-3 text-xl font-medium lg:px-14">
              LEARN FROM ANYWHERE
            </h1>
            <p className="px-4  text-black">
              Access our learning materials anytime, anywhere. Our resources are
              available online so you can learn at your own pace and
              convenience.
            </p>
          </motion.div>
        </div>
      </div>
      <section className="pt-10 overflow-hidden bg-gray-50 dark:bg-gray-800 md:pt-0 sm:pt-16 2xl:pt-16">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-Poppins leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
                Hey 👋 are you
                <br className="block sm:hidden" /> a Certified Instructor ?
              </h2>

              {/* <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 md:mt-8">
                    <span className="relative inline-block">
                        <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300 dark:bg-gray-900"></span>
                    <span className="relative"> Have a question? </span>
                    </span>
                    <br className="block sm:hidden" />Ask me on <a href="#" title=""
                        className="transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 hover:underline">Twitter</a>
                </p> */}
              <div onClick={()=> navigate('/instructor/login')} className="flex gap-6 " >
                <p className="relative" >
                  <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                  <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100  hover:text-gray-900">
                    Become an instructor
                  </span>
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg"
                alt=""
              />

              <img
                className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/business-woman.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Content;
