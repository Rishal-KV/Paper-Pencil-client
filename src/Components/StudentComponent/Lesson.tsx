import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { initFlowbite } from "flowbite";

const Lesson: React.FC<{
  name: string;
  enrolled: boolean;
  lessonId: string;
  videoUrl: string;
}> = ({ name, enrolled, lessonId, videoUrl }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (enrolled) {
      if (modalRef.current) {
        modalRef.current.id = `lesson${lessonId}`;
      }
      initFlowbite();
    }
  }, [enrolled, lessonId]);

  console.log(enrolled, "enrolled");

  return (
    <>
      <div
        className={`bg-gray-200 px-2 py-1 mt-3 rounded-md flex items-center`}
        data-modal-target={ enrolled ? `lesson${lessonId}` : ''}
        data-modal-toggle={enrolled ? `lesson${lessonId}` : ''}
      >
        {!enrolled && (
          <FontAwesomeIcon
            icon={faLock}
            className="inline-block w-4 h-4 mr-2 text-gray-500"
          />
        )}
        <p className="font-semibold text-gray-700">{name}</p>
      </div>
      {enrolled && (
        <div
          id={`lesson${lessonId}`}
          ref={modalRef}
          tabIndex={-1}
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {name}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide={`lesson${lessonId}`}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <video className="w-screen rounded-md" controls>
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lesson;
