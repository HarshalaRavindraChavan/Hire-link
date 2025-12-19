import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Component2/css/Signup.css";
import logo from "../Component2/Image/logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("Candidate");

  // ✅ FIX 1: activeRole state
  const [activeRole, setActiveRole] = useState("Candidate");

  useEffect(() => {
    document.title = "Hirelink | Signup";
  }, []);

  /* ---------------- VALIDATION ---------------- */
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
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = async (formData) => {
    try {
      const payload = {
        can_name: formData.fullname,
        can_email: formData.email,
        can_password: formData.password,
      };

      const response = await axios.post(
        "https://norealtor.in/hirelink_apis/candidate/signup/tbl_candidate",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      const candidate = response.data;

      if (candidate.status === true) {
        localStorage.setItem("candidate", JSON.stringify(candidate.data));
        toast.success("Account created successfully");

        reset();
        setTimeout(() => navigate("/profile"), 1000);
      } else {
        toast.error(candidate.message || "Signup failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error. Try again.");
    }
  };

  /* ---------------- JSX ---------------- */
  return (
    <>
      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />

      <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
        <div
          className="row g-0 shadow-lg rounded-4 overflow-hidden bg-white"
          style={{ maxWidth: "1000px" }}
        >
          {/* LEFT PANEL */}
          <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-between text-white p-4 signup-brand-panel">
            <div>
              <h2 className="fw-bold">Hirelink</h2>
              <h4 className="fw-semibold">
                Build your hiring{" "}
                <span style={{ color: "#ffd60a" }}>in minutes.</span>
              </h4>
              <p className="small opacity-75">
                Set up profile, post jobs, or start applying.
              </p>
            </div>

            <p className="small opacity-75">
              “Hirelink helped us close roles 2x faster.”
            </p>
          </div>

          {/* RIGHT FORM */}
          <div className="col-lg-6 p-4 p-md-5">
            <div className="text-center mb-2">
              <NavLink to="/">
                <img
                  src={logo}
                  style={{ width: "150px", height: "50px" }}
                  alt="logo"
                />
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

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label>Full name</label>
                  <input
                    className={`form-control ${
                      errors.fullname ? "is-invalid" : ""
                    }`}
                    {...register("fullname")}
                    placeholder="Enter your name"
                  />
                  <div className="invalid-feedback">
                    {errors.fullname?.message}
                  </div>
                </div>

                <div className="col-md-6">
                  <label>Email</label>
                  <input
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email")}
                    placeholder="Enter your email"
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>
              </div>

              <div className="row g-3 mt-2">
                <div className="col-md-6">
                  <label>Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password")}
                    placeholder="Enter your password"
                  />
                </div>

                <div className="col-md-6">
                  <label>Confirm password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    {...register("confirmPassword")}
                    placeholder="Enter confirm password"
                  />
                </div>
              </div>

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

              <button className="btn btn-primary-signup w-100 mt-4">
                Create Account ✓
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
