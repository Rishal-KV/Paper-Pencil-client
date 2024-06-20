import { SyntheticEvent, useEffect, useRef, useState } from "react";

import { socket } from "../../Config/socket";
import { useSelector } from "react-redux";
import studentAPi from "../../API/studentAPI";
import { Instructor } from "../../Interface/interfaces";
import InputEmoji from "react-input-emoji";



function MainChat({
  receiver,
  conversationId,
  instructorDetails,
}: {
  receiver: string;
  conversationId: string;
  instructorDetails: Instructor | undefined;
}) {
  const [text, setText] = useState("");

  const student = useSelector((state: any) => state.student);
  const sender = student.student?._id;
  const [conversation, setConverstaion] = useState<any[]>([]);
  useEffect(() => {
    studentAPi.getConversation(conversationId).then((res) => {
      setConverstaion(res.response);
    });
  }, [conversationId]);

  // useEffect(() => {
  //   socket.on("newMessage", ({ newMessage }) => {
  //     setConverstaion((prevMessages) => {
  //       const messageIds = prevMessages.map((message) => message._id);
  //       if (!messageIds.includes(newMessage._id)) {
  //         return [...prevMessages, newMessage];
  //       }
  //       return prevMessages;
  //     });
  //   });
  // }, []);
  useEffect(() => {
    socket.on("newMessage", ({ newMessage }) => {
      setConverstaion((prevConversation) => [...prevConversation, newMessage]);
    });
  }, []);

  const sendMess = (e: SyntheticEvent) => {
   
    e.preventDefault();
    

    socket.emit("sendMessage", { text, sender, receiver });
    setText("");
  };
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(()=>{
    scrollToBottom()
  },[conversation])
  
  return (
    <div className="flex-1 bg-white ">
      {receiver && (
        <header className="bg-blue-400 p-4 text-gray-700">
          <h1 className="text-2xl font-semibold text-white">
            {instructorDetails?.name}
          </h1>
        </header>
      )}

      <div  className="h-96 overflow-y-auto p-4 pb-44">
        {!receiver ? (
          <div className="flex h-96 justify-center items-center font-bold">
            <div  className="text-black">👈Select an instructor to chat with</div>
          </div>
        ) : (
          conversation.map((chats: any) => (
            <div
              className={`flex ${
                chats.from === sender ? "justify-end" : ""
              } mb-4 cursor-pointer`}
              key={chats._id}
            >
              <div  ref={messagesEndRef} className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                {/* <img
        src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      /> */}
              </div>
              {chats.text.includes("https://paper-pencil.vercel.app/instructor/video") ? (
                <div className="flex flex-col items-center">
                  {/* <button
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                    onClick={() =>{
                      const urlParams = new URL(chats.text).searchParams;
                      const roomID = urlParams.get('roomID');
                      
                    
                      window.open(`${chats.text}&roomID=${roomID}`, "_blank");
                    }}
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Join the meet <FontAwesomeIcon icon={faVideo} />
                    </span>
                  </button> */}
                  <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                      {" "}
                      Meet Link
                    </h1>
                    <p className="text-gray-600 mb-4">Hello,</p>
                    <p className="text-gray-600 mb-4">
                      You have received a Meet link. Please click the button
                      below to join the meeting:
                    </p>
                    <a
                      href={chats.text}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg inline-block mt-4 hover:bg-blue-600"
                    >
                      Join Meeting
                    </a>
                    <p className="text-gray-600 mt-4">
                      If the button above does not work, you can also copy and
                      paste the following link into your browser:
                    </p>
                    <p className="text-gray-600">{chats.text}</p>
                    <p className="text-gray-600 mt-4">Thank you!</p>
                    <div className="text-xs py-3 text-gray-500 flex">
                      {new Date(chats.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col max-w-96">
                  <div className="bg-blue-400 rounded-lg p-3 mb-1">
                    <p className="text-white">{chats.text}</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(chats.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {/* <div className="flex justify-center mt-32">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
  Join the meet <FontAwesomeIcon icon={faVideo}/>
  </span>
  </button>
            </div> */}
        {/* <div className="flex justify-end mb-4 cursor-pointer">
          <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
            <p>
              Hi Alice! I'm good, just finished a great book. How about you?
            </p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <img
              src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="My Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div> */}
      </div>
{
  receiver ?  <footer className="bg-white border-t border-gray-300 p-5  absolute bottom-0 w-3/4 ">
  {/* <div className=""> */}
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

    {
      text &&   <button
      type="submit"
      className="bg-indigo-500 text-white px-4 py-2  rounded-md ml-2"
    >
      Send
    </button>
    }
  
  </form>
  {/* </div> */}
</footer> : ""
}
     
    
    </div>
   
  );
}

export default MainChat;
