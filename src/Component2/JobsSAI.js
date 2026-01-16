import React, { useEffect, useState } from "react";
import "../Component2/css/Profile.css";
import { ToastContainer } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/constants";

function JobsSAI() {
  const [activeTab, setActiveTab] = useState("saved");
  const [showModal, setShowModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  const candidate = JSON.parse(localStorage.getItem("candidate"));
  const candidateId = candidate?.can_id;
  console.log("Candidate LS:", candidate);
  console.log("Candidate ID:", candidate?.can_id);

  const fetchAllCounts = async () => {
    if (!candidateId) return;

    try {
      const [savedRes, appliedRes, interviewRes] = await Promise.all([
        axios.get(
          `${BASE_URL}hirelink_apis/candidate/getdatawhere/tbl_save_job/save_candidate_id/${candidateId}`
        ),
        axios.get(
          `${BASE_URL}hirelink_apis/candidate/getdatawhere/tbl_applied/apl_candidate_id/${candidateId}`
        ),
        axios.get(
          `${BASE_URL}hirelink_apis/candidate/getdatawhere/tbl_interview/itv_candidate_id/${candidateId}`
        ),
      ]);

      if (savedRes.data.status) setSavedCount(savedRes.data.data.length);

      if (appliedRes.data.status) setAppliedCount(appliedRes.data.data.length);

      if (interviewRes.data.status)
        setInterviewCount(interviewRes.data.data.length);
    } catch (err) {
      console.error("Count fetch error", err);
    }
  };

  useEffect(() => {
    if (candidateId) {
      fetchAllCounts(); // 🔥 COUNTS FIRST LOAD
    }
  }, [candidateId]);

  //save job display
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  const fetchSavedJobs = async () => {
    if (!candidateId) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}hirelink_apis/candidate/getdatawhere/tbl_save_job/save_candidate_id/${candidateId}`
      );

      console.log("Saved API:", res.data);

      if (res.data.status) {
        const savedList = res.data.data || [];

        // ✅ remove jobs which are already applied
        const filteredSaved = savedList.filter(
          (job) => !appliedJobIds.includes(Number(job.job_id))
        );

        setSavedJobs(filteredSaved);
      }
    } catch (error) {
      console.error("Saved jobs fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  // applied jobs
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [appliedCount, setAppliedCount] = useState(0);
  const [appliedLoading, setAppliedLoading] = useState(false);

  const fetchAppliedJobs = async () => {
    if (!candidateId) return;

    try {
      setAppliedLoading(true);

      const res = await axios.get(
        `${BASE_URL}hirelink_apis/candidate/getdatawhere/tbl_applied/apl_candidate_id/${candidateId}`
      );

      console.log("Applied API:", res.data);

      if (res.data.status) {
        setAppliedJobs(res.data.data);

        // ✅ applied job_ids list तयार कर
        const ids = res.data.data.map((item) => Number(item.job_id));
        setAppliedJobIds(ids);
      }
    } catch (error) {
      console.error("Applied jobs fetch error", error);
    } finally {
      setAppliedLoading(false);
    }
  };

  useEffect(() => {
    if (!candidateId) return;
    fetchAppliedJobs(); // ✅ Always load applied first
  }, [candidateId]);

  // interview jobs
  const [interviewJobs, setInterviewJobs] = useState([]);
  const [interviewCount, setInterviewCount] = useState(0);
  const [interviewLoading, setInterviewLoading] = useState(false);

  const fetchInterviewJobs = async () => {
    if (!candidateId) return;

    try {
      setInterviewLoading(true);

      const res = await axios.get(
        `${BASE_URL}hirelink_apis/candidate/getdatawhere/tbl_interview/itv_candidate_id/${candidateId}`
      );

      if (res.data.status) {
        setInterviewJobs(res.data.data);
      }
    } catch (error) {
      console.error("Interview jobs fetch error", error);
    } finally {
      setInterviewLoading(false);
    }
  };

  useEffect(() => {
    if (!candidateId) return;

    if (activeTab === "saved") {
      fetchSavedJobs();
    }

    if (activeTab === "applied") {
      fetchAppliedJobs();
    }

    if (activeTab === "interviews") {
      fetchInterviewJobs();
    }
  }, [activeTab, candidateId]); // ✅ removed appliedJobIds

  // 🔗 URL ↔ TAB SYNC
  useEffect(() => {
    if (location.pathname === "/profile") {
      navigate("/profile/saved-jobs", { replace: true });
    } else if (location.pathname.includes("saved-jobs")) {
      setActiveTab("saved");
    } else if (location.pathname.includes("applied-jobs")) {
      setActiveTab("applied");
    } else if (location.pathname.includes("interviews")) {
      setActiveTab("interviews");
    }
  }, [location.pathname, navigate]);

  const updateInterviewStatus = async (interviewId, newStatus) => {
    try {
      const res = await axios.post(
        `${BASE_URL}hirelink_apis/admin/updatedata/tbl_interview/itv_id/${interviewId}`,
        { itv_status: newStatus }
      );

      if (res.data.status) {
        fetchInterviewJobs(); // ✅ refresh interview list
        fetchAllCounts(); // ✅ refresh counts
      }
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  function UpdateStatusModal({ show, onClose }) {
    if (!show) return null;

    return (
      <div className="status-modal-overlay">
        <div className="status-modal">
          <div className="status-modal-header">
            <div>
              <h6 className="mb-0" style={{ fontWeight: "bold" }}>
                Update your application status
              </h6>
              <small className="text-muted d-flex align-items-center gap-1">
                <i
                  className="fa fa-eye"
                  style={{ textDecoration: "line-through" }}
                ></i>
                <span>Employers</span> won’t see this
              </small>
            </div>
            <button className="close-btn" onClick={onClose}>
              ×
            </button>
          </div>

          <ul className="status-list">
            <li className="status-item">
              <span className="icon green">←</span>
              Show the last Hirelink update
            </li>

            <li className="status-item">
              <span className="icon green">✔</span>
              Offer received
            </li>

            <li className="status-item">
              <span className="icon green">👤</span>
              Hired
            </li>

            <li className="status-item">
              <span className="icon red">✖</span>
              Not selected by employer
            </li>

            <li className="status-item last">
              <span className="icon red">👎</span>
              No longer interested
            </li>
          </ul>
        </div>
      </div>
    );
  }

  function ScheduleInterviewModal({ show, onClose, interview }) {
    if (!show || !interview) return null;

    const interviewDate = new Date(interview.itv_date).toLocaleDateString(
      "en-IN",
      { weekday: "long", day: "numeric", month: "long", year: "numeric" }
    );

    const interviewTime = new Date(
      `1970-01-01T${interview.itv_time}`
    ).toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <>
        {/* BACKDROP */}
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
          onClick={onClose}
        ></div>

        {/* MODAL */}
        <div className="modal fade show d-block" tabIndex="-1">
          <div
            className="modal-dialog modal-dialog-centered modal-sm modal-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-content border-0 shadow"
              style={{ borderRadius: "12px" }}
            >
              {/* HEADER */}
              <div className="modal-header border-0">
                <div>
                  <h5 className="fw-bold mb-1">Schedule your interview</h5>
                  <small className="text-muted">
                    {interview.job_title} - {interview.job_company}
                  </small>
                </div>

                <button className="btn-close" onClick={onClose}></button>
              </div>

              {/* BODY */}
              <div className="modal-body px-3 pt-3">
                {/* INFO */}
                <div className="mb-3">
                  <p className="mb-1">
                    📞 <strong>Interview type:</strong> {interview.itv_type}
                  </p>

                  {interview.itv_type === "Virtual Interview" && (
                    <p className="mb-0">
                      🔗 <strong>Meeting Link:</strong>{" "}
                      <a
                        href={interview.itv_meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Link
                      </a>
                    </p>
                  )}
                </div>

                <hr />

                {/* CONFIRM TIME */}
                <h6 className="fw-bold mb-1">Confirm your time</h6>
                <small className="text-muted">
                  All times in India Standard Time (UTC +5:30)
                </small>

                <div className="border rounded p-3 mt-3 text-center">
                  <p className="fw-semibold mb-1">{interviewDate}</p>

                  <p className="mb-3">
                    {interviewTime}
                    <br />
                    <small className="text-muted">
                      India Standard Time (UTC +5:30)
                    </small>
                  </p>

                  <button
                    className="btn btn-success w-100"
                    onClick={() => {
                      updateInterviewStatus(interview.itv_id, "Confirmed");
                      onClose();
                    }}
                  >
                    Confirm
                  </button>
                </div>

                {/* ACTIONS */}
                <div className="text-center mt-4">
                  <p className="mb-2">Can’t make it?</p>

                  <button
                    className="btn btn-outline-success w-100 mb-2"
                    style={{ borderRadius: "6px" }}
                  >
                    Reschedule Request
                  </button>

                  <button
                    className="btn btn-outline-danger w-100"
                    style={{ borderRadius: "6px" }}
                    onClick={() => {
                      updateInterviewStatus(
                        interview.itv_id,
                        "Candidate Cancelled"
                      );
                      onClose();
                    }}
                  >
                    Decline interview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  //helper of lower case uparcase
  const toTitleCase = (text = "") => {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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

      <main className="container my-5">
        {/* ================= TABS ================= */}
        <ul
          className="nav nav-pills gap-2 mb-4 flex-nowrap overflow-auto ps-4 pe-4"
          role="tablist"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* SAVED */}
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "saved" ? "active" : ""}`}
              type="button"
              onClick={() => navigate("/profile/saved-jobs")}
              style={{
                borderRadius: "30px",
                padding: "8px 18px",
                fontWeight: "500",
                backgroundColor: activeTab === "saved" ? "#22c55e" : "#f1f5f9",
                color: activeTab === "saved" ? "#fff" : "#0f172a",
                boxShadow:
                  activeTab === "saved"
                    ? "0 8px 20px rgba(34,197,94,0.35)"
                    : "none",
                border: "none",
                whiteSpace: "nowrap",
              }}
            >
              Saved{" "}
              <span
                className="badge ms-1"
                style={{
                  backgroundColor: activeTab === "saved" ? "#fff" : "#e5e7eb",
                  color: activeTab === "saved" ? "#22c55e" : "#0f172a",
                }}
              >
                {savedCount}
              </span>
            </button>
          </li>

          {/* APPLIED */}
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "applied" ? "active" : ""}`}
              type="button"
              onClick={() => navigate("/profile/applied-jobs")}
              style={{
                borderRadius: "30px",
                padding: "8px 18px",
                fontWeight: "500",
                backgroundColor:
                  activeTab === "applied" ? "#22c55e" : "#f1f5f9",
                color: activeTab === "applied" ? "#fff" : "#0f172a",
                border: "none",
                whiteSpace: "nowrap",
              }}
            >
              Applied{" "}
              <span
                className="badge ms-1"
                style={{
                  backgroundColor: activeTab === "applied" ? "#fff" : "#e5e7eb",
                  color: activeTab === "applied" ? "#22c55e" : "#0f172a",
                }}
              >
                {appliedCount}
              </span>
            </button>
          </li>

          {/* INTERVIEWS */}
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "interviews" ? "active" : ""
              }`}
              type="button"
              onClick={() => navigate("/profile/interviews")}
              style={{
                borderRadius: "30px",
                padding: "8px 18px",
                fontWeight: "500",
                backgroundColor:
                  activeTab === "interviews" ? "#22c55e" : "#f1f5f9",
                color: activeTab === "interviews" ? "#fff" : "#0f172a",
                border: "none",
                whiteSpace: "nowrap",
              }}
            >
              Interviews{" "}
              <span
                className="badge ms-1"
                style={{
                  backgroundColor:
                    activeTab === "interviews" ? "#fff" : "#e5e7eb",
                  color: activeTab === "interviews" ? "#22c55e" : "#0f172a",
                }}
              >
                {interviewCount}
              </span>
            </button>
          </li>
        </ul>

        {/* ================= TAB CONTENT ================= */}
        <div className="tab-content ps-2 pe-2">
          {/* SAVED */}
          {activeTab === "saved" && (
            <>
              {loading && <p className="text-center">Loading...</p>}

              {!loading && savedJobs.length === 0 && (
                <p className="text-center text-muted">No saved jobs found</p>
              )}

              {savedJobs.map((job) => (
                <div className="card mb-3 p-3" key={job.job_id}>
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
                    <div className="d-flex gap-3">
                      <div className="bg-light rounded p-3">
                        <i className="fa fa-building fs-4 text-secondary"></i>
                      </div>

                      <div>
                        <h6 className="fw-bold mb-1">
                          {toTitleCase(job.job_title)}
                        </h6>
                        <p className="mb-0">{job.job_company}</p>
                        <small className="text-muted">
                          {job.city_name}, {job.state_name}
                        </small>
                        {/* <p className="mb-0 text-muted">Saved {job.saved_at}</p> */}
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3 mt-2 mt-md-0">
                      {!appliedJobIds.includes(Number(job.job_id)) && (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => navigate(`/apply/${job.job_id}`)}
                        >
                          Apply now
                        </button>
                      )}

                      {/* <i className="fa fa-bookmark text-success"></i>
                      <i className="fa fa-ellipsis-vertical"></i> */}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* APPLIED */}
          {activeTab === "applied" && (
            <>
              {appliedLoading && <p className="text-center">Loading...</p>}

              {!appliedLoading && appliedJobs.length === 0 && (
                <p className="text-center text-muted">No applied jobs found</p>
              )}

              {appliedJobs.map((job) => (
                <div className="card mb-3 p-3" key={job.job_id}>
                  <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                    <div className="d-flex gap-3">
                      <div className="bg-light rounded p-3">
                        <i className="fa fa-building fs-4 text-secondary"></i>
                      </div>

                      <div>
                        {/* <span className="badge bg-success mb-1">
                          {job.application_status}
                        </span> */}

                        <h6 className="fw-bold mb-1">
                          {toTitleCase(job.job_title)}
                        </h6>

                        <p className="mb-0">{job.job_company}</p>

                        <small className="text-muted">
                          {job.city_name}, {job.state_name}
                        </small>

                        <p className="mb-0 text-muted">
                          Applied {job.apl_added_date}
                        </p>
                      </div>
                    </div>

                    <div>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => setShowModal(true)}
                      >
                        Update status
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Modal */}
          <UpdateStatusModal
            show={showModal}
            onClose={() => setShowModal(false)}
          />

          <ScheduleInterviewModal
            show={showScheduleModal}
            onClose={() => setShowScheduleModal(false)}
            interview={selectedInterview}
          />

          {/* INTERVIEWS */}
          {activeTab === "interviews" && (
            <>
              {interviewLoading && <p className="text-center">Loading...</p>}

              {!interviewLoading && interviewJobs.length === 0 && (
                <p className="text-center text-muted">
                  No interviews scheduled
                </p>
              )}

              {interviewJobs.map((job) => (
                <div
                  className="card p-4 position-relative mb-3"
                  key={job.job_id}
                >
                  {/* TOP BADGE */}
                  <span
                    className="badge bg-success position-absolute"
                    style={{ top: "15px", left: "15px" }}
                  >
                    Interview Scheduled
                  </span>

                  <h6 className="fw-bold mt-4">
                    {new Date(job.itv_date).toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </h6>

                  <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                    <div>
                      <h6 className="fw-bold mb-1">
                        {toTitleCase(job.job_title)}
                      </h6>

                      <p className="mb-0">{job.job_company}</p>

                      <small className="text-muted">
                        {job.city_name}, {job.state_name}
                      </small>

                      <div className="mt-2">
                        <p className="mb-1">
                          <i className="fa fa-clock me-2"></i>
                          {new Date(
                            `1970-01-01T${job.itv_time}`
                          ).toLocaleTimeString("en-IN", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>

                        <p className="mb-0">
                          {job.itv_type === "Virtual Interview" ? (
                            <>
                              <i className="fa fa-video-camera me-2 text-success"></i>

                              <a
                                href={job.itv_meeting_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none fw-semibold"
                              >
                                Virtual Interview
                              </a>
                            </>
                          ) : (
                            <>
                              <i className="fa fa-map-marker me-2 text-success"></i>
                              In-Person Interview
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          setSelectedInterview(job); // ✅ clicked interview store
                          setShowScheduleModal(true); // ✅ open modal
                        }}
                      >
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default JobsSAI;
