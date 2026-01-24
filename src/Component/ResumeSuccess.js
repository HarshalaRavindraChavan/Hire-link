import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ResumeSuccess() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("resumeDownload"));

  // 🔐 Protect page
//   useEffect(() => {
//     if (!data) {
//       navigate("/");
//     }
//   }, [data, navigate]);

//   if (!data) return null;

  const downloadResume = () => {
    window.open(data.resumeUrl, "_blank");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 text-center" style={{ maxWidth: 500 }}>
        <h2 className="text-success"style={{fontWeight:"bold"}}>Resume Download</h2>
        <p className="mt-2"style={{fontWeight:"bold",color:"black"}}>
          Your resume has been downloaded successfully
        </p>

        <div className="border rounded p-3 mt-3 text-start">
          <p><strong>Name:</strong> 
          {/* {data.name} */}
          </p>
          <p><strong>Email:</strong>
           {/* {data.email} */}
           </p>
          <p><strong>Date:</strong>
           {/* {data.date} */}
           </p>
        </div>

        {/* <button
          className="btn btn-primary w-100 mt-3"
          onClick={downloadResume}
        >
          ⬇ Download Again
        </button> */}

        <button
          className="btn btn-success w-100 mt-2"
          onClick={() => navigate("/profile")}
          style={{fontWeight:"bold"}}
        >
          Go to Profile
        </button>
      </div>
    </div>
  );
}

export default ResumeSuccess;
