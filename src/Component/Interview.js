import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";

function Interview() {
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
    candidateName: "",
    jobTitle: "",
    companyName: "",
    interviewType: "",
    interviewDate: "",
    interviewTime: "",
    interviewer: "",
    meetingLink: "",
    status: "",
    phone: "",
    createdDate: "",
  });

  const [errors, setErrors] = useState({});

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict phone input to numbers only
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return; // block characters
    }

    setFormData({ ...formData, [name]: value });
  };

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    let newErrors = {};

    if (!formData.candidateName.trim())
      newErrors.candidateName = "Candidate Name is required";

    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job Title is required";

    if (!formData.companyName.trim())
      newErrors.companyName = "Company Name is required";

    if (!formData.interviewType)
      newErrors.interviewType = "Interview Type is required";

    if (!formData.interviewDate)
      newErrors.interviewDate = "Interview Date is required";

    if (!formData.interviewTime)
      newErrors.interviewTime = "Interview Time is required";

    if (!formData.interviewer.trim())
      newErrors.interviewer = "Interviewer Name is required";

    if (!formData.meetingLink.trim())
      newErrors.meetingLink = "Meeting Link / Address is required";

    if (!formData.status) newErrors.status = "Status is required";

    // Phone Validation
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be exactly 10 digits";

    if (!formData.createdDate)
      newErrors.createdDate = "Created Date is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Form submitted successfully!");
      console.log("SUBMITTED DATA:", formData);
    }
  };

  const generateMeetingLink = () => {
    const uniqueId = Math.random().toString(36).substring(2, 10);
    return `https://meet.yourcompany.com/${uniqueId}`;
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
            <i className="fa fa-plus"> </i> Add Interview
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
              <h5 className="modal-title fw-bold">Interview Details</h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body row">
                {/* Candidate Name */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Candidate Name
                  </label>
                  <input
                    type="text"
                    name="candidateName"
                    value={formData.candidateName}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Candidate Name"
                  />
                  {errors.candidateName && (
                    <span className="text-danger">{errors.candidateName}</span>
                  )}
                </div>

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

                {/* Interview Type */}
                <div className="col-md-6 mb-2 position-relative">
                  <label className="form-label fw-semibold">
                    Interview Type
                  </label>
                  <select
                    name="interviewType"
                    value={formData.interviewType}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    style={{
                      appearance: "none",
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 10px center",
                      backgroundSize: "16px",
                      paddingRight: "35px",
                    }}
                  >
                    <option value="">Select Interview Type</option>
                    <option>Online</option>
                    <option>Offline</option>
                    <option>Telephonic</option>
                    <option>HR Round</option>
                    <option>Technical Round</option>
                  </select>
                  {errors.interviewType && (
                    <span className="text-danger">{errors.interviewType}</span>
                  )}
                </div>

                {/* Interview Date */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Interview Date
                  </label>
                  <input
                    type="date"
                    name="interviewDate"
                    value={formData.interviewDate}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                  />
                  {errors.interviewDate && (
                    <span className="text-danger">{errors.interviewDate}</span>
                  )}
                </div>

                {/* Interview Time */}
                <div className="col-md-6 mb-2 position-relative">
                  <label className="form-label fw-semibold">
                    Interview Time
                  </label>
                  <select
                    name="interviewTime"
                    value={formData.interviewTime}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                  >
                    <option value="">Select Interview Time</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                  </select>
                  {errors.interviewTime && (
                    <span className="text-danger">{errors.interviewTime}</span>
                  )}
                </div>

                {/* Interviewer */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Assigned Interviewer
                  </label>
                  <input
                    type="text"
                    name="interviewer"
                    value={formData.interviewer}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Interviewer Name"
                  />
                  {errors.interviewer && (
                    <span className="text-danger">{errors.interviewer}</span>
                  )}
                </div>

                {/* Meeting Address */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Meeting Link / Address
                  </label>

                  <div className="input-group">
                    <input
                      type="text"
                      name="meetingLink"
                      value={formData.meetingLink}
                      onChange={handleChange}
                      className="form-control form-control-md rounded-3"
                      placeholder="Enter Meeting Link / Address"
                    />

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          meetingLink: generateMeetingLink(),
                        })
                      }
                    >
                      Generate
                    </button>
                  </div>

                  {errors.meetingLink && (
                    <span className="text-danger">{errors.meetingLink}</span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Phone Number"
                  />
                  {errors.phone && (
                    <span className="text-danger">{errors.phone}</span>
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
                  >
                    <option value="">Select Status</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Closed</option>
                  </select>
                  {errors.status && (
                    <span className="text-danger">{errors.status}</span>
                  )}
                </div>

                {/* Created Date */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Created Date</label>
                  <input
                    type="date"
                    name="createdDate"
                    value={formData.createdDate}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                  />
                  {errors.createdDate && (
                    <span className="text-danger">{errors.createdDate}</span>
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

export default Interview;
