import React, { useEffect, useState } from "react";

const PlayStoreButton = () => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setExpanded(true);

      setTimeout(() => {
        setExpanded(false);
      }, 3000); // expanded time
    }, 8000); // total loop

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.hirelink&pcampaignid=web_share",
      "_blank",
    );
  };

  return (
    <div style={styles.wrapper} onClick={handleClick}>
      <div
        style={{
          ...styles.container,
          width: expanded ? "160px" : "50px",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
          alt="Play Store"
          style={styles.icon}
        />

        <span
          style={{
            ...styles.text,
            opacity: expanded ? 1 : 0,
          }}
        >
          Download App
        </span>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 9999,
    cursor: "pointer",
  },

  container: {
    height: "50px",
    borderRadius: "50px",
    background: "linear-gradient(135deg, #e6e6e6, #e6e6e6)",
    display: "flex",
    alignItems: "center",
    padding: "0 15px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
    transition: "all 0.5s ease",
  },

  icon: {
    width: "25px",
    height: "25px",
    flexShrink: 0,
  },

  text: {
    marginLeft: "10px",
    color: "#000000",
    fontWeight: "600",
    whiteSpace: "nowrap",
    transition: "opacity 0.3s ease",
  },
};

export default PlayStoreButton;
