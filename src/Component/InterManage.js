import React, { useEffect, useState } from "react";
import { FaPhone, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./css/InterManage.css";
import axios from "axios";
import { BASE_URL } from "../config/constants";

const InterviewsPage = () => {
  const [activeTab, setActiveTab] = useState("Pending");

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);

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
        `${BASE_URL}hirelink_apis/employer/getdatawhere/tbl_interview/itv_employer_id/${employerId}`
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

  // ✅ Tabs filter based on itv_status (your db uses itv_status)
  const filteredInterviews = interviews.filter((i) => {
    const status = (i.itv_status || "").trim();

    if (activeTab === "Pending") return status === "Pending";

    if (activeTab === "Upcoming") return status === "Confirmed";

    if (activeTab === "Action needed")
      return (
        status === "Candidate Cancelled" ||
        status === "Cancelled" ||
        status === "Completed"
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

  const pendingCount = interviews.filter(
    (i) => (i.itv_status || "").trim() === "Pending"
  ).length;

  const upcomingCount = interviews.filter(
    (i) => (i.itv_status || "").trim() === "Confirmed"
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
                {["Upcoming", "Pending", "Action needed"].map((tab) => {
                  const count =
                    tab === "Pending"
                      ? pendingCount
                      : tab === "Upcoming"
                      ? upcomingCount
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
                })}
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
                      onClick={() => setSelectedInterview(item)}
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
                              ? "Cancel"
                              : item.itv_status === "Completed"
                              ? "Complete"
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

                  <button
                    className="btn btn-outline-success btn-sm fw-bold mb-4"
                    onClick={() => alert("Reschedule clicked")}
                    type="button"
                  >
                    Reschedule
                  </button>

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
    </div>
  );
};

export default InterviewsPage;
