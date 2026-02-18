import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../Component2/Image/logo.png";
import "../Component2/css/Header.css";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

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
              <NavLink to="/notification" className="nav-link-custom ms-2 me-2">
                <i className="fa fa-bell"></i>
              </NavLink>

              {/* ✅ DROPDOWN */}
              <div className="dropdown-container" ref={dropdownRef}>
                <FaUserCircle
                  className="dropdown-icon"
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

        {/* MOBILE TOGGLER */}
        <button
          className="navbar-toggler d-md-none btn btn-outline-dark"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mobileMenu"
        >
          <i className="fa fa-bars"></i>
        </button>
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
