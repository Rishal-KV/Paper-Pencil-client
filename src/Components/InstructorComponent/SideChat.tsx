import MainChat from "./MainChat";
import instructorAPI from "../../API/instructor";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InstructorChat, Student } from "../../Interface/interfaces";
import { initSocket, socket } from "../../Config/socket";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function SideChat({ chatId }: { chatId: string }) {
  const instructor = useSelector((state: any) => state.instructor);
  console.log(chatId, "chatId");

  const [receiver, setReceiver] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [userInfo, setUserInfo] = useState<Student>();
  const instructorId = instructor?.instructor?._id;
  const navigate = useNavigate();
  const [onlineStudents, setOnlineStudents] = useState([]);
  const [chatList, setChatList] = useState([]);
  useEffect(() => {
    socket.emit("onlineStatus", instructorId);

    const handleOnlineStatus = (onlineUsers: []) => {
      console.log(onlineUsers, "onlineeee");

      setOnlineStudents(onlineUsers);
    };

    socket.on("onlineStatus", handleOnlineStatus);

    return () => {
      socket.emit("offlineStatus", instructorId);
    };
  }, [chatId]);

  useEffect(() => {
    initSocket(instructorId);
    instructorAPI.get_chats(instructorId).then((res) => {
      setChatList(res.chatList);
    });

    socket.on("newMessage", () => {
      instructorAPI.get_chats(instructorId).then((res) => {
        setChatList(res.chatList);
      });
    });
  }, []);

  const setData = (
    receiverId: string,
    conversationId: string,
    studentDetails: Student
  ) => {
    setConversationId(conversationId);
    setReceiver(receiverId);
    setUserInfo(studentDetails);
  };

  function dateFormate(date: Date) {
    const dateFomatted = moment(date).startOf("minute").fromNow();

    return dateFomatted;
  }
  return (
   <div className="bg-white min-h-screen flex overflow-hidden">
      
  <div className="w-1/4 bg-white border-r flex flex-col">
    <div className="flex justify-end px-3 p-2">
    <button
  onClick={() => navigate(-1)}
  type="button"
  className="flex items-center justify-center w-full sm:w-auto px-4 sm:px-5 py-2 text-sm sm:text-base text-gray-700 transition-colors duration-200 bg-base-100 border rounded-lg gap-x-2 dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
>
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6 rtl:rotate-180 text-white"
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
      {chatList.map((chat: InstructorChat) => (
        <div
          key={chat._id}
          onClick={() =>
            setData(
              chat.studentDetails._id as string,
              chat._id,
              chat.studentDetails
            )
          }
          className={`${
            receiver === chat.studentDetails._id ? "bg-gray-100" : ""
          } flex items-center mb-4 cursor-pointer p-2 rounded-md`}
        >
          <div className="relative inline-block">
            <img
              className="inline-block size-[52px] rounded-full"
              src={
                chat.studentDetails.profileImage
                  ? chat.studentDetails.profileImage
                  : `https://avatar.iran.liara.run/username?username=${chat.studentDetails.name}`
              }
              alt="Image Description"
            />
            {onlineStudents &&
            onlineStudents.some(
              (online) => online === chat.studentDetails._id
            ) ? (
              <span className="absolute top-0 end-0 block size-3.5 rounded-full ring-2 ring-white bg-green-400 dark:ring-neutral-900"></span>
            ) : (
              ""
            )}
          </div>
          <div className="flex-1 px-2 md:block hidden">
            <h2 className="text-lg font-Poppins text-black">
              {chat.studentDetails.name}
            </h2>
            <span className=" hidden max-w-[10rem] truncate whitespace-nowrap md:inline-block py-1.5 px-3 rounded-lg text-xs font-medium bg-modern-100 bg-gray-100 text-black">
              {chat?.latestMessage?.length > 5
                ? `${chat && chat.latestMessage?.substring(0, 6)}...`
                : chat.latestMessage}
            </span>
          </div>
          <div>
            <p className="font-Poppins text-xs md:block hidden">
              {dateFormate(chat.updatedAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
  <div className="flex-grow">
    <MainChat
      userInfo={userInfo}
      receiver={receiver}
      conversationId={conversationId}
    />
  </div>
</div>

  );
}

export default SideChat;
