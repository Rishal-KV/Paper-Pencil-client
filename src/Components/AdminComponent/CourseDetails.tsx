import { useParams } from "react-router-dom";
import adminAPI from "../../API/adminAPI";
import { chapter } from "../../Interface/interfaces";
import { useEffect, useState } from "react";

import PlayLesson from "./PlayLesson";
function CourseDetails() {
  let { id } = useParams();
  const [selectedLesson, setSelectedLesson] = useState<string>("");
  const [chapters, setChapter] = useState<chapter[] | undefined>();
  const fetch = async () => {
    try {
      let response = await adminAPI.getChapter(id);
      if (response) {
        setChapter(response.data.chapters);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <div className="h-screen bg-white ">
        <div className="p-4 sm:ml-64 ">
          <div className="p-4  dark:border-gray-700">
            <div
              className="h-96 w-full flex flex-col justify-center rounded-md"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
                  chapters && chapters[0].course && chapters[0].course.image
                })`,
              }}
            >
              <div className="px-4">
                <p className="font-bold text-white">Title : </p>
                <h1 className="font-extrabold text-2xl text-white">
                  {chapters && chapters[0].course && chapters[0].course.name}
                </h1>
              </div>
              <div className="px-4 mt-4">
                <p className="font-bold text-white">Catgeory : </p>
                <h1 className="font-semibold text-2xl text-white">
                  {chapters &&
                    chapters[0].course?.category &&
                    typeof chapters[0].course.category == "object" &&
                    chapters[0].course.category.name}
                </h1>
              </div>
            </div>

            <div className="relative overflow-x-auto shadow-md px-4 flex flex-col gap-4 mt-10">
              {chapters?.map((chapter: any, index) => (
                <div
                  key={index}
                  className="mx-w bg-white px-10 py-10  rounded-md m"
                >
                  <div className="mb-2">
                    <h1 className="text-black font-bold">{chapter.title}</h1>
                  </div>
                  {chapter.lessons.map((lesson: any, index: number) => (
                    <div
                      key={index}
                      className="bg-gray-300 mt-1 px-3 py-2 rounded-md"
                    >
                      <h6
                        onClick={() => setSelectedLesson(lesson.videoUrl)}
                        data-modal-target={`lesson${lesson._id}`}
                        data-modal-toggle={`lesson${lesson._id}`}
                        className="text-black hover:cursor-pointer"
                      >
                        {lesson.title}
                      </h6>
                      <PlayLesson
                        lessonId={lesson._id}
                        videoUrl={selectedLesson}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
