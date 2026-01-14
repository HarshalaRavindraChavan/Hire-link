import React, { useState } from "react";
import { FaPhone, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./css/InterManage.css";

const interviewData = {
  candidate: "RAJSHREE SURYAVANSHI",
  time: "14 Jan · 9 to 9:30am (IST)",
  job: "Digital Marketing Specialist - Remote",
};

const InterviewsPage = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="container-fluid interview-wrapper py-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
        <h4 className="fw-bold">Interviews</h4>

        <div className="btn-group">
          <button className="btn btn-success btn-sm fw-bold">
            All interviews
          </button>
          <button className="btn btn-outline-success btn-sm fw-bold">
            Interview availability
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="d-flex gap-2 flex-wrap mb-3">
        <select className="form-select w-auto fw-bold">
          <option>All accounts</option>
        </select>
        <select className="form-select w-auto fw-bold">
          <option>Last 14 days</option>
        </select>
      </div>

      <div className="row g-3">
        {/* LEFT PANEL */}
        <div className="col-lg-4 col-md-5">
          <div className="card shadow-sm h-100">
            <div className="card-body p-2">
              {/* Tabs */}
              <ul className="nav nav-tabs interview-tabs mb-2 fw-bold">
                {["Upcoming", "Pending", "Action needed", "Past"].map(tab => (
                  <li className="nav-item" key={tab}>
                    <button
                      className={`nav-link ${activeTab === tab ? "active" : ""}`}
                      onClick={() => setActiveTab(tab)}
                      type="button"
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Interview List */}
              <ul className="list-group interview-list">
                <li
                  className={`list-group-item interview-item ${
                    selectedIndex === 0 ? "active" : ""
                  }`}
                  onClick={() => setSelectedIndex(0)}
                >
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="fw-semibold text-dark">
                        Phone interview · {interviewData.candidate}
                      </div>

                      <span className="badge bg-success my-1 fw-bold">
                        Awaiting candidate confirmation
                      </span>

                      <div className="small text-muted">
                        {interviewData.time}
                      </div>

                      <div className="small"style={{color:"gray",fontWeight:"bold"}}>
                        {interviewData.job}
                      </div>
                    </div>

                    <FaPhone className="text-muted mt-1" />
                  </div>
                </li>
              </ul>

              {/* Pagination */}
              <div className="d-flex justify-content-between mt-3 px-2">
                <button className="btn btn-light btn-sm" type="button"style={{fontWeight:"bold"}}>
                  <FaChevronLeft /> Prev
                </button>
                <button className="btn btn-light btn-sm" type="button"style={{fontWeight:"bold"}}>
                  Next <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-lg-8 col-md-7">
          <div className="card shadow-sm h-100 interview-detail-card">
            <div className="card-body">
              <h5 className="fw-bold text-dark mb-1">
                Phone call with {interviewData.candidate}
              </h5>

              <div className="small mb-3"style={{fontWeight:"bold"}}>
                Wednesday, 14 January 2026 · 9–9:30am (IST) · <FaPhone /> Phone call
              </div>

              <button
                className="btn btn-outline-success btn-sm fw-bold mb-4"
                onClick={() => alert("Reschedule clicked")}
                type="button"
              >
                Reschedule
              </button>

              <div className="mb-3">
                <div className="small fw-bold text-dark">Job title</div><br></br>
                <button className="btn btn-link p-0 fw-semibold">
                  {interviewData.job}
                </button>
              </div>

              <hr />

              <div>
                <div className="small fw-bold text-dark">
                  Candidate at a glance
                </div><br></br>
                <button className="btn btn-link p-0 fw-semibold">
                  {interviewData.candidate}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewsPage;
