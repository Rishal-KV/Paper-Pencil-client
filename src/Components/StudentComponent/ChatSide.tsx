import { useEffect, useState } from "react";

import studentAPi from "../../API/studentAPI";
import MainChat from "./MainChat";
import { useSelector } from "react-redux";
import { Instructor } from "../../Interface/interfaces";
import { socket } from "../../Config/socket";
import { StudentChat } from "../../Interface/interfaces";

import { useNavigate } from "react-router-dom";
import moment from "moment";
function ChatSide({ chatId }: { chatId: string }) {
  const [userInfo, setUserInfo] = useState<Instructor>();
  const [chatList, setChatList] = useState<StudentChat[]>([]);
  const student = useSelector((state: any) => state.student);

  const studentId = student.student?._id;
  const [instructorOnline, setInstructorOnline] = useState([]);

  useEffect(() => {
    socket.emit("onlineStatus", studentId);

    const handleOnlineStatus = (onlineUsers: []) => {
      setInstructorOnline(onlineUsers);
    };

    socket.on("onlineStatus", handleOnlineStatus);

    return () => {
      socket.emit("offlineStatus", studentId);
    };
  }, [chatId]);

  useEffect(() => {
    studentAPi.getChatList(studentId).then((res) => {
      setChatList(res.chatList);
    });
    socket.on("newMessage", () => {
      studentAPi.getChatList(studentId).then((res) => {
        setChatList(res.chatList);
      });
    });
  }, []);
  const navigate = useNavigate();
  const [conversationId, setConverationId] = useState("");
  const [reciverId, setReceiverId] = useState("");
  const setData = (
    conversationId: string,
    receiverId: string,
    userInfo: Instructor
  ) => {
    setReceiverId(receiverId);
    setConverationId(conversationId);
    setUserInfo(userInfo);
  };

  function dateFormate(date: Date) {
    const dateFomatted = moment(date).startOf("minute").fromNow();

    return dateFomatted;
  }

  return (
    <div className="bg-white min-h-screen flex overflow-hidden">
      <div className="w-1/4 bg-white border-r flex flex-col">
        <div className="flex justify-end px-3 p-2  ">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 transition-colors duration-200 bg-blue-500 border rounded-lg gap-x-2 sm:w-auto sm:px-5 sm:py-2 "
          >
            <svg
              className="w-5 h-5 text-white rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <span className="text-white font-Poppins">Go back</span>
          </button>
        </div>
        <div className="overflow-y-auto flex-grow p-3 mb-9 pb-20">
          {chatList.map((item: StudentChat) => (
            <div
              onClick={() =>
                setData(
                  item._id,
                  item.instructorDetails._id as string,
                  item.instructorDetails
                )
              }
              className={` ${
                reciverId == item.instructorDetails._id ? "bg-gray-100" : ""
              } flex items-center  mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md`}
            >
              {/* <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src={
                    item.instructorDetails.imageUrl
                      ? item.instructorDetails.imageUrl
                      : `https://avatar.iran.liara.run/username?username=${item.instructorDetails.name}`
                  }
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
              </div> */}
              <div className="relative inline-block px-2">
                <img
                  className="inline-block size-[52px] rounded-full"
                  src={
                    item.instructorDetails.imageUrl
                      ? item.instructorDetails.imageUrl
                      : `https://avatar.iran.liara.run/username?username=${item.instructorDetails.name}`
                  }
                  alt="Image Description"
                />
                {instructorOnline &&
                instructorOnline.some(
                  (chat) => chat === item.instructorDetails?._id
                ) ? (
                  <span className="absolute top-0 end-0 block size-3.5 rounded-full ring-2 ring-white bg-green-400 dark:ring-neutral-900"></span>
                ) : (
                  ""
                )}
              </div>
              <div className="flex-1 md:block hidden ">
                <h2 className="text-lg  text-black  font-Poppins">
                  {item.instructorDetails.name}
                </h2>
                <span className=" hidden md:inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-lg text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
                  {item?.latestMessage?.length > 5
                    ? `${item?.latestMessage?.substring(0, 6)}...`
                    : item.latestMessage}
                </span>

                {/* <p className="text-gray-600">Hoorayy!!</p> */}
              </div>
              <div className="md:block hidden">
                <p className="font-Poppins text-xs">
                  {dateFormate(item.updatedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-grow">
        <MainChat
          instructorDetails={userInfo}
          receiver={reciverId}
          conversationId={conversationId}
        />
      </div>
    </div>
  );
}

export default ChatSide;
