import React, { useEffect, useState } from "react";
import { FaPhone, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./css/InterManage.css";
import axios from "axios";
import { BASE_URL } from "../config/constants";

const InterviewsPage = ({ openEditInterviewModal }) => {
  const [activeTab, setActiveTab] = useState("Pending");

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState("");
  const [statusDropdownValue, setStatusDropdownValue] = useState("");

  const [selectedInterview, setSelectedInterview] = useState(null);

  // ✅ pagination (same UI - Prev/Next)
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  // ✅ Auth (Employer only)
  const auth = JSON.parse(localStorage.getItem("auth"));
  const role = auth?.role;
  const employerId = auth?.emp_id;

  useEffect(() => {
    fetchInterviews();
    // eslint-disable-next-line
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);

      // ✅ Only employer allowed
      if (Number(role) !== 100) {
        setInterviews([]);
        setSelectedInterview(null);
        return;
      }

      const res = await axios.get(
        `${BASE_URL}employer/getdatawhere/tbl_interview/itv_employer_id/${employerId}`,
      );

      if (res?.data?.status) {
        setInterviews(res.data.data || []);
      } else {
        setInterviews([]);
      }
    } catch (err) {
      console.log(err);
      setInterviews([]);
    } finally {
      setLoading(false);
    }
  };

  const getCandidateById = async (can_id) => {
    const res = await axios.get(
      `${BASE_URL}candidate/getdatawhere/tbl_candidate/can_id/${can_id}`,
    );

    if (res?.data?.status && res?.data?.data?.length > 0) {
      return res.data.data[0]; // full candidate object
    }

    return null;
  };

  const updateInterviewStatus = async (itv_id, newStatus, can_id) => {
    try {
      setLoading(true);

      // 1) Interview status update
      const res = await axios.post(
        `${BASE_URL}employer/updatedata/tbl_interview/itv_id/${itv_id}`,
        { itv_status: newStatus },
      );

      if (!res?.data?.status) {
        alert(res?.data?.message || "Failed to update status");
        return;
      }

      if (
        (newStatus === "Not Attended" || newStatus === "Not Joined") &&
        can_id
      ) {
        const candidate = await getCandidateById(can_id);

        if (!candidate) {
          alert("Candidate not found!");
          return;
        }

        const oldScore = Number(candidate.can_score || 0);

        let deduction = 0;
        if (newStatus === "Not Attended") deduction = 50;
        if (newStatus === "Not Joined") deduction = 200;

        const newScore = oldScore - deduction;

        const scoreRes = await axios.post(
          `${BASE_URL}candidate/updatedata/tbl_candidate/can_id/${can_id}`,
          {
            can_score: newScore,
          },
        );

        if (!scoreRes?.data?.status) {
          alert("Score update failed!");
          return;
        }
      }

      fetchInterviews();
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const openStatusConfirmModal = (status) => {
    setPendingStatus(status);
    setShowStatusModal(true);
  };

  const closeStatusConfirmModal = () => {
    setPendingStatus("");
    setShowStatusModal(false);
    setStatusDropdownValue(""); // ✅ reset dropdown
  };

  // ✅ Tabs filter based on itv_status (your db uses itv_status)
  const filteredInterviews = interviews.filter((i) => {
    const status = (i.itv_status || "").trim();

    if (activeTab === "Pending")
      return status === "Pending" || status === "Reschedule Request";

    if (activeTab === "Upcoming")
      return status === "Confirmed" || status === "Hold";

    if (activeTab === "Appointed") return status === "Appointed";

    if (activeTab === "Action needed")
      return (
        status === "Candidate Cancelled" ||
        status === "Cancelled" ||
        status === "Completed" ||
        status === "Rejected" ||
        status === "Not Attended" ||
        status === "Not Joined" ||
        status === "Joined"
      );

    return true;
  });

  // ✅ Pagination slice
  const totalPages = Math.ceil(filteredInterviews.length / recordsPerPage);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const paginatedInterviews = filteredInterviews.slice(firstIndex, lastIndex);

  // ✅ Tab change -> reset page and select first record
  useEffect(() => {
    setCurrentPage(1);

    if (filteredInterviews.length > 0) {
      setSelectedInterview(filteredInterviews[0]);
    } else {
      setSelectedInterview(null);
    }
    // eslint-disable-next-line
  }, [activeTab, interviews]);

  // ✅ Page change -> auto select first record in that page
  useEffect(() => {
    if (paginatedInterviews.length > 0) {
      setSelectedInterview(paginatedInterviews[0]);
    } else {
      setSelectedInterview(null);
    }
    // eslint-disable-next-line
  }, [currentPage]);

  // ✅ Prev / Next handlers
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const pendingCount = interviews.filter((i) => {
    const s = (i.itv_status || "").trim();
    return s === "Pending" || s === "Reschedule Request";
  }).length;

  const upcomingCount = interviews.filter(
    (i) => (i.itv_status || "").trim() === "Confirmed",
  ).length;

  const appointedCount = interviews.filter(
    (i) => (i.itv_status || "").trim() === "Appointed",
  ).length;

  return (
    <div className="container-fluid interview-wrapper py-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
        <h4 className="fw-bold">Interviews</h4>
      </div>

      {/* Filters */}
      {/* <div className="d-flex gap-2 flex-wrap mb-3">
        <select className="form-select w-auto fw-bold">
          <option>All accounts</option>
        </select>
        <select className="form-select w-auto fw-bold">
          <option>Last 14 days</option>
        </select>
      </div> */}

      <div className="row g-3">
        {/* LEFT PANEL */}
        <div className="col-lg-5 col-md-5">
          <div className="card shadow-sm h-100">
            <div className="card-body p-2">
              {/* Tabs */}
              <ul className="nav nav-tabs interview-tabs mb-2 fw-bold">
                {["Upcoming", "Pending", "Appointed", "Action needed"].map(
                  (tab) => {
                    const count =
                      tab === "Pending"
                        ? pendingCount
                        : tab === "Upcoming"
                          ? upcomingCount
                          : tab === "Appointed"
                            ? appointedCount
                            : null;

                    return (
                      <li className="nav-item" key={tab}>
                        <button
                          className={`nav-link ${
                            activeTab === tab ? "active" : ""
                          }`}
                          onClick={() => setActiveTab(tab)}
                          type="button"
                        >
                          {tab} {count !== null ? `(${count})` : ""}
                        </button>
                      </li>
                    );
                  },
                )}
              </ul>

              {/* Interview List */}
              <ul className="list-group interview-list">
                {loading ? (
                  <li className="list-group-item text-center text-muted">
                    Loading...
                  </li>
                ) : paginatedInterviews.length > 0 ? (
                  paginatedInterviews.map((item) => (
                    <li
                      key={item.itv_id}
                      className={`list-group-item interview-item ${
                        selectedInterview?.itv_id === item.itv_id
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedInterview(item);

                        if (
                          (item.itv_status || "").trim() ===
                          "Reschedule Request"
                        ) {
                          openEditInterviewModal?.({
                            ...item,
                            candidate_id:
                              item.candidate_id ||
                              item.itv_candidate_id ||
                              item.can_id,
                            job_id: item.job_id || item.itv_job_id,
                          });
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex justify-content-between">
                        <div>
                          <div className="fw-semibold text-dark">
                            {item.itv_type} interview · {item.can_name}
                          </div>

                          <span
                            className={`badge my-1 fw-bold ${
                              item.itv_status === "Pending"
                                ? "bg-warning"
                                : item.itv_status === "Confirmed"
                                  ? "bg-primary"
                                  : item.itv_status === "Candidate Cancelled"
                                    ? "bg-danger"
                                    : item.itv_status === "Cancelled"
                                      ? "bg-danger"
                                      : item.itv_status === "Completed"
                                        ? "bg-success"
                                        : item.itv_status === "Rejected"
                                          ? "bg-danger"
                                          : item.itv_status === "Hold"
                                            ? "bg-warning"
                                            : item.itv_status === "Not Attended"
                                              ? "bg-dark"
                                              : item.itv_status === "Appointed"
                                                ? "bg-info"
                                                : item.itv_status ===
                                                    "Not Joined"
                                                  ? "bg-danger"
                                                  : "bg-secondary"
                            }`}
                          >
                            {item.itv_status === "Pending"
                              ? "Awaiting candidate confirmation"
                              : item.itv_status === "Confirmed"
                                ? "Scheduled"
                                : item.itv_status === "Candidate Cancelled"
                                  ? "Candidate Cancelled"
                                  : item.itv_status === "Cancelled"
                                    ? "Cancelled"
                                    : item.itv_status === "Completed"
                                      ? "Completed"
                                      : item.itv_status === "Rejected"
                                        ? "Rejected"
                                        : item.itv_status === "Hold"
                                          ? "On Hold"
                                          : item.itv_status === "Not Attended"
                                            ? "Not Attended"
                                            : item.itv_status === "Appointed"
                                              ? "Appointed"
                                              : item.itv_status === "Not Joined"
                                                ? "Not Joined"
                                                : item.itv_status}
                          </span>

                          <div className="small text-muted">
                            {item.itv_date} · {item.itv_time}
                          </div>

                          <div
                            className="small"
                            style={{ color: "gray", fontWeight: "bold" }}
                          >
                            {item.job_title} - {item.job_company}
                          </div>
                        </div>

                        <FaPhone className="text-muted mt-1" />
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-center text-muted">
                    No interviews found
                  </li>
                )}
              </ul>

              {/* Pagination */}
              <div className="d-flex justify-content-between mt-3 px-2">
                <button
                  className="btn btn-light btn-sm"
                  type="button"
                  style={{ fontWeight: "bold" }}
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft /> Prev
                </button>

                <button
                  className="btn btn-light btn-sm"
                  type="button"
                  style={{ fontWeight: "bold" }}
                  onClick={handleNext}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-lg-7 col-md-7">
          <div className="card shadow-sm h-100 interview-detail-card">
            <div className="card-body">
              {selectedInterview ? (
                <>
                  <h5 className="fw-bold text-dark mb-1">
                    {selectedInterview.itv_type} call with{" "}
                    {selectedInterview.can_name}
                  </h5>

                  <div className="small mb-3" style={{ fontWeight: "bold" }}>
                    {selectedInterview.itv_date} · {selectedInterview.itv_time}{" "}
                    · <FaPhone /> {selectedInterview.itv_type}
                  </div>

                  {/* <button
                    className="btn btn-outline-success btn-sm fw-bold mb-4"
                    onClick={() => alert("Reschedule clicked")}
                    type="button"
                  >
                    Reschedule
                  </button> */}

                  {selectedInterview.itv_status === "Reschedule Request" && (
                    <div className="mb-4">
                      <h6 className="fw-bold text-dark mb-2">
                        Reschedule Request
                      </h6>

                      <button
                        className="btn btn-outline-success btn-sm fw-bold"
                        type="button"
                        onClick={() => {
                          openEditInterviewModal?.({
                            ...selectedInterview,
                            candidate_id:
                              selectedInterview.candidate_id ||
                              selectedInterview.itv_candidate_id ||
                              selectedInterview.can_id,
                            job_id:
                              selectedInterview.job_id ||
                              selectedInterview.itv_job_id,
                          });
                        }}
                      >
                        Open Reschedule Form
                      </button>
                    </div>
                  )}

                  {selectedInterview.itv_status === "Pending" && (
                    <button
                      className="btn btn-outline-danger btn-sm fw-bold mb-4 ms-2"
                      type="button"
                      onClick={() =>
                        updateInterviewStatus(
                          selectedInterview.itv_id,
                          "Cancelled",
                          selectedInterview.can_id,
                        )
                      }
                    >
                      Cancel Interview
                    </button>
                  )}

                  {(selectedInterview.itv_status === "Confirmed" ||
                    selectedInterview.itv_status === "Hold") && (
                    <div className="mb-4">
                      <label className="fw-bold mb-2 d-block">
                        Update Status
                      </label>

                      <select
                        className="form-select form-select-sm fw-bold"
                        value={statusDropdownValue}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (!val) return;

                          setStatusDropdownValue(val);
                          openStatusConfirmModal(val);
                        }}
                      >
                        <option value="">Select status</option>
                        <option value="Completed">Complete</option>
                        <option value="Rejected">Reject</option>
                        <option value="Hold">Hold</option>
                        <option value="Appointed">Appointed</option>
                        <option value="Not Attended">Not Attended</option>
                      </select>
                    </div>
                  )}

                  {selectedInterview.itv_status === "Appointed" && (
                    <div className="mb-4">
                      <label className="fw-bold mb-2 d-block">
                        Update Status
                      </label>

                      <select
                        className="form-select form-select-sm fw-bold"
                        value={statusDropdownValue}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (!val) return;

                          setStatusDropdownValue(val);
                          openStatusConfirmModal(val);
                        }}
                      >
                        <option value="">Select status</option>
                        <option value="Not Joined">Not Joined</option>
                        <option value="Joined">Joined</option>
                      </select>
                    </div>
                  )}

                  <div className="mb-3">
                    <div className="small fw-bold text-dark">Job title</div>
                    <br />
                    <button className="btn btn-link p-0 fw-semibold">
                      {selectedInterview.job_title}
                    </button>
                  </div>

                  <hr />

                  <div>
                    <div className="small fw-bold text-dark">
                      Candidate at a glance
                    </div>
                    <br />
                    <button className="btn btn-link p-0 fw-semibold">
                      {selectedInterview.can_name}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center text-muted mt-5">
                  No interview selected
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Status Confirmation Modal */}
      {showStatusModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Confirm Status Update</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeStatusConfirmModal}
                ></button>
              </div>

              <div className="modal-body">
                <p className="mb-0">
                  Are you sure you want to update this interview status to{" "}
                  <b>{pendingStatus}</b>?
                </p>

                {pendingStatus === "Not Attended" && (
                  <p className="text-danger fw-bold mt-2 mb-0">
                    Note: Candidate score will be reduced by -50 points.
                  </p>
                )}

                {pendingStatus === "Not Joined" && (
                  <p className="text-danger fw-bold mt-2 mb-0">
                    Note: Candidate score will be reduced by -200 points.
                  </p>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm fw-bold"
                  onClick={closeStatusConfirmModal}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary btn-sm fw-bold"
                  onClick={() => {
                    updateInterviewStatus(
                      selectedInterview.itv_id,
                      pendingStatus,
                      selectedInterview.can_id,
                    );
                    closeStatusConfirmModal();
                  }}
                >
                  Yes, Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewsPage;
