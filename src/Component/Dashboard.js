import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
function Dashboard() {
  // tital of tab
  useState(() => {
    document.title = "Hirelink | Dashboard";
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <div>
          <h3 className=" mb-3" style={{ color: "black", fontWeight: "bold" }}>
            Dashboard
          </h3>
        </div>
        {/* <div className="ms-auto py-2 py-md-0">
          <a href="#" className="btn btn-label-info btn-round me-2">
            Manage
          </a>
        </div> */}
      </div>
      <div className="row">
        {/* ---------- Row 1 : Card 1 ---------- */}
        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <div
            className="card card-stats card-round border"
            onClick={() => navigate("/jobs")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div
                    className="icon-big text-center icon-info bubble-shadow-small bg-success"

                  >
                    <i className="fa fa-briefcase"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p
                      className="card-category fw-bold text-dark"
                      style={{ fontSize: "18px" }}
                    >
                      Jobs
                    </p>
                    <h4
                      className="card-title fw-bold text-dark"
                      style={{ fontSize: "18px" }}
                    >
                      1294
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Row 1 : Card 2 ---------- */}
        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <div
            className="card card-stats card-round border"
            onClick={() => navigate("/condidate")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div
                    className="icon-big text-center icon-info bubble-shadow-small bg-warning"
  
                  >
                    <i className="fa fa-users"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p
                      className="card-category fw-bold text-dark"
                      style={{ fontSize: "18px" }}
                    >
                      Candidates
                    </p>
                    <h4
                      className="card-title fw-bold text-dark"
                      style={{ fontSize: "18px" }}
                    >
                      1303
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Row 1 : Card 3 ---------- */}
        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <div
            className="card card-stats card-round border"
            onClick={() => navigate("/interview")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div
                    className="icon-big text-center icon-info bubble-shadow-small"
                    style={{ backgroundColor: "#9aa09b", color: "white" }}
                  >
                    <i className="fa fa-comments"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p
                      className="card-category fw-bold text-dark"
                      style={{ fontSize: "18px" }}
                    >
                      Interview
                    </p>
                    <h4
                      className="card-title fw-bold text-dark"
                      style={{ fontSize: "18px" }}
                    >
                      1345
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Row 2 : Card 4 ---------- */}
        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <div
            className="card card-stats card-round border"
            onClick={() => navigate("/employe")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div
                    className="icon-big text-center icon-info bubble-shadow-small bg-success"

                  >
                    <i className="fa fa-user-tie"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p
                      className="card-category fw-bold text-dark"
                      style={{ fontSize: "18px" }}
                    >
                      Employees
                    </p>
                    <h4
                      className="card-title fw-bold text-dark"
                      style={{ fontSize: "18px" }}
                    >
                      576
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Row 2 : Card 5 ---------- */}
        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <div
            className="card card-stats card-round border"
            onClick={() => navigate("/contact")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div
                    className="icon-big text-center icon-info bubble-shadow-small bg-warning"
                  > 
                    <i className="fa fa-headphones"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p
                      className="card-category fw-bold text-dark"
                      style={{ fontSize: "18px" }}
                    >
                      Contacts
                    </p>
                    <h4
                      className="card-title fw-bold text-dark"
                      style={{ fontSize: "18px" }}
                    >
                      200
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Row 2 : Card 6 ---------- */}
        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <div
            className="card card-stats card-round border"
            onClick={() => navigate("/user")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div
                    className="icon-big text-center icon-info bubble-shadow-small"
                    style={{ backgroundColor: "#9aa09b", color: "white" }}
                  >
                    <i className="fa fa-user"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p
                      className="card-category fw-bold text-dark"
                      style={{ fontSize: "18px" }}
                    >
                      Users
                    </p>
                    <h4
                      className="card-title fw-bold text-dark"
                      style={{ fontSize: "18px" }}
                    >
                      1000
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
