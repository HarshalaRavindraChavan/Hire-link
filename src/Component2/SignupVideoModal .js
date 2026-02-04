import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../Component2/css/SignupVideoModal.css";

const SignupVideoModal = ({ show }) => {
  const [videoCompleted, setVideoCompleted] = useState(false);

  useEffect(() => {
    if (!show) return;

    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player("youtube-player", {
        videoId: "9S-CHtyU53c",
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          rel: 0,
          modestbranding: 1
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              setVideoCompleted(true); // ✅ enable Next
            }
          }
        }
      });
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h4>Watch Before Signup</h4>

        {/* YouTube Player */}
        <div id="youtube-player" className="video-box"></div>

        {/* NEXT BUTTON */}
        <NavLink
          to={videoCompleted ? "/signup" : "#"}
          onClick={(e) => !videoCompleted && e.preventDefault()}
          className={`next-btn ${videoCompleted ? "active" : "disabled"}`}
        >
          Next
        </NavLink>
      </div>
    </div>
  );
};

export default SignupVideoModal;
