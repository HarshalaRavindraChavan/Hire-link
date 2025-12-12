import { NavLink } from "react-router-dom";
import "./css/Login.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import logo from "./logo/hirelink.png";

import "swiper/css";
import "swiper/css/effect-fade";

function Login() {
  return (
    <div className="login-container">
      <div className="login-left-section">
        <img className="login-logo" src={logo} />

        <label>Username</label>
        <div className="login-input-box">
          <span>👤</span>
          <input type="text" placeholder="Username" />
        </div>

        <label>Password</label>
        <div className="login-input-box">
          <span>🔒</span>
          <input type="password" placeholder="Password" />
        </div>

        {/* <div className="login-remember">
          <input type="checkbox" />
          <span>Keep me signed in</span>
          <a href="#" className="login-forgot">
            Forgot password?
          </a>
        </div> */}

        <a href="dashboard" type="submit" className="login-login-btn">
          LOGIN
        </a>

        {/* <div className="login-social-buttons">
          <button className="login-facebook">Facebook</button>
          <button className="login-google">Google</button>
        </div> */}
        {/* 
        <p className="login-signup-text">
          Don't have an account?
          <NavLink to="/registar"> Signup</NavLink>
        </p> */}
      </div>

      <div className="login-right-section">
        <Swiper
          modules={[Autoplay, EffectFade]}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          effect="fade"
          speed={1000}
          className="login-swiper"
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
