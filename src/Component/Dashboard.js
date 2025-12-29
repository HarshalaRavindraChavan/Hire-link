  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";

  function Dashboard() {
    const navigate = useNavigate();

    /* ---------------- Page Title ---------------- */
    useEffect(() => {
      document.title = "Hirelink | Dashboard";
    }, []);

    /* ---------------- Auth ---------------- */
    const auth = JSON.parse(localStorage.getItem("auth"));
    const role = auth?.role; // admin | employer
    const employerId = auth?.emp_id;

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
    }, []);

    const fetchCounts = async () => {
      try {
        /* ================= ADMIN ================= */
        if (Number(role) === 1) {
          const [
            jobs,
            candidates,
            applicants,
            interviews,
            employees,
            contacts,
            users,
          ] = await Promise.all([
            axios.get(
              "https://norealtor.in/hirelink_apis/admin/countdata/tbl_job"
            ),
            axios.get(
              "https://norealtor.in/hirelink_apis/admin/countdata/tbl_candidate"
            ),
            axios.get(
              "https://norealtor.in/hirelink_apis/admin/countdata/tbl_applied"
            ),
            axios.get(
              "https://norealtor.in/hirelink_apis/admin/countdata/tbl_interview"
            ),
            axios.get(
              "https://norealtor.in/hirelink_apis/admin/countdata/tbl_employer"
            ),
            axios.get(
              "https://norealtor.in/hirelink_apis/admin/countdata/tbl_contact"
            ),
            axios.get(
              "https://norealtor.in/hirelink_apis/admin/countdata/tbl_user"
            ),
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
        if (role === "employer") {
          const [jobs, candidates, applicants, interviews] = await Promise.all([
            axios.get(
              `https://norealtor.in/hirelink_apis/admin/countdatawhere/tbl_job/job_employer_id/${employerId}`
            ),
            axios.get(
              "https://norealtor.in/hirelink_apis/admin/countdata/tbl_candidate"
            ),
            axios.get(
              `https://norealtor.in/hirelink_apis/admin/countdatawhere/tbl_applied/app_employer_id/${employerId}`
            ),
            axios.get(
              `https://norealtor.in/hirelink_apis/admin/countdatawhere/tbl_interview/itv_employer_id/${employerId}`
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

    return (
      <>
        {/* ---------------- Header ---------------- */}
        <div className="d-flex align-items-center pt-2 pb-4">
          <h3 className="fw-bold text-dark">Dashboard</h3>
        </div>

        {/* ---------------- Cards ---------------- */}
        <div className="row">
          {/* Jobs */}
          <DashboardCard
            title="Jobs"
            count={counts.jobs}
            icon="fa-briefcase"
            bg="bg-success"
            onClick={() => navigate("/job")}
          />

          {/* Candidates */}
          <DashboardCard
            title="Candidates"
            count={counts.candidates}
            icon="fa-users"
            bg="bg-warning"
            onClick={() => navigate("/candidate")}
          />

          {/* Applicants (Employer only) */}
          {role === "employer" && (
            <DashboardCard
              title="Applicants"
              count={counts.applicants}
              icon="fa-brands fa-wpforms"
              bg="bg-info"
              onClick={() => navigate("/applicant")}
            />
          )}

          {/* Interview */}
          <DashboardCard
            title="Interview"
            count={counts.interviews}
            icon="fa-comments"
            bg="bg-secondary"
            onClick={() => navigate("/interview")}
          />

          {/* ---------------- ADMIN ONLY ---------------- */}
          {role === "1" && (
            <>
              <DashboardCard
                title="Employees"
                count={counts.employees}
                icon="fa-user-tie"
                bg="bg-success"
                onClick={() => navigate("/employe")}
              />

              <DashboardCard
                title="Contacts"
                count={counts.contacts}
                icon="fa-headphones"
                bg="bg-warning"
                onClick={() => navigate("/contact")}
              />

              <DashboardCard
                title="Users"
                count={counts.users}
                icon="fa-user"
                bg="bg-secondary"
                onClick={() => navigate("/user")}
              />
            </>
          )}
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
                  <i className={`fa ${icon}`}></i>
                </div>
              </div>
              <div className="col col-stats ms-3 ms-sm-0">
                <div className="numbers">
                  {" "}
                  <p
                    className="card-category fw-bold text-dark"
                    style={{ fontSize: "18px" }}
                  >
                    {" "}
                    {title}{" "}
                  </p>{" "}
                  <h4
                    className="card-title fw-bold text-dark"
                    style={{ fontSize: "18px" }}
                  >
                    {" "}
                    {count}{" "}
                  </h4>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
