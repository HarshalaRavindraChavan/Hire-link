import React, { useState, useEffect } from "react";
import "../Component2/css/Company.css";
import { BASE_URL } from "../config/constants";

function Company() {
  useEffect(() => {
    document.title = "Hirelink | Companies Review";
  }, []);

  const [searchText, setSearchText] = useState("");
  const [showList, setShowList] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [popularCompanies, setPopularCompanies] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}hirelink_apis/admin/getdata/tbl_employer`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setCompanies(data.data);
          setPopularCompanies(data.data.slice(0, 4));
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, []);

  // Click outside hide dropdown
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".search-box")) {
        setShowList(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="company">
      <section className="text-center mt-5 container">
        {/* TITLE */}
        <h1 className="main-title">Find great places to work</h1>
        <p className="sub-text">Get access to millions of company reviews</p>

        {/* SEARCH WRAPPER */}
        <div className="search-wrapper d-flex justify-content-center align-items-center ps-3 pe-3">
          {/* SEARCH BOX WITH DROPDOWN */}
          <div className="position-relative flex-grow-1 search-box">
            <i className="fa fa-search"></i>

            <input
              type="text"
              placeholder="Company name or job title"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setShowList(e.target.value.length > 0);
              }}
            />

            {/* DROPDOWN LIST */}
            {showList && (
              <ul className="suggest-list">
                {companies
                  .filter((c) =>
                    c.emp_companyname
                      ?.toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                  .map((c, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setSearchText(c.emp_companyname);
                        setShowList(false);
                      }}
                    >
                      {c.emp_companyname}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <button className="search-btn d-none d-lg-block ">
            Find Companies
          </button>
          <button className="search-btn d-lg-none ps-5 pe-5 pt-2  pb-2 ">
            Find
          </button>
        </div>

        {/* EXTRA LINK */}
        {/* <a
          href="#"
          style={{ fontSize: "14px", color: "#2557a7", fontWeight: 600 }}
        >
          Do you want to search for salaries?
        </a> */}

        {/* POPULAR COMPANIES */}
        <h3 className="text-start mt-5 fw-bold ps-3">Popular Companies</h3>

        <div className="row mt-3 g-3 ps-3 pe-3">
          {popularCompanies.map((c, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div className="company-card" style={{ height: "200px" }}>
                <img
                  src={
                    c.emp_com_logo
                      ? `${BASE_URL}hirelink_apis/Uploads/${c.emp_com_logo}`
                      : "https://via.placeholder.com/100"
                  }
                  width="150px"
                  height="100px"
                  className="mb-2"
                  style={{ borderRadius: "20%", objectFit: "contain" }}
                  alt="logo"
                />
                <h6 className="mt-2 mb-1 fw-semibold">{c.emp_companyname}</h6>
                <p style={{ fontSize: "13px", color: "#777" }}>
                  {/* {c.total_reviews || "0"} reviews */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Company;
