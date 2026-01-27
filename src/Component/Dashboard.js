import React, { useEffect, useState, useMemo } from "react";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/constants";

function Dashboard() {
  const navigate = useNavigate();

  /* ---------------- Auth ---------------- */
  const auth = JSON.parse(localStorage.getItem("auth"));
  const role = auth?.role;
  const employerId = auth?.emp_id;
  const assignedMenuIds = auth?.menu_ids || [];

  /* ---------------- Menu List (Same as Sidebar) ---------------- */
  const employerMenuIds = [1, 2, 3, 4, 5, 11, 12];

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
    { id: 9, label: "Contacts", path: "/contact", icon: "fa fa-headphones" },
    { id: 10, label: "Users", path: "/user", icon: "fa fa-user" },
    { id: 11, label: "Profile", path: "/emp-profile", icon: "fa fa-user" },
    { id: 12, label: "Staff", path: "/staff", icon: "fa fa-user" },
  ];

  /* ---------------- FINAL MENUS (Same Sidebar Logic) ---------------- */
  const finalMenus = useMemo(() => {
    let menus = [];

    if (Number(role) === 100) {
      menus = allMenus.filter((menu) => employerMenuIds.includes(menu.id));
    } else if (role === "1" || Number(role) === 1) {
      menus = allMenus.filter((menu) => menu.id !== 11);
    } else {
      menus = allMenus.filter(
        (menu) => assignedMenuIds.includes(menu.id) && menu.id !== 11,
      );
    }

    return menus;
  }, [role, assignedMenuIds]);

  /* ---------------- Count State ---------------- */
  const [counts, setCounts] = useState({
    jobs: 0,
    candidates: 0,
    applicants: 0,
    interviews: 0,
    employees: 0,
    contacts: 0,
    users: 0,
  });

  /* ---------------- Fetch Counts ---------------- */
  useEffect(() => {
    fetchCounts();
    // eslint-disable-next-line
  }, []);

  const fetchCounts = async () => {
    try {
      const roleNum = Number(role);

      /* ================= ADMIN ================= */
      if (roleNum >= 1 && roleNum <= 10) {
        const [
          jobs,
          candidates,
          applicants,
          interviews,
          employees,
          contacts,
          users,
        ] = await Promise.all([
          axios.get(`${BASE_URL}hirelink_apis/admin/countdata/tbl_job`),
          axios.get(`${BASE_URL}hirelink_apis/admin/countdata/tbl_candidate`),
          axios.get(`${BASE_URL}hirelink_apis/admin/countdata/tbl_applied`),
          axios.get(`${BASE_URL}hirelink_apis/admin/countdata/tbl_interview`),
          axios.get(`${BASE_URL}hirelink_apis/admin/countdata/tbl_employer`),
          axios.get(`${BASE_URL}hirelink_apis/admin/countdata/tbl_contact`),
          axios.get(`${BASE_URL}hirelink_apis/admin/countdata/tbl_user`),
        ]);

        setCounts({
          jobs: jobs.data?.data || 0,
          candidates: candidates.data?.data || 0,
          applicants: applicants.data?.data || 0,
          interviews: interviews.data?.data || 0,
          employees: employees.data?.data || 0,
          contacts: contacts.data?.data || 0,
          users: users.data?.data || 0,
        });
      }

      /* ================= EMPLOYER ================= */
      if (Number(role) === 100) {
        const [jobs, candidates, applicants, interviews] = await Promise.all([
          axios.get(
            `${BASE_URL}hirelink_apis/admin/countdatawhere/tbl_job/job_employer_id/${employerId}`,
          ),
          axios.get(`${BASE_URL}hirelink_apis/admin/countdata/tbl_candidate`),
          axios.get(
            `${BASE_URL}hirelink_apis/admin/countdatawhere/tbl_applied/apl_employer_id/${employerId}`,
          ),
          axios.get(
            `${BASE_URL}hirelink_apis/admin/countdatawhere/tbl_interview/itv_employer_id/${employerId}`,
          ),
        ]);

        setCounts({
          jobs: jobs.data?.data || 0,
          candidates: candidates.data?.data || 0,
          applicants: applicants.data?.data || 0,
          interviews: interviews.data?.data || 0,
        });
      }
    } catch (error) {
      console.error("Dashboard Count Error", error);
    }
  };

  /* ---------------- Cards Config ---------------- */
  const dashboardCards = [
    {
      id: 2,
      title: "Jobs",
      count: counts.jobs,
      icon: "fa fa-briefcase",
      bg: "bg-success",
      path: "/job",
    },
    {
      id: 3,
      title: "Candidates",
      count: counts.candidates,
      icon: "fa fa-users",
      bg: "bg-warning",
      path: "/candidate",
    },
    {
      id: 4,
      title: "Applicants",
      count: counts.applicants,
      icon: "fa-brands fa-wpforms",
      bg: "bg-info",
      path: "/applicant",
    },
    {
      id: 5,
      title: "Interview",
      count: counts.interviews,
      icon: "fa fa-comments",
      bg: "bg-secondary",
      path: "/interview",
    },
    {
      id: 6,
      title: "Employees",
      count: counts.employees,
      icon: "fa fa-user-tie",
      bg: "bg-success",
      path: "/employe",
    },
    {
      id: 9,
      title: "Contacts",
      count: counts.contacts,
      icon: "fa fa-headphones",
      bg: "bg-warning",
      path: "/contact",
    },
    {
      id: 10,
      title: "Users",
      count: counts.users,
      icon: "fa fa-user",
      bg: "bg-secondary",
      path: "/user",
    },
  ];

  /* ✅ Only show cards which are allowed in menu */
  const allowedCards = dashboardCards.filter((card) =>
    finalMenus.some((m) => m.id === card.id),
  );

  return (
    <>
      <SEO
        title={seoConfig.Dashboard.title}
        description={seoConfig.Dashboard.description}
      />

      <div className="d-flex align-items-center pt-2 pb-4">
        <h3 className="fw-bold text-dark">Dashboard</h3>
      </div>

      <div className="row">
        {allowedCards.map((card) => (
          <DashboardCard
            key={card.id}
            title={card.title}
            count={card.count}
            icon={card.icon}
            bg={card.bg}
            onClick={() => navigate(card.path)}
          />
        ))}
      </div>
    </>
  );
}

export default Dashboard;

/* ================= Reusable Card ================= */
const DashboardCard = ({ title, count, icon, bg, onClick }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 mb-3">
      <div
        className="card card-stats card-round border"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-icon">
              <div
                className={`icon-big text-center icon-info bubble-shadow-small ${bg}`}
              >
                <i className={`${icon}`}></i>
              </div>
            </div>
            <div className="col col-stats ms-3 ms-sm-0">
              <div className="numbers">
                <p
                  className="card-category fw-bold text-dark"
                  style={{ fontSize: "18px" }}
                >
                  {title}
                </p>
                <h4
                  className="card-title fw-bold text-dark"
                  style={{ fontSize: "18px" }}
                >
                  {count}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
