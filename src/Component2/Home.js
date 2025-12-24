import "../Component2/css/Home.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useState(() => {
    document.title = "Welcome To Hirelink";
    
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

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("candidate");
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const jobList = [
    { title: "React Developer" },
    { title: "Frontend Developer" },
    { title: "Backend Developer" },
    { title: "Full Stack Developer" },
    { title: "UI/UX Designer" },
    { title: "Software Engineer" },
    { title: "Java Developer" },
    { title: "Angular Developer" },
  ];

  const [query, setQuery] = useState("");
  // const [filteredJobs, setFilteredJobs] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 🔹 Handle typing
  // const handleSearch = (value) => {
  //   setQuery(value);

  //   if (value.length < 1) {
  //     setFilteredJobs([]);
  //     setShowDropdown(false);
  //     return;
  //   }

  //   const results = jobList.filter(
  //     (job) =>
  //       job.title.toLowerCase().includes(value.toLowerCase()) ||
  //       job.company.toLowerCase().includes(value.toLowerCase())
  //   );

  //   setFilteredJobs(results);
  //   setShowDropdown(true);
  // };

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

  useEffect(() => {
    const closeSuggestions = () => {
      setShowKeywordSug(false);
      setShowPlaceSug(false);
    };

    document.addEventListener("click", closeSuggestions);
    return () => document.removeEventListener("click", closeSuggestions);
  }, []);

  return (
    <section className="flex-grow-1 text-center mt-5 mb-4 container">
      {/* SEARCH BAR ROW */}
      <div className="row justify-content-center g-2 mt-4 home-serch ps-4 pe-4">
        {/* JOB INPUT */}
        {/* <div className="col-12 col-md-3 search-input-wrapper position-relative">
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
        </div> */}
        <div className="col-12 col-md-3 position-relative">
          <div className="search-input">
            <div className="d-flex align-items-center">
              <i className="fa fa-search me-2"></i>
              <input
                type="text"
                className="form-control border-0"
                placeholder="Job title, keywords, or company"
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  setAppliedKeyword("");
                }}
                onFocus={() => searchKeyword && setShowKeywordSug(true)}
                onClick={(e) => e.stopPropagation()}
                style={{ boxShadow: "none" }}
              />
            </div>

            {showKeywordSug && keywordSug.length > 0 && (
              <ul
                className="list-group position-absolute w-100 shadow"
                style={{ zIndex: 1000 }}
                onClick={(e) => e.stopPropagation()}
              >
                {keywordSug.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action d-flex justify-content-between"
                    onClick={() => {
                      setSearchKeyword(item.text);
                      setAppliedKeyword(item.text);
                      setShowKeywordSug(false);
                      setHasSearched(true);
                    }}
                  >
                    <strong>{item.text}</strong>
                    <small className="text-muted">({item.type})</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* LOCATION INPUT */}
        {/* <div className="col-12 col-md-3 search-input-wrapper position-relative">
          <div className="search-input d-flex align-items-center">
            <i className="fa fa-location-dot"></i>
            <input
              type="text"
              placeholder="City, state, zip code, or remote"
              className="form-control border-0"
              style={{ boxShadow: "none" }}
            />
          </div>
        </div> */}
        <div className="col-12 col-md-3 position-relative">
          <div className="search-input">
            <div className="d-flex align-items-center">
              <i className="fa fa-location-dot me-2"></i>
              <input
                type="text"
                placeholder="City, state, zip code, or remote"
                className="form-control border-0"
                value={searchPlace}
                onChange={(e) => {
                  setSearchPlace(e.target.value);
                  setAppliedPlace("");
                }}
                onFocus={() => searchPlace && setShowPlaceSug(true)}
                onClick={(e) => e.stopPropagation()}
                style={{ boxShadow: "none" }}
              />
            </div>

            {showPlaceSug && placeSug.length > 0 && (
              <ul
                className="list-group position-absolute w-100 shadow"
                style={{ zIndex: 1000 }}
                onClick={(e) => e.stopPropagation()}
              >
                {placeSug.map((place, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => {
                      setSearchPlace(place);
                      setAppliedPlace(place);
                      setShowPlaceSug(false);
                      setHasSearched(true);
                    }}
                  >
                    {place}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* SEARCH BUTTON */}
        <div className="col-12 col-md-2">
          <NavLink
            to="/jobs"
            type="button"
            className="btn find-btn w-100 pt-4 pb-5"
            onClick={() => {
              setAppliedKeyword(searchKeyword);
              setAppliedPlace(searchPlace);
              setHasSearched(true);
              setShowKeywordSug(false);
              setShowPlaceSug(false);
            }}
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
      {isLogin && (
        <>
          <NavLink to="/jobs" className="btn start-btn mt-2 px-4 py-2">
            Get Started <i className="fa fa-right-long ms-2 arrow"></i>
          </NavLink>

          <p className="mt-5">
            <NavLink to="/profile" className="resume-link">
              Post your resume
            </NavLink>{" "}
            - It only takes a few seconds
          </p>
        </>
      )}

      {!isLogin && (
        <>
          <NavLink to="/signin" className="btn start-btn mt-2 px-4 py-2">
            Get Started <i className="fa fa-right-long ms-2 arrow"></i>
          </NavLink>

          <p className="mt-5">
            <NavLink to="/signin" className="resume-link">
              Post your resume
            </NavLink>{" "}
            - It only takes a few seconds
          </p>
        </>
      )}
    </section>
  );
}

export default Home;
