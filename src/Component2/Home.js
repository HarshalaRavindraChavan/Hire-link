import "../Component2/css/Home.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Welcome To Hirelink";

    axios
      .get("https://norealtor.in/hirelink_apis/candidate/getdata/tbl_job")
      .then((res) => {
        if (res.data.status === "success") {
          setJobs(res.data.data);
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

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchPlace, setSearchPlace] = useState("");

  const [keywordSug, setKeywordSug] = useState([]);
  const [placeSug, setPlaceSug] = useState([]);

  const [showKeywordSug, setShowKeywordSug] = useState(false);
  const [showPlaceSug, setShowPlaceSug] = useState(false);
  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [appliedPlace, setAppliedPlace] = useState("");

  useEffect(() => {
    if (!searchKeyword.trim()) {
      setKeywordSug([]);
      setShowKeywordSug(false);
      return;
    }

    const keyword = searchKeyword.toLowerCase();
    let suggestions = [];

    jobs.forEach((job) => {
      // ===== HANDLE SKILLS SEPARATELY =====
      if (job.job_skills) {
        job.job_skills
          .split(",") // html, css, js -> ["html", " css", " js"]
          .map((skill) => skill.trim())
          .forEach((skill) => {
            if (skill.toLowerCase().startsWith(searchKeyword.toLowerCase())) {
              suggestions.push({
                text: skill,
                type: "Skill",
              });
            }
          });
      }

      // ===== OTHER FIELDS (title, company) =====
      const otherFields = [
        { value: job.job_title, type: "Job Title" },
        { value: job.job_company, type: "Company" },
        { value: job.city_name, type: "City" },
      ];

      otherFields.forEach((field) => {
        if (
          field.value &&
          field.value.toLowerCase().startsWith(searchKeyword.toLowerCase())
        ) {
          suggestions.push({
            text: field.value,
            type: field.type,
          });
        }
      });
    });

    // 🔹 Remove duplicates
    const uniqueSuggestions = suggestions.filter(
      (v, i, a) => a.findIndex((t) => t.text === v.text) === i
    );

    setKeywordSug(uniqueSuggestions.slice(0, 8));
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
        <div className="col-12 col-md-3 position-relative">
          <div className="search-input d-flex align-items-center">
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
              style={{ zIndex: 1000, background: "#dfdcdcff" }}
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
                  }}
                >
                  <strong>{item.text}</strong>
                  <small className="text-muted">({item.type})</small>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* LOCATION INPUT */}
        <div className="col-12 col-md-3 position-relative">
          <div className="search-input d-flex align-items-center">
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
              style={{ zIndex: 1000, background: "#dfdcdcff" }}
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
                  }}
                >
                  {place}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* SEARCH BUTTON */}
        <div className="col-12 col-md-2">
          <button
            className="btn find-btn w-100"
            onClick={() => {
              navigate(
                `/jobs?keyword=${encodeURIComponent(
                  appliedKeyword || searchKeyword
                )}&place=${encodeURIComponent(appliedPlace || searchPlace)}`
              );
            }}
          >
            Find jobs
          </button>
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
