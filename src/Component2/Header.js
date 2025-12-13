import { NavLink } from "react-router-dom";
import logo from "../Component2/Image/logo.png";
import "../Component2/css/Header.css";

function Header() {
  return (
    <>
      <header className="d-flex align-items-center justify-content-between px-4 py-2 header-bg">
        {/* <!-- LOGO --> */}
        <img className="m-0 logo" src={logo} />

        {/* <!-- DESKTOP NAVIGATION LINKS --> */}
        <nav className="d-none d-md-flex gap-3">
          <NavLink to="/" className="nav-link-custom fs-6 fw-semibold">
            Home
          </NavLink>

          <NavLink to="/companies" className="nav-link-custom fs-6 fw-semibold">
            Company reviews
          </NavLink>
        </nav>

        {/* <!-- RIGHT SIDE DESKTOP BUTTONS --> */}
        <div className="d-none d-md-flex gap-3">
          {/* <!-- SHOW AFTER LOGIN --> */}

          {/* <a href="#" className="nav-link-custom"><i className="fa fa-bookmark"></i></a>
          <a href="#" className="nav-link-custom"><i className="fa fa-message"></i></a>
          <a href="#" className="nav-link-custom"><i className="fa fa-bell"></i></a>
          <a href="#" className="nav-link-custom"><i className="fa fa-user"></i></a> */}

          {/* <!-- BEFORE LOGIN --> */}
          <NavLink to="/signin" className="nav-link-custom">
            Sign in
          </NavLink>
          <NavLink
            to="/employer"
            className="nav-link-custom border-start border-3 ps-3"
          >
            Employers / Post Job
          </NavLink>
        </div>
        {/*  MOBILE MENU TOGGLER BUTTON -- */}
        <button
          className="navbar-toggler d-md-none btn btn-outline-dark"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mobileMenu"
        >
          <i className="fa fa-bars"></i>
        </button>
      </header>

      {/* ===================== MOBILE MENU =====================  */}
      <div className="collapse bg-light p-3" id="mobileMenu">
        <NavLink to="/" className="mobile-link">
          Home
        </NavLink>
        <NavLink to="/companies" className="mobile-link">
          Company reviews
        </NavLink>
        <NavLink to="/signin" className="mobile-link">
          Sign in
        </NavLink>
        <NavLink to="/employer" className="mobile-link">
          Employers / Post Job
        </NavLink>
      </div>
    </>
  );
}
export default Header;
