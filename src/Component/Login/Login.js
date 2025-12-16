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

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
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
      user_password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      setMessage("");

      try {
        console.log("Form Values:", values);

        const formData = new FormData();
        formData.append("user_email", values.user_email);
        formData.append("user_password", values.user_password);

        const response = await axios.post(
          "https://norealtor.in/hirelink_apis/admin/login",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("API Response:", response.data);

        if (response.data.status === true) {
          setMessage("✅ Login successful");
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else {
          setMessage(response.data.message || "Login failed");
        }
      } catch (error) {
        console.error("Login Error:", error);
        setMessage(
          error.response?.data?.message || "Server error. Try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="login-container">
      {/* LEFT */}
      <form onSubmit={formik.handleSubmit} className="login-left-section">
        <img className="login-logo" src={logo} alt="logo" />

        {message && <p className="login-message">{message}</p>}

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
          />
        </div>
        {formik.touched.user_email && formik.errors.user_email && (
          <small className="text-danger">{formik.errors.user_email}</small>
        )}

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
          />
        </div>
        {formik.touched.user_password && formik.errors.user_password && (
          <small className="text-danger">{formik.errors.user_password}</small>
        )}

        <button
          type="submit"
          className="login-login-btn"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Logging in..." : "LOGIN"}
        </button>
      </form>

      {/* RIGHT */}
      <div className="login-right-section">
        <Swiper
          modules={[Autoplay, EffectFade]}
          loop
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          effect="fade"
          speed={1000}
        >
          <SwiperSlide>
            <img src="https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1600" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1600" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=1600" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Login;
