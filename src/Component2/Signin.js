import { NavLink, useNavigate } from "react-router-dom";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import { useState, useEffect } from "react";
import "../Component2/css/Signin.css";
import logo from "../Component2/Image/logo.png";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../config/constants";
import { saveFcmToken } from "./saveFcmToken";
import ReCAPTCHA from "react-google-recaptcha";

function Signin() {
  const navigate = useNavigate();

  const [successMsg, setSuccessMsg] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  // ✅ FIX 1: activeRole state
  const [activeRole, setActiveRole] = useState("candidate");
  useEffect(() => {
    if (activeRole === "candidate") {
      localStorage.removeItem("auth");
      localStorage.removeItem("employer");
    } else {
      localStorage.removeItem("candidate");
    }
  }, [activeRole]);

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

    onSubmit: async (values, { resetForm }) => {
      if (!captchaToken) {
        toast.error("Please verify captcha!");
        return;
      }

      setLoading(true);

      try {
        let url = "";
        let payload = {};

        if (activeRole === "candidate") {
          url = `${BASE_URL}candidate/signin/tbl_candidate`;
          payload = {
            can_email: values.email,
            can_password: values.password,
            captchaToken: captchaToken,
          };
        } else {
          url = `${BASE_URL}employer/signin/tbl_employer`;
          payload = {
            emp_email: values.email,
            emp_password: values.password,
            captchaToken: captchaToken,
          };
        }

        const response = await axios.post(url, payload);
        const data = response.data;

        // ✅ ✅ 1) LOGIN SUCCESS => Store data and navigate
        if (data.status === true) {
          toast.success("Login successful!");

          if (activeRole === "candidate") {
            localStorage.setItem("candidate", JSON.stringify(data.data));

            if (data.data?.can_id) {
              saveFcmToken(data.data.can_id);
            }

            navigate("/profile");
          } else {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                role: 100,
                emp_id: data.data.emp_id,
                emp_email: data.data.emp_email,
                emp_companyname: data.data.emp_companyname,
                emp_com_logo: data.data.emp_com_logo,
              }),
            );

            localStorage.setItem("employer", JSON.stringify(data.data));

            navigate("/emp-profile");
          }

          resetForm();
          return;
        }

        // ✅ ✅ 2) PAYMENT REQUIRED => Don't store candidate/employer, go payment
        if (data.payment_required === true) {
          toast.error(
            data.message || "Payment pending. Please complete payment.",
          );

          localStorage.setItem(
            "signupTempData",
            JSON.stringify({
              role: activeRole, // candidate | employer
              data: data.data,
              createdAt: Date.now(),
            }),
          );

          localStorage.setItem(
            "paymentUser",
            JSON.stringify({
              email: values.email,
              role: activeRole.toLowerCase(), //must be "candidate" / "employer"
            }),
          );

          navigate("/payment");
          return;
        }

        // ✅ ✅ 3) Normal fail
        toast.error(data.message || "Login failed");
      } catch (error) {
        const errData = error.response?.data;

        // ✅ OTP required -> redirect verify
        if (errData?.otp_required === true) {
          toast.error(errData.message || "OTP verification required");

          localStorage.setItem(
            "signupTempData",
            JSON.stringify({
              role: activeRole, // candidate | employer
              data: errData.data,
              createdAt: Date.now(),
            }),
          );

          localStorage.setItem(
            "verifyUser",
            JSON.stringify({
              email: errData.email || values.email,
              role: activeRole,
              mobile: errData.mobile,
            }),
          );

          navigate("/verify");
          return;
        }

        // ✅ Payment pending -> redirect to payment
        if (errData?.payment_required === true) {
          toast.error(
            errData.message || "Payment pending. Please complete payment.",
          );

          localStorage.setItem(
            "signupTempData",
            JSON.stringify({
              role: activeRole, // candidate | employer
              data: errData.data,
              createdAt: Date.now(),
            }),
          );

          localStorage.setItem(
            "paymentUser",
            JSON.stringify({
              email: values.email,
              role: activeRole.toLowerCase(),
              for: "Account Creat",
              returnTo:
                activeRole === "candidate" ? "/profile" : "/emp-profile",
            }),
          );

          navigate("/payment");
          return;
        }

        toast.error(errData?.message || "Invalid email or password");
      } finally {
        setLoading(false);
      }
    },
  });

  // ✅ FIX 2: handleSubmit define
  const handleSubmit = formik.handleSubmit;

  return (
    <>
      <SEO
        title={seoConfig.signin.title}
        description={seoConfig.signin.description}
      />
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

              <div className="my-3 d-flex justify-content-center">
                <ReCAPTCHA
                  sitekey="6LfE8EgsAAAAANyUHlqJ_RMe1Klg_WVpVx7NimPG"
                  onChange={(token) => setCaptchaToken(token)}
                  onExpired={() => setCaptchaToken(null)}
                />
              </div>

              {/* ROLE */}
              <div className="mt-3 mb-4">
                <label className="small fw-medium d-block">Login as</label>

                <div className="d-flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={`role-pill ${
                      activeRole === "candidate" ? "active" : ""
                    }`}
                    onClick={() => setActiveRole("candidate")}
                  >
                    Candidate
                  </button>

                  <button
                    type="button"
                    className={`role-pill ${
                      activeRole === "employer" ? "active" : ""
                    }`}
                    onClick={() => setActiveRole("employer")}
                  >
                    Employer / Recruiter
                  </button>
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="btn btn-primary-auth w-100"
                disabled={loading || !captchaToken}
              >
                {loading
                  ? activeRole === "candidate"
                    ? "Logging in as Candidate..."
                    : "Logging in as Employer..."
                  : "Login"}
              </button>
            </form>

            {/* <p className="text-center text-muted mt-3">
              By continuing, you agree to Hirelink’s{" "}
              <NavLink to="/">Terms</NavLink> &{" "}
              <NavLink to="/">Privacy Policy</NavLink>.
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
