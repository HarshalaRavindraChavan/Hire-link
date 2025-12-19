import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Component2/css/Jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    document.title = "Hirelink | Jobs";

    axios
      .get("https://norealtor.in/hirelink_apis/candidate/getdata/tbl_job")
      .then((res) => {
        if (res.data.status === "success") {
          setJobs(res.data.data);
          setSelectedJob(res.data.data[0]);
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
                  {job.job_company} · {job.job_city}, {job.job_state}
                </p>

                <span className="badge-chip">₹{job.job_salary}/month</span>
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
                  {selectedJob.job_company} · {selectedJob.job_city},{" "}
                  {selectedJob.state}
                </p>

                <p className="m-0 fw-semibold text-success">
                  ₹{selectedJob.job_salary} a month
                </p>

                <button className="apply-btn mt-3 mb-3">Apply Now</button>
              </div>

              <div className="job-body">
                <h6 className="fw-bold fs-5">Profile insights</h6>
                <p className="small text-muted">
                  Here’s how the job qualifications align with your profile.
                </p>
                <h6 className="fw-bold mt-3 fs-6">Skills</h6>
                <p className="small">{selectedJob.job_skills}</p>
                <div className="d-flex gap-2 mb-3">
                  <button className="btn btn-outline-primary btn-sm">
                    Yes
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    No
                  </button>
                  <button className="btn btn-outline-dark btn-sm">Skip</button>
                </div>
                <hr /> <h6 className="fw-bold fs-5">Job details</h6>
                <p>
                  <strong>Pay:</strong> {selectedJob.job_salary} month
                </p>
                <hr /> <h6 className="fw-bold fs-5">Location</h6>
                <p>
                  {selectedJob.job_city}, {selectedJob.job_state}
                </p>{" "}
                <hr />
                <h6 className="fw-bold fs-5">Benefits</h6>
                <h6 className="fw-bold fs-5">Job Description</h6>
                <p>{selectedJob.job_description}</p>
                <hr />
                <h6 className="fw-bold fs-6">Job Type</h6>
                <p>{selectedJob.job_type}</p>
                <hr />
                <h6 className="fw-bold fs-6">Location</h6>
                <p>
                  {selectedJob.job_city}, {selectedJob.job_state}
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
