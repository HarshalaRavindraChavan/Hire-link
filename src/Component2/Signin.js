import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Component2/css/Signin.css";
import logo from "../Component2/Image/logo.png";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Hirelink | Signin";
  }, []);

  /* ================= FORMik ================= */
  const formik = useFormik({
    initialValues: {
      can_email: "",
      can_password: "",
    },

    validationSchema: Yup.object({
      can_email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      can_password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      setApiError("");
      setSuccessMsg("");
      setLoading(true);

      try {
        const response = await axios.post(
          "https://norealtor.in/hirelink_apis/candidate/signin/tbl_candidate",
          {
            can_email: values.can_email.trim(),
            can_password: values.can_password.trim(),
          }
        );

        const data = response.data;

        if (data.status === true || data.success === true) {
          if (data.token) {
            localStorage.setItem("token", data.token);
          }

          setSuccessMsg("✅ Login successful! Redirecting...");
          resetForm();

          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        } else {
          setApiError(data.message || "Login failed");
        }
      } catch (error) {
        setApiError(
          error.response?.data?.message || "Invalid email or password"
        );
      } finally {
        setLoading(false);
      }
    },
  });

  /* ================= UI ================= */
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div
        className="row g-0 shadow-lg rounded-4 overflow-hidden bg-white"
        style={{ maxWidth: "1000px" }}
      >
        <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-between text-white p-4 brand-panel">
          <h2 className="fw-bold">Hirelink</h2>
        </div>

        <div className="col-lg-6 p-4 p-md-5">
          <div className="text-center">
            <NavLink to="/">
              <img src={logo} height="50" alt="logo" />
            </NavLink>
          </div>

          <h3 className="mt-3">Welcome back</h3>

          {successMsg && (
            <div className="alert alert-success py-2">{successMsg}</div>
          )}

          <form onSubmit={formik.handleSubmit}>
            {/* EMAIL */}
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="can_email"
                value={formik.values.can_email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.can_email && formik.errors.can_email && (
                <div className="invalid-feedback">
                  {formik.errors.can_email}
                </div>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="can_password"
                value={formik.values.can_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.can_password &&
                formik.errors.can_password && (
                  <div className="invalid-feedback">
                    {formik.errors.can_password}
                  </div>
                )}
            </div>

            <button
              type="submit"
              className="btn btn-primary-auth w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
