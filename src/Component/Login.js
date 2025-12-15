import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import logo from "./logo/hirelink.png";

import { useFormik } from "formik";
import * as Yup from "yup";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: () => {
      navigate("/dashboard");
    },
  });

  return (
    <div className="login-container">
      {/* LEFT SECTION */}
      <form onSubmit={formik.handleSubmit} className="login-left-section">
        <img className="login-logo" src={logo} alt="logo" />

        {/* Username */}
        <label>Username</label>
        <div className="login-input-box">
          <span>👤</span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.username && formik.errors.username && (
          <small className="text-danger">{formik.errors.username}</small>
        )}

        {/* Password */}
        <label>Password</label>
        <div className="login-input-box">
          <span>🔒</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <small className="text-danger">{formik.errors.password}</small>
        )}

        {/* Login Button */}
        <button type="submit" className="login-login-btn">
          LOGIN
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
  );
}

export default Login;
