import logo from "./logo/hirelink.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/constants";

function Sidebar() {
  const navigate = useNavigate();

  const auth = JSON.parse(localStorage.getItem("auth"));
  const employer =
    JSON.parse(localStorage.getItem("employer")) ||
    JSON.parse(localStorage.getItem("staff"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  const role = auth?.role;
  let displayName = "";
  let rolename = "";
  let com_logo = logo;
  // let displayEmail = "";
  const roleNum = Number(role);

  const roleNames = {
    1: "Super Admin",
    2: "Sub Admin",
    3: "Backend",
    4: "Accountant",
    5: "Other",
  };

  if (Number(role) === 100) {
    displayName = employer?.emp_name || "Employer";
    rolename = `${employer?.emp_companyname || "Company"} (Super Admin)`;
    if (employer?.emp_com_logo) {
      com_logo = `${BASE_URL}Uploads/${employer.emp_com_logo}`;
    } else {
      com_logo = logo;
    }
  } else if (roleNum >= 1 && roleNum <= 10) {
    displayName = roleNames[roleNum];
    com_logo = logo;
  } else {
    displayName = employer?.staff_name;
    rolename = `${employer?.emp_companyname || "Company"} (${roleNames[employer?.staff_role] || "Staff"})`;
    com_logo = logo;
  }

  const handleLogout = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const role = auth?.role;

    // 🔥 Clear storage
    localStorage.removeItem("auth");
    localStorage.removeItem("employer");
    localStorage.removeItem("staff");

    // 🔁 Role-wise redirect
    if (role === "1") {
      // Admin logout
      navigate("/admin");
    } else if (Number(role) === 100 || Number(role) === 200) {
      // Employer logout
      navigate("/signin");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="main-header">
      <div className="main-header-logo">
        <div className="logo-header" data-background-color="dark">
          <NavLink to="/dashboard" className="logo ">
            <img
              src={logo}
              alt="navbar brand"
              className="navbar-brand"
              height="50"
            />
          </NavLink>
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="gg-menu-right"></i>
            </button>
            <button className="btn btn-toggle sidenav-toggler">
              <i className="gg-menu-left"></i>
            </button>
          </div>
          <button className="topbar-toggler more">
            <i className="gg-more-vertical-alt"></i>
          </button>
        </div>
      </div>

      <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
        <div className="container-fluid">
          <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
            <li className="nav-item topbar-icon dropdown hidden-caret d-flex d-lg-none">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <i className="fa fa-search"></i>
              </a>
              <ul className="dropdown-menu dropdown-search animated fadeIn">
                <form className="navbar-left navbar-form nav-search">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Search ..."
                      className="form-control"
                    />
                  </div>
                </form>
              </ul>
            </li>

            <li className="nav-item topbar-user dropdown hidden-caret">
              <a
                className="dropdown-toggle profile-pic"
                data-bs-toggle="dropdown"
                href="#"
                aria-expanded="false"
              >
                <div className="avatar-sm">
                  <img
                    src={com_logo}
                    width="150px"
                    height="100px"
                    style={{ borderRadius: "20%", objectFit: "contain" }}
                    alt="..."
                    className="avatar-img rounded-circle me-2"
                  />
                </div>
                <span className="fw-bold ms-1">
                  {displayName
                    ?.split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
              </a>
              <ul className="dropdown-menu dropdown-user animated fadeIn shadow-lg">
                <div className="dropdown-user-scroll">
                  <li className="px-3 user-header">
                    <div className="d-flex align-items-center gap-3">
                      <div className="u-text">
                        <h5 className="mb-0 fw-semibold">
                          {displayName
                            ?.split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(" ")}
                        </h5>
                        {rolename}
                      </div>
                    </div>
                  </li>

                  {Number(role) === 100 && (
                    <>
                      <li className="py-0">
                        <Link
                          to="/emp-profile"
                          className="dropdown-item d-flex align-items-center gap-2"
                        >
                          <i className="fa fa-user text-primary"></i>
                          My Profile
                        </Link>
                      </li>

                      <li className="py-0">
                        <Link
                          to="/payment-history"
                          className="dropdown-item d-flex align-items-center gap-2  border-0 bg-transparent"
                        >
                          <i className="fa-solid fa-scroll"></i>
                          Payment History
                        </Link>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                    </>
                  )}
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="dropdown-item d-flex align-items-center gap-2 text-danger border-0 bg-transparent"
                    >
                      <i className="fa fa-sign-out-alt"></i>
                      Logout
                    </button>
                  </li>
                </div>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
