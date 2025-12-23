import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import logo from "./logo/hirelink.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    console.log("Login component mounted");
    document.title = "Hirelink | Admin Login";
  }, []);

  const formik = useFormik({
    initialValues: {
      user_email: "",
      user_password: "",
    },

    validationSchema: Yup.object({
      user_email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      user_password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log("Form Submitted");
      console.log("Form Values:", values);

      try {
        console.log("Sending login API request...");

        const response = await axios.post(
          "https://norealtor.in/hirelink_apis/admin/login",
          {
            user_email: values.user_email.trim(),
            user_password: values.user_password.trim(),
          }
        );

        console.log("Full Axios Response:", response);
        console.log("Response Data:", response.data);

        const data = response.data;

        if (data.status === true) {
          const menuIds = response.data.data.user_menu_id
            ? response.data.data.user_menu_id.toString().split(",").map(Number)
            : [];

          localStorage.setItem(
            "auth",
            JSON.stringify({
              role: response.data.data.user_role,
              user_id: response.data.data.user_id,
              menu_ids: menuIds, // 👈 STANDARD NAME
            })
          );

          // ✅ SUCCESS TOAST
          toast.success("Login successful! Redirecting...");
          resetForm();
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        } else {
          console.log("Login FAILED:", data.message || data.msg);

          // ❌ FAILURE TOAST
          toast.error(data.message || data.msg || "Login failed");
        }
      } catch (error) {
        console.log("LOGIN ERROR OCCURRED");
        console.log("Error Object:", error);
        console.log("Error Response:", error.response);
        console.log("Error Data:", error.response?.data);

        // ❌ ERROR TOAST
        toast.error(
          error.response?.data?.message || "Invalid email or password"
        );
      } finally {
        console.log("Login request completed");
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
      <div className="login-container">
        {/* LEFT SECTION */}
        <form onSubmit={formik.handleSubmit} className="login-left-section">
          <img className="login-logo" src={logo} alt="logo" />

          {/* SUCCESS MESSAGE */}
          {successMsg && <div className="success-message">{successMsg}</div>}

          {/* Email */}
          <label>Email</label>
          <div className="login-input-box">
            <span>👤</span>
            <input
              type="email"
              name="user_email"
              placeholder="Email"
              value={formik.values.user_email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.user_email && formik.errors.user_email
                  ? "is-invalid"
                  : ""
              }
            />
          </div>

          {formik.touched.user_email && formik.errors.user_email && (
            <small className="text-danger d-block mt-1 text-center">
              {formik.errors.user_email}
            </small>
          )}

          {/* Password */}
          <label>Password</label>
          <div className="login-input-box">
            <span>🔒</span>
            <input
              type="password"
              name="user_password"
              placeholder="Password"
              value={formik.values.user_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.user_password && formik.errors.user_password
                  ? "is-invalid"
                  : ""
              }
            />
          </div>

          {formik.touched.user_password && formik.errors.user_password && (
            <small className="text-danger d-block mt-1 text-center">
              {formik.errors.user_password}
            </small>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="login-login-btn"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        {/* RIGHT SECTION */}
        <div className="login-right-section">
          <Swiper
            modules={[Autoplay, EffectFade]}
            loop
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            effect="fade"
            speed={1000}
            className="login-swiper"
          >
            <SwiperSlide>
              <img
                src="https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1600"
                alt="slide1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1600"
                alt="slide2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=1600"
                alt="slide3"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600"
                alt="slide4"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Login;
