import React from "react";
import { chapter } from "../../Interface/interfaces";

interface ChapterProps {
  chapter: chapter
  
  
  toggleChapter: (value: string | undefined ) => void;
}

const Chapter: React.FC<ChapterProps> = ({ chapter, toggleChapter }) => {
  

  return (
    <div>
     
      <h1 onClick={() => toggleChapter(chapter._id)} className="font-extrabold text-gray-600">
        {chapter.title}
      </h1>
    </div>
  );
};

export default Chapter;
