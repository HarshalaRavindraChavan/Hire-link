import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Component2/css/Jobs.css";
import { NavLink } from "react-router-dom";

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

  //============ auto Suggestion

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchPlace, setSearchPlace] = useState("");

  const [keywordSug, setKeywordSug] = useState([]);
  const [placeSug, setPlaceSug] = useState([]);

  const [showKeywordSug, setShowKeywordSug] = useState(false);
  const [showPlaceSug, setShowPlaceSug] = useState(false);
  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [appliedPlace, setAppliedPlace] = useState("");

  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!searchKeyword.trim()) {
      setKeywordSug([]);
      setShowKeywordSug(false);
      return;
    }

    const keyword = searchKeyword.toLowerCase();
    let suggestions = [];

    jobs.forEach((job) => {
      // 🔹 Job Title suggestion (startsWith)
      if (job.job_title && job.job_title.toLowerCase().startsWith(keyword)) {
        suggestions.push({
          text: job.job_title,
          type: "Job Title",
        });
      }

      // 🔹 Company Name suggestion (startsWith)
      if (
        job.job_company &&
        job.job_company.toLowerCase().startsWith(keyword)
      ) {
        suggestions.push({
          text: job.job_company,
          type: "Company",
        });
      }
    });

    // 🔹 Remove duplicates
    const uniqueSuggestions = suggestions.filter(
      (v, i, a) => a.findIndex((t) => t.text === v.text) === i
    );

    setKeywordSug(uniqueSuggestions.slice(0, 6));
    setShowKeywordSug(true);
  }, [searchKeyword, jobs]);

  useEffect(() => {
    if (!searchPlace.trim()) {
      setPlaceSug([]);
      setShowPlaceSug(false);
      return;
    }

    const suggestions = jobs
      .filter(
        (job) =>
          job.city_name?.toLowerCase().includes(searchPlace.toLowerCase()) ||
          job.state_name?.toLowerCase().includes(searchPlace.toLowerCase())
      )
      .map((job) => `${job.city_name}, ${job.state_name}`)
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 6);

    setPlaceSug(suggestions);
    setShowPlaceSug(true);
  }, [searchPlace, jobs]);

  const filteredJobs = jobs.filter((job) => {
    const keywordMatch =
      appliedKeyword === "" ||
      job.job_title?.toLowerCase().includes(appliedKeyword.toLowerCase()) ||
      job.job_company?.toLowerCase().includes(appliedKeyword.toLowerCase()) ||
      job.job_skills?.toLowerCase().includes(appliedKeyword.toLowerCase());

    const placeMatch =
      appliedPlace === "" ||
      job.city_name?.toLowerCase().includes(appliedPlace.toLowerCase()) ||
      job.state_name?.toLowerCase().includes(appliedPlace.toLowerCase()) ||
      `${job.city_name}, ${job.state_name}`
        .toLowerCase()
        .includes(appliedPlace.toLowerCase());

    return keywordMatch && placeMatch;
  });

  useEffect(() => {
    if (filteredJobs.length > 0) {
      setSelectedJob(filteredJobs[0]);
    } else {
      setSelectedJob(null);
    }
  }, [appliedKeyword, appliedPlace]);

  useEffect(() => {
    if (!searchKeyword && !searchPlace) {
      setHasSearched(false);
    }
  }, [searchKeyword, searchPlace]);
  return (
    <>
      {/* ================= SEARCH SECTION ================= */}
      <section className="flex-grow-1 text-center mt-5 mb-4 container">
        <div className="row justify-content-center g-2 mt-4 home-serch ps-3 pe-3">
          <div className="col-12 col-md-3 position-relative">
            <div className="search-input d-flex align-items-center">
              <i className="fa fa-search"></i>
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="form-control border-0"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onFocus={() => searchKeyword && setShowKeywordSug(true)}
              />
            </div>

            {showKeywordSug && (
              <ul
                className="list-group position-absolute w-100"
                style={{ zIndex: 1000, background: "#dfdcdcff" }}
              >
                {keywordSug.map((item, i) => (
                  <li
                    key={i}
                    className="list-group-item list-group-item-action d-flex justify-content-between border-0"
                    onClick={() => {
                      setSearchKeyword(item.text);
                      setShowKeywordSug(false);
                    }}
                  >
                    <span>{item.text}</span>
                    <small className="text-muted">{item.type}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-12 col-md-3 position-relative">
            <div className="search-input d-flex align-items-center">
              <i className="fa fa-location-dot"></i>
              <input
                type="text"
                placeholder="City, state, or remote"
                className="form-control border-0"
                value={searchPlace}
                onChange={(e) => setSearchPlace(e.target.value)}
                onFocus={() => searchPlace && setShowPlaceSug(true)}
              />
            </div>

            {showPlaceSug && (
              <ul
                className="list-group position-absolute w-100"
                style={{ zIndex: 1000 }}
              >
                {placeSug.map((item, i) => (
                  <li
                    key={i}
                    className="list-group-item list-group-item-action"
                    onClick={() => {
                      setSearchPlace(item); // 👈 "Pune, Maharashtra"
                      setShowPlaceSug(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-12 col-md-2">
            <button
              className="btn find-btn w-100 pt-4 pb-5"
              onClick={() => {
                setAppliedKeyword(searchKeyword.trim());
                setAppliedPlace(searchPlace.trim());

                setHasSearched(true); // 👈 IMPORTANT

                setShowKeywordSug(false);
                setShowPlaceSug(false);
              }}
            >
              Find jobs
            </button>
          </div>
        </div>
      </section>

      {/* ================= JOB LIST & DETAILS ================= */}
      <section className="container mt-4">
        <h3 className="fw-bold mb-3 ps-4">Jobs for you</h3>

        <div className="row g-3 job-layout ps-4 pe-4">
          {/* ========== LEFT JOB LIST ========== */}
          <div className="col-12 col-md-4 job-list">
            {filteredJobs.map((job) => (
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
                  {job.job_company} · {job.city_name}, {job.state_name}
                </p>

                <span className="badge-chip">₹{job.job_salary}/month</span>
                <span className="badge-chip">{job.job_type}</span>
              </div>
            ))}

            {hasSearched && filteredJobs.length === 0 && (
              <div className="text-center text-muted mt-4">
                <i className="fa fa-briefcase fs-3 mb-2"></i>
                <p className="mb-0 fw-semibold">No jobs found</p>
                <small>Try different keywords or location</small>
              </div>
            )}
          </div>

          {/* ========== RIGHT JOB DETAILS ========== */}
          {selectedJob && (
            <div className="col-12 col-md-8 job-detail mb-5">
              <div className="job-header pt-3 pb-3">
                <button className="save-btn">
                  <i className="fa-regular fa-bookmark"></i>
                </button>

                <h4 className="fw-bold">{selectedJob.job_title}</h4>
                <p className="text-muted">
                  {selectedJob.job_company} · {selectedJob.city_name},{" "}
                  {selectedJob.state_name}
                </p>

                <p className="mb-3 fw-semibold text-success">
                  ₹{selectedJob.job_salary} a month
                </p>

                <NavLink to="/apply" className="apply-btn mt-0 mb-5">
                  Apply Now
                </NavLink>
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
                  {selectedJob.city_name}, {selectedJob.state_name}
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
                  {selectedJob.city_name}, {selectedJob.state_name}
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
