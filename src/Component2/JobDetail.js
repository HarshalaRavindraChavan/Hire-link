import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../config/constants";

function JobDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();

  // "15-react-developer" → 15
  const jobId = slug?.split("-")[0];

  const [job, setJob] = useState(state?.job || null);
  const [loading, setLoading] = useState(!state?.job);

  /* ================= FETCH JOB IF PAGE REFRESH / DIRECT URL ================= */
  useEffect(() => {
    if (!job && jobId) {
      axios
        .get(
          `${BASE_URL}hirelink_apis/candidate/getdatawhere/tbl_job/job_id/${jobId}`
        )
        .then((res) => {
          if (
            (res.data.status === true || res.data.status === "success") &&
            res.data.data?.length > 0
          ) {
            setJob(res.data.data[0]);
          } else {
            navigate("/jobs");
          }
        })
        .catch(() => navigate("/jobs"))
        .finally(() => setLoading(false));
    }
  }, [job, jobId, navigate]);

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <p className="fw-semibold">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mt-5 text-center">
        <p className="fw-semibold text-danger">Job not found</p>
      </div>
    );
  }

  const handleApplyClick = () => {
    const candidate = JSON.parse(localStorage.getItem("candidate"));

    if (!candidate?.can_id) {
      toast.warn("Please login to apply for job");
      navigate("/signin");
      return;
    }

    navigate(`/apply/${job.job_id}`);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      {/* JOB CARD */}
      <div
        style={{
          background: "#ffffff",
          margin: "12px 0 50px 0",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        {/* Job Title */}
        <h2
          style={{
            margin: "0 0 6px 0",
            fontSize: "20px",
            color: "#111",
          }}
        >
          {job.job_title}
        </h2>

        {/* Company */}
        <div
          style={{
            fontSize: "14px",
            color: "#555",
            marginBottom: "6px",
          }}
        >
          <strong>{job.job_company}</strong>
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: "13px",
            color: "#777",
            marginBottom: "12px",
          }}
        >
          {job.city_name},{job.state_name}
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #eee",
            margin: "12px 0",
          }}
        />

        {/* Job Details */}
        <h4
          style={{
            margin: "0 0 8px 0",
            fontSize: "16px",
            color: "#000",
            fontWidth: "700",
          }}
        >
          Job Type
        </h4>

        <div style={{ marginBottom: "12px" }}>
          <span
            style={{
              display: "inline-block",
              background: "#eef2f7",
              padding: "6px 10px",
              borderRadius: "20px",
              fontSize: "13px",
              color: "#333",
            }}
          >
            {job.job_type}
          </span>
        </div>

        {/* Pay Section */}
        <h4
          style={{
            margin: "16px 0 6px 0",
            fontSize: "16px",
          }}
        >
          {" "}
          <i className="fa-solid fa-money-bill"></i> Pay
        </h4>
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#444",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: "#eef2f7",
              padding: "6px 10px",
              borderRadius: "20px",
              fontSize: "13px",
              color: "#333",
            }}
          >
            <i className="fa-solid fa-indian-rupee-sign"></i> {job.job_salary}
          </span>
        </p>

        {/* Location Section */}
        <h4
          style={{
            margin: "16px 0 6px 0",
            fontSize: "16px",
          }}
        >
          {" "}
          <i className="fa-solid fa-location-dot"></i> Location
        </h4>
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#444",
          }}
        >
          {job.city_name} , {job.state_name}
        </p>

        {/* Skills Section */}
        <h4
          style={{
            margin: "16px 0 6px 0",
            fontSize: "16px",
          }}
        >
          <i className="fa-solid fa-hand-point-right"></i> Skills
        </h4>

        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#444",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {job?.job_skills?.split(",").map((skill, index) => (
            <span
              key={index}
              style={{
                display: "inline-block",
                background: "#eef2f7",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                color: "#333",
                textTransform: "capitalize",
              }}
            >
              {skill.trim()}
            </span>
          ))}
        </p>

        {/* Description */}
        <h4
          style={{
            margin: "16px 0 6px 0",
            fontSize: "18px",
          }}
        >
          Full job description
        </h4>

        <p
          style={{
            fontSize: "14px",
            color: "#333",
            lineHeight: 1.6,
          }}
        >
          {job.job_description}
        </p>

        {/* <p
          style={{
            fontSize: "14px",
            color: "#333",
            lineHeight: 1.6,
          }}
        >
          The ideal candidate must be able to solve tough technical problems,
          understand previous written code, update existing websites, create new
          websites and write clean, well documented code.
        </p> */}

        {/* <p
          style={{
            fontSize: "14px",
            color: "#333",
            fontWeight: "bold",
          }}
        >
          Energetic, Honest, Punctual.
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#333",
          }}
        >
          Minimum 6 months experience in PHP, MySQL, JavaScript, jQuery,
          WordPress required.
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#333",
          }}
        >
          Knowledge of Node.js and AngularJS is preferred.
        </p> */}
      </div>

      {/* ACTION BUTTONS */}
      <div
        style={{
          position: "relative",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#ffffff",
          padding: "10px 12px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          style={{
            flex: 1,
            background: "#008b0c",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            padding: "12px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
          onClick={handleApplyClick}
        >
          Apply now
        </button>

        {/* <button
          style={{
            background: "#ffffff",
            color: "#b1b1b1",
            border: "1px solid #b1b1b1",
            borderRadius: "6px",
            padding: "12px 14px",
            fontSize: "14px",
          }}
        >
          Save
        </button> */}
      </div>
    </>
  );
}

export default JobDetail;
