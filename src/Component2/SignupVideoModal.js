import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/constants";
import "../Component2/css/SignupVideoModal.css";
import { parseApiResponse } from "../config/parseApiResponse";

const SignupVideoModal = ({ show, forceRole, onClose }) => {
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

  useEffect(() => {
    if (forceRole) {
      setSelectedRole(forceRole);
    }
  }, [forceRole]);

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
      const response = await axios.get(
        `${BASE_URL}admin/getdatawhere/tbl_setting/sett_id/5`,
      );

      const res = parseApiResponse(response);
      console.log("video", res.info_can_signup, "status", res.status);

      if (res.status === true && res.data.length > 0) {
        const data = res.data[0];

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
    // ✅ Candidate → direct signup (NO video)
    if (role === "candidate") {
      localStorage.setItem("signupRole", role);
      localStorage.setItem("videoCompleted", "true"); // bypass video
      navigate("/signup");
      return;
    }

    // ✅ Employer → same flow (जर video नसेल तर direct)
    if (role === "employer" && !videos.employer) {
      localStorage.setItem("signupRole", role);
      localStorage.setItem("videoCompleted", "true");
      navigate("/signup");
      return;
    }

    // ❌ video play only if needed
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
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          ✖
        </button>
        {!selectedRole ? (
          <>
            <h4 className="select-role-title">Select Register Type</h4>

            <p className="select-role-subtitle">
              Choose how you want to continue with Pharma Jobs
            </p>

            <div className="role-selection-wrapper">
              {/* CANDIDATE */}
              <div
                className="role-card candidate"
                onClick={() => handleRoleSelect("candidate")}
              >
                <div className="role-icon">
                  <i className="fa-solid fa-user"></i>
                </div>

                <h5>Candidate</h5>

                <p>
                  Apply for jobs, track applications, and build your
                  professional profile.
                </p>
              </div>

              {/* EMPLOYER */}
              <div
                className="role-card employer"
                onClick={() => handleRoleSelect("employer")}
              >
                <div className="role-icon">
                  <i className="fa-solid fa-briefcase"></i>
                </div>

                <h5>Employer</h5>

                <p>
                  Post jobs, manage candidates, and hire top pharma talent
                  faster.
                </p>
              </div>
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
