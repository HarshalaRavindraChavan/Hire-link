import { NavLink } from "react-router-dom";
import logo from "./logo/admin-logo.png";

function Sidebar() {
  const auth = JSON.parse(localStorage.getItem("auth"));

  const role = auth?.role;
  const assignedMenuIds = auth?.menu_ids || [];
  const assignedMenus = assignedMenuIds.map(Number);
  // Employer fixed menus
  const employerMenuIds = [1, 2, 3, 4, 5, 11, 12];
  const allMenus = [
    { id: 1, label: "Dashboard", path: "/dashboard", icon: "fas fa-home" },
    { id: 2, label: "Jobs", path: "/job", icon: "fa fa-briefcase" },
    { id: 3, label: "Candidates", path: "/candidate", icon: "fa fa-user-tie" },
    {
      id: 4,
      label: "Applicants",
      path: "/applicant",
      icon: "fa-brands fa-wpforms",
    },
    { id: 5, label: "Interviews", path: "/interview", icon: "fa fa-comments" },
    { id: 6, label: "Employers", path: "/employe", icon: "fa fa-user-tie" },
    { id: 9, label: "Contacts", path: "/contact", icon: "fa fa-headphones" },
    { id: 10, label: "Users", path: "/user", icon: "fa fa-user" },
    { id: 11, label: "Profile", path: "/emp-profile", icon: "fa fa-user" },
    { id: 12, label: "Staffs", path: "/staff", icon: "fa fa-user" },
    { id: 13, label: "Setting", path: "/setting", icon: "fa-solid fa-gear" },
    { id: 14, label: "Blogs", path: "/admin-blogs", icon: "fa-solid fa-gear" },
  ];

  // ================= MENU LOGIC =================

  let finalMenus = [];

  if (Number(role) === 100) {
    // 🧑‍💼 Employer → fixed menus (Profile INCLUDED)
    finalMenus = allMenus.filter((menu) => employerMenuIds.includes(menu.id));
  } else if (role === "1") {
    // 🔓 Admin → ALL menus EXCEPT Profile (id 11)
    finalMenus = allMenus.filter((menu) => menu.id !== 11 && menu.id !== 12);
  } else if (Number(role) === 200) {
    // Staff → assigned menus only
    finalMenus = allMenus.filter((menu) => assignedMenus.includes(menu.id));
  } else {
    // 👤 Other users → assigned menus EXCEPT Profile
    finalMenus = allMenus.filter(
      (menu) => assignedMenuIds.includes(menu.id) && menu.id !== 11,
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
