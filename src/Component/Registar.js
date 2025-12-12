import { NavLink } from "react-router-dom";
import "./css/Signup.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import logo from "./logo/hirelink.png";

import "swiper/css";
import "swiper/css/effect-fade";

function Registar() {
  return (
    <div className="signup-container">
      <div className="signup-left-section">
        <img className="signup-sign-logo" src={logo} alt="logo" />

        <label>Full Name</label>
        <div className="signup-input-box">
          <input type="text" placeholder="Full Name" />
        </div>

        {/* Two inputs in one row */}
        <div className="signup-row-input">
          <div>
            <label>Email ID</label>
            <div className="signup-input-box">
              <input type="text" placeholder="Email ID" />
            </div>
          </div>

          <div>
            <label>Mobile No.</label>
            <div className="signup-input-box">
              <input type="text" placeholder="Mobile Number" />
            </div>
          </div>
        </div>

        <label>Company Name</label>
        <div className="signup-input-box">
          <input type="text" placeholder="Company Name" />
        </div>

        <label>Select Category</label>
        <div className="signup-input-box">
          <i className="signup-bx bx-list-ul"></i>
          <select>
            <option>Select Category</option>
            <option>Admin</option>
            <option>HR</option>
            <option>User</option>
          </select>
        </div>

        <label>Password</label>
        <div className="signup-input-box">
          <i className="signup-bx bx-lock-alt"></i>
          <input type="password" placeholder="Enter Password" />
        </div>

        <button type="submit" className="signup-login-btn">
          SIGN UP
        </button>

        <p className="signup-signup-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

      <div className="signup-right-section">
        <Swiper
          modules={[Autoplay, EffectFade]}
          loop
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          effect="fade"
          speed={1000}
          className="signup-swiper"
        >
          <SwiperSlide>
            <img src="https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1600" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=1600" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Registar;
