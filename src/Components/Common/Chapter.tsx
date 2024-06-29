import EditChapter from "../InstructorComponent/EditChapter";

function Chapter({ chapter, chapterLoad, setChapterLoad }: any) {
  let { title, order, _id, description } = chapter;

  return (
    <>
      <div className="font-semibold">
        <h1 className="text-black">{chapter.title}</h1>
        <div
          data-modal-target={`edit-chapter${_id}`}
          data-modal-toggle={`edit-chapter${_id}`}
          className="cursor-pointer px-10 mt-3 text-black  border-2 border-green-400 text-center rounded-md dark:text-base-100"
        >
          Edit
        </div>
        <EditChapter
          description={description}
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
