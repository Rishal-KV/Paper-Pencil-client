import { useEffect, useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { InstructorType, studentType } from "../../Interface/interfaces";
interface JwtPayload {
  roomId: string;
  recipientId: string;
  senderId: string;
}

function VideoPage() {
  const { roomId } = useParams();
  const navigate = useNavigate(); // Updated to use useNavigate
  const location = useLocation();
  const instructor = useSelector(
    (state: InstructorType) => state.instructor.instructor
  );
  const [isValidToken, setIsValidToken] = useState(false);
  const studentId = useSelector(
    (state: studentType) => state?.student?.student?._id
  );
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (!token) {
      navigate("/unauthorized"); // Updated to use navigate
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (
        (decoded.roomId === roomId && decoded.recipientId === studentId) ||
        decoded.senderId === instructor._id
      ) {
        console.log(decoded.senderId, "=====", instructor._id);

        setIsValidToken(true);
      } else {
        navigate("/unauthorized"); // Updated to use navigate
      }
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/unauthorized"); // Updated to use navigate
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
