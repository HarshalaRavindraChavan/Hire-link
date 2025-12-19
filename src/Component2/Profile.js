import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Component2/css/Profile.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Profile() {
  const [activeTab, setActiveTab] = useState("saved");
  const [showModal, setShowModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const [candidate, setCandidate] = React.useState({
    can_id: "",
    can_mobile: "",
    can_address: "",
    can_city: "",
    can_state: "",
    can_experience: "",
    can_skill: "",
    can_about: "",
  });

  const navigate = useNavigate();

  // React.useEffect(() => {
  //   const stored = localStorage.getItem("candidate");

  //   if (!stored) {
  //     navigate("/signin");
  //     return;
  //   }

  //   if (stored) {
  //     setCandidate(JSON.parse(stored));
  //   }
  // }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!candidate?.can_id) {
      toast.error("Candidate ID missing");
      return;
    }

    try {
      const response = await axios.post(
        `https://norealtor.in/hirelink_apis/candidate/updatedata/tbl_candidate/can_id/${candidate.can_id}`,
        {
          can_mobile: candidate.can_mobile,
          can_address: candidate.can_address,
          can_city: candidate.can_city,
          can_state: candidate.can_state,
          can_experience: candidate.can_experience,
          can_skill: candidate.can_skill,
          can_about: candidate.can_about,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;

      if (result?.status === true) {
        toast.success("Profile updated successfully ✅");

        const updatedCandidate = {
          ...candidate,
          ...result.data,
        };

        localStorage.setItem("candidate", JSON.stringify(updatedCandidate));

        setTimeout(() => {
          const modalEl = document.getElementById("editProfileModal");

          if (modalEl && window.bootstrap) {
            const modalInstance =
              window.bootstrap.Modal.getInstance(modalEl) ||
              new window.bootstrap.Modal(modalEl);

            modalInstance.hide();
          }
        }, 800);
      } else {
        toast.error(result?.message || "Update failed");
      }
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      toast.error(error.response?.data?.message || "Server error. Try again.");
    }
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
        {/* ================= PROFILE CARD ================= */}
        <div className="card p-4 mb-4">
          <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4 text-center text-md-start">
            {/* Profile Image */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              className="rounded-circle"
              width="90"
              height="90"
              alt="Candidate"
            />

            {/* Profile Info */}
            <div className="flex-grow-1">
              <h5 className="mb-1 fw-bold">
                {" "}
                {candidate.can_name
                  ?.split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </h5>
              <p className="mb-1 text-muted">
                {candidate.can_email} | {candidate.can_mobile}
              </p>
              <p className="mb-0 text-muted">
                {candidate.can_address}
                <br />
                {candidate.can_city}, {candidate.can_state}
              </p>
            </div>

            {/* Edit Button */}
            <button
              className="btn btn-outline-success mt-3 mt-md-0"
              data-bs-toggle="modal"
              data-bs-target="#editProfileModal"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div class="modal fade" id="editProfileModal" tabindex="-1">
          <div class="modal-dialog modal-dialog-scrollable modal-md">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Edit Profile</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
              </div>

              {/* ================= MODAL BODY ================= */}
              <div className="modal-body px-4 py-2">
                {/* PROFILE IMAGE SECTION */}
                <div className="d-flex align-items-center gap-3 mb-3">
                  <input type="hidden" value={candidate.can_id} />
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    className="rounded-circle border"
                    width="90"
                    height="90"
                    alt="Profile"
                  />

                  <div className="flex-grow-1">
                    <h5 className="mb-1 fw-bold">
                      {" "}
                      {candidate.can_name
                        ?.split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </h5>
                    <p className="mb-1 text-muted">
                      {" "}
                      {candidate.can_email} | {candidate.can_mobile}
                    </p>
                    {/* <p className="mb-0 text-muted">
                    {/* {candidate.can_city}, {candidate.can_state} <br /> */}
                    {/* {candidate.can_address} 
                  </p> */}
                  </div>
                </div>

                <hr className="my-2" />

                {/* BASIC DETAILS */}
                <h6 className="fw-bold mb-2">Professional Information</h6>
                <div className="row g-2 mb-2">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="can_mobile"
                      className="form-control form-control-md"
                      placeholder="Mobile"
                      value={candidate.can_mobile}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      name="can_address"
                      className="form-control form-control-md"
                      placeholder="Address"
                      value={candidate.can_address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      name="can_city"
                      className="form-control form-control-md"
                      placeholder="City"
                      value={candidate.can_city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      name="can_state"
                      className="form-control form-control-md"
                      placeholder="State"
                      value={candidate.can_state}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="btn btn-outline-success w-100">
                      <i className="fa fa-upload me-2"></i>Upload Resume
                      <input
                        type="file"
                        hidden
                        name="resume"
                        onChange={(e) =>
                          setCandidate({
                            ...candidate,
                            resume: e.target.files[0],
                          })
                        }
                      />
                    </label>
                  </div>

                  <div className="col-md-6">
                    <label className="btn btn-outline-success w-100">
                      <i className="fa fa-upload me-2"></i>Upload CV
                      <input
                        type="file"
                        hidden
                        name="cv"
                        onChange={(e) =>
                          setCandidate({ ...candidate, cv: e.target.files[0] })
                        }
                      />
                    </label>
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      name="can_experience"
                      className="form-control form-control-md"
                      placeholder="Experience"
                      value={candidate.can_experience}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      name="can_skill"
                      className="form-control form-control-md"
                      placeholder="Skills"
                      value={candidate.can_skill}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <textarea
                      name="can_about"
                      className="form-control form-control-md"
                      rows="2"
                      placeholder="Briefly describe yourself"
                      value={candidate.can_about}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                {/* ADDRESS */}
                <h6 className="fw-bold mb-2">Category</h6>

                <div className="row g-2">
                  <div className="col-md-6">
                    <select className="form-control form-select rounded-3">
                      <option value="">Select</option>
                      <option value="Active">Pharmaceutical Jobs</option>
                      <option value="Active">Nutraceutics Jobs</option>
                      <option value="Active">Pharmacist Jobs</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <select className="form-control form-select rounded-3">
                      <option value="">Select</option>
                      <option value="Active">R & D</option>
                      <option value="Active">Manufacturing</option>
                      <option value="Active">Clinical Trials</option>
                      <option value="Active">Bioequilances</option>
                      <option value="Active">Regulatory</option>
                      <option value="Active">
                        Intellectual Property Rights (IPR)
                      </option>
                      <option value="Active">Logistics Chain supply</option>
                      <option value="Active">Marketing</option>
                      <option value="Active">Sales</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select className="form-control form-select rounded-3">
                      <option value="">Select</option>
                      <option value="Active">Active</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select className="form-control form-select rounded-3">
                      <option value="">Select</option>
                      <option value="Active">Active</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select className="form-control form-select rounded-3">
                      <option value="">Select</option>
                      <option value="Active">Active</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ================= MODAL FOOTER ================= */}
              <div className="modal-footer border-0 px-4 py-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-3"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-success px-4 ms-auto"
                  onClick={handleUpdateProfile}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

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
                  <button className="btn btn-success btn-sm">Apply now</button>
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

export default Profile;
