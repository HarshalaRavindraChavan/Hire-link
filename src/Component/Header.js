import logo from "./logo/admin-logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const auth = JSON.parse(localStorage.getItem("auth"));
  const employer = JSON.parse(localStorage.getItem("employer"));

  const role = auth?.role;
  let displayName = "";
  // let displayEmail = "";

  if (role === "employer") {
    displayName = employer?.emp_name || "Employer";
    // displayEmail = employer?.emp_email || "";
  } else if (role === "1") {
    displayName = "Admin";
    // displayEmail = "";
  }

  const handleLogout = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const role = auth?.role;

    // 🔥 Clear storage
    localStorage.removeItem("auth");
    localStorage.removeItem("employer");
    localStorage.removeItem("candidate"); // safe (असला तरी)

    // 🔁 Role-wise redirect
    if (role === "1") {
      // Admin logout
      navigate("/admin");
    } else if (role === "employer") {
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
          <nav className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex">
            {/* <div className="input-group">
              <div className="input-group-prepend">
                <button type="submit" className="btn btn-search pe-1">
                  <i className="fa fa-search search-icon"></i>
                </button>
              </div>
              <input
                type="text"
                placeholder="Search ..."
                className="form-control"
              />
            </div> */}
          </nav>

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
            {/* <li className="nav-item topbar-icon dropdown hidden-caret">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="messageDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-envelope"></i>
              </a>
              <ul
                className="dropdown-menu messages-notif-box animated fadeIn"
                aria-labelledby="messageDropdown"
              >
                <li>
                  <div className="dropdown-title d-flex justify-content-between align-items-center">
                    Messages
                    <a href="#" className="small">
                      Mark all as read
                    </a>
                  </div>
                </li>
                <li>
                  <div className="message-notif-scroll scrollbar-outer">
                    <div className="notif-center">
                      <a href="#">
                        <div className="notif-img">
                          <img
                            src="assets/img/jm_denis.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Jimmy Denis</span>
                          <span className="block"> How are you ? </span>
                          <span className="time">5 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-img">
                          <img
                            src="assets/img/chadengle.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Chad</span>
                          <span className="block"> Ok, Thanks ! </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-img">
                          <img src="assets/img/mlane.jpg" alt="Img Profile" />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Jhon Doe</span>
                          <span className="block">
                            Ready for the meeting today...
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-img">
                          <img src="assets/img/talha.jpg" alt="Img Profile" />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Talha</span>
                          <span className="block"> Hi, Apa Kabar ? </span>
                          <span className="time">17 minutes ago</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <a className="see-all" href="javascript:void(0);">
                    See all messages<i className="fa fa-angle-right"></i>
                  </a>
                </li>
              </ul>
            </li> */}
            {/* <li className="nav-item topbar-icon dropdown hidden-caret">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="notifDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-bell"></i>
                <span className="notification">4</span>
              </a>
              <ul
                className="dropdown-menu notif-box animated fadeIn"
                aria-labelledby="notifDropdown"
              >
                <li>
                  <div className="dropdown-title">
                    You have 4 new notification
                  </div>
                </li>
                <li>
                  <div className="notif-scroll scrollbar-outer">
                    <div className="notif-center">
                      <a href="#">
                        <div className="notif-icon notif-primary">
                          <i className="fa fa-user-plus"></i>
                        </div>
                        <div className="notif-content">
                          <span className="block"> New user registered </span>
                          <span className="time">5 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-icon notif-success">
                          <i className="fa fa-comment"></i>
                        </div>
                        <div className="notif-content">
                          <span className="block">
                            Rahmad commented on Admin
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-img">
                          <img
                            src="assets/img/profile2.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="block">
                            Reza send messages to you
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-icon notif-danger">
                          <i className="fa fa-heart"></i>
                        </div>
                        <div className="notif-content">
                          <span className="block"> Farrah liked Admin </span>
                          <span className="time">17 minutes ago</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <a className="see-all" href="javascript:void(0);">
                    See all notifications<i className="fa fa-angle-right"></i>
                  </a>
                </li>
              </ul>
            </li> */}
            {/* <li className="nav-item topbar-icon dropdown hidden-caret">
              <a
                className="nav-link"
                data-bs-toggle="dropdown"
                href="#"
                aria-expanded="false"
              >
                <i className="fas fa-layer-group"></i>
              </a>
              <div className="dropdown-menu quick-actions animated fadeIn">
                <div className="quick-actions-header">
                  <span className="title mb-1">Quick Actions</span>
                  <span className="subtitle op-7">Shortcuts</span>
                </div>
                <div className="quick-actions-scroll scrollbar-outer">
                  <div className="quick-actions-items">
                    <div className="row m-0">
                      <a className="col-6 col-md-4 p-0" href="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-danger rounded-circle">
                            <i className="far fa-calendar-alt"></i>
                          </div>
                          <span className="text">Calendar</span>
                        </div>
                      </a>
                      <a className="col-6 col-md-4 p-0" href="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-warning rounded-circle">
                            <i className="fas fa-map"></i>
                          </div>
                          <span className="text">Maps</span>
                        </div>
                      </a>
                      <a className="col-6 col-md-4 p-0" href="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-info rounded-circle">
                            <i className="fas fa-file-excel"></i>
                          </div>
                          <span className="text">Reports</span>
                        </div>
                      </a>
                      <a className="col-6 col-md-4 p-0" href="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-success rounded-circle">
                            <i className="fas fa-envelope"></i>
                          </div>
                          <span className="text">Emails</span>
                        </div>
                      </a>
                      <a className="col-6 col-md-4 p-0" href="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-primary rounded-circle">
                            <i className="fas fa-file-invoice-dollar"></i>
                          </div>
                          <span className="text">Invoice</span>
                        </div>
                      </a>
                      <a className="col-6 col-md-4 p-0" href="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-secondary rounded-circle">
                            <i className="fas fa-credit-card"></i>
                          </div>
                          <span className="text">Payments</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li> */}

            <li className="nav-item topbar-user dropdown hidden-caret">
              <a
                className="dropdown-toggle profile-pic"
                data-bs-toggle="dropdown"
                href="#"
                aria-expanded="false"
              >
                <div className="avatar-sm">
                  <img
                    src="https://media.istockphoto.com/id/1553217327/vector/user-profile-icon-avatar-person-sign-profile-picture-portrait-symbol-easily-editable-line.jpg?s=170667a&w=0&k=20&c=xUuHLFaa94WIFdV-XBgxX9SSsaJJgGQhE1Tmevqrytg="
                    alt="..."
                    className="avatar-img rounded-circle"
                  />
                </div>
                <span className="fw-bold">
                  {displayName
                    ?.split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
              </a>
              <ul className="dropdown-menu dropdown-user animated fadeIn shadow-lg">
                <div className="dropdown-user-scroll">
                  {/* USER INFO */}
                  {/* <li className="px-3 py-3 user-header">
                    <div className="d-flex align-items-center gap-3">
                      <div className="u-text">
                        <h5 className="mb-0 fw-semibold">
                          {employee?.emp_name
                            ?.split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </h5>

                        <small className="text-muted">
                          {employee?.emp_email}
                        </small>
                      </div>
                    </div>
                  </li> */}
                  <li className="px-3 py-3 user-header">
                    <div className="d-flex align-items-center gap-3">
                      <div className="u-text">
                        <h5 className="mb-0 fw-semibold">
                          {displayName
                            ?.split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </h5>
                      </div>
                    </div>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  {/* MENU ITEMS */}
                  <li>
                    <Link
                      to={role === "employer" ? "/emp-profile" : "/profile"}
                      className="dropdown-item d-flex align-items-center gap-2"
                    >
                      <i className="fa fa-user text-primary"></i>
                      My Profile
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

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
