import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import image from "./logo/no image.jpg";
import Pagination from "./commenuse/Pagination";
import axios from "axios";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/constants";
import TableSkeleton from "./commenuse/TableSkeleton";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";

function Candidates() {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const isAdmin = Number(auth?.role) === 1;

  const [search, setSearch] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // const [search, setSearch] = useState("");
  const [experience, setExperience] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const paymentUser = JSON.parse(localStorage.getItem("paymentUser") || "{}");
    const paymentDone = localStorage.getItem("paymentDone");

    if (
      paymentDone === "true" &&
      paymentUser?.role === "resume_download" &&
      paymentUser?.resumeFile
    ) {
      const fileUrl = `${BASE_URL}hirelink_apis/Uploads/${paymentUser.resumeFile}`;

      // ✅ Direct download
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", paymentUser.resumeFile);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // ✅ Clear payment flags
      localStorage.removeItem("paymentDone");
      localStorage.removeItem("paymentUser");
    }
  }, []);

  //==================== get All candidate
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}hirelink_apis/admin/getdata/tbl_candidate`,
      );

      if (res.data.status === true) {
        setCandidates(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching candidates", error);
    } finally {
      setLoading(false);
    }
  };

  //==================== pagination Code

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 100;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = candidates.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(candidates.length / recordsPerPage);

  //============================== Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Open Confirm Delete Modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // DELETE CONFIRM
  const confirmDelete = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}hirelink_apis/admin/deletedata/tbl_candidate/can_id/${deleteId}`,
      );

      if (res.data.status === true) {
        setShowDeleteModal(false);
        setDeleteId(null);

        fetchCandidates();
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(3, "Minimum 3 characters required")
      .required("Full name is required"),

    email: Yup.string()
      .email("Enter valid email address")
      .required("Email is required"),

    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid 10-digit mobile number")
      .required("Mobile number is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const payload = {
      can_name: data.fullname,
      can_email: data.email,
      can_mobile: data.mobile,
      can_score: data.can_score,
      // can_city: data.location,
      // can_experience: data.experience,
      // can_skil: data.skill,
      // can_added_date: data.registrationDate,
      // can_photo: User.user_aadhar_image,
      // can_resume: User.user_pan_image,
    };

    try {
      const res = await axios.post(
        `${BASE_URL}hirelink_apis/admin/insert/tbl_candidate`,
        payload,
      );

      if (res.data.status) {
        toast.success("Candidate added successfully");

        reset(); // form reset
        fetchCandidates(); // refresh table

        const modal = document.getElementById("exampleModal");
        const bsModal =
          window.bootstrap.Modal.getInstance(modal) ||
          new window.bootstrap.Modal(modal);

        bsModal.hide(); // close modal
      } else {
        toast.error("Candidate not added");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  //Status Update Function
  const handleCandidateStatusChange = async (canId, newStatus) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}hirelink_apis/admin/updatedata/tbl_candidate/can_id/${canId}`,
        {
          can_status: newStatus,
        },
      );

      if (res.data?.status === true) {
        toast.success(`Status updated to ${newStatus} ✅`);

        // ✅ instant UI update
        setCandidates((prev) =>
          prev.map((c) =>
            c.can_id === canId ? { ...c, can_status: newStatus } : c,
          ),
        );
      } else {
        toast.error("Status update failed ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  // mobile number star code
  const maskMobile = (mobile) => {
    if (!mobile) return "";
    return "******" + mobile.slice(-4);
  };

  // email hide code
  const maskEmail = (email) => {
    if (!email) return "";

    const [name, domain] = email.split("@");
    if (!domain) return email;

    const maskedName =
      name.length <= 2
        ? name[0] + "*"
        : name.slice(0, 2) + "*".repeat(name.length - 2);

    return `${maskedName}@${domain}`;
  };

  // Filter Code
  const filteredRecords = records.filter((candidate) => {
    const searchValue = search.toLowerCase();

    // 🔍 SEARCH FILTER
    const matchesSearch =
      candidate?.can_name?.toLowerCase().includes(searchValue) ||
      candidate?.can_email?.toLowerCase().includes(searchValue) ||
      candidate?.can_mobile?.includes(search) ||
      candidate?.can_skill?.toLowerCase().includes(searchValue);

    // 🎯 EXPERIENCE FILTER
    const exp = Number(candidate?.can_experience || 0);
    let matchesExperience = true;

    if (experience === "0-1") matchesExperience = exp >= 0 && exp <= 1;
    if (experience === "1-3") matchesExperience = exp >= 1 && exp <= 3;
    if (experience === "3-5") matchesExperience = exp >= 3 && exp <= 5;
    if (experience === "5+") matchesExperience = exp >= 5;

    // 📅 DATE FILTER
    const regDate = new Date(candidate?.can_added_date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    let matchesDate = true;
    if (from && to) matchesDate = regDate >= from && regDate <= to;
    else if (from) matchesDate = regDate >= from;
    else if (to) matchesDate = regDate <= to;

    return matchesSearch && matchesExperience && matchesDate;
  });

  const handleResumeDownload = async (candidate) => {
    try {
      const employer = JSON.parse(localStorage.getItem("employer") || "{}");

      if (!employer?.emp_email) {
        toast.error("Please login as Employer first!");
        navigate("/signin");
        return;
      }

      if (!candidate?.can_id || !candidate?.can_resume) {
        toast.error("Resume not available!");
        return;
      }

      // ✅ Check payment done for this employer + this candidate
      const checkRes = await axios.post(
        `${BASE_URL}hirelink_apis/payment/check-resume-payment`,
        {
          email: employer.emp_email,
          candidate_id: candidate.can_id,
        },
      );

      // ✅ If paid => download resume now
      if (checkRes.data?.status === true && checkRes.data?.paid === true) {
        const fileUrl = `${BASE_URL}hirelink_apis/Uploads/${candidate.can_resume}`;

        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", candidate.can_resume);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      // ❌ Not paid => redirect to payment page
      toast.error("Pay ₹60 to download this resume");

      localStorage.setItem(
        "paymentUser",
        JSON.stringify({
          email: employer.emp_email,
          name: employer.emp_name,
          mobile: employer.emp_mobile,
          role: "resume_download",
          for: "Resume Download",
          candidate_id: candidate.can_id,
          resumeFile: candidate.can_resume,
          returnTo: "/candidate",
        }),
      );

      navigate("/payment");
    } catch (err) {
      console.log(err);
      toast.error("Payment check failed!");
    }
  };

  return (
    <>
      <SEO
        title={seoConfig.a_candidates.title}
        description={seoConfig.a_candidates.description}
      />
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <div>
          <h3 className="fw-bold mb-3">Candidates</h3>
        </div>
        <div className="ms-auto py-2 py-md-0">
          {/* <a href="#" className="btn btn-label-info btn-round me-2">
              Manage
            </a> */}
          {/* <a
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-success"
          >
            <i className="fa fa-plus"></i> Add Candidates
          </a> */}
        </div>
      </div>

      <div className="card shadow-sm p-3 border">
        {/* 🔍 FILTER ROW */}
        <div className="row g-2 align-items-center mb-3">
          {/* Experience */}
          <div className="col-12 col-md-2">
            <select
              className="form-select form-control"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option value="">Select Experience</option>
              <option value="0-1">0–1 Years</option>
              <option value="1-3">1–3 Years</option>
              <option value="3-5">3–5 Years</option>
              <option value="5+">5+ Years</option>
            </select>
          </div>

          {/* From Date */}
          <div className="col-6 col-md-2">
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          {/* To Date */}
          <div className="col-6 col-md-2">
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          {/* Submit + Reset */}
          <div className="col-12 col-md-3 d-flex justify-content-md-start justify-content-between">
            <button className="btn px-4 me-2 btn-success">Submit</button>

            <button
              className="btn btn-light border px-3"
              onClick={() => {
                setSearch("");
                setExperience("");
                setFromDate("");
                setToDate("");
              }}
            >
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
          <table className="table table-bordered align-middle">
            <thead className="table-light text-center">
              <tr className="text-center">
                <th className="fs-6 fw-bold">ID</th>
                <th className="fs-6 fw-bold">Candidate Details</th>
                <th className="fs-6 fw-bold">Profile Photo</th>
                <th className="fs-6 fw-bold">Experience</th>
                <th className="fs-6 fw-bold">Resume</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <TableSkeleton rows={6} columns={5} />
              ) : filteredRecords.length > 0 ? (
                filteredRecords.map((candidate, index) => (
                  <tr key={candidate.can_id}>
                    <td className="text-center fw-bold">
                      {firstIndex + index + 1}
                    </td>

                    {/* Candidate Info */}
                    <td className="text-start w-auto">
                      <div className="fw-bold">
                        Name:
                        <div className="dropdown d-inline ms-2">
                          {/* <span
                            className="fw-bold text-primary"
                            role="button"
                            data-bs-toggle="dropdown"
                          > */}
                          {candidate.can_name}
                          {/* </span> */}
                          {/* <ul className="dropdown-menu shadow">
                            <li>
                              <button className="dropdown-item">
                                <i className="fas fa-edit me-2"></i>Edit
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() =>
                                  handleDeleteClick(candidate.can_id)
                                }
                              >
                                <i className="fas fa-trash me-2"></i>Delete
                              </button>
                            </li>
                          </ul> */}
                        </div>
                      </div>

                      <div className="fw-bold">
                        Email:{" "}
                        <span className="text-dark fw-normal">
                          {maskEmail(candidate.can_email)}
                        </span>
                      </div>

                      <div className="fw-bold">
                        Mobile No:{" "}
                        <span className="text-dark fw-normal">
                          {maskMobile(candidate.can_mobile)}
                        </span>
                      </div>

                      <div className="fw-bold">
                        Score:{" "}
                        <span className="text-dark fw-normal">
                          {candidate.can_score}/1000
                        </span>
                      </div>

                      {/* <div className="fw-bold">
                        Registar Date:{" "}
                        <span className="text-dark fw-normal">
                          {candidate.register_date}
                        </span>
                      </div> */}
                    </td>

                    {/* Profile Image */}
                    <td className="text-center">
                      <div className="avatar avatar-xl">
                        <img
                          src={candidate.profile_photo || image}
                          alt="No Image"
                          className="avatar-img rounded-circle"
                        />
                      </div>
                    </td>

                    {/* Experience */}
                    <td className="text-start">
                      <div className="fw-bold">
                        Experience:{" "}
                        <span className="text-dark fw-normal">
                          {candidate.can_experience || "N/A"} Year
                        </span>
                      </div>
                      <div className="fw-bold">
                        Education Type:{" "}
                        <span className="text-dark fw-normal">
                          {candidate.can_education_type || "N/A"}
                        </span>
                      </div>
                      <div className="fw-bold">
                        Education:{" "}
                        <span className="text-dark fw-normal">
                          {candidate.can_education_detail || "N/A"}
                        </span>
                      </div>
                      <div className="fw-bold">
                        Skills:{" "}
                        <span className="text-dark fw-normal">
                          {candidate.can_skill || "N/A"}
                        </span>
                      </div>
                      <div className="fw-bold">
                        Status:{" "}
                        {isAdmin ? (
                          <select
                            className="form-select form-select-sm d-inline w-auto ms-2"
                            value={candidate.can_status || "Inactive"}
                            onChange={(e) =>
                              handleCandidateStatusChange(
                                candidate.can_id,
                                e.target.value,
                              )
                            }
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        ) : (
                          <span
                            className={`badge ms-2 ${
                              candidate.can_status === "Active"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {candidate.can_status || "N/A"}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="text-center">
                      {candidate.can_resume ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success"
                          onClick={() => handleResumeDownload(candidate)}
                        >
                          <i className="fas fa-download me-1"></i>
                          Download
                        </button>
                      ) : (
                        <span className="text-muted">No Resume</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No Candidates Found
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

      {/* DELETE CONFIRM MODAL */}
      <ConfirmDelete
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* ADD FORM MODAL */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content shadow-lg border-0 rounded-4">
            <div className="modal-header text-white rounded-top-4 bg-success">
              <h5 className="modal-title fw-bold" style={{ color: "white" }}>
                Candidate Details
              </h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body row">
                {/* Full Name */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter full name"
                    {...register("fullname")}
                  />
                  {errors.fullname && (
                    <span className="text-danger">
                      {errors.fullname.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email address"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email.message}</span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    className="form-control"
                    placeholder="Enter 10-digit mobile number"
                    {...register("mobile")}
                  />
                  {errors.mobile && (
                    <span className="text-danger">{errors.mobile.message}</span>
                  )}
                </div>

                {/* Location / City */}
                {/* <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Location / City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter city or location"
                    {...register("location")}
                  />
                  {errors.location && (
                    <span className="text-danger">
                      {errors.location.message}
                    </span>
                  )}
                </div> */}

                {/* Experience */}
                {/* <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Experience (Years)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter experience in years"
                    {...register("experience")}
                  />
                  {errors.experience && (
                    <span className="text-danger">
                      {errors.experience.message}
                    </span>
                  )}
                </div> */}

                {/* Skills */}
                {/* <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Skills</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Eg: React, Node, PHP"
                    {...register("skill")}
                  />
                  {errors.skill && (
                    <span className="text-danger">{errors.skill.message}</span>
                  )}
                </div> */}

                {/* Profile Photo */}
                {/* <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    {...register("profilePhoto")}
                  />
                  {errors.profilePhoto && (
                    <span className="text-danger">
                      {errors.profilePhoto.message}
                    </span>
                  )}
                </div> */}

                {/* Resume */}
                {/* <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Upload Resume
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".pdf,.doc,.docx"
                    {...register("resume")}
                  />
                  {errors.resume && (
                    <span className="text-danger">{errors.resume.message}</span>
                  )}
                </div> */}

                {/* Registration Date */}
                {/* <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Registration Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    {...register("registrationDate")}
                  />
                  {errors.registrationDate && (
                    <span className="text-danger">
                      {errors.registrationDate.message}
                    </span>
                  )}
                </div> */}

                {/* Applied Jobs Count */}
                {/* <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Applied Jobs Count
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter applied jobs count"
                    {...register("appliedJobsCount")}
                  />
                  {errors.appliedJobsCount && (
                    <span className="text-danger">
                      {errors.appliedJobsCount.message}
                    </span>
                  )}
                </div> */}
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

export default Candidates;
