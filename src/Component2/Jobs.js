import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Component2/css/Jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    document.title = "Hirelink | Jobs";

    axios
      .get("https://norealtor.in/hirelink_apis/getdata/tbl_job")
      .then((res) => {
        if (res.data.status === "success") {
          setJobs(res.data.data);
          setSelectedJob(res.data.data[0]); // default first job
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  return (
    <>
      {/* ================= SEARCH SECTION ================= */}
      <section className="flex-grow-1 text-center mt-5 mb-4 container">
        <div className="row justify-content-center g-2 mt-4 home-serch ps-3 pe-3">
          <div className="col-12 col-md-3 search-input-wrapper">
            <div className="search-input d-flex align-items-center">
              <i className="fa fa-search"></i>
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="form-control border-0"
              />
            </div>
          </div>

          <div className="col-12 col-md-3 search-input-wrapper">
            <div className="search-input d-flex align-items-center">
              <i className="fa fa-location-dot"></i>
              <input
                type="text"
                placeholder="City, state, or remote"
                className="form-control border-0"
              />
            </div>
          </div>

          <div className="col-12 col-md-2">
            <button className="btn find-btn w-100 pt-4 pb-5">Find jobs</button>
          </div>
        </div>
      </section>

      {/* ================= JOB LIST & DETAILS ================= */}
      <section className="container mt-4">
        <h3 className="fw-bold mb-3 ps-4">Jobs for you</h3>

        <div className="row g-3 job-layout ps-4 pe-4">
          {/* ========== LEFT JOB LIST ========== */}
          <div className="col-12 col-md-4 job-list">
            {jobs.map((job) => (
              <div
                key={job.job_id}
                className={`job-card position-relative ${
                  selectedJob?.job_id === job.job_id ? "selected" : ""
                }`}
                onClick={() => setSelectedJob(job)}
                style={{ cursor: "pointer" }}
              >
                <button className="save-btn">
                  <i className="fa-regular fa-bookmark"></i>
                </button>

                <h5 className="fw-bold">{job.job_title}</h5>
                <p className="text-muted m-0">
                  {job.company_name} · {job.city}, {job.state}
                </p>

                <span className="badge-chip">₹{job.salary}/month</span>
                <span className="badge-chip">{job.job_type}</span>
              </div>
            ))}
          </div>

          {/* ========== RIGHT JOB DETAILS ========== */}
          {selectedJob && (
            <div className="col-12 col-md-8 job-detail mb-5">
              <div className="job-header">
                <button className="save-btn">
                  <i className="fa-regular fa-bookmark"></i>
                </button>

                <h4 className="fw-bold">{selectedJob.job_title}</h4>
                <p className="text-muted">
                  {selectedJob.company_name} · {selectedJob.city},{" "}
                  {selectedJob.state}
                </p>

                <p className="m-0 fw-semibold text-success">
                  ₹{selectedJob.salary} a month
                </p>

                <button className="apply-btn mt-3 mb-3">Apply Now</button>
              </div>

              <div className="job-body">
                <h6 className="fw-bold fs-5">Job Description</h6>
                <p>{selectedJob.description}</p>

                <hr />
                <h6 className="fw-bold fs-6">Job Type</h6>
                <p>{selectedJob.job_type}</p>

                <hr />
                <h6 className="fw-bold fs-6">Location</h6>
                <p>
                  {selectedJob.city}, {selectedJob.state}
                </p>

                <hr />
                <button className="btn btn-outline-danger btn-sm">
                  Report job
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Jobs;
