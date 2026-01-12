import React from "react";

function SpinnerLoader({ size = 40, color = "#0d6efd", fullPage = false }) {
  const spinnerStyle = {
    width: size,
    height: size,
    border: `4px solid #e9ecef`,
    borderTop: `4px solid ${color}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    minHeight: fullPage ? "60vh" : "auto",
  };

  return (
    <>
      <style>
        {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
      </style>

      <div style={wrapperStyle}>
        <div style={spinnerStyle}></div>
      </div>
    </>
  );
}

export default SpinnerLoader;
