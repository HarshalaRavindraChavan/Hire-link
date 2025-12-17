import React, { useState } from "react";
import "../Component2/css/Profile.css";

function Profile({ show, onClose }) {
  const [activeTab, setActiveTab] = useState("saved");
  const [showModal, setShowModal] = useState(false);
  //  if (!show) return null;

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

  return (
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
            <h5 className="mb-1 fw-bold">Harshal Mahajan</h5>
            <p className="mb-1 text-muted">
              harshal@gmail.com | +91 9876543210
            </p>
            <p className="mb-0 text-muted">
              Pune, Maharashtra <br />
              Address: Wakad, Pune – 411057
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

      <div
        className="modal fade"
        id="editProfileModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content border-0 shadow rounded-4">
            {/* <!-- ================= MODAL HEADER ================= --> */}
            <div className="modal-header border-0 px-4 pt-4 pb-2">
              <div>
                <h4 className="fw-bold mb-1">Edit Profile</h4>
                <p className="text-muted mb-0 fs-6">
                  Keep your profile updated to get better job matches
                </p>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* <!-- ================= MODAL BODY ================= --> */}
            <div className="modal-body px-4 py-3">
              {/* <!-- PROFILE IMAGE SECTION --> */}
              <div className="d-flex align-items-center gap-4 mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  className="rounded-circle border"
                  width="110"
                  height="110"
                  alt="Profile"
                />

                <div className="flex-grow-1">
                  <h6 className="fw-semibold mb-1">Profile Photo</h6>

                  <p className="text-muted mb-2 fs-6">
                    Upload a clear photo to increase profile visibility
                  </p>

                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      style={{ maxWidth: "200px" }}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                    >
                      <i className="fa fa-upload me-1"></i>
                      Update
                    </button>
                  </div>
                </div>
              </div>

              <hr />

              {/* <!-- BASIC DETAILS --> */}
              <h6 className="fw-bold mb-1">Basic Information</h6>

              <div className="row g-3 mb-4">
                <div className="col-md-12">
                  <label className="fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email Address"
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Mobile Number"
                  />
                </div>
              </div>

              {/* <!-- ADDRESS --> */}
              <h6 className="fw-bold mb-3">Address Details</h6>

              <div className="row g-3 mb-1">
                <div className="col-md-6">
                  <label className="fw-semibold">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    value="India"
                    readonly
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold">State</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter State"
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold">City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter City"
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold">Pin Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Pin code"
                  />
                </div>

                <div className="mb-4">
                  <label className="fw-semibold">Address</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Enter Address"
                  ></textarea>
                </div>
              </div>

              {/* <!-- ================= MODAL FOOTER ================= --> */}
              <div className="rounded-bottom-4 d-flex">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-3"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-success px-4 ms-auto">
                  Submit
                </button>
              </div>
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
              backgroundColor: activeTab === "applied" ? "#22c55e" : "#f1f5f9",
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
            className={`nav-link ${activeTab === "interviews" ? "active" : ""}`}
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
                    <span className="badge bg-success mb-1">Interviewing</span>
                    <h6 className="fw-bold mb-1">Lead Generation Specialist</h6>
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

        {/* model code  */}

        {/* <div className="status-modal-overlay">
          <div className="status-modal">
            <div className="status-modal-header">
              <div>
                <h6 className="mb-0">Update your application status</h6>
                <small className="text-muted">Employers won’t see this</small>
              </div>
              <button className="close-btn" onClick={onClose}>
                ×
              </button>
            </div>

            <ul className="status-list">
              <li>
                <span className="icon green">←</span> Show the last Indeed
                update
              </li>
              <li>
                <span className="icon green">✔</span> Offer received
              </li>
              <li>
                <span className="icon green">👤</span> Hired
              </li>
              <li>
                <span className="icon red">✖</span> Not selected by employer
              </li>
              <li>
                <span className="icon red">👎</span> No longer interested
              </li>
            </ul>
          </div>
        </div> */}

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
                  style={{
                    height: "40px",
                    padding: "0 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Reschedule
                </button>

                <button
                  className="btn btn-outline-success"
                  style={{
                    height: "40px",
                    padding: "0 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Profile;
