import { NavLink } from "react-router-dom";
import logo from "./logo/admin-logo.png";

function Sidebar() {
  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-logo">
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

      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className="fas fa-home"></i>
                <p>Dashboard</p>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/job"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className="fa fa-briefcase"></i>
                <p>Jobs</p>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/condidate"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className="fa fa-users"></i>
                <p>Candidates</p>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/applicant"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className="fa-brands fa-wpforms"></i>
                <p>Applieds</p>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/interview"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i class="fa fa-comments"></i>
                <p>Interview</p>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/employe"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className="fa fa-user-tie"></i>
                <p>Employers</p>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/package"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className="fa-solid fa-boxes-packing"></i>
                <p>Packages</p>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/offer"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className="fa fa-gift"></i>
                <p>Offers</p>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className="fa fa-headphones"></i>
                <p>Contacts</p>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/user"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className="fa fa-user"></i>
                <p>Users</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
