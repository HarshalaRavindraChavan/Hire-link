import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./commenuse/Pagination";

function Applieds() {
  // tital of tab
  useState(() => {
    document.title = "Hirelink | Applieds";
  }, []);

  // Login ckeck and role
  const auth = JSON.parse(localStorage.getItem("auth"));
  const role = auth?.role;
  const employerId = auth?.emp_id;
  //=================

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  //==========Pagination=========================
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(users.length / recordsPerPage);

  //============================= Get Data Code ============================

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      let res;

      // ADMIN / SUBADMIN / BACKEND → ALL DATA
      if (["1", "2", "3", "4"].includes(role)) {
        res = await axios.get(
          "https://norealtor.in/hirelink_apis/admin/getdata/tbl_applied"
        );
      }

      // EMPLOYER → ONLY HIS DATA
      if (role === "employer") {
        res = await axios.get(
          `https://norealtor.in/hirelink_apis/employer/getdatawhere/tbl_applied/apl_employer_id/${employerId}`
        );
      }

      if (res?.data?.status) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error("Jobs fetch error:", error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <div>
          <h3 className="fw-bold mb-3">Applieds</h3>
        </div>
      </div>

      <div className="card shadow-sm p-3 border">
        {/* FILTER ROW */}
        <div className="row g-2 align-items-center mb-3">
          {/* Job Type */}
          <div className="col-12 col-md-2">
            <select className="form-select form-control">
              <option value="">Select Type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Remote</option>
              <option>Contract</option>
            </select>
          </div>

          {/* From Date */}
          <div className="col-6 col-md-2">
            <input type="date" className="form-control" />
          </div>

          {/* To Date */}
          <div className="col-6 col-md-2">
            <input type="date" className="form-control" />
          </div>

          {/* Submit + Reset */}
          <div className="col-12 col-md-3 d-flex justify-content-md-start justify-content-between">
            <button className="btn px-4 me-2 btn-success">Submit</button>

            <button className="btn btn-light border px-3">
              <i className="fa fa-refresh"></i>
            </button>
          </div>

          {/* Search */}
          <div className="col-12 col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table table-bordered ">
            <thead className="table-light text-center">
              <tr className="text-center">
                <th className="fs-6 fw-bold">ID</th>
                <th className="fs-6 fw-bold">Applyer Detail</th>
                <th className="fs-6 fw-bold">Applied Job</th>
                <th className="fs-6 fw-bold">Other Detail</th>
              </tr>
            </thead>

            <tbody>
              {records.length > 0 ? (
                records.map((app, index) => (
                  <tr key={app.apl_id}>
                    <td>{firstIndex + index + 1}</td>
                    <td className="text-start fw-bold">
                      <div className="fw-bold ">
                        Name:{" "}
                        <span className="text-dark fw-normal">
                          {app.can_name}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Email:{" "}
                        <span className="text-dark fw-normal">
                          {app.can_email}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Mobile:{" "}
                        <span className="text-dark fw-normal">
                          {app.can_mobile}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Experience:{" "}
                        <span className="text-dark fw-normal">
                          {app.can_experience}
                        </span>
                      </div>
                    </td>

                    <td className="text-start">
                      <div className="fw-bold ">
                        Job Title:{" "}
                        <span className="text-dark fw-normal">
                          {app.job_title}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Company:{" "}
                        <span className="text-dark fw-normal">
                          {app.job_company}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Employer:{" "}
                        <span className="text-dark fw-normal">
                          {app.emp_name}
                        </span>
                      </div>
                    </td>
                    <td className="text-start">
                      <div className="fw-bold ">
                        Applied Date:{" "}
                        <span className="text-dark fw-normal">
                          {app.apl_added_date}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={nPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}

export default Applieds;
