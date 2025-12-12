import "../Component3/css/Header.css";


function Header() {
  return (
    <>
      <header className="shadow-sm sticky-top bg-white">
        <nav className="navbar navbar-expand-lg navbar-light py-3 container">
          <a
            className="navbar-brand fw-bold d-flex align-items-center"
            href="#"
          >
            <span className="logo-dot me-2 ms-2"></span>
            <span>Hirelink for Employers</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-lg-auto ms-4 mb-2 mb-lg-0 align-items-lg-center">
              <li className="nav-item">
                <a className="nav-link" href="#features" style={{fontSize:"15px"}}>
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#how-it-works"style={{fontSize:"15px"}}>
                  How it works
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#pricing"style={{fontSize:"15px"}}>
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#faq"style={{fontSize:"15px"}}>
                  FAQ
                </a>
              </li>
              <li className="nav-item ms-lg-3">
                <a
                  className="btn btn-sm me-2 mb-2 mb-lg-0"
                  href="#login"style={{backgroundColor:"green",color:"white",fontWeight:"bold",fontSize:"13px"}}
                >
                  Sign in
                </a>
              </li>
              <li className="nav-item">
                <a className="btn btn-sm" href="#get-started"style={{backgroundColor:"green",color:"white",fontWeight:"bold",fontSize:"13px"}}>
                  Post a job
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;