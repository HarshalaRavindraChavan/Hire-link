import React, { useState } from "react";
import "../Component2/css/Home.css";

function Home() {
   useState(() => {
    document.title = "Welcome To Hirelink";
  }, []);

  return (
    <section className="flex-grow-1 text-center mt-5 mb-4 container">
      {/* SEARCH BAR ROW */}
      <div className="row justify-content-center g-2 mt-4 home-serch ps-4 pe-4">
        {/* JOB INPUT */}
        <div className="col-12 col-md-3 search-input-wrapper position-relative">
          <div className="search-input d-flex align-items-center">
            <i className="fa fa-search"></i>
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              className="form-control border-0"
              style={{ boxShadow: "none" }}
            />
          </div>
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
          <a href="/jobs" type="button" className="btn find-btn w-100 pt-4 pb-5">
            Find jobs
          </a>
        </div>
      </div>

      {/* TITLE */}
      <h1 className="main-title mt-5 ps-2 pe-2">Your next job starts here</h1>
      <p className="text-muted ps-3 pe-3">
        Create an account or sign in to see your personalised job
        recommendations.
      </p>

      {/* GET STARTED */}
      <a href="/signin" className="btn start-btn mt-2 px-4 py-2">
        Get Started <i className="fa fa-right-long ms-2 arrow"></i>
      </a>

      <p className="mt-5">
        <a href="/signin" className="resume-link">
          Post your resume
        </a>{" "}
        - It only takes a few seconds
      </p>
    </section>
  );
}

export default Home;
