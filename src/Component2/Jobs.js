import React, { useEffect, useState } from "react";
import axios from "axios";
import JobSearchBar from "./JobSearchBar";
import "../Component2/css/Jobs.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const location = useLocation();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchPlace, setSearchPlace] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [appliedPlace, setAppliedPlace] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  //save jobs
  const [savedJobs, setSavedJobs] = useState([]);
  const [candidate, setCandidate] = useState(null);

  /* ================= LOAD CANDIDATE (REFRESH SAFE) ================= */
  useEffect(() => {
    const cand = JSON.parse(localStorage.getItem("candidate"));
    if (cand?.can_id) {
      setCandidate(cand);
    }
  }, []);

  /* ================= FETCH SAVED JOBS ================= */
  const fetchSavedJobs = async (canId) => {
    try {
      const res = await axios.get(
        `https://norealtor.in/hirelink_apis/candidate/saved-jobs/${canId}`
      );

      if (res.data.status) {
        setSavedJobs(res.data.data.map((j) => Number(j.save_job_id)));
      }
    } catch {
      toast.error("Failed to load saved jobs");
    }
  };

  /* ================= CALL SAVED JOBS AFTER REFRESH ================= */
  useEffect(() => {
    if (candidate?.can_id) {
      fetchSavedJobs(candidate.can_id);
    }
  }, [candidate?.can_id]);

  /* ================= SAVE / UNSAVE JOB ================= */
  const toggleSaveJob = async (jobId) => {
    if (!candidate?.can_id) {
      toast.warn("Please login as Candidate to save jobs");
      return;
    }

    const isSaved = savedJobs.includes(Number(jobId));

    const payload = {
      save_candidate_id: candidate.can_id,
      save_job_id: Number(jobId),
    };

    try {
      if (isSaved) {
        await axios.post(
          "https://norealtor.in/hirelink_apis/candidate/unsave-job",
          payload
        );
        setSavedJobs((prev) => prev.filter((id) => id !== Number(jobId)));
        toast.info("Job removed");
      } else {
        await axios.post(
          "https://norealtor.in/hirelink_apis/candidate/save-job",
          payload
        );
        setSavedJobs((prev) => [...prev, Number(jobId)]);
        toast.success("Job saved ❤️");
      }
    } catch {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    document.title = "Hirelink | Jobs";

    axios
      .get("https://norealtor.in/hirelink_apis/candidate/getdata/tbl_job")
      .then((res) => {
        if (res.data.status === "success") {
          setJobs(res.data.data); // ✅ THIS WAS MISSING
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  //============ auto Suggestion
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const keyword = params.get("keyword") || "";
    const place = params.get("place") || "";

    setSearchKeyword(keyword);
    setSearchPlace(place);

    setAppliedKeyword(keyword);
    setAppliedPlace(place);

    setHasSearched(!!(keyword || place));
  }, [location.search]);

  const filteredJobs = jobs.filter((job) => {
    const keyword = appliedKeyword.toLowerCase();
    const place = appliedPlace.toLowerCase();

    const keywordMatch =
      !keyword ||
      job.job_title?.toLowerCase().includes(keyword) ||
      job.job_company?.toLowerCase().includes(keyword) ||
      job.job_skills?.toLowerCase().includes(keyword);

    const placeMatch =
      !place ||
      job.city_name?.toLowerCase().includes(place) ||
      job.state_name?.toLowerCase().includes(place) ||
      `${job.city_name}, ${job.state_name}`.toLowerCase().includes(place);

    return keywordMatch && placeMatch;
  });

  useEffect(() => {
    if (!searchKeyword && !searchPlace) {
      setHasSearched(false);
    }
  }, [searchKeyword, searchPlace]);

  useEffect(() => {
    if (selectedJob) return; // 👈 user already interacted

    if (jobs.length === 0) return;

    if (savedJobs.length > 0) {
      const savedJobDetail = jobs.find(
        (job) => Number(job.job_id) === Number(savedJobs[0])
      );

      if (savedJobDetail) {
        setSelectedJob(savedJobDetail);
        return;
      }
    }

    setSelectedJob(jobs[0]);
  }, [jobs, savedJobs]);

  const navigate = useNavigate();

  const handleApplyClick = () => {
    const candidate = JSON.parse(localStorage.getItem("candidate"));

    if (candidate) {
      navigate("/apply");
    } else {
      navigate("/signin");
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

      {/* ================= SEARCH SECTION ================= */}
      <section className="flex-grow-1 text-center mt-5 mb-4 container">
        <JobSearchBar
          jobs={jobs}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          searchPlace={searchPlace}
          setSearchPlace={setSearchPlace}
          appliedKeyword={appliedKeyword}
          setAppliedKeyword={setAppliedKeyword}
          appliedPlace={appliedPlace}
          setAppliedPlace={setAppliedPlace}
          onSearch={() => {
            setAppliedKeyword(searchKeyword.trim());
            setAppliedPlace(searchPlace.trim());
            setHasSearched(true);
          }}
        />
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
                <button
                  className="save-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveJob(job.job_id);
                  }}
                >
                  <i
                    className={
                      savedJobs.includes(Number(job.job_id))
                        ? "fa-solid fa-bookmark text-primary"
                        : "fa-regular fa-bookmark"
                    }
                  />
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
                <button
                  className="save-btn"
                  onClick={() => toggleSaveJob(selectedJob.job_id)}
                >
                  <i
                    className={
                      savedJobs.includes(Number(selectedJob.job_id))
                        ? "fa-solid fa-bookmark text-primary"
                        : "fa-regular fa-bookmark"
                    }
                  />
                </button>

                <h4 className="fw-bold">{selectedJob.job_title}</h4>
                <p className="text-muted">
                  {selectedJob.job_company} · {selectedJob.city_name},{" "}
                  {selectedJob.state_name}
                </p>

                <p className="mb-3 fw-semibold text-success">
                  ₹{selectedJob.job_salary} a month
                </p>

                <button
                  type="button"
                  className="apply-btn mt-0 mb-5"
                  onClick={handleApplyClick}
                >
                  Apply Now
                </button>
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
