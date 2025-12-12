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
          <a href="/" className="nav-link-custom fs-6 fw-semibold">
            Home
          </a>
          <a href="/companies" className="nav-link-custom fs-6 fw-semibold">
            Company reviews
          </a>
        </nav>

        {/* <!-- RIGHT SIDE DESKTOP BUTTONS --> */}
        <div className="d-none d-md-flex gap-3">
          {/* <!-- SHOW AFTER LOGIN --> */}

          {/* <a href="#" className="nav-link-custom"><i className="fa fa-bookmark"></i></a>
          <a href="#" className="nav-link-custom"><i className="fa fa-message"></i></a>
          <a href="#" className="nav-link-custom"><i className="fa fa-bell"></i></a>
          <a href="#" className="nav-link-custom"><i className="fa fa-user"></i></a> */}

          {/* <!-- BEFORE LOGIN --> */}
          <a href="/signin" className="nav-link-custom">
            Sign in
          </a>
<<<<<<< HEAD
          <a href="/employer" className="nav-link-custom border-start border-3 ps-3">
=======
          <a href="employer" className="nav-link-custom border-start border-3 ps-3">
>>>>>>> 4da186f080cac327fb4f003be4eb279470f864e0
            Employers / Post Job
          </a>
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
        <a href="/" className="mobile-link">
          Home
        </a>
        <a href="/companies" className="mobile-link">
          Company reviews
        </a>
        <a href="/signin" className="mobile-link">
          Sign in
        </a>
        <a href="/employer" className="mobile-link">
          Employers / Post Job
        </a>
      </div>
    </>
  );
}
export default Header;
