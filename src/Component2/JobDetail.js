import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
          `https://norealtor.in/hirelink_apis/candidate/getdatawhere/tbl_job/job_id/${jobId}`
        )
        .then((res) => {
          if (res.data?.status && res.data.data?.length > 0) {
            setJob(res.data.data[0]); // ✅ FIXED
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

  return (
    <div className="container mt-3 mb-5">
      {/* BACK */}
      <button className="btn btn-light mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* HEADER */}
      <h4 className="fw-bold">{job.job_title}</h4>
      <p className="text-muted">
        {job.job_company} · {job.city_name}, {job.state_name}
      </p>

      <p className="fw-semibold text-success fs-5">₹{job.job_salary} a month</p>

      {/* APPLY */}
      <button
        className="apply-btn w-100 mb-4"
        onClick={() =>
          navigate("/apply", {
            state: { job },
          })
        }
      >
        Apply Now
      </button>

      <hr />

      {/* DETAILS */}
      <h6 className="fw-bold">Skills</h6>
      <p>{job.job_skills || "Not specified"}</p>

      <h6 className="fw-bold">Job Description</h6>
      <p>{job.job_description}</p>

      <h6 className="fw-bold">Job Type</h6>
      <p>{job.job_type}</p>

      <h6 className="fw-bold">Location</h6>
      <p>
        {job.city_name}, {job.state_name}
      </p>
    </div>
  );
}

export default JobDetail;
