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
  const [conversation, setConversation] = useState<any[]>([]);
  
  useEffect(() => {
    studentAPi.getConversation(conversationId).then((res) => {
      setConversation(res.response);
    });
  }, [conversationId]);

  useEffect(() => {
    const handleNewMessage = ({ newMessage }: { newMessage: any }) => {
      setConversation((prevMessages) => {
        const messageIds = prevMessages.map((message) => message._id);
        if (!messageIds.includes(newMessage._id)) {
          return [...prevMessages, newMessage];
        }
        return prevMessages;
      });
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [conversation]);

  const navigateTo = (url: string) => {
    window.open(url, "_blank");
  };

  const sendMess = (e: SyntheticEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;

    socket.emit("sendMessage", { text, sender, receiver });
    setText("");
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return (
    <div className="flex flex-col h-screen bg-white ">
      {receiver && (
        <header className="bg-blue-400 p-4 text-gray-700">
          <h1 className="text-2xl font-semibold text-white">
            {instructorDetails?.name}
          </h1>
        </header>
      )}

      <div className="flex-1 overflow-y-auto p-4 pb-44">
        {!receiver ? (
          <div className="flex h-96 justify-center items-center font-bold">
            <div className="text-black">
              👈Select an instructor to chat with
            </div>
          </div>
        ) : (
          conversation.map((chats: any) => (
            <div
              className={`flex ${chats.from === sender ? "justify-end" : ""} mb-4 cursor-pointer`}
              key={chats._id}
            >
              <div className="flex items-center justify-center">
                {/* Placeholder for Avatar */}
              </div>
              {chats.text.includes("https://paper-pencil.vercel.app/video") ? (
                <div className="flex flex-col items-center">
                  <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 mt-4 sm:mt-8">
                    <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">
                      Meet Link
                    </h1>
                    <p className="text-gray-600 mb-2 sm:mb-4 sm:block hidden">
                      Hello,
                    </p>
                    <p className="text-gray-600 mb-2 sm:mb-4 sm:block hidden">
                      You have received a Meet link. Please click the button below to join the meeting:
                    </p>
                    <p
                      onClick={() => navigateTo(chats.text)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg inline-block mt-2 sm:mt-4 hover:bg-blue-600 w-full text-center sm:w-auto"
                    >
                      Join Meeting
                    </p>
                    <p className="text-gray-600 mt-2 sm:mt-4 sm:block hidden">
                      If the button above does not work, you can also copy and paste the following link into your browser:
                    </p>
                    <p className="text-gray-600 break-words sm:block hidden">
                      {chats.text.substring(0, 60)}
                    </p>
                    <p className="text-gray-600 mt-2 sm:mt-4 sm:block hidden">
                      Thank you!
                    </p>
                    <div className="text-xs py-2 sm:py-3 text-gray-500 flex">
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
        <div ref={messagesEndRef} />
      </div>
      {receiver && (
        <footer className="border-t border-gray-300 py-2 px-4 w-full">
          <form className="flex items-center" onSubmit={sendMess}>
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
                className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
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
