// src/App.js
import React, { useEffect, useState } from "react";
import VideoCall from "./components/VideoCall";

const App = () => {
  const [callUrl, setCallUrl] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const param = queryParams.get("param");

    if (param) {
      fetch("https://9fb6-101-0-63-199.ngrok-free.app/meetings/start_call", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qr_code_id: "e07843fc-f334-4158-b4f7-74ccf29203ad",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // alert(data.meeting_id);
          if (data.meeting_id) {
            setCallUrl(data.meeting_id);
          } else {
            setError("Failed to fetch call URL");
          }
        })
        .catch(() => setError("Failed to fetch call URL"));
    } else {
      setError("No parameter found in URL");
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!callUrl) {
    return <div>Loading...</div>;
  }

  return <VideoCall callUrl={callUrl} />;
};

export default App;
