import "../Component2/css/Home.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import JobSearchBar from "./JobSearchBar";
import { BASE_URL } from "../config/constants";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";

function Home() {
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${BASE_URL}hirelink_apis/candidate/getdata/tbl_job`)
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

  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [appliedPlace, setAppliedPlace] = useState("");

  return (
    <>
      <SEO
        title={seoConfig.home.title}
        description={seoConfig.home.description}
      />
      <section className="flex-grow-1 text-center mt-5 mb-4 container">
        {/* SEARCH BAR ROW */}

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
          onSearch={() =>
            navigate(
              `/jobs?keyword=${appliedKeyword || searchKeyword}&place=${
                appliedPlace || searchPlace
              }`
            )
          }
        />

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
    </>
  );
}

export default Home;
