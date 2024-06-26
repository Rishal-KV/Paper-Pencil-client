import { useEffect } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { InstructorType } from "../../Interface/interfaces";

function VideoPage() {
  const { roomId } = useParams();
  const instructor = useSelector((state: InstructorType) => state.instructor.instructor);

  useEffect(() => {
    if (!roomId) {
      console.error("Room ID is not defined!");
    }

    if (!instructor) {
      console.error("Instructor information is not available!");
    }
  }, [roomId, instructor]);

  if (!roomId) {
    return <div>Error: Room ID is not defined.</div>;
  }

  if (!instructor) {
    return <div>Error: Instructor information is not available.</div>;
  }


  return (
    <JitsiMeeting
      roomName={roomId}
      configOverwrite={{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: true,
        enableEmailInStats: false,
      }}
      interfaceConfigOverwrite={{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
      }}
      userInfo={{
        displayName: instructor.name,
        email: instructor.email as string,
        
      }}
      getIFrameRef={(iframeRef) => {
        if (iframeRef) {
          iframeRef.style.height = "100vh";
        } else {
          console.error("iframeRef is not defined!");
        }
      }}
    />
  );
}

export default VideoPage;
