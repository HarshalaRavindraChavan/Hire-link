import React, { useState } from "react";
import "../Component2/css/Jobs.css";

function Jobs() {
  useState(() => {
    document.title = "Hirelink | Jobs";
  }, []);

  return (
    <>
      {/* ===========================
          TOP SEARCH SECTION
      ============================ */}
      <section className="flex-grow-1 text-center mt-5 mb-4 container">
        <div className="row justify-content-center g-2 mt-4 home-serch">
          {/* JOB TITLE SEARCH */}
          <div className="col-12 col-md-3 search-input-wrapper">
            <div className="search-input d-flex align-items-center">
              <i className="fa fa-search"></i>
              <input
                type="text"
                id="jobSearch"
                placeholder="Job title, keywords, or company"
                className="form-control border-0"
              />
            </div>
          </div>

          {/* LOCATION SEARCH */}
          <div className="col-12 col-md-3 search-input-wrapper">
            <div className="search-input d-flex align-items-center">
              <i className="fa fa-location-dot"></i>
              <input
                type="text"
                id="locationSearch"
                placeholder="City, state, zip code, or remote"
                className="form-control border-0"
              />
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <div className="col-12 col-md-2">
            <button className="btn find-btn w-100">Find jobs</button>
          </div>
        </div>
      </section>

      {/* ===========================
          JOB LIST MAIN SECTION
      ============================ */}
      <section className="container mt-4">
        <h3 className="fw-bold mb-3">Jobs for you</h3>

        <div className="row g-3 job-layout">
          {/* LEFT COLUMN JOB LIST */}
          <div className="col-12 col-md-4 job-list">
            {/* SAMPLE JOB CARD */}
            <div className="job-card selected">
              <p className="tag">Hiring multiple candidates</p>
              <h5 className="fw-bold">Delivery Boy/Girl</h5>
              <p className="text-muted m-0">
                Garime Solutions · Pune, Maharashtra
              </p>
              <span className="badge-chip">Up to ₹30,000 a month</span>
              <span className="badge-chip">Full-time</span>
              <span className="badge-chip">Health insurance</span>
            </div>

            {/* REPEATED CARDS */}
            <div className="job-card">
              <p className="tag">Urgently Hiring</p>
              <h5 className="fw-bold">HR Generalist</h5>
              <p className="text-muted m-0">Kelz Relocare · Pune</p>
              <span className="badge-chip">₹25,000 monthly</span>
              <span className="badge-chip">Full-time</span>
            </div>

            <div className="job-card selected">
              <p className="tag">Hiring multiple candidates</p>
              <h5 className="fw-bold">Delivery Boy/Girl</h5>
              <p className="text-muted m-0">
                Garime Solutions · Pune, Maharashtra
              </p>
              <span className="badge-chip">Up to ₹30,000 a month</span>
              <span className="badge-chip">Full-time</span>
              <span className="badge-chip">Health insurance</span>
            </div>

            <div className="job-card">
              <p className="tag">Urgently Hiring</p>
              <h5 className="fw-bold">HR Generalist</h5>
              <p className="text-muted m-0">Kelz Relocare · Pune</p>
              <span className="badge-chip">₹25,000 monthly</span>
              <span className="badge-chip">Full-time</span>
            </div>
          </div>

          {/* RIGHT SIDE JOB DETAILS */}
          <div className="col-12 col-md-8 job-detail mb-5">
            <div className="job-header">
              <h4 className="fw-bold">Delivery Boy/Girl</h4>
              <p className="text-muted">Garime Solutions · Pune, Maharashtra</p>
              <p className="m-0 fw-semibold text-success">
                Up to ₹30,000 a month
              </p>
              <button className="apply-btn mt-3 mb-3">Apply Now</button>
            </div>

            {/* SCROLLABLE JOB DETAILS */}
            <div className="job-body">
              <h6 className="fw-bold fs-5">Profile insights</h6>
              <p className="small text-muted">
                Here’s how the job qualifications align with your profile.
              </p>

              <h6 className="fw-bold mt-3 fs-6">Licences</h6>
              <p className="small">Driving Licence (required)</p>

              <div className="d-flex gap-2 mb-3">
                <button className="btn btn-outline-primary btn-sm">Yes</button>
                <button className="btn btn-outline-secondary btn-sm">No</button>
                <button className="btn btn-outline-dark btn-sm">Skip</button>
              </div>

              <h6 className="fw-bold mt-3 fs-6">Skills</h6>
              <p className="small">Driving, Communication</p>

              <div className="d-flex gap-2 mb-3">
                <button className="btn btn-outline-primary btn-sm">Yes</button>
                <button className="btn btn-outline-secondary btn-sm">No</button>
                <button className="btn btn-outline-dark btn-sm">Skip</button>
              </div>

              <hr />
              <h6 className="fw-bold fs-5">Job details</h6>
              <p>
                <strong>Pay:</strong> Up to ₹30,000 a month
              </p>

              <hr />
              <h6 className="fw-bold fs-5">Location</h6>
              <p>Pune, Maharashtra</p>

              <hr />
              <h6 className="fw-bold fs-5">Benefits</h6>
              <ul>
                <li>Health Insurance</li>
                <li>Fuel Reimbursement</li>
                <li>Mobile Reimbursement</li>
              </ul>

              <hr />
              <h6 className="fw-bold fs-5">Full Job Description</h6>
              <p>
                • Create awareness and develop the brand
                <br />
                • Address inquiries and concerns
                <br />
                • Marketing & Promotion activities
                <br />• Attend events & build partnerships
              </p>

              <hr />
              <h6 className="fw-bold">Contact</h6>
              <p>
                WhatsApp: <strong>7972892556</strong>
              </p>

              <button className="btn btn-outline-danger btn-sm">
                Report job
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Jobs;
