import EditChapter from "../InstructorComponent/EditChapter";

function Chapter({ chapter,chapterLoad,setChapterLoad }: any) {
  let { title, order, _id,} = chapter;
  
  return (
    <>
      <div className="font-semibold">
        <h1 className="text-black">{chapter.title}</h1>
        <div
          data-modal-target={`edit-chapter${_id}`}
          data-modal-toggle={`edit-chapter${_id}`}
          className="cursor-pointer bg-blue-400 text-center rounded-md text-white"
        >
          Edit
        </div>
        <EditChapter
          title={title}
          order={order}
          id={chapter._id}
          chapterLoad={chapterLoad}
          setChapterLoad={setChapterLoad}
        />
      </div>
    </>
  );
}

export default Chapter;
