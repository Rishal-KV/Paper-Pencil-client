import { SyntheticEvent, useEffect, useState } from "react";
import { socket } from "../../Config/socket";
import { useSelector } from "react-redux";
import instructorAPI from "../../API/instructor";
import { Student } from "../../Interface/interfaces";
import axios from "axios";
import InputEmoji from "react-input-emoji";
import { useRef } from "react";
import { MdVideoCall } from "react-icons/md";
import { initSocket } from "../../Config/socket";
function MainChat({
  receiver,
  conversationId,
  userInfo,
}: {
  receiver: string;
  conversationId: string;
  userInfo: Student | undefined;
}) {
  const [conversations, setConversations] = useState<any[]>([]);
  const [text, setText] = useState("");
  const instructor = useSelector((state: any) => state.instructor);
  const sender = instructor.instructor._id;
  useEffect(()=>{
    initSocket(instructor?._id as string)
  
    
  
    // return ()=>{
    //   socket.disconnect()
    // }
  
   
   },[])
  
  function randomID(len: number) {
    let result = "";
    if (result) return result;
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  const navigateTo = async () => {
    try {
      const response = await axios.post("https://nutrix.fun/instructor/generate_token", {
        roomId,
        senderId:sender,
        recipientId: receiver,
      });
      const { token } = response.data;

      const text = `https://paper-pencil.vercel.app/video/${roomId}?token=${token}`;
      socket.emit("sendMessage", { text, sender, receiver });

      window.open(`/video/${roomId}?token=${token}`, "_blank");
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };

  useEffect(() => {
    socket.on("newMessage", ({ newMessage }) => {
      setConversations((prevMessages) => {
        const messageIds = prevMessages.map((message) => message._id);
        if (!messageIds.includes(newMessage._id)) {
          return [...prevMessages, newMessage];
        }
        return prevMessages;
      });
    });
  }, []);
  const roomId = randomID(5);
  const sendMess = (e: SyntheticEvent) => {
    e.preventDefault();
    socket.emit("sendMessage", { text, sender, receiver });
    setText("");
  };

  useEffect(() => {
    instructorAPI.getConversation(conversationId).then((res) => {
      setConversations(res.response);
    });
  }, [conversationId]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);
  return (
    <div className="flex flex-col h-screen bg-white">
      {receiver && (
        <header className="bg-base-100 p-4 fle text-gray-700 flex  items-center justify-between">
          <h1 className="text-2x text-white font-semibold">
            {userInfo?.name.toUpperCase()}
          </h1>
          <MdVideoCall onClick={navigateTo} size={40} color="white" />
        </header>
      )}

      <div ref={messagesEndRef} className="flex-1 overflow-y-auto p-4 pb-44">
        {!receiver ? (
          <div className="flex justify-center items-center h-96 font-bold ">
            <div className="text-black">
              <h1>👈 select someone to start a conversation</h1>
            </div>
          </div>
        ) : (
          conversations.map((chat: any) => (
            <div
              className={`flex ${
                chat.from === sender ? "justify-end" : ""
              } mb-4 cursor-pointer`}
              key={chat._id}
            >
              <div className=" rounded-full flex items-center justify-center ">
                {/* <img
                src={
                  instructor.instructor.imageUrl
                    ? instructor.instructor.imageUrl
                    : `https://avatar.iran.liara.run/username?username=${instructor.instructor.name}`
                }
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              /> */}
              </div>
              <div ref={messagesEndRef} className="flex flex-col max-w-96">
                <div className="bg-base-100 rounded-lg p-3 mb-1">
                  {chat.text.slice(0, 4) == "https" ? (
                    <a className="text-white" href={chat.text}>
                      {chat.text}
                    </a>
                  ) : (
                    <p className="text-white">{chat.text.substring(0,60)}</p>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(chat.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {receiver && (
        <footer className="border-t border-gray-300 py-2 px-4   w-full ">
          {/* <div className="flex  justify-center">
            <button
              onClick={navigateTo}
              type="button"
              className="m-7 flex  items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-base-100 hover:bg-blue-400 focus:outline-none"
            >
              <span className="font-bold">Start Video Chat</span>
              <svg
                className="bg-white m-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                id="video-call"
              >
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l2.29 2.29c.63.63 1.71.18 1.71-.71V8.91c0-.89-1.08-1.34-1.71-.71L17 10.5zM13 13h-2v2c0 .55-.45 1-1 1s-1-.45-1-1v-2H7c-.55 0-1-.45-1-1s.45-1 1-1h2V9c0-.55.45-1 1-1s1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
              </svg>
            </button>
          </div> */}
          <form className="flex items-center" onSubmit={sendMess}>
            {/* <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            /> */}
            <InputEmoji
              value={text}
              onChange={setText}
              placeholder="Type a message"
              shouldReturn={false}
              shouldConvertEmojiToImage={false}
            />
            {text && (
              <button
                type="submit"
                className="bg-base-100 text-white px-4 py-2 rounded-md ml-2"
              >
                Send
              </button>
            )}
          </form>
        </footer>
      )}
    </div>
  );
}

export default MainChat;
