import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function Interview() {
  // tital of tab
  useState(() => {
    document.title = "Interview Hirelink ";
  }, []);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Harshal Mahajan",
      email: "harshal1@gmail.com",
      mobile: "9876543201",
      business: "1 year",
      category: "2024-01-05",
      location: "",
      city: "Mumbai",
      state: "Maharashtra",
      website: "1111 2222 3333",
      facebook: "ABCDE1234F",
      linkedin: "Maharashtra",
      instagram: "1111 2222 3333",
      youtube: "ABCDE1234F",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(users.length / recordsPerPage);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Open Confirm Delete Modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // DELETE CONFIRM
  const confirmDelete = () => {
    const filtered = users.filter((u) => u.id !== deleteId);
    setUsers(filtered);
    setShowDeleteModal(false);
  };

  // ✅ Yup Validation Schema
  const schema = yup.object().shape({
    candidateName: yup.string().required("Candidate name is required"),
    jobTitle: yup.string().required("Job title is required"),
    companyName: yup.string().required("Company name is required"),
    interviewType: yup.string().required("Interview type is required"),
    interviewDate: yup.string().required("Interview date is required"),
    interviewTime: yup.string().required("Interview time is required"),
    interviewer: yup.string().required("Interviewer name is required"),
    meetingLink: yup.string().required("Meeting link / address is required"),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),
    status: yup.string().required("Status is required"),
    createdDate: yup.string().required("Created date is required"),
  });

  // React Hook Form Initialization
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Generate meeting link
  const generateMeetingLink = () => {
    const link =
      "https://meet.example.com/" + Math.random().toString(36).substring(2, 10);
    setValue("meetingLink", link);
  };

  const onSubmit = (data) => {
    console.log("FORM SUBMITTED:", data);
    alert("Form submitted successfully!");
  };

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const interviews = [
    {
      id: 1,
      candidate_name: "Harshala Chavan",
      candidate_email: "harshala@gmail.com",
      job_title: "Frontend Developer",
      company_name: "Tech Solutions",
      interview_type: "Online",
      interview_date: "2025-06-15",
      interview_time: "11:00 AM",
      interview_status: "Scheduled",
      interviewer: "Rahul Patil",
      meeting_details: "https://meet.google.com/xyz",
      created_date: "2025-05-25",
    },
  ];
  return (
    <>
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <div>
          <h3 className="fw-bold mb-3">Interview Details</h3>
        </div>
        <div className="ms-auto py-2 py-md-0">
          {/* <a href="#" className="btn btn-label-info btn-round me-2">
            Manage
          </a> */}
          <a
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn "
            style={{ backgroundColor: "#05b61aff", color: "white" }}
          >
            <i className="fa fa-plus"> </i> Add Interview
          </a>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div className="card shadow-sm">
        <div className="card-body">
          {/* FILTERS */}
          <div className="row g-2 align-items-center mb-3">
            {/* Interview Status */}
            <div className="col-12 col-md-2">
              <select className="form-select">
                <option value="">Select Interview Status</option>
                <option>Scheduled</option>
                <option>Rescheduled</option>
                <option>Completed</option>
                <option>Cancelled</option>
                <option>No-Show</option>
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
            <div className="ol-12 col-md-3 d-flex justify-content-md-start justify-content-between">
              <button
                className="btn px-4 me-2"
                style={{ backgroundColor: "#05b61a", color: "white" }}
              >
                Submit
              </button>

              <button className="btn btn-light border px-3">
                <i className="fa fa-refresh"></i>
              </button>
            </div>

            {/* Search (Right aligned) */}
            <div className="col-md-2 col-md-3">
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
            <table className="table table-bordered table-hover table-responsive">
              <thead className="table-light align-middle">
                <tr>
                  <th>id</th>
                  <th>candidate</th>
                  <th>Job Details</th>
                  <th>Interview Info</th>
                  <th>Interviewer</th>
                  <th>Created</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {interviews.map((i) => (
                  <tr key={i.id}>
                    <td>{i.id}</td>

                    <td>
                      <b>{i.candidate_name}</b>
                      <br />
                      <small>{i.candidate_email}</small>
                    </td>

                    <td>
                      <b>Job Title:</b> {i.job_title} <br />
                      <b>Company:</b> {i.company_name}
                    </td>

                    <td>
                      <b>Type:</b> {i.interview_type} <br />
                      <b>Date:</b> {i.interview_date} <br />
                      <b>Time:</b> {i.interview_time} <br />
                      <b>Meeting:</b>{" "}
                      <a
                        href={i.meeting_details}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open Link
                      </a>
                    </td>

                    <td>{i.interviewer}</td>
                    <td>{i.created_date}</td>
                    <td>
                      <span className="badge bg-success">
                        {i.interview_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PAGINATION */}
      {/* <nav className="d-flex justify-content-end mt-3">
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>

                {[...Array(nPages).keys()].map((num) => (
                  <li
                    key={num}
                    className={`page-item ${
                      currentPage === num + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(num + 1)}
                    >
                      {num + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === nPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav> */}

      {/* ADD FORM MODAL */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content shadow-lg border-0 rounded-4">
            <div
              className="modal-header text-white rounded-top-4"
              style={{ backgroundColor: "#05b61aff", color: "white" }}
            >
              <h5 className="modal-title fw-bold" style={{ color: "white" }}>
                Interview Details
              </h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body row">
                {/* Candidate Name */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Candidate Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="Enter Candidate Name"
                    {...register("candidateName")}
                  />
                  <span className="text-danger">
                    {errors.candidateName?.message}
                  </span>
                </div>

                {/* Job Title */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Job Title</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="Enter Job Title"
                    {...register("jobTitle")}
                  />
                  <span className="text-danger">
                    {errors.jobTitle?.message}
                  </span>
                </div>

                {/* Company Name */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Company Name</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="Enter Company Name"
                    {...register("companyName")}
                  />
                  <span className="text-danger">
                    {errors.companyName?.message}
                  </span>
                </div>

                {/* Interview Type */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Interview Type
                  </label>
                  <select
                    className="form-control rounded-3"
                    {...register("interviewType")}
                  >
                    <option value="">Select Interview Type</option>
                    <option>Online</option>
                    <option>Offline</option>
                    <option>Telephonic</option>
                    <option>HR Round</option>
                    <option>Technical Round</option>
                  </select>
                  <span className="text-danger">
                    {errors.interviewType?.message}
                  </span>
                </div>

                {/* Interview Date */}
                <div className="col-md-6 mb-2">
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
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Interview Time
                  </label>
                  <select
                    className="form-control rounded-3"
                    {...register("interviewTime")}
                  >
                    <option value="">Select Interview Time</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                  </select>
                  <span className="text-danger">
                    {errors.interviewTime?.message}
                  </span>
                </div>

                {/* Interviewer */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Assigned Interviewer
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="Enter Interviewer Name"
                    {...register("interviewer")}
                  />
                  <span className="text-danger">
                    {errors.interviewer?.message}
                  </span>
                </div>

                {/* Meeting Link */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Meeting Link / Address
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control rounded-3"
                      placeholder="Enter Meeting Link / Address"
                      {...register("meetingLink")}
                    />
                    <button
                      type="button"
                      className="btn"
                      onClick={generateMeetingLink}
                      style={{ backgroundColor: "#05b61aff", color: "white" }}
                    >
                      Generate
                    </button>
                  </div>
                  <span className="text-danger">
                    {errors.meetingLink?.message}
                  </span>
                </div>

                {/* Phone Number */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input
                    type="text"
                    maxLength={10}
                    className="form-control rounded-3"
                    placeholder="Enter Phone Number"
                    {...register("phone")}
                  />
                  <span className="text-danger">{errors.phone?.message}</span>
                </div>

                {/* Status */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Status</label>

                  <div style={{ position: "relative" }}>
                    {/* Icon */}
                    <i
                      className="fa fa-info-circle"
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#6c757d",
                        pointerEvents: "none",
                        fontSize: "16px",
                      }}
                    ></i>

                    {/* Select box */}
                    <select
                      className="form-control rounded-3"
                      {...register("status")}
                      style={{ paddingLeft: "40px" }}
                    >
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <span className="text-danger">{errors.status?.message}</span>
                </div>

                {/* Created Date */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Created Date</label>
                  <input
                    type="date"
                    className="form-control rounded-3"
                    {...register("createdDate")}
                  />
                  <span className="text-danger">
                    {errors.createdDate?.message}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="modal-footer bg-light rounded-bottom-4 d-flex">
                <button
                  className="btn  rounded-3"
                  data-bs-dismiss="modal"
                  style={{ backgroundColor: "#9aa09bff", color: "white" }}
                >
                  Cancle
                </button>

                <button
                  type="submit"
                  className="btn  px-4 ms-auto"
                  style={{ backgroundColor: "#05b61aff", color: "white" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRM MODAL */}
      <ConfirmDelete
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default Interview;
