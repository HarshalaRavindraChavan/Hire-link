import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Pagination from "./commenuse/Pagination";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";

function Interview() {
  useEffect(() => {
    document.title = "Hirelink | Interview";
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

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

  // edit model code
  const [editInterviewId, setEditInterviewId] = useState(null);
  const modalRef = useRef(null);

  const watchInterviewType = watch("interviewType");

  const openEditInterviewModal = (item) => {
    setEditInterviewId(item.itv_id); // 👈 VERY IMPORTANT

    reset({
      candidate_id: item.candidate_id,
      job_id: item.job_id,
      interviewType: item.interview_type,
      interviewDate: item.interview_date,
      interviewTime: item.interview_time,
      meetingLink: item.meeting_link,
      status: item.status,
    });

    const modalEl = document.getElementById("interviewexampleModal");
    if (!modalEl || !window.bootstrap) return;

    const modal =
      window.bootstrap.Modal.getInstance(modalEl) ||
      new window.bootstrap.Modal(modalEl);

    modal.show();
  };

  const onSubmit = async (data) => {
    if (!editInterviewId) {
      alert("Interview ID missing");
      return;
    }

    try {
      const payload = {
        candidate_id: Number(data.candidate_id),
        job_id: Number(data.job_id),
        interview_type: data.interviewType,
        interview_date: data.interviewDate,
        interview_time: data.interviewTime,
        meeting_link:
          data.interviewType === "Virtual Interview"
            ? data.meetingLink || ""
            : "",
        status: data.status,
      };

      const res = await axios.post(
        `https://norealtor.in/hirelink_apis/admin/updatedata/tbl_interview/itv_id/${editInterviewId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.data?.status === true) {
        alert("Interview updated successfully ✅");

        fetchInterviews();
        const modalEl = document.getElementById("interviewexampleModal");
        const modal = window.bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      } else {
        alert("Update failed ❌");
      }
    } catch (error) {
      console.error("Interview Update Error:", error.response || error);
      alert("Server error ❌");
    }
  };

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
                              <button
                                className="dropdown-item"
                                onClick={() => openEditInterviewModal(i)}
                              >
                                <i className="fas fa-edit me-2"></i> Edit
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

        {/* Interview Edit Model Code  */}
        <div
          className="modal fade"
          id="interviewexampleModal"
          tabIndex="-1"
          aria-hidden="true"
          ref={modalRef}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content shadow-lg rounded-4">
              <div className="modal-header bg-success text-white rounded-top-4">
                <h5 className="modal-title fw-bold">Interview Details</h5>

                <i
                  className="fa-regular fa-circle-xmark"
                  data-bs-dismiss="modal"
                  style={{ cursor: "pointer", fontSize: "25px" }}
                ></i>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-body row">
                  <input type="hidden" {...register("candidate_id")} />
                  <input type="hidden" {...register("job_id")} />

                  {/* Interview Type */}
                  <div className="col-md-4 mb-2">
                    <label className="form-label fw-semibold">
                      Interview Type
                    </label>

                    <select
                      className="form-control rounded-3"
                      {...register("interviewType")}
                    >
                      <option value="">Select Interview Type</option>
                      <option>Virtual Interview</option>
                      <option>In-Person</option>
                    </select>

                    <span className="text-danger">
                      {errors.interviewType?.message}
                    </span>
                  </div>

                  {/* Interview Date */}
                  <div className="col-md-4 mb-2">
                    <label className="form-label fw-semibold">
                      Interview Date
                    </label>
                    <input
                      type="date"
                      className="form-control rounded-3"
                      {...register("interviewDate")}
                    />
                    <span className="text-danger">
                      {errors.interviewDate?.message}
                    </span>
                  </div>

                  {/* Interview Time */}
                  <div className="col-md-4 mb-2">
                    <label className="form-label fw-semibold">
                      Interview Time
                    </label>
                    <input
                      type="time"
                      className="form-control rounded-3"
                      {...register("interviewTime")}
                    />
                    <span className="text-danger">
                      {errors.interviewTime?.message}
                    </span>
                  </div>

                  {/* Meeting Link - Conditional Rendering */}
                  {watchInterviewType === "Virtual Interview" && (
                    <div className="col-md-4 mb-2">
                      <label className="form-label fw-semibold">
                        Meeting Link
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control rounded-3"
                          placeholder="Enter Meeting Link"
                          {...register("meetingLink")}
                        />
                      </div>
                      <span className="text-danger">
                        {errors.meetingLink?.message}
                      </span>
                    </div>
                  )}

                  {/* Status */}
                  <div className="col-md-4 mb-2">
                    <label className="form-label fw-semibold">Status</label>

                    <select
                      className="form-control rounded-3"
                      {...register("status")}
                    >
                      <option value="">Select Status</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <span className="text-danger">
                      {errors.status?.message}
                    </span>
                  </div>
                </div>

                <div className="modal-footer bg-light rounded-bottom-4 d-flex">
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-3"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-success px-4 ms-auto"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
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
