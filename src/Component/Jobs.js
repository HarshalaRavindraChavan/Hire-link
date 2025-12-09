import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";

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

  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobCategory: "",
    applicationsCount: "",
    location: "",
    salaryRange: "",
    experienceRequired: "",
    postedDate: "",
    jobType: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form
  const validate = () => {
    let tempErrors = {};

    if (!formData.jobTitle) tempErrors.jobTitle = "Job Title is required";
    if (!formData.companyName)
      tempErrors.companyName = "Company Name is required";
    if (!formData.jobCategory)
      tempErrors.jobCategory = "Job Category is required";
    if (!formData.applicationsCount)
      tempErrors.applicationsCount = "Applications Count is required";
    else if (isNaN(formData.applicationsCount))
      tempErrors.applicationsCount = "Must be a number";
    if (!formData.location) tempErrors.location = "Location is required";
    if (!formData.salaryRange)
      tempErrors.salaryRange = "Salary Range is required";
    if (!formData.experienceRequired)
      tempErrors.experienceRequired = "Experience Required is required";
    if (!formData.postedDate) tempErrors.postedDate = "Posted Date is required";
    if (!formData.jobType) tempErrors.jobType = "Job Type is required";
    if (!formData.status) tempErrors.status = "Status is required";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Data:", formData);
      alert("Form submitted successfully!");
      // Reset form if needed
      // setFormData({...initial state});
    }
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
            <table className="table table-bordered">
              <thead>
                <tr className="text-center">
                  <th className="fw-bold fs-6">Detail</th>
                  <th className="fw-bold fs-6">Contact</th>
                  <th className="fw-bold fs-6">Address</th>
                  <th className="fw-bold fs-6">Other Detail</th>
                </tr>
              </thead>

              <tbody>
                {records.length > 0 ? (
                  records.map((item) => (
                    <tr key={item.id} className="align-middle">
                      <td>
                        <div className="dropdown d-inline-block ms-1">
                          <span
                            className="fw-bold text-primary"
                            role="button"
                            data-bs-toggle="dropdown"
                            style={{ cursor: "pointer" }}
                          >
                            {item.name}
                          </span>

                          <ul className="dropdown-menu shadow">
                            <li>
                              <button className="dropdown-item">
                                <i className="fas fa-edit me-2"> </i> Edit
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => handleDeleteClick(item.id)}
                              >
                                <i className="fas fa-trash me-2"> </i> Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                        <br />
                        <b>Business:</b> {item.business} <br />
                        <b>Category:</b> {item.category}
                      </td>

                      <td>
                        <b>Email:</b> {item.email} <br />
                        <b>Mobile:</b> {item.mobile}
                      </td>

                      <td>
                        <b>Location:</b> {item.location} <br />
                        <b>City:</b> {item.city} <br />
                        <b>State:</b> {item.state}
                      </td>

                      <td>
                        <b>Website:</b> {item.website} <br />
                        <b>Facebook:</b> {item.facebook} <br />
                        <b>Linkedin:</b> {item.linkedin} <br />
                        <b>Instagram:</b> {item.instagram}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-3">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* PAGINATION */}
            <nav className="d-flex justify-content-end mt-3">
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
            </nav>
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

            <form onSubmit={handleSubmit}>
              <div className="modal-body row">
                {/* Job Title */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Job Title"
                  />
                  {errors.jobTitle && (
                    <span className="text-danger">{errors.jobTitle}</span>
                  )}
                </div>

                {/* Company Name */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Company Name"
                  />
                  {errors.companyName && (
                    <span className="text-danger">{errors.companyName}</span>
                  )}
                </div>

                {/* Job Category */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Job Category</label>
                  <input
                    type="text"
                    name="jobCategory"
                    value={formData.jobCategory}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Job Category"
                  />
                  {errors.jobCategory && (
                    <span className="text-danger">{errors.jobCategory}</span>
                  )}
                </div>

                {/* Applications Count */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Applications Count
                  </label>
                  <input
                    type="number"
                    name="applicationsCount"
                    value={formData.applicationsCount}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Applications Count"
                  />
                  {errors.applicationsCount && (
                    <span className="text-danger">
                      {errors.applicationsCount}
                    </span>
                  )}
                </div>

                <div className="col-md-6 mb-2 position-relative">
                  <label className="form-label fw-semibold">Job Type</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    style={{
                      appearance: "none",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 10px center",
                      backgroundSize: "16px",
                      paddingRight: "35px",
                    }}
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                  </select>
                  {errors.jobType && (
                    <span className="text-danger">{errors.jobType}</span>
                  )}
                </div>

                {/* Salary Range */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Salary Range</label>
                  <input
                    type="text"
                    name="salaryRange"
                    value={formData.salaryRange}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Salary Range"
                  />
                  {errors.salaryRange && (
                    <span className="text-danger">{errors.salaryRange}</span>
                  )}
                </div>

                {/* Status */}
                <div className="col-md-6 mb-2 position-relative">
                  <label className="form-label fw-semibold">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    style={{
                      appearance: "none",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 10px center",
                      backgroundSize: "16px",
                      paddingRight: "35px",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Closed">Closed</option>
                  </select>
                  {errors.status && (
                    <span className="text-danger">{errors.status}</span>
                  )}
                </div>

                {/* Posted Date */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Posted Date</label>
                  <input
                    type="date"
                    name="postedDate"
                    value={formData.postedDate}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                  />
                  {errors.postedDate && (
                    <span className="text-danger">{errors.postedDate}</span>
                  )}
                </div>

                {/* Location */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Location"
                  />
                  {errors.location && (
                    <span className="text-danger">{errors.location}</span>
                  )}
                </div>

                {/* Experience Required */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Experience Required
                  </label>
                  <input
                    type="text"
                    name="experienceRequired"
                    value={formData.experienceRequired}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Experience Required"
                  />
                  {errors.experienceRequired && (
                    <span className="text-danger">
                      {errors.experienceRequired}
                    </span>
                  )}
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
