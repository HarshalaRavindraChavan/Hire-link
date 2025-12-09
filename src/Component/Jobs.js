import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function Jobs() {
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
          {/* <a href="#" className="btn btn-label-info btn-round me-2">
            Manage
          </a> */}
          <a
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-primary"
          >
            <i className="fa fa-plus"> </i> Add Job
          </a>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover table-responsive">
              <thead className="text-center align-middle">
                <tr>
                  <th>sr_no</th>
                  <th className="fw-bold fs-10">job_title</th>
                  <th className="fw-bold fs-10">company_name</th>
                  <th className="fw-bold fs-10">job_category</th>
                  <th className="fw-bold fs-10">job_type</th>
                  <th className="fw-bold fs-10">location</th>
                  <th className="fw-bold fs-10">salary_range</th>
                  <th className="fw-bold fs-10">experience_required</th>
                  <th className="fw-bold fs-10">posted_date</th>
                  <th className="fw-bold fs-10">applications_count</th>
                  <th className="fw-bold fs-10">status</th>
                </tr>
              </thead>

              <tbody className="text-center align-middle">
                <tr>
                  <td>1</td>
                  <td>Capgemini</td>
                  <td>Google</td>
                  <td>IT & Software</td>
                  <td>Full-Time</td>
                  <td>Pune</td>
                  <td>50,000 - 80,000</td>
                  <td>2 Years</td>
                  <td>12 Dec 2025</td>
                  <td>25</td>
                  <td>
                    <span className="badge bg-success">active</span>
                  </td>
                </tr>

                <tr>
                  <td>2</td>
                  <td>Wipro</td>
                  <td>Human Resources</td>
                  <td>IT & Software</td>
                  <td>Full-Time</td>
                  <td>Mumbai</td>
                  <td>30,000 - 80,000</td>
                  <td>3 Years</td>
                  <td>10 Dec 2025</td>
                  <td>30</td>
                  <td>
                    <span className="badge bg-warning">pending</span>
                  </td>
                </tr>
              </tbody>
            </table>

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
          </div>
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
            <div className="modal-header bg-primary text-white rounded-top-4">
              <h5 className="modal-title fw-bold">Job Details</h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body row">
                {/* Job Title */}
                <div className="col-md-6 mb-2">
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
                <div className="col-md-6 mb-2">
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
                <div className="col-md-6 mb-2">
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
                <div className="col-md-6 mb-2">
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
                <div className="col-md-6 mb-2 position-relative">
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
                <div className="col-md-6 mb-2">
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
                <div className="col-md-6 mb-2 position-relative">
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
                <div className="col-md-6 mb-2">
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
                <div className="col-md-6 mb-2">
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
                <div className="col-md-6 mb-2">
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
                  className="btn btn-outline-secondary rounded-3"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>

                <button type="submit" className="btn btn-primary px-4 ms-auto">
                  Save User
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
