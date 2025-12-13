import React, { useState } from "react";
import "../Component2/css/Signup.css";
import logo from "../Component2/Image/logo.png";

const Signup = () => {
  useState(() => {
    document.title = "Hirelink | Signup";
  }, []);

  const [role, setRole] = useState("Candidate");

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div
        className="row g-0 shadow-lg rounded-4 overflow-hidden bg-white"
        style={{ maxWidth: "1000px" }}
      >
        {/* LEFT BRAND PANEL */}
        <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-between text-white p-4 brand-panel">
          <div>
            <h2 className="fw-bold">Hirelink</h2>
            <h4 className="fw-semibold">
              Build your hiring{" "}
              <span style={{ color: "#ffd60a" }}>in minutes.</span>
            </h4>
            <p className="small opacity-75">
              Set up profile, post jobs, or start applying.
            </p>

            <div className="mt-4">
              <span className="badge bg-dark rounded-pill p-2 mb-2">
                Step 1 – 1 min
              </span>
              <br />
              <span className="badge bg-warning text-dark rounded-pill p-2">
                Step 2 – Instant
              </span>
            </div>
          </div>

          <p className="small opacity-75">
            “Hirelink helped us close roles 2x faster with better fit.”
            <br />
            <span className="opacity-100">– Product Lead, GrowthStage Co.</span>
          </p>
        </div>

        {/* RIGHT SIGNUP FORM */}
        <div className="col-lg-6 p-4 p-md-5">
          <div className="text-center ">
            <a href="/">
              <img
                src={logo}
                style={{
                  wirth: "50px",
                  height: "50px",
                  margin: "-15px 0 10px 0",
                }}
              ></img>
            </a>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="fw-semibold">Create your Hirelink Account</h4>
              <p className="text-muted">
                It takes less than a minute to get started.
              </p>
            </div>

            <a href="/signin" className="btn btn-sm btn-outline-auth">
              <b>Login</b>
            </a>
          </div>

          {/* SIGNUP FORM */}
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="fw-medium">Full name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                />
              </div>

              <div className="col-md-6">
                <label className="fw-medium">Work Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@gmail.com"
                />
              </div>
            </div>

            <div className="row g-3 mt-1">
              <div className="col-md-6">
                <label className="fw-medium">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Strong password"
                />
              </div>

              <div className="col-md-6">
                <label className="fw-medium">Confirm password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Repeat password"
                />
              </div>
            </div>

            {/* ROLE SELECTION */}
            <div className="mt-4">
              <label className="small fw-medium d-block mb-2">Signup as</label>

              <div className="d-flex flex-wrap gap-2">
                <button
                  type="button"
                  className={`role-pill ${
                    role === "Candidate" ? "active" : ""
                  }`}
                  onClick={() => setRole("Candidate")}
                >
                  Candidate
                </button>

                <button
                  type="button"
                  className={`role-pill ${role === "Employer" ? "active" : ""}`}
                  onClick={() => setRole("Employer")}
                >
                  Employer / Recruiter
                </button>
              </div>
            </div>

            <button className="btn btn-primary-auth w-100 mt-4">
              Create Account ✓
            </button>
          </form>

          <p className="text-center text-muted mt-3">
            By signing up, you agree to Hirelink’s <a href="#">Terms</a> &
            <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
