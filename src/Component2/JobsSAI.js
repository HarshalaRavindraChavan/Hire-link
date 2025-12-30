import React, { useEffect, useState } from "react";
import "../Component2/css/Profile.css";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";


function JobsSAI() {
  const [activeTab, setActiveTab] = useState("saved");
  const [showModal, setShowModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

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
              Show the last Indeed update
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

  function ScheduleInterviewModal({ show, onClose }) {
    if (!show) return null;

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
                  <small className="text-muted">Step 1 of 2</small>
                </div>

                <button className="btn-close" onClick={onClose}></button>
              </div>

              {/* PROGRESS BAR */}
              <div className="px-3">
                <div className="progress" style={{ height: "6px" }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>

              {/* BODY */}
              <div className="modal-body px-3 pt-3">
                {/* INFO */}
                <div className="mb-3">
                  <p className="mb-1">
                    📞 <strong>This will be a phone interview</strong>
                  </p>

                  <p className="mb-1">
                    📝 <strong>A note from Esenceweb IT:</strong>
                  </p>
                </div>

                <hr />

                {/* CONFIRM TIME */}
                <h6 className="fw-bold mb-1">Confirm your time</h6>
                <small className="text-muted">
                  All times in India Standard Time (UTC +5:30)
                </small>

                <div className="border rounded p-3 mt-3 text-center">
                  <p className="fw-semibold mb-1">
                    Thursday, December 17, 2025
                  </p>

                  <p className="mb-3">
                    09:00 AM – 09:30 AM <br />
                    <small className="text-muted">
                      India Standard Time (UTC +5:30)
                    </small>
                  </p>

                  <button
                    className="btn btn-success w-100"
                    style={{ borderRadius: "6px" }}
                  >
                    Continue
                  </button>
                </div>

                {/* ACTIONS */}
                <div className="text-center mt-4">
                  <p className="mb-2">Can’t make it?</p>

                  <button
                    className="btn btn-outline-success w-100 mb-2"
                    style={{ borderRadius: "6px" }}
                  >
                    Suggest a new time
                  </button>

                  <button
                    className="btn btn-outline-danger w-100"
                    style={{ borderRadius: "6px" }}
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
              onClick={() => setActiveTab("saved")}
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
                1
              </span>
            </button>
          </li>

          {/* APPLIED */}
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "applied" ? "active" : ""}`}
              type="button"
              onClick={() => setActiveTab("applied")}
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
                2
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
              onClick={() => setActiveTab("interviews")}
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
                1
              </span>
            </button>
          </li>
        </ul>

        {/* ================= TAB CONTENT ================= */}
        <div className="tab-content ps-2 pe-2">
          {/* SAVED */}
          {activeTab === "saved" && (
            <div className="card mb-3 p-3">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
                <div className="d-flex gap-3">
                  <div className="bg-light rounded p-3">
                    <i className="fa fa-building fs-4 text-secondary"></i>
                  </div>

                  <div>
                    <h6 className="fw-bold mb-1">Sr. Website Designer</h6>
                    <p className="mb-0">Esenceweb</p>
                    <small className="text-muted">Pune, Maharashtra</small>
                    <p className="mb-0 text-muted">Saved today</p>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 mt-2 mt-md-0">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => Navigate("/apply")}
                  >
                    Apply now
                  </button>

                  <i className="fa fa-bookmark"></i>
                  <i className="fa fa-ellipsis-vertical"></i>
                </div>
              </div>
            </div>
          )}

          {/* APPLIED */}
          {activeTab === "applied" && (
            <>
              <h6 className="fw-bold mt-3 mb-2 ps-3">Last 14 days</h6>

              <div className="card mb-3 p-3">
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                  <div className="d-flex gap-3">
                    <div className="bg-light rounded p-3">
                      <i className="fa fa-building fs-4 text-secondary"></i>
                    </div>

                    <div>
                      <span className="badge bg-success mb-1">
                        Interviewing
                      </span>
                      <h6 className="fw-bold mb-1">
                        Lead Generation Specialist
                      </h6>
                      <p className="mb-0">Esenceweb IT</p>
                      <small className="text-muted">Pune, Maharashtra</small>
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
            </>
          )}

          {/* Modal */}
          <UpdateStatusModal
            show={showModal}
            onClose={() => setShowModal(false)}
          />

          {/* INTERVIEWS */}
          {activeTab === "interviews" && (
            <div className="card p-4 position-relative">
              {/* LEFT TOP BADGE */}
              <span
                className="badge bg-success position-absolute"
                style={{ top: "15px", left: "15px" }}
              >
                Interview starts in 19 hours
              </span>

              <h6 className="fw-bold mt-4">Wednesday, 17 December</h6>
              <hr />

              <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                <div>
                  <h6 className="fw-bold mb-1">Lead Generation Specialist</h6>
                  <p className="mb-0">Esenceweb IT</p>
                  <small className="text-muted">Pune, Maharashtra</small>

                  <div className="mt-2">
                    <p className="mb-1">
                      <i className="fa fa-clock me-2"></i>
                      9:00 am – 9:30 am IST
                    </p>
                    <p className="mb-0">
                      <i className="fa fa-phone me-2"></i>
                      Phone interview
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-column flex-sm-row gap-2 mt-3 mt-md-0">
                  <button
                    className="btn btn-success"
                    onClick={() => setShowScheduleModal(true)}
                    style={{
                      height: "40px",
                      padding: "0 18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Schedule
                  </button>

                  <ScheduleInterviewModal
                    show={showScheduleModal}
                    onClose={() => setShowScheduleModal(false)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default JobsSAI;
