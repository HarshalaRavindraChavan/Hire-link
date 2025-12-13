import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Pagination from "./commenuse/Pagination";

function Jobs() {
  // tital of tab
  useState(() => {
    document.title = "Hirelink | Jobs";
  }, []);

  const [search, setSearch] = useState("");
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

  // Validation Schema (NO if/else)
  const validationSchema = Yup.object({
    jobTitle: Yup.string().required("Job Title is required"),
    companyName: Yup.string().required("Company Name is required"),
    jobCategory: Yup.string().required("Job Category is required"),
    applicationsCount: Yup.number()
      .typeError("Applications Count must be a number")
      .required("Applications Count is required"),
    jobType: Yup.string().required("Job Type is required"),
    salaryRange: Yup.string().required("Salary Range is required"),
    status: Yup.string().required("Status is required"),
    postedDate: Yup.string().required("Posted Date is required"),
    location: Yup.string().required("Location is required"),
    experienceRequired: Yup.string().required("Experience is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form Submitted Successfully!");
  };

  return (
    <>
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <div>
          <h3 className="fw-bold mb-3">Jobs</h3>
        </div>
        <div className="ms-auto py-2 py-md-0">
          <a
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-success"
          >
            <i className="fa fa-plus"> </i> Add Jobs
          </a>
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
                <th className="fs-6 fw-bold">Job Detail</th>
                <th className="fs-6 fw-bold">Job By</th>
                <th className="fs-6 fw-bold">Other Detail</th>
                <th className="fs-6 fw-bold">Status</th>
              </tr>
            </thead>

            <tbody>
              {/* Example Row */}
              <tr>
                <td>1</td>
                <td className="text-start fw-bold">
                  {" "}
                  <div className="fw-bold">
                    Title:
                    <div className="dropdown d-inline ms-2">
                      <span
                        className="fw-bold text-primary"
                        role="button"
                        data-bs-toggle="dropdown"
                      >
                        Frontend Developer
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
                            onClick={() => handleDeleteClick()}
                          >
                            <i className="fas fa-trash me-2"></i>Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="fw-bold ">
                    Category:{" "}
                    <span className="text-dark fw-normal">IT / Software</span>
                  </div>
                  <div className="fw-bold ">
                    Type: <span className="text-dark fw-normal">Full-time</span>
                  </div>
                </td>

                <td className="text-start">
                  <div className="fw-bold ">
                    Company Name:{" "}
                    <span className="text-dark fw-normal">Esenceweb IT</span>
                  </div>
                  <div className="fw-bold ">
                    Exp. Required:{" "}
                    <span className="text-dark fw-normal">3 Years</span>
                  </div>
                </td>
                <td className="text-start">
                  <div className="fw-bold ">
                    Posted Date:{" "}
                    <span className="text-dark fw-normal">2025-12-09</span>
                  </div>
                  <div className="fw-bold ">
                    Applications:{" "}
                    <span className="text-dark fw-normal">29</span>
                  </div>
                </td>
                <td className="text-center">
                  <span className="badge bg-success">Active</span>
                </td>
              </tr>
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
                Job Details
              </h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body row">
                {/* Job Title */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Job Title</label>
                  <input
                    type="text"
                    {...register("jobTitle")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Job Title"
                  />
                  <span className="text-danger">
                    {errors.jobTitle?.message}
                  </span>
                </div>

                {/* Company Name */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Company Name</label>
                  <input
                    type="text"
                    {...register("companyName")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Company Name"
                  />
                  <span className="text-danger">
                    {errors.companyName?.message}
                  </span>
                </div>

                {/* Job Category */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Job Category</label>
                  <input
                    type="text"
                    {...register("jobCategory")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Job Category"
                  />
                  <span className="text-danger">
                    {errors.jobCategory?.message}
                  </span>
                </div>

                {/* Applications Count */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Applications Count
                  </label>
                  <input
                    type="number"
                    {...register("applicationsCount")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Applications Count"
                  />
                  <span className="text-danger">
                    {errors.applicationsCount?.message}
                  </span>
                </div>

                {/* Job Type */}
                <div className="col-md-4 mb-2 position-relative">
                  <label className="form-label fw-semibold">Job Type</label>
                  <select
                    {...register("jobType")}
                    className="form-control form-control-md rounded-3"
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                  </select>
                  <span className="text-danger">{errors.jobType?.message}</span>
                </div>

                {/* Salary Range */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Salary Range</label>
                  <input
                    type="text"
                    {...register("salaryRange")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Salary Range"
                  />
                  <span className="text-danger">
                    {errors.salaryRange?.message}
                  </span>
                </div>

                {/* Status */}
                <div className="col-md-4 mb-2 position-relative">
                  <label className="form-label fw-semibold">Status</label>
                  <select
                    {...register("status")}
                    className="form-control form-control-md rounded-3"
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <span className="text-danger">{errors.status?.message}</span>
                </div>

                {/* Posted Date */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Posted Date</label>
                  <input
                    type="date"
                    {...register("postedDate")}
                    className="form-control form-control-md rounded-3"
                  />
                  <span className="text-danger">
                    {errors.postedDate?.message}
                  </span>
                </div>

                {/* Location */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Location</label>
                  <input
                    type="text"
                    {...register("location")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Location"
                  />
                  <span className="text-danger">
                    {errors.location?.message}
                  </span>
                </div>

                {/* Experience Required */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Experience Required
                  </label>
                  <input
                    type="text"
                    {...register("experienceRequired")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Experience Required"
                  />
                  <span className="text-danger">
                    {errors.experienceRequired?.message}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
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

      {/* DELETE CONFIRM MODAL */}
      <ConfirmDelete
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default Jobs;
