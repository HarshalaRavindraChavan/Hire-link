import { NavLink } from "react-router-dom";
import logo from "./logo/admin-logo.png";

function Sidebar() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const role = auth?.user?.role;
  const assignedMenuIds = auth?.menu_ids || [];

  const employerDefaultMenuIds = [1, 2, 3, 4, 5];
  // Dashboard, Jobs, Applieds, Interview

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
  ];

  //============== Menu Show logic=================
  let finalMenus = [];

  if (role === "admin") {
    //Admin → all menus
    finalMenus = allMenus;
  } else if (role === "employer") {
    // Employer → default + assigned
    const mergedMenuIds = [
      ...new Set([...employerDefaultMenuIds, ...assignedMenuIds]),
    ];

    finalMenus = allMenus.filter((menu) => mergedMenuIds.includes(menu.id));
  } else {
    // 👤 Normal user → only assigned
    finalMenus = allMenus.filter((menu) => assignedMenuIds.includes(menu.id));
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
