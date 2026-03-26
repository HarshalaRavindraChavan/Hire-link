import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../Component2/Image/logo.png";
import "../Component2/css/Header.css";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../config/constants";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const [unreadCount, setUnreadCount] = useState(0);

  const loadUnreadCount = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("candidate"));
      if (!user) return;

      const res = await axios.get(
        `${BASE_URL}candidate/notifications/${user.can_id}`,
      );

      if (res.data.status) {
        const unread = res.data.data.filter((n) => n.noti_is_read == 0).length;

        setUnreadCount(unread);
      }
    } catch (err) {
      console.log("Unread count error");
    }
  };

  useEffect(() => {
    loadUnreadCount();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("candidate");
    setIsLogin(!!user);
  }, []);

  const logout = () => {
    localStorage.removeItem("candidate");
    setIsLogin(false);
    navigate("/");
  };

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="d-flex align-items-center justify-content-between px-4 py-2 header-bg">
        {/* LOGO */}
        <Link to="/">
          <img className="m-0 logo" src={logo} alt="logo" />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="d-none d-md-flex gap-3">
          <NavLink to="/" className="nav-link-custom fs-6 fw-semibold">
            Home
          </NavLink>

          <NavLink to="/companies" className="nav-link-custom fs-6 fw-semibold">
            Company reviews
          </NavLink>
        </nav>

        {/* RIGHT SIDE */}
        <div className="d-none d-md-flex gap-3 align-items-center">
          {isLogin ? (
            <>
              <NavLink
                to="/notification"
                className="nav-link-custom me-3 fs-5 mt-1 position-relative"
              >
                <i className="fa fa-bell"></i>

                {unreadCount > 0 && (
                  <span className="bell-badge">{unreadCount}</span>
                )}
              </NavLink>

              {/* ✅ DROPDOWN */}
              <div className="dropdown-container me-2" ref={dropdownRef}>
                <FaUserCircle
                  className="dropdown-icon fs-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen((prev) => !prev);
                  }}
                />

                {open && (
                  <div className="custom-dropdown-menu">
                    <div
                      className="dropdown-item"
                      onClick={() => navigate("/profile")}
                    >
                      👤 My Profile
                    </div>

                    <div
                      className="dropdown-item"
                      onClick={() => navigate("/candidate-receipt")}
                    >
                      ⬇️ Payment Receipt
                    </div>
                  </div>
                )}
              </div>

              <button
                className="btn btn-sm btn-outline-danger ps-5 pe-5 fs-6"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signin" className="nav-link-custom">
                Login
              </NavLink>
              <NavLink
                to="/employer"
                className="nav-link-custom border-start border-3 ps-3"
              >
                Employers / Post Job
              </NavLink>
            </>
          )}
        </div>

        {/* MOBILE RIGHT SIDE */}
        <div className="d-flex align-items-center gap-3 d-md-none">
          {/* 🔔 Notification Icon */}
          {isLogin && (
            <NavLink to="/notification" className="mobile-bell text-dark">
              <i className="fa fa-bell fs-5"></i>
              {unreadCount > 0 && (
                <span className="bell-badge">{unreadCount}</span>
              )}
            </NavLink>
          )}

          {/* ☰ Menu */}
          <button
            className="navbar-toggler btn btn-outline-dark"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mobileMenu"
          >
            <i className="fa fa-bars"></i>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className="collapse bg-light p-3" id="mobileMenu">
        <NavLink to="/" className="mobile-link">
          Home
        </NavLink>
        <NavLink to="/companies" className="mobile-link">
          Company reviews
        </NavLink>

        {isLogin ? (
          <>
            <NavLink to="/profile" className="mobile-link">
              Profile
            </NavLink>
            <div
              className="dropdown-item"
              onClick={() => navigate("/candidate-receipt")}
            >
              Payment Receipt
            </div>

            {/* <NavLink to="/notification" className="mobile-link">
              Notification
            </NavLink> */}

            <button className="btn btn-danger w-100 mt-2" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/signin" className="mobile-link">
              Login
            </NavLink>
            <NavLink to="/employer" className="mobile-link">
              Employers / Post Job
            </NavLink>
          </>
        )}
      </div>
    </>
  );
}

export default Header;
