import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";

function Candidates() {
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
    fullName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    skills: "",
    profilePhoto: null,
    resume: null,
    registrationDate: "",
    appliedJobsCount: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "phone") {
    // allow only numbers
    const onlyNums = value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, [name]: onlyNums }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.fullName.trim())
      tempErrors.fullName = "Full Name is required.";
    if (!formData.email.trim()) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is invalid.";

    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone Number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = "Phone Number must be exactly 10 digits.";
    }

    if (!formData.location.trim())
      tempErrors.location = "Location is required.";
    if (!formData.experience.trim())
      tempErrors.experience = "Experience is required.";
    else if (!/^\d+$/.test(formData.experience))
      tempErrors.experience = "Experience must be a number.";

    if (!formData.skills.trim()) tempErrors.skills = "Skills are required.";

    if (!formData.profilePhoto)
      tempErrors.profilePhoto = "Profile photo is required.";

    if (!formData.resume) tempErrors.resume = "Resume is required.";

    if (!formData.registrationDate)
      tempErrors.registrationDate = "Registration date is required.";

    if (!formData.appliedJobsCount)
      tempErrors.appliedJobsCount = "Applied Jobs Count is required.";
    else if (!/^\d+$/.test(formData.appliedJobsCount))
      tempErrors.appliedJobsCount = "Must be a number.";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted successfully", formData);
      // Submit the form data to backend here
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
            className="btn btn-primary btn-round"
          >
            <i className="fa fa-plus"></i> Add
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
                    <tr key={item.id}>
                      <td>
                        <b>Name:</b> {item.name} <br />
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
            <div className="modal-header bg-primary text-white rounded-top-4">
              <h5 className="modal-title fw-bold">Candidate Details</h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body row">
                {/* Full Name */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Full Name"
                  />
                  {errors.fullName && (
                    <span className="text-danger">{errors.fullName}</span>
                  )}
                </div>

                {/* Email */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Email Address"
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
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
                    maxLength={10} // allow max 10 digits
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Phone Number"
                  />
                  {errors.phone && (
                    <span className="text-danger">{errors.phone}</span>
                  )}
                </div>

                {/* Location / City */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Location / City
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter City / Location"
                  />
                  {errors.location && (
                    <span className="text-danger">{errors.location}</span>
                  )}
                </div>

                {/* Experience */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Experience (Years)
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Years of Experience"
                  />
                  {errors.experience && (
                    <span className="text-danger">{errors.experience}</span>
                  )}
                </div>

                {/* Skills */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Your Skills"
                  />
                  {errors.skills && (
                    <span className="text-danger">{errors.skills}</span>
                  )}
                </div>

                {/* Profile Photo */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    name="profilePhoto"
                    onChange={handleChange}
                    accept="image/*"
                    className="form-control form-control-md rounded-3"
                  />
                  {errors.profilePhoto && (
                    <span className="text-danger">{errors.profilePhoto}</span>
                  )}
                </div>

                {/* Resume */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Upload Resume
                  </label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx"
                    className="form-control form-control-md rounded-3"
                  />
                  {errors.resume && (
                    <span className="text-danger">{errors.resume}</span>
                  )}
                </div>

                {/* Registration Date */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Registration Date
                  </label>
                  <input
                    type="date"
                    name="registrationDate"
                    value={formData.registrationDate}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                  />
                  {errors.registrationDate && (
                    <span className="text-danger">
                      {errors.registrationDate}
                    </span>
                  )}
                </div>

                {/* Applied Jobs Count */}
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Applied Jobs Count
                  </label>
                  <input
                    type="number"
                    name="appliedJobsCount"
                    value={formData.appliedJobsCount}
                    onChange={handleChange}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Number of Applied Jobs"
                  />
                  {errors.appliedJobsCount && (
                    <span className="text-danger">
                      {errors.appliedJobsCount}
                    </span>
                  )}
                </div>
              </div>

              <div className="modal-footer bg-light rounded-bottom-4">
                <button
                  type="submit"
                  className="btn btn-primary px-4 rounded-3"
                >
                  Save Changes
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
