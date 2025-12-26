import { NavLink } from "react-router-dom";
import logo from "./logo/admin-logo.png";

function Sidebar() {
  const auth = JSON.parse(localStorage.getItem("auth"));

  const role = auth?.role;
  const assignedMenuIds = auth?.menu_ids || [];

  // Employer fixed menus
  const employerMenuIds = [1, 2, 3, 4, 5, 11];
  const allMenus = [
    { id: 1, label: "Dashboard", path: "/dashboard", icon: "fas fa-home" },
    { id: 2, label: "Jobs", path: "/job", icon: "fa fa-briefcase" },
    { id: 3, label: "Candidate", path: "/candidate", icon: "fa fa-user-tie" },
    {
      id: 4,
      label: "Applicant",
      path: "/applicant",
      icon: "fa-brands fa-wpforms",
    },
    { id: 5, label: "Interview", path: "/interview", icon: "fa fa-comments" },
    { id: 6, label: "Employers", path: "/employe", icon: "fa fa-user-tie" },
    {
      id: 7,
      label: "Packages",
      path: "/package",
      icon: "fa-solid fa-boxes-packing",
    },
    { id: 8, label: "Offers", path: "/offer", icon: "fa fa-gift" },
    { id: 9, label: "Contacts", path: "/contact", icon: "fa fa-headphones" },
    { id: 10, label: "Users", path: "/user", icon: "fa fa-user" },
    { id: 11, label: "Profile", path: "/emp-profile", icon: "fa fa-user" },
  ];

  // ================= MENU LOGIC =================

  let finalMenus = [];

  if (role === "employer") {
    // 🧑‍💼 Employer → fixed menus (Profile INCLUDED)
    finalMenus = allMenus.filter((menu) => employerMenuIds.includes(menu.id));
  } else if (role === "1") {
    // 🔓 Admin → ALL menus EXCEPT Profile (id 11)
    finalMenus = allMenus.filter((menu) => menu.id !== 11);
  } else {
    // 👤 Other users → assigned menus EXCEPT Profile
    finalMenus = allMenus.filter(
      (menu) => assignedMenuIds.includes(menu.id) && menu.id !== 11
    );
  }

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
            {finalMenus.map((menu, i) => (
              <li className="nav-item" key={i}>
                <NavLink
                  to={menu.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <i className={menu.icon}></i>
                  <p>{menu.label}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
