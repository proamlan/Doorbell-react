import React, { useState, useEffect } from "react";
import DailyIframe from "@daily-co/daily-js";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";

const VideoCall = ({ callUrl }) => {
  const [callObject, setCallObject] = useState(null);
  const [error, setError] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    const initializeCall = async () => {
      try {
        // Initialize Daily.co call
        const newCallObject = DailyIframe.createFrame({
          url: callUrl,
          showLeaveButton: true,
          iframeStyle: {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          },
        });

        newCallObject.join().then(() => {
          setCallObject(newCallObject);
        });
      } catch (err) {
        setError(err.message);
      }
    };

    initializeCall();

    return () => {
      if (callObject) {
        callObject.destroy();
      }
    };
  }, []);

  const toggleMute = () => {
    if (callObject) {
      callObject.setLocalAudio(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (callObject) {
      callObject.setLocalVideo(!isVideoOff);
      setIsVideoOff(!isVideoOff);
    }
  };

  const endCall = () => {
    if (callObject) {
      callObject.leave();
      window.location.href = "/"; // Redirect to home page or wherever you want
    }
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
      </Alert>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-end p-4">
      <div className="flex space-x-2 mb-4">
        <Button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</Button>
        <Button onClick={toggleVideo}>
          {isVideoOff ? "Turn Video On" : "Turn Video Off"}
        </Button>
        <Button onClick={endCall} variant="destructive">
          End Call
        </Button>
      </div>
    </div>
  );
};

export default VideoCall;
