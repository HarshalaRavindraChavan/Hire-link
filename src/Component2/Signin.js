import { useState } from "react";
import "../Component2/css/Signin.css";
import logo from "../Component2/Image/logo.png";

export default function Login() {
  useState(() => {
    document.title = "Hirelink | Signin";
  }, []);

  const [activeRole, setActiveRole] = useState("Candidate");

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div
        className="row g-0 shadow-lg rounded-4 overflow-hidden bg-white"
        style={{ maxWidth: "1000px" }}
      >
        {/* LEFT SIDE BRAND INFORMATION PANEL */}
        <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-between text-white p-4 brand-panel">
          <div>
            <h2 className="fw-bold">Hirelink</h2>
            <h4 className="fw-semibold">
              Your next hire is{" "}
              <span style={{ color: "#ffd60a" }}>already here.</span>
            </h4>
            <p className="small opacity-75">
              Smart matching for fast teams & ambitious job seekers.
            </p>

            <span className="badge bg-dark rounded-pill p-2 mb-2">
              10k+ Active Candidates
            </span>
            <br />
            <span className="badge bg-warning text-dark rounded-pill p-2">
              Trusted by 250+ companies
            </span>
          </div>

          <div className="bg-dark bg-opacity-50 p-3 rounded-3">
            <small className="text-uppercase opacity-75">Highlight</small>
            <h6 className="fw-semibold">One login for all your hiring</h6>
            <p className="small opacity-75">
              Track candidates & manage interviews from one dashboard.
            </p>
          </div>
        </div>

        {/* RIGHT LOGIN FORM PANEL */}
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
              <h2 className="fw-semibold">Welcome back</h2>
              <p className="text-muted">Login to Hirelink.</p>
            </div>
            <a href="/signup" className="btn btn-sm btn-outline-auth">
              <b>Sign Up</b>
            </a>
          </div>

          <form>
            {/* EMAIL INPUT */}
            <div className="mb-3">
              <label className="fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* PASSWORD INPUT */}
            <div className="mb-2">
              <label className="fw-bold d-flex justify-content-between">
                Password
                <a href="/forgot" className="text-decoration-none small">
                  Forgot?
                </a>
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* ROLE SELECTION PILLS */}
            <div className="mt-3 mb-4">
              <label className="small fw-medium d-block">Login as</label>

              <div className="d-flex flex-wrap gap-2">
                <button
                  type="button"
                  className={`role-pill ${
                    activeRole === "Candidate" ? "active" : ""
                  }`}
                  onClick={() => setActiveRole("Candidate")}
                >
                  Candidate
                </button>

                <button
                  type="button"
                  className={`role-pill ${
                    activeRole === "Employer" ? "active" : ""
                  }`}
                  onClick={() => setActiveRole("Employer")}
                >
                  Employer / Recruiter
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button type="submit" className="btn btn-primary-auth w-100 mb-3">
              Login to Hirelink
            </button>
          </form>

          <p className="text-center text-muted mt-3">
            By continuing, you agree to Hirelink’s <a href="#">Terms</a> &
            <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
