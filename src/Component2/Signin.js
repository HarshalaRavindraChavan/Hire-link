import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../Component2/css/Signin.css";
import logo from "../Component2/Image/logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function Login() {
  useState(() => {
    document.title = "Hirelink | Signin";
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Enter Register Email Address"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Enter password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", {
      ...data,
      role: activeRole,
    });
    alert("Form Submitted Successfully!");
  };

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

            <span className="badge bg-dark rounded-pill p-3 mb-2 border-0">
              10k+ Active Candidates
            </span>
            <br />
            <span className="badge bg-warning text-dark rounded-pill p-3 border-0">
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
            <NavLink to="/">
              <img
                src={logo}
                style={{
                  wirth: "50px",
                  height: "50px",
                  margin: "-15px 0 10px 0",
                }}
              ></img>
            </NavLink>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="fw-semibold">Welcome back</h2>
              <p className="text-muted">Login to Hirelink.</p>
            </div>
            <NavLink to="/signup" className="btn btn-sm btn-outline-auth">
              <b>Sign Up</b>
            </NavLink>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* EMAIL INPUT */}
            <div className="mb-3">
              <label className="fw-bold">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="you@example.com"
                {...register("email")}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>

            {/* PASSWORD INPUT */}
            <div className="mb-2">
              <label className="fw-bold d-flex justify-content-between">
                Password
                <NavLink to="/forgot" className="text-decoration-none small">
                  Forgot?
                </NavLink>
              </label>

              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter your password"
                {...register("password")}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>

            {/* ROLE SELECTION */}
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
