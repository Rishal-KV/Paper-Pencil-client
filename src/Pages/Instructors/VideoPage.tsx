import { useEffect, useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { useSelector } from "react-redux";
import { InstructorType } from "../../Interface/interfaces";

interface JwtPayload {
  roomId: string;
  recipientId: string;
  senderId: string;
}

function VideoPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const instructor = useSelector(
    (state: InstructorType) => state.instructor.instructor
  );
  const [isValidToken, setIsValidToken] = useState(false);


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (!token) {
      navigate("/unauthorized");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const studentToken = localStorage.getItem('studentToken');
      const instructorToken = localStorage.getItem('instructorToken');
      
      let auth: any;
      if (studentToken) {
        auth = jwtDecode<any>(studentToken);
      } else if (instructorToken) {
        auth = jwtDecode<any>(instructorToken);
      } else {
        navigate("/unauthorized");
        return;
      }

      if (
        (decoded.roomId === roomId && decoded.recipientId === auth.id) ||
        decoded.senderId === instructor._id
      ) {
        setIsValidToken(true);
      } else {
        navigate("/unauthorized");
      }
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/unauthorized");
    }
  }, [roomId, instructor, navigate, location.search]);

  if (!isValidToken) {
    return <div>Unauthorized access</div>;
  }

  return (
    <JitsiMeeting
      roomName={roomId as string}
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
        displayName: instructor?.name,
        email: instructor?.email as string,
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
