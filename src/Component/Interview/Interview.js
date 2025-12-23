import React, { useEffect, useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Pagination from "./commenuse/Pagination";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function Interview() {
  // Tab Title
  useEffect(() => {
    document.title = "Hirelink | Interview";
  }, []);

  const [candiName, setCandiName] = useState("");
  const [showCandi, setShowCandi] = useState(false);

  const [jobName, setJobName] = useState("");
  const [showJob, setShowJob] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [showCompany, setShowCompany] = useState(false);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const candidateSuggestions = [
    { can_id: 1, can_name: "Harshal Mahajan" },
    { can_id: 2, can_name: "Rohit Sharma" },
    { can_id: 3, can_name: "Akash Patil" },
  ];

  const jobSuggestions = [
    { job_id: 1, job_title: "Frontend Developer" },
    { job_id: 2, job_title: "Backend Developer" },
    { job_id: 3, job_title: "React Developer" },
  ];

  const filteredCandidate = candidateSuggestions.filter((item) =>
    item.can_name.toLowerCase().includes(candiName.toLowerCase())
  );

  const filteredJob = jobSuggestions.filter((item) =>
    item.job_title.toLowerCase().includes(jobName.toLowerCase())
  );

  const selectCandidate = (item) => {
    setCandiName(item.can_name);
    setSelectedCandidate(item);
    setValue("candidateName", item.can_name); // 👈 IMPORTANT
    setShowCandi(false);
  };

  const selectJob = (item) => {
    setJobName(item.job_title); // show text in input
    setSelectedJob(item); // store full object
    setShowJob(false);
  };

  const companySuggestions = ["TCS", "Infosys", "Wipro", "Accenture", "Google"];

  const filteredCompany = companySuggestions.filter((name) =>
    name.toLowerCase().includes(companyName.toLowerCase())
  );

  const selectCompany = (value) => {
    setCompanyName(value);
    setValue("companyName", value);
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
    // interviewer: yup.string().required("Interviewer name is required"),
    status: yup.string().required("Status is required"),
    // createdDate: yup.string().required("Created date is required"),
  });

  // React Hook Form Initialization
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Watch interview type
  const watchInterviewType = watch("interviewType");

  // Submit Handler
  const onSubmit = async (data) => {
    if (!selectedCandidate || !selectedJob) {
      toast.error("Please select candidate and job");
      return;
    }

    const payload = {
      itv_candidate_id: selectedCandidate.can_id,
      itv_job_id: selectedJob.job_id,
      itv_company_name: companyName,
      itv_type: data.interviewType,
      itv_date: data.interviewDate,
      itv_status: data.status,
    };

    try {
      const res = await axios.post(
        "https://norealtor.in/hirelink_apis/admin/insert/tbl_interview",
        payload
      );

      if (res.data.status) {
        toast.success("Interview added successfully");

        setCandiName("");
        setJobName("");
        setCompanyName("");
        setSelectedCandidate(null);
        setSelectedJob(null);
      } else {
        toast.error("Insert failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const [search, setSearch] = useState("");

  // get api state and api
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInterviews = async (showSuccessToast = false) => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://norealtor.in/hirelink_apis/admin/getdata/tbl_interview"
      );

      if (res.data.status) {
        setInterviews(res.data.data);

        // ✅ Show toast ONLY when needed
        if (showSuccessToast) {
          toast.success("Interview added successfully");
        }
      } else {
        toast.error("Failed to load interview data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching interviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  //======================================== UI RETURN
  return (
    <>
      {/* Your Routes / Layout */}
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
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    <span className="text-primary fw-bold">
                      Loading interviews...
                    </span>
                  </td>
                </tr>
              ) : interviews.length > 0 ? (
                interviews.map((i) => (
                  <tr key={i.id}>
                    {/* ID */}
                    <td>{i.id}</td>

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
                            {i.candidate_name || "N/A"}
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
                        Email: <span>{i.candidate_email || "N/A"}</span>
                      </div>
                    </td>

                    {/* Job Details */}
                    <td className="text-start">
                      <b>Job Title:</b> {i.job_title || "N/A"} <br />
                      <b>Company:</b> {i.company_name || "N/A"}
                    </td>

                    {/* Interview Info */}
                    <td className="text-start">
                      <b>Interviewer:</b> {i.interviewer || "N/A"} <br />
                      <b>Type:</b> {i.interview_type || "N/A"} <br />
                      <b>Date:</b> {i.interview_date || "N/A"} <br />
                      <b>Time:</b> {i.interview_time || "N/A"}
                    </td>

                    {/* Created & Meeting Info */}
                    <td className="text-start">
                      <b>Created:</b> {i.created_date || "N/A"} <br />
                      <b>Meeting:</b>{" "}
                      {i.meeting_details ? (
                        <a
                          href={i.meeting_details}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open Link
                        </a>
                      ) : (
                        <span className="text-muted">No link</span>
                      )}
                      <br />
                      <b>Status:</b>{" "}
                      <span
                        className={`badge ${
                          i.interview_status === "Scheduled"
                            ? "bg-primary"
                            : i.interview_status === "Completed"
                            ? "bg-success"
                            : i.interview_status === "Cancelled"
                            ? "bg-danger"
                            : "bg-warning"
                        }`}
                      >
                        {i.interview_status || "N/A"}
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
                      {/* {filteredCandidate.length > 0 ? (
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
                      )} */}

                      {filteredCandidate.map((item) => (
                        <li
                          key={item.can_id}
                          className="list-group-item"
                          onClick={() => selectCandidate(item)}
                        >
                          {item.can_name}
                        </li>
                      ))}
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
                        filteredJob.map((item) => (
                          <li
                            key={item.job_id}
                            className="list-group-item list-group-item-action"
                            style={{
                              cursor: "pointer",
                              background: "#e6e3e3ff",
                            }}
                            onClick={() => selectJob(item)}
                          >
                            {item.job_title}
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
