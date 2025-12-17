import React, { useState } from "react";
import "../Component2/css/Home.css";
import { NavLink } from "react-router-dom";

function Home() {
  useState(() => {
    document.title = "Welcome To Hirelink";
  }, []);

  const jobList = [
    { title: "React Developer"},
    { title: "Frontend Developer"},
    { title: "Backend Developer"},
    { title: "Full Stack Developer"},
    { title: "UI/UX Designer"},
    { title: "Software Engineer"},
    { title: "Java Developer"},
    { title: "Angular Developer"},
  ];

  const [query, setQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 🔹 Handle typing
  const handleSearch = (value) => {
    setQuery(value);

    if (value.length < 1) {
      setFilteredJobs([]);
      setShowDropdown(false);
      return;
    }

    const results = jobList.filter(
      (job) =>
        job.title.toLowerCase().includes(value.toLowerCase()) ||
        job.company.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredJobs(results);
    setShowDropdown(true);
  };

  return (
    <section className="flex-grow-1 text-center mt-5 mb-4 container">
      {/* SEARCH BAR ROW */}
      <div className="row justify-content-center g-2 mt-4 home-serch ps-4 pe-4">
        {/* JOB INPUT */}
        <div className="col-12 col-md-3 search-input-wrapper position-relative">
          <div className="search-input d-flex align-items-center">
            <i className="fa fa-search me-2"></i>
            <input
              type="text"
              className="form-control border-0"
              placeholder="Job title, keywords, or company"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ boxShadow: "none" }}
            />
          </div>

          {/* 🔹 Static Autocomplete */}
          {showDropdown && filteredJobs.length > 0 && (
            <ul className="list-group position-absolute w-100 mt-1 shadow">
              {filteredJobs.map((job, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    setQuery(job.title);
                    setShowDropdown(false);
                  }}
                >
                  <strong>{job.title}</strong>
                  <br />
                  <small className="text-muted">{job.company}</small>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* LOCATION INPUT */}
        <div className="col-12 col-md-3 search-input-wrapper position-relative">
          <div className="search-input d-flex align-items-center">
            <i className="fa fa-location-dot"></i>
            <input
              type="text"
              placeholder="City, state, zip code, or remote"
              className="form-control border-0"
              style={{ boxShadow: "none" }}
            />
          </div>
        </div>

        {/* SEARCH BUTTON */}
        <div className="col-12 col-md-2">
          <NavLink
            to="/jobs"
            type="button"
            className="btn find-btn w-100 pt-4 pb-5"
          >
            Find jobs
          </NavLink>
        </div>
      </div>

      {/* TITLE */}
      <h1 className="main-title mt-5 ps-2 pe-2">Your next job starts here</h1>
      <p className="text-muted ps-3 pe-3">
        Create an account or sign in to see your personalised job
        recommendations.
      </p>

      {/* GET STARTED */}
      <NavLink to="/signin" className="btn start-btn mt-2 px-4 py-2">
        Get Started <i className="fa fa-right-long ms-2 arrow"></i>
      </NavLink>

      <p className="mt-5">
        <NavLink to="/signin" className="resume-link">
          Post your resume
        </NavLink>{" "}
        - It only takes a few seconds
      </p>
    </section>
  );
}

export default Home;
