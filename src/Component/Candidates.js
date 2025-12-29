import React, { useState, useEffect } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import image from "./logo/hirelink.png";
import Pagination from "./commenuse/Pagination";
import axios from "axios";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

function Candidates() {
  // tital of tab
  useEffect(() => {
    document.title = "Hirelink | Candidates";
  }, []);

  const [search, setSearch] = useState("");
  const [candidates, setCandidates] = useState([]);
  //==================== get All candidate
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(
        "https://norealtor.in/hirelink_apis/admin/getdata/tbl_candidate"
      );

      if (res.data.status === true) {
        setCandidates(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching candidates", error);
    }
  };

  //==================== pagination Code

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
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
        `https://norealtor.in/hirelink_apis/admin/deletedata/tbl_candidate/can_id/${deleteId}`
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

    // location: Yup.string().required("Location / City is required"),

    // experience: Yup.number()
    //   .typeError("Experience must be a number")
    //   .min(0, "Experience cannot be negative")
    //   .max(50, "Invalid experience")
    //   .required("Experience is required"),

    // skill: Yup.string().required("Skills are required"),

    // profilePhoto: Yup.mixed()
    //   .required("Profile photo is required")
    //   .test(
    //     "fileType",
    //     "Only JPG, JPEG, PNG allowed",
    //     (value) =>
    //       value &&
    //       ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type)
    //   ),

    // resume: Yup.mixed()
    //   .required("Resume is required")
    //   .test(
    //     "fileType",
    //     "Only PDF, DOC, DOCX allowed",
    //     (value) =>
    //       value &&
    //       [
    //         "application/pdf",
    //         "application/msword",
    //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //       ].includes(value[0]?.type)
    //   ),

    // registrationDate: Yup.string().required("Registration date is required"),

    // appliedJobsCount: Yup.number()
    //   .typeError("Must be a number")
    //   .min(0, "Cannot be negative")
    //   .required("Applied jobs count is required"),
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
      // can_city: data.location,
      // can_experience: data.experience,
      // can_skil: data.skill,
      // can_added_date: data.registrationDate,
      // can_photo: User.user_aadhar_image,
      // can_resume: User.user_pan_image,
    };

    try {
      const res = await axios.post(
        "https://norealtor.in/hirelink_apis/admin/insert/tbl_candidate",
        payload
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

  return (
    <>
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <div>
          <h3 className="fw-bold mb-3">Candidates</h3>
        </div>
        <div className="ms-auto py-2 py-md-0">
          {/* <a href="#" className="btn btn-label-info btn-round me-2">
              Manage
            </a> */}
          <a
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-success"
          >
            <i className="fa fa-plus"></i> Add Candidates
          </a>
        </div>
      </div>

      <div className="card shadow-sm p-3 border">
        {/* 🔍 FILTER ROW */}
        <div className="row g-2 align-items-center mb-3">
          {/* Experience */}
          <div className="col-12 col-md-2">
            <select className="form-select form-control">
              <option value="">Select Experien</option>
              <option>0–1 Years</option>
              <option>1–3 Years</option>
              <option>3–5 Years</option>
              <option>5+ Years</option>
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
              {records.length > 0 ? (
                records.map((candidate, index) => (
                  <tr key={candidate.can_id}>
                    <td className="text-center fw-bold">
                      {firstIndex + index + 1}
                    </td>

                    {/* Candidate Info */}
                    <td className="text-start w-auto">
                      <div className="fw-bold">
                        Name:
                        <div className="dropdown d-inline ms-2">
                          <span
                            className="fw-bold text-primary"
                            role="button"
                            data-bs-toggle="dropdown"
                          >
                            {candidate.can_name}
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
                                onClick={() =>
                                  handleDeleteClick(candidate.can_id)
                                }
                              >
                                <i className="fas fa-trash me-2"></i>Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="fw-bold">
                        Email:{" "}
                        <span className="text-dark fw-normal">
                          {candidate.can_email}
                        </span>
                      </div>

                      <div className="fw-bold">
                        Mobile No:{" "}
                        <span className="text-dark fw-normal">
                          {candidate.can_mobile}
                        </span>
                      </div>

                      <div className="fw-bold">
                        Registar Date:{" "}
                        <span className="text-dark fw-normal">
                          {candidate.register_date}
                        </span>
                      </div>
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
                          {candidate.can_experience} Year
                        </span>
                      </div>
                      <div className="fw-bold">
                        Skills:{" "}
                        <span className="text-dark fw-normal">
                          {candidate.can_skill}
                        </span>
                      </div>
                    </td>
                    <td></td>
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
