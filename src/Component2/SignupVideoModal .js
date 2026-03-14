import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/constants";
import "../Component2/css/SignupVideoModal.css";

const SignupVideoModal = ({ show }) => {
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const progressTimer = useRef(null);
  const lastAllowedTime = useRef(0);

  const [selectedRole, setSelectedRole] = useState(null);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  // 🔹 dynamic info state
  const [info, setInfo] = useState({
    info_can_signup: "",
  });

  // 🔹 dynamic videos object
  const videos = {
    candidate: info.info_can_signup,
    employer: null,
  };

  /* 🔹 Get video id from database */
  useEffect(() => {
    getInformation();
  }, []);

  const getInformation = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}admin/getdatawhere/tbl_setting/sett_id/5`,
      );

      if (res.data && res.data.data.length > 0) {
        const data = res.data.data[0];

        setInfo({
          info_can_signup: data.info_can_signup || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* 🔹 Load YouTube API once */
  useEffect(() => {
    if (!show) return;

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, [show]);

  /* 🔹 Create Player */
  useEffect(() => {
    if (!show || !selectedRole) return;

    if (!videos[selectedRole]) return;

    if (!window.YT || !window.YT.Player) return;

    lastAllowedTime.current = 0;
    setVideoCompleted(false);
    setProgress(0);
    setPlayedSeconds(0);

    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new window.YT.Player("youtube-player", {
      videoId: videos[selectedRole],
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        rel: 0,
        modestbranding: 1,
      },
      events: {
        onReady: startTracking,
        onStateChange: onPlayerStateChange,
      },
    });

    return () => {
      clearInterval(progressTimer.current);
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [selectedRole, show, info]);

  const handleRoleSelect = (role) => {
    if (role === "employer" && !videos.employer) {
      localStorage.setItem("signupRole", role);
      localStorage.setItem("videoCompleted", "true");
      navigate("/signup");
      return;
    }

    setSelectedRole(role);
  };

  /* 🔹 Smooth progress tracking + forward seek block */
  const startTracking = () => {
    progressTimer.current = setInterval(() => {
      if (!playerRef.current) return;

      const currentTime = playerRef.current.getCurrentTime();
      const duration = playerRef.current.getDuration();

      if (currentTime > lastAllowedTime.current + 2) {
        playerRef.current.seekTo(lastAllowedTime.current);
        return;
      }

      if (currentTime > lastAllowedTime.current) {
        lastAllowedTime.current = currentTime;
      }

      setPlayedSeconds(Math.floor(currentTime));
      setProgress(Math.floor((currentTime / duration) * 100));
    }, 500);
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      clearInterval(progressTimer.current);
      setVideoCompleted(true);
      setProgress(100);

      localStorage.setItem("videoCompleted", "true");
    }
  };

  const handleNext = () => {
    localStorage.setItem("signupRole", selectedRole);
    navigate("/signup");
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {!selectedRole ? (
          <>
            <h4 style={{ fontWeight: "bold" }}>Select Register Type</h4>
            <div className="d-flex gap-3 justify-content-center mt-3">
              <button
                className="role-pill"
                onClick={() => handleRoleSelect("candidate")}
              >
                Candidate
              </button>

              <button
                className="role-pill"
                onClick={() => handleRoleSelect("employer")}
              >
                Employer
              </button>
            </div>
          </>
        ) : (
          <>
            <h4 style={{ fontWeight: "bold" }}>
              {selectedRole === "candidate"
                ? "Candidate Signup Guide"
                : "Employer Signup Guide"}
            </h4>

            <div id="youtube-player" className="video-box"></div>

            {/* 🔹 Progress Bar */}
            <div className="video-progress-wrapper">
              <div className="video-progress-bar">
                <div
                  className="video-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <small>
                {playedSeconds}s watched ({progress}%)
              </small>
            </div>

            <button
              className={`next-btn ${videoCompleted ? "active" : "disabled"}`}
              disabled={!videoCompleted}
              onClick={handleNext}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupVideoModal;
