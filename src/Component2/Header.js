import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../Component2/Image/logo.png";
import "../Component2/css/Header.css";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("candidate");
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("candidate");
    setIsLogin(false);
    navigate("/");
  };

  return (
    <>
      <header className="d-flex align-items-center justify-content-between px-4 py-2 header-bg">
        {/* LOGO */}
        <Link to="/">
          <img className="m-0 logo" src={logo} alt="logo" />
        </Link>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav className="d-none d-md-flex gap-3">
          <NavLink to="/" className="nav-link-custom fs-6 fw-semibold">
            Home
          </NavLink>

          <NavLink to="/companies" className="nav-link-custom fs-6 fw-semibold">
            Company reviews
          </NavLink>
        </nav>

        {/* RIGHT SIDE DESKTOP BUTTONS */}
        <div className="d-none d-md-flex gap-3 align-items-center">
          {/* ✅ AFTER LOGIN */}
          {isLogin && (
            <>
              <a href="#" className="nav-link-custom ms-2 me-2">
                <i className="fa fa-bookmark"></i>
              </a>
              <a href="#" className="nav-link-custom ms-2 me-2">
                <i className="fa fa-message"></i>
              </a>
              <a href="#" className="nav-link-custom ms-2 me-2">
                <i className="fa fa-bell"></i>
              </a>
              <NavLink to="/profile" className="nav-link-custom ms-2 me-2">
                <i className="fa fa-user"></i>
              </NavLink>

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={logout}
              >
                Logout
              </button>

              <NavLink
                to="/employer"
                className="nav-link-custom border-start border-3 ps-3"
              >
                Employers / Post Job
              </NavLink>
            </>
          )}

          {/* BEFORE LOGIN */}
          {!isLogin && (
            <>
              <NavLink to="/signin" className="nav-link-custom">
                Sign in
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

        {/* MOBILE MENU TOGGLER */}
        <button
          className="navbar-toggler d-md-none btn btn-outline-dark"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mobileMenu"
        >
          <i className="fa fa-bars"></i>
        </button>
      </header>

      {/* ================= MOBILE MENU ================= */}
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
            <button className="btn btn-danger w-100 mt-2" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/signin" className="mobile-link">
              Sign in
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
