import React, { useEffect, useRef, useState } from "react";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import axios from "axios";
import Pagination from "./commenuse/Pagination";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../config/constants";
import TableSkeleton from "./commenuse/TableSkeleton";
import InterviewsPage from "./InterManage";

function Interview() {
  /* ================= FORM ================= */
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    shouldUnregister: false, // ⭐ IMPORTANT
    defaultValues: {
      candidate_id: "",
      job_id: "",
      interviewType: "",
      interviewDate: "",
      interviewTime: "",
      meetingLink: "",
      status: "",
    },
  });

  const watchInterviewType = watch("interviewType");

  /* ================= STATES ================= */
  const [activeTab, setActiveTab] = useState("tab1"); // ✅ tab state
  const [search, setSearch] = useState("");
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 100;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = interviews.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(interviews.length / recordsPerPage);

  // Delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Edit
  const [editInterviewId, setEditInterviewId] = useState(null);
  const modalRef = useRef(null);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const staff = JSON.parse(localStorage.getItem("staff"));
  const role = auth?.role;
  const employerId = auth?.emp_id;
  const staffemploId = staff?.staff_employer_id;

  /* ================= FETCH ================= */
  const fetchInterviews = async () => {
    try {
      setLoading(true);
      let res;
      if (["1", "2", "3", "4"].includes(role)) {
        res = await axios.get(`${BASE_URL}admin/getdata/tbl_interview`);
      }

      if (Number(role) === 100) {
        res = await axios.get(
          `${BASE_URL}employer/getdatawhere/tbl_interview/itv_employer_id/${employerId}`,
        );
      }
      if (Number(role) === 200) {
        res = await axios.get(
          `${BASE_URL}employer/getdatawhere/tbl_interview/itv_employer_id/${staffemploId}`,
        );
      }

      if (res.data.status) {
        setInterviews(res.data.data);
      } else {
        toast.error("Failed to load interviews");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  /* ================= DELETE ================= */
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}admin/deletedata/tbl_interview/itv_id/${deleteId}`,
      );
      if (res.data.status) {
        toast.success("Interview deleted successfully");
        setShowDeleteModal(false);
        fetchInterviews();
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  /* ================= EDIT MODAL ================= */
  const openEditInterviewModal = (item) => {
    setEditInterviewId(item.itv_id);

    reset({
      candidate_id: item.candidate_id,
      job_id: item.job_id,
      interviewType: item.itv_type?.trim(),
      interviewDate: item.itv_date?.split("T")[0], // YYYY-MM-DD
      interviewTime: item.itv_time?.substring(0, 5), // HH:mm
      meetingLink: item.itv_meeting_link || "",
      status: item.itv_status,
    });

    const modalEl = document.getElementById("interviewexampleModal");
    const modal =
      window.bootstrap.Modal.getInstance(modalEl) ||
      new window.bootstrap.Modal(modalEl);
    modal.show();
  };

  /* ================= UPDATE ================= */
  const onSubmit = async (data) => {
    if (!editInterviewId) return;

    try {
      const payload = {
        itv_candidate_id: Number(data.candidate_id),
        itv_job_id: Number(data.job_id),
        itv_type: data.interviewType,
        itv_date: data.interviewDate,
        itv_time: data.interviewTime,
        itv_meeting_link:
          data.interviewType === "Virtual Interview"
            ? data.meetingLink || ""
            : "",
        itv_status: data.status,
      };

      const res = await axios.post(
        `${BASE_URL}admin/updatedata/tbl_interview/itv_id/${editInterviewId}`,
        payload,
        { headers: { "Content-Type": "application/json" } },
      );

      if (res.data.status) {
        toast.success("Interview updated successfully ✅");
        fetchInterviews();
        window.bootstrap.Modal.getInstance(
          document.getElementById("interviewexampleModal"),
        ).hide();
      } else {
        toast.error("Update failed ❌");
      }
    } catch {
      toast.error("Server error ❌");
    }
  };

  /* ================= UI ================= */
  return (
    <>
      <SEO
        title={seoConfig.a_interview.title}
        description={seoConfig.a_interview.description}
      />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <h3 className="fw-bold mb-3">Interview Details</h3>

      {/* ✅ Tabs Header (Only Employer) */}
      {(Number(role) === 100 || Number(role) === 200) && (
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
              onClick={() => setActiveTab("tab1")}
            >
              All
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
              onClick={() => setActiveTab("tab2")}
            >
              Interview Manage
            </button>
          </li>
        </ul>
      )}

      {/* ✅ Tabs Content */}
      {activeTab === "tab1" && (
        <div className="card shadow-sm p-3 border">
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
                  <TableSkeleton rows={6} columns={5} />
                ) : records.length ? (
                  records.map((i, idx) => (
                    <tr key={i.itv_id}>
                      <td>{firstIndex + idx + 1}</td>

                      <td>
                        <div className="dropdown d-inline">
                          <span
                            className="text-primary fw-bold"
                            role="button"
                            data-bs-toggle="dropdown"
                          >
                            {i.can_name}
                            {/* (Interview Reschedule) */}
                          </span>
                          {/* <ul className="dropdown-menu">
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => openEditInterviewModal(i)}
                              >
                                Edit
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => handleDeleteClick(i.itv_id)}
                              >
                                Delete
                              </button>
                            </li>
                          </ul> */}
                        </div>
                        <div className="fw-bold">
                          Score:{" "}
                          <span
                            className="text-dark"
                            style={{ fontSize: "15px" }}
                          >
                            {i.can_score}/1000
                          </span>
                        </div>
                        <div className="fw-bold">
                          Education Type:{" "}
                          <span className="text-dark fw-normal">
                            {i.can_education_type}
                          </span>
                        </div>
                        <div className="fw-bold">
                          Education:{" "}
                          <span className="text-dark fw-normal">
                            {i.can_education_detail}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="fw-bold">
                          Job Title:{" "}
                          <span className="text-dark fw-normal">
                            {i.job_title}
                          </span>
                        </div>
                        <div className="fw-bold">
                          Company:{" "}
                          <span className="text-dark fw-normal">
                            {i.job_company}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="fw-bold">
                          Interview Type:{" "}
                          <span className="text-dark fw-normal">
                            {i.itv_type}
                          </span>
                        </div>
                        <div className="fw-bold">
                          Interview Date:{" "}
                          <span className="text-dark fw-normal">
                            {i.itv_date}
                          </span>
                        </div>
                        <div className="fw-bold">
                          Interview Time:{" "}
                          <span className="text-dark fw-normal">
                            {new Date(
                              `1970-01-01T${i.itv_time}`,
                            ).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`badge fw-bold ${
                            (i.itv_status || "").trim() === "Pending"
                              ? "bg-warning"
                              : (i.itv_status || "").trim() === "Confirmed"
                                ? "bg-primary"
                                : (i.itv_status || "").trim() ===
                                    "Candidate Cancelled"
                                  ? "bg-danger"
                                  : (i.itv_status || "").trim() ===
                                      "Not Attended"
                                    ? "bg-dark"
                                    : (i.itv_status || "").trim() ===
                                        "Cancelled"
                                      ? "bg-danger"
                                      : (i.itv_status || "").trim() ===
                                          "Completed"
                                        ? "bg-success"
                                        : "bg-secondary"
                          }`}
                        >
                          {(i.itv_status || "").trim() === "Pending"
                            ? "Pending"
                            : (i.itv_status || "").trim() === "Confirmed"
                              ? "Scheduled"
                              : (i.itv_status || "").trim() ===
                                  "Candidate Cancelled"
                                ? "Candidate Cancelled"
                                : (i.itv_status || "").trim() === "Cancelled"
                                  ? "Cancel"
                                  : (i.itv_status || "").trim() ===
                                      "Not Attended"
                                    ? "Not Attended"
                                    : (i.itv_status || "").trim() ===
                                        "Completed"
                                      ? "Complete"
                                      : (i.itv_status || "").trim()}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No interviews found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <Pagination
              currentPage={currentPage}
              totalPages={nPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}

      {/* ✅ Tab 2 */}
      {(Number(role) === 100 || Number(role) === 200) &&
        activeTab === "tab2" && (
          <div className="card shadow-sm p-3 border">
            <InterviewsPage openEditInterviewModal={openEditInterviewModal} />
          </div>
        )}
      {/* ================= MODAL ================= */}
      <div className="modal fade" id="interviewexampleModal" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Edit Interview</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body row">
                <input type="hidden" {...register("candidate_id")} />
                <input type="hidden" {...register("job_id")} />

                <div className="col-md-4 mb-2">
                  <label>Interview Type</label>
                  <select
                    className="form-control"
                    {...register("interviewType")}
                  >
                    <option value="">Select</option>
                    <option value="Virtual Interview">Virtual Interview</option>
                    <option value="In-Person">In-Person</option>
                  </select>
                </div>

                <div className="col-md-4 mb-2">
                  <label>Date</label>
                  <input
                    type="date"
                    className="form-control"
                    {...register("interviewDate")}
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <label>Time</label>
                  <input
                    type="time"
                    className="form-control"
                    {...register("interviewTime")}
                  />
                </div>

                {watchInterviewType === "Virtual Interview" && (
                  <div className="col-md-6 mb-2">
                    <label>Meeting Link</label>
                    <input
                      className="form-control"
                      {...register("meetingLink")}
                    />
                  </div>
                )}

                <div className="col-md-4 mb-2">
                  <label>Status</label>
                  <select className="form-control" {...register("status")}>
                    <option value="">Select</option>
                    <option value="Rescheduled">Rescheduled</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button className="btn btn-success" type="submit">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ConfirmDelete
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default Interview;
