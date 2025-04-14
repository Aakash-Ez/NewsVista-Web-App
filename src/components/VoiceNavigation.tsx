import React, { useEffect, useRef } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

// Define global type if not available
interface CustomWindow extends Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}

declare const window: CustomWindow;

const VoiceNavigation: React.FC = () => {
  const navigate = useNavigate();
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      message.error("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    let shouldRestart = true;

    recognition.onstart = () => {
      console.log("Speech recognition started");
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      if (shouldRestart) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (e) {
            console.warn("Recognition restart failed:", e);
          }
        }, 1000);
      }
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
      console.log("Voice Command Received:", transcript);

      if (transcript.includes("get latest news")) {
        navigate("/latest-news");
        message.success("Navigating to Latest News");
      } else if (transcript.includes("get dashboard")) {
        navigate("/dashboard");
        message.success("Navigating to Dashboard");
      } else {
        message.warning("Command not recognized.");
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === 'aborted' || event.error === 'not-allowed') {
        shouldRestart = false;
      }
      message.error("Speech recognition error: " + event.error);
    };

    try {
      recognition.start();
    } catch (error) {
      console.warn("Initial recognition start failed:", error);
    }

    recognitionRef.current = recognition;

    return () => {
      shouldRestart = false;
      recognition.stop();
    };
  }, [navigate]);

  return <div>🎙️ Voice Navigation Active. Say "Get Latest News" or "Get Dashboard".</div>;
};

export default VoiceNavigation;
