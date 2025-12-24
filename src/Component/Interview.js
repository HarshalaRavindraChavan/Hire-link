import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./commenuse/Pagination";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { toast, ToastContainer } from "react-toastify";

function Interview() {
  useEffect(() => {
    document.title = "Hirelink | Interview";
  }, []);

  const [search, setSearch] = useState("");

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = interviews.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(interviews.length / recordsPerPage);

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await axios.get(
        `https://norealtor.in/hirelink_apis/admin/deletedata/tbl_interview/itv_id/${deleteId}`
      );

      if (res.data.status) {
        toast.success("Interview deleted successfully");
        setShowDeleteModal(false);
        fetchInterviews();
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("Server error while deleting");
    }
  };

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://norealtor.in/hirelink_apis/admin/getdata/tbl_interview"
      );

      if (res.data.status) {
        setInterviews(res.data.data);
      } else {
        toast.error("Failed to load interviews");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  return (
    <>
      {/* Your Routes / Layout */}{" "}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        {" "}
        <div>
          {" "}
          <h3 className="fw-bold mb-3">Interview Details</h3>{" "}
        </div>{" "}
      </div>
      <div className="card shadow-sm p-3 border">
        <div className="row g-2 align-items-center mb-3">
          {" "}
          <div className="col-md-2">
            {" "}
            <select className="form-select form-control">
              {" "}
              <option value="">Select Interview </option>{" "}
              <option>Scheduled</option> <option>Rescheduled</option>{" "}
              <option>Completed</option> <option>Cancelled</option>{" "}
              <option>No-Show</option>{" "}
            </select>{" "}
          </div>{" "}
          <div className="col-6 col-md-2">
            {" "}
            <input type="date" className="form-control" />{" "}
          </div>{" "}
          <div className="col-6 col-md-2">
            {" "}
            <input type="date" className="form-control" />{" "}
          </div>{" "}
          {/* Submit + Reset */}{" "}
          <div className="col-12 col-md-3 d-flex justify-content-md-start justify-content-between">
            {" "}
            <button className="btn px-4 me-2 btn-success">Submit</button>{" "}
            <button className="btn btn-light border px-3">
              {" "}
              <i className="fa fa-refresh"></i>{" "}
            </button>{" "}
          </div>{" "}
          <div className="col-md-3">
            {" "}
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />{" "}
          </div>{" "}
        </div>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light text-center">
              <tr>
                <th>ID</th>
                <th>Candidate</th>
                <th>Job</th>
                <th>Interview</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center text-primary">
                    Loading interviews...
                  </td>
                </tr>
              ) : records.length > 0 ? (
                records.map((i, index) => (
                  <tr key={i.itv_id}>
                    {/* ID */}
                    <td>{firstIndex + index + 1}</td>
                    {/* Candidate Info */}
                    <td className="text-start">
                      <div className="fw-bold">
                        Name:
                        <div className="dropdown d-inline ms-2">
                          <span
                            className="fw-bold text-primary"
                            role="button"
                            data-bs-toggle="dropdown"
                          >
                            {i.can_name}
                          </span>
                          <ul className="dropdown-menu shadow">
                            <li>
                              <button className="dropdown-item">
                                <i className="fas fa-edit me-2"></i>Edit
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => handleDeleteClick(i.itv_id)}
                              >
                                <i className="fas fa-trash me-2"></i>Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="fw-bold">
                        Email: <span>{i.can_email || "N/A"}</span>
                      </div>
                    </td>

                    {/* Job Details */}
                    <td className="text-start">
                      <b>Job Title:</b> {i.job_title} <br />
                      <b>Company:</b> {i.job_company}
                    </td>

                    {/* Interview Info */}
                    <td className="text-start">
                      {/* <b>Interviewer:</b> {i.interviewer} <br /> */}
                      <b>Type:</b> {i.itv_type} <br />
                      <b>Date:</b> {i.itv_date} <br />
                      <b>Time:</b> {i.itv_time}
                    </td>

                    {/* Created & Meeting Info */}
                    <td className="text-start">
                      <b>Meeting:</b>{" "}
                      {i.itv_meeting_link ? (
                        <a
                          href={i.itv_meeting_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open Link
                        </a>
                      ) : (
                        <span className="text-muted">N/A</span>
                      )}
                      <br />
                      <b>Status:</b>{" "}
                      <span
                        className={`badge ${
                          i.itv_status === "Scheduled"
                            ? "bg-primary"
                            : i.itv_status === "Completed"
                            ? "bg-success"
                            : i.itv_status === "Cancelled"
                            ? "bg-danger"
                            : "bg-warning"
                        }`}
                      >
                        {i.itv_status || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No interviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={nPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      {/* DELETE MODAL */}
      <ConfirmDelete
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default Interview;
