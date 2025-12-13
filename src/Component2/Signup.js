import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../Component2/css/Signup.css";
import logo from "../Component2/Image/logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Signup = () => {
  useState(() => {
    document.title = "Hirelink | Signup";
  }, []);

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full name is required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Work email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log({
      ...data,
      role,
    });
    alert("Account Created Successfully!");
  };

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
              <h4 className="fw-semibold">Create your Hirelink Account</h4>
              <p className="text-muted">
                It takes less than a minute to get started.
              </p>
            </div>

            <NavLink to="/signin" className="btn btn-sm btn-outline-auth">
              <b>Login</b>
            </NavLink>
          </div>

          {/* SIGNUP FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              {/* FULL NAME */}
              <div className="col-md-6">
                <label className="fw-medium">Full name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.fullname ? "is-invalid" : ""
                  }`}
                  placeholder="Full Name"
                  {...register("fullname")}
                />
                <div className="invalid-feedback">
                  {errors.fullname?.message}
                </div>
              </div>

              {/* EMAIL */}
              <div className="col-md-6">
                <label className="fw-medium">Work Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="you@gmail.com"
                  {...register("email")}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>
            </div>

            <div className="row g-3 mt-1">
              {/* PASSWORD */}
              <div className="col-md-6">
                <label className="fw-medium">Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Strong password"
                  {...register("password")}
                />
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="col-md-6">
                <label className="fw-medium">Confirm password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  placeholder="Repeat password"
                  {...register("confirmPassword")}
                />
                <div className="invalid-feedback">
                  {errors.confirmPassword?.message}
                </div>
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

            {/* SUBMIT */}
            <button type="submit" className="btn btn-primary-auth w-100 mt-4">
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
