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

  // ✅ FIX 1: activeRole state
  const [activeRole, setActiveRole] = useState("Candidate");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Hirelink | Signup";
  }, []);

  /* ---------------- VALIDATION ---------------- */
  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full name is required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Work email is required"),

    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^[6-9]\d{9}$/, "Mobile number must be exactly 10 digits"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
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
  const onSubmit = async (values) => {
    setLoading(true);

    try {
      let url = "";
      let payload = {};

      if (activeRole === "Candidate") {
        // 🔹 Candidate Signup API
        url =
          "https://norealtor.in/hirelink_apis/candidate/signup/tbl_candidate";

        payload = {
          can_name: values.fullname,
          can_email: values.email,
          can_password: values.password,
          can_mobile: values.mobile,
        };
      } else {
        // 🔹 Employer Signup API
        url = "https://norealtor.in/hirelink_apis/employer/signup/tbl_employer";

        payload = {
          emp_name: values.fullname,
          emp_email: values.email,
          emp_password: values.password,
          emp_mobile: values.mobile,
        };
      }

      const response = await axios.post(url, payload);
      const data = response.data;

      if (data.status === true) {
        toast.success(`${activeRole} account created successfully!`);

        // 🔹 Store & Redirect based on role
        if (activeRole === "Candidate") {
          localStorage.setItem("candidate", JSON.stringify(data.data));
          setTimeout(() => navigate("/profile"), 1200);
        } else {
          // 🔹 Auth (role & permission)
          localStorage.setItem(
            "auth",
            JSON.stringify({
              role: "employer",
              emp_id: data.data.emp_id,
            })
          );

          // 🔹 FULL employer table data
          localStorage.setItem(
            "employer",
            JSON.stringify(data.data) // 🔥 full row
          );

          setTimeout(() => navigate("/emp-profile"), 1200);
        }

        reset(); // ✅ react-hook-form correct reset
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error. Try again.");
    } finally {
      setLoading(false);
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

              <div className="mt-4">
                <span className="badge bg-dark rounded-pill p-3 mb-2 border-0">
                  Step 1 – 1 min
                </span>
                <br />
                <span className="badge bg-warning text-dark rounded-pill p-3 border-0">
                  Step 2 – Instant
                </span>
              </div>
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

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4
                  className=""
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                >
                  Create Your Hirelink Account
                </h4>
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
              <div className="row g-2">
                <div className="col-md-6">
                  <label className="mb-1">Full name</label>
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
                  <label className="mb-1">Email</label>
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

              <div className="row g-2 mt-1">
                <div className="col-md-6">
                  <label className="mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    className={`form-control ${
                      errors.mobile ? "is-invalid" : ""
                    }`}
                    placeholder="Enter yor mobile number"
                    maxLength={10}
                    {...register("mobile")}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                    }}
                  />
                  {errors.mobile && (
                    <div className="invalid-feedback">
                      {errors.mobile.message}
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="mb-1">Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password")}
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className="small fw-medium d-block ">Login as</label>
                <div className="d-flex gap-2">
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

              <button className="btn btn-primary-signup w-100 mt-3">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
