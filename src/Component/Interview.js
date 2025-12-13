import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Pagination from "./commenuse/Pagination";

function Interview() {
  // Tab Title
  useState(() => {
    document.title = "Hirelink | Interview";
  }, []);

  //================= Candidate Search =======================
  const [candiName, setCandiName] = useState("");
  const [showCandi, setShowCandi] = useState(false);

  const candidateSuggestions = [
    "Harshal Mahajan",
    "Rohit Sharma",
    "Akash Patil",
    "Priya Deshmukh",
    "Sneha Joshi",
    "Amit Shinde",
  ];

  const filteredCandidate = candidateSuggestions.filter((name) =>
    name.toLowerCase().includes(candiName.toLowerCase())
  );

  const selectCandidate = (value) => {
    setCandiName(value);
    setShowCandi(false);
  };

  //================= Job Search =======================
  const [jobName, setJobName] = useState("");
  const [showJob, setShowJob] = useState(false);

  const jobSuggestions = [
    "Frontend Developer",
    "Backend Developer",
    "React Developer",
    "UI/UX Designer",
    "HR Manager",
    "PHP Developer",
  ];

  const filteredJob = jobSuggestions.filter((name) =>
    name.toLowerCase().includes(jobName.toLowerCase())
  );

  const selectJob = (value) => {
    setJobName(value);
    setShowJob(false);
  };

  //================= Company Search =======================
  const [companyName, setCompanyName] = useState("");
  const [showCompany, setShowCompany] = useState(false);

  const companySuggestions = [
    "Tata Consultancy Services (TCS)",
    "Infosys",
    "Wipro",
    "Tech Mahindra",
    "HCL Technologies",
    "Accenture",
    "Capgemini",
    "Cognizant",
    "L&T Infotech",
    "IBM",
    "Amazon",
    "Google",
    "Microsoft",
    "Flipkart",
  ];

  const filteredCompany = companySuggestions.filter((name) =>
    name.toLowerCase().includes(companyName.toLowerCase())
  );

  const selectCompany = (value) => {
    setCompanyName(value);
    setShowCompany(false);
  };

  //========================================
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(users.length / recordsPerPage);

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const filtered = users.filter((u) => u.id !== deleteId);
    setUsers(filtered);
    setShowDeleteModal(false);
  };

  //========================================
  // Yup Validation Schema
  const schema = yup.object().shape({
    candidateName: yup.string().required("Candidate name is required"),
    jobTitle: yup.string().required("Job title is required"),
    companyName: yup.string().required("Company name is required"),
    interviewType: yup.string().required("Interview type is required"),
    interviewDate: yup.string().required("Interview date is required"),
    interviewTime: yup.string().required("Interview time is required"),
    interviewer: yup.string().required("Interviewer name is required"),
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
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Watch interview type
  const watchInterviewType = watch("interviewType");

  // Submit Handler
  const onSubmit = (data) => {
    console.log("FORM SUBMITTED:", data);
    alert("Form submitted successfully!");
  };

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

  //======================================== UI RETURN
  return (
    <>
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <div>
          <h3 className="fw-bold mb-3">Interview Details</h3>
        </div>
        <div className="ms-auto py-2 py-md-0">
          <a
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-success"
          >
            <i className="fa fa-plus"></i> Add Interview
          </a>
        </div>
      </div>

      {/* CARD + TABLE */}
      <div className="card shadow-sm p-3 border">
        <div className="row g-2 align-items-center mb-3">
          <div className="col-md-2">
            <select className="form-select form-control">
              <option value="">Select Interview </option>
              <option>Scheduled</option>
              <option>Rescheduled</option>
              <option>Completed</option>
              <option>Cancelled</option>
              <option>No-Show</option>
            </select>
          </div>

          <div className="col-6 col-md-2">
            <input type="date" className="form-control" />
          </div>

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

          <div className="col-md-3">
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
          <table className="table table-bordered align-middle">
            <thead className="table-light text-center">
              <tr>
                <th>ID</th>
                <th>Candidate</th>
                <th>Job Details</th>
                <th>Interview Info</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {interviews.map((i) => (
                <tr key={i.id}>
                  <td>{i.id}</td>

                  <td className="text-start">
                    <div className="fw-bold ">
                      Name:
                      <div className="dropdown d-inline ms-2">
                        <span
                          className="fw-bold text-primary"
                          role="button"
                          data-bs-toggle="dropdown"
                        >
                          {i.candidate_name}
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
                              onClick={() => handleDeleteClick(i.id)}
                            >
                              <i className="fas fa-trash me-2"></i>Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="fw-bold">
                      Email: <span>{i.candidate_email}</span>
                    </div>
                  </td>

                  <td className="text-start">
                    <b>Job Title:</b> {i.job_title} <br />
                    <b>Company:</b> {i.company_name}
                  </td>

                  <td className="text-start">
                    <b>Interviewer:</b> {i.interviewer} <br />
                    <b>Type:</b> {i.interview_type} <br />
                    <b>Date:</b> {i.interview_date} <br />
                    <b>Time:</b> {i.interview_time}
                  </td>

                  <td className="text-start">
                    <b>Created:</b> {i.created_date} <br />
                    <b>Meeting:</b>{" "}
                    <a href={i.meeting_details} target="_blank">
                      Open Link
                    </a>{" "}
                    <br />
                    <b>Status:</b>{" "}
                    <span className="badge bg-success">
                      {i.interview_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={nPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/* FORM MODAL */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
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
                {/* Candidate Name */}
                <div className="col-md-4 mb-2 position-relative">
                  <label className="form-label fw-semibold">
                    Candidate Name
                  </label>

                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="Enter Candidate Name"
                    {...register("candidateName")}
                    value={candiName}
                    onChange={(e) => {
                      setCandiName(e.target.value);
                      setShowCandi(true);
                    }}
                  />

                  <span className="text-danger">
                    {errors.candidateName?.message}
                  </span>

                  {showCandi && candiName.length > 0 && (
                    <ul
                      className="list-group position-absolute"
                      style={{
                        width: "90%",
                        zIndex: 100,
                        maxHeight: "150px",
                        overflowY: "auto",
                        top: "100%",
                      }}
                    >
                      {filteredCandidate.length > 0 ? (
                        filteredCandidate.map((name, i) => (
                          <li
                            key={i}
                            className="list-group-item list-group-item-action"
                            style={{
                              cursor: "pointer",
                              background: "#e6e3e3ff",
                            }}
                            onClick={() => selectCandidate(name)}
                          >
                            {name}
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item">No results found</li>
                      )}
                    </ul>
                  )}
                </div>

                {/* Job Title */}
                <div className="col-md-4 mb-2 position-relative">
                  <label className="form-label fw-semibold">Job Title</label>

                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="Enter Job Title"
                    {...register("jobTitle")}
                    value={jobName}
                    onChange={(e) => {
                      setJobName(e.target.value);
                      setShowJob(true);
                    }}
                  />

                  <span className="text-danger">
                    {errors.jobTitle?.message}
                  </span>

                  {showJob && jobName.length > 0 && (
                    <ul
                      className="list-group position-absolute"
                      style={{
                        width: "90%",
                        zIndex: 100,
                        maxHeight: "150px",
                        overflowY: "auto",
                        top: "100%",
                      }}
                    >
                      {filteredJob.length > 0 ? (
                        filteredJob.map((name, i) => (
                          <li
                            key={i}
                            className="list-group-item list-group-item-action"
                            style={{
                              cursor: "pointer",
                              background: "#e6e3e3ff",
                            }}
                            onClick={() => selectJob(name)}
                          >
                            {name}
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item">No results found</li>
                      )}
                    </ul>
                  )}
                </div>

                {/* Company Name */}
                <div className="col-md-4 mb-2 position-relative">
                  <label className="form-label fw-semibold">Company Name</label>

                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="Enter Company Name"
                    {...register("companyName")}
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      setShowCompany(true);
                    }}
                  />

                  <span className="text-danger">
                    {errors.companyName?.message}
                  </span>

                  {showCompany && companyName.length > 0 && (
                    <ul
                      className="list-group position-absolute"
                      style={{
                        width: "90%",
                        zIndex: 100,
                        maxHeight: "150px",
                        overflowY: "auto",
                        top: "100%",
                      }}
                    >
                      {filteredCompany.length ? (
                        filteredCompany.map((name, i) => (
                          <li
                            key={i}
                            className="list-group-item list-group-item-action"
                            style={{
                              cursor: "pointer",
                              background: "#e6e3e3ff",
                            }}
                            onClick={() => selectCompany(name)}
                          >
                            {name}
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item">No results found</li>
                      )}
                    </ul>
                  )}
                </div>

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
                    Interview Date
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

                {/* Interviewer */}
                {/* <div className="col-md-4 mb-2">
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
                </div> */}

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
                      />
                    </div>
                    <span className="text-danger"></span>
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
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Closed">Closed</option>
                  </select>

                  <span className="text-danger">{errors.status?.message}</span>
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

                <button type="submit" className="btn btn-success px-4 ms-auto">
                  Submit
                </button>
              </div>
            </form>
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
