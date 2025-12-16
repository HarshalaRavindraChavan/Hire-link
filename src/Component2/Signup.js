import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../Component2/css/Signup.css";
import logo from "../Component2/Image/logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

const Signup = () => {
  const [role, setRole] = useState("Candidate");
  const [message, setMessage] = useState("");

  // ✅ FIX 1: useEffect
  useEffect(() => {
    document.title = "Hirelink | Signup";
  }, []);

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Work email is required"),
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
    reset, // ✅ FIX 2
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      setMessage("");

      const payload = {
        can_name: data.fullname,
        can_email: data.email,
        can_password: data.password,
      };

      console.log("Sending JSON:", payload);

      const response = await axios.post(
        "https://norealtor.in/hirelink_apis/candidate/signup/tbl_candidate",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Signup API Response:", response.data);

      if (response.data.status === true) {
        setMessage("✅ Account created successfully");
        reset();
      } else {
        setMessage(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data);
      setMessage(error.response?.data?.message || "Server error. Try again.");
    }
  };

  return (
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
              Build your hiring <span style={{ color: "#ffd60a" }}>in minutes.</span>
            </h4>
            <p className="small opacity-75">
              Set up profile, post jobs, or start applying.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="col-lg-6 p-4 p-md-5">
          <div className="text-center">
            <NavLink to="/">
              <img
                src={logo}
                style={{
                  width: "50px", // ✅ FIX 3
                  height: "50px",
                  margin: "-15px 0 10px 0",
                }}
                alt="logo"
              />
            </NavLink>
          </div>

          <h4 className="fw-semibold">Create your Hirelink Account</h4>
          <p className="text-muted">It takes less than a minute.</p>

          {message && <p className="text-center">{message}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label>Full name</label>
                <input
                  className={`form-control ${errors.fullname ? "is-invalid" : ""}`}
                  {...register("fullname")}
                />
                <div className="invalid-feedback">{errors.fullname?.message}</div>
              </div>

              <div className="col-md-6">
                <label>Email</label>
                <input
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  {...register("email")}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>
            </div>

            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <label>Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  {...register("password")}
                />
                <div className="invalid-feedback">{errors.password?.message}</div>
              </div>

              <div className="col-md-6">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  {...register("confirmPassword")}
                />
                <div className="invalid-feedback">
                  {errors.confirmPassword?.message}
                </div>
              </div>
            </div>

            <button className="btn btn-primary-signup w-100 mt-4">
              Create Account ✓
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
