import ChatSide from "../../Components/StudentComponent/ChatSide";
import { v4 as uuidv4 } from 'uuid';

function Chat() {
  return (
    <>
    
   
        <ChatSide chatId={uuidv4()} />
     
    </>
  );
}

export default Chat;
