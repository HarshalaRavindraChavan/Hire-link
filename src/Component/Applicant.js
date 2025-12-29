import React, { useState, useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "./commenuse/Pagination";

function Applicant() {
  // tital of tab
  useEffect(() => {
    document.title = "Hirelink | Applicant";
  }, []);
  const modalRef = useRef(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

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

  //candidate interview Schdul Code

  // Yup Validation Schema
  const schema = yup.object().shape({
    candidate_id: yup.string().required("Candidate id is required"),
    job_id: yup.string().required("Job Id is required"),
    interviewType: yup.string().required("Interview type is required"),
    interviewDate: yup.string().required("Interview date is required"),
    interviewTime: yup.string().required("Interview time is required"),
    meetingLink: yup.string().when("interviewType", {
      is: "Virtual Interview",
      then: (schema) =>
        schema.required("Meeting link is required").url("Invalid URL"),
      otherwise: (schema) => schema.notRequired(),
    }),
    // interviewer: yup.string().required("Interviewer name is required"),
    status: yup.string().required("Status is required"),
    // createdDate: yup.string().required("Created date is required"),
  });

  // React Hook Form Initialization
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Watch interview type
  const watchInterviewType = watch("interviewType");

  // Submit Handler
  const onSubmit = async (data) => {
    try {
      const payload = {
        itv_candidate_id: data.candidate_id,
        itv_job_id: data.job_id,
        itv_type: data.interviewType,
        itv_date: data.interviewDate,
        itv_meeting_link: data.meetingLink || "",
        itv_time: data.interviewTime,
        itv_status: data.status,
      };

      const res = await axios.post(
        "https://norealtor.in/hirelink_apis/admin/insert/tbl_interview",
        payload
      );

      if (res.data.status) {
        toast.success("Interview scheduled successfully");

        const modal = window.bootstrap.Modal.getInstance(modalRef.current);
        modal.hide();
      } else {
        toast.error("Insert failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (selectedApplicant) {
      reset({
        candidate_id: selectedApplicant.can_id,
        job_id: selectedApplicant.job_id,
        interviewType: "",
        interviewDate: "",
        interviewTime: "",
        meetingLink: "",
        status: "",
      });
    }
  }, [selectedApplicant, reset]);
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
                        <span
                          className="text-primary fw-semibold"
                          style={{ cursor: "pointer" }}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => {
                            setSelectedApplicant(app);
                          }}
                        >
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
                    No Applicant found
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

      <div
        className="modal fade"
        id="exampleModal"
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
    </>
  );
}

export default Applicant;
