import SideChat from "../../Components/InstructorComponent/SideChat";
import { v4 as uuidv4 } from 'uuid';
function Chat() {

  return (
    <>

    <SideChat chatId={uuidv4()} />
   
    
    </>
  );
}

export default Chat;
