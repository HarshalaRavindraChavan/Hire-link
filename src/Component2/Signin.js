import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Component2/css/Signin.css";
import logo from "../Component2/Image/logo.png";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";

function Signin() {
  const navigate = useNavigate();

  const [successMsg, setSuccessMsg] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ FIX 1: activeRole state
  const [activeRole, setActiveRole] = useState("Candidate");

  useEffect(() => {
    document.title = "Hirelink | Signin";
  }, []);

  /* ================= FORMik ================= */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
    }),

    // Api fecth code
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);

      try {
        let url = "";
        let payload = {};

        if (activeRole === "Candidate") {
          url =
            "https://norealtor.in/hirelink_apis/candidate/signin/tbl_candidate";

          payload = {
            can_email: values.email,
            can_password: values.password,
          };
        } else {
          url =
            "https://norealtor.in/hirelink_apis/employer/signin/tbl_employer";

          payload = {
            emp_email: values.email,
            emp_password: values.password,
          };
        }

        const response = await axios.post(url, payload);
        const data = response.data;

        if (data.status === true) {
          toast.success("Login successful!");

          if (activeRole === "Candidate") {
            localStorage.setItem("candidate", JSON.stringify(data.data));

            setTimeout(() => {
              navigate("/profile");
            }, 1200); //  1.2 sec delay
          } else {
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

            setTimeout(() => {
              navigate("/emp-profile");
            }, 1200);
          }

          resetForm();
        } else {
          toast.error(data.message || "Login failed");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Invalid email or password"
        );
      } finally {
        setLoading(false);
      }
    },
  });

  // ✅ FIX 2: handleSubmit define
  const handleSubmit = formik.handleSubmit;

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
          {/* LEFT SIDE BRAND PANEL */}
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

          {/* RIGHT LOGIN FORM */}
          <div className="col-lg-6 p-4 p-md-5">
            <div className="text-center">
              <NavLink to="/">
                <img
                  src={logo}
                  style={{
                    width: "150px",
                    height: "50px",
                    margin: "-15px 0 10px 0",
                  }}
                  alt="logo"
                />
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

            {apiError && (
              <div className="alert alert-danger py-2">{apiError}</div>
            )}

            {successMsg && (
              <div className="alert alert-success py-2">{successMsg}</div>
            )}

            <form onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div className="mb-3">
                <label className="fw-bold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* PASSWORD */}
              <div className="mb-2">
                <label className="fw-bold d-flex justify-content-between">
                  Password
                  <NavLink to="/forgot" className="text-decoration-none small">
                    Forgot?
                  </NavLink>
                </label>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* ROLE */}
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

              {/* SUBMIT */}
              <button
                type="submit"
                className="btn btn-primary-auth w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center text-muted mt-3">
              By continuing, you agree to Hirelink’s <a href="#">Terms</a> &{" "}
              <a href="#">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
