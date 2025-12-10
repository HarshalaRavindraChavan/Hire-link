import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import image from "./logo/hirelink.png";
import Pagination from "./commenuse/Pagination";

function Candidates() {
  // tital of tab
  useState(() => {
    document.title = "Candidates Hirelink ";
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
            className="btn btn-success"
          >
            <i className="fa fa-plus"></i> Add Candidates
          </a>
        </div>
      </div>

      <div className="card shadow-sm p-3">
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
              {/* Example Row (same style as your screenshot) */}
              <tr>
                <td className="text-center fw-bold">1</td>

                {/* Candidate Info */}
                <td className=" text-start w-auto">
                  <div className="fw-bold">
                    Name:
                    <div className="dropdown d-inline ms-2">
                      <span
                        className="fw-bold text-primary"
                        role="button"
                        data-bs-toggle="dropdown"
                      >
                        Harshal Mahajan
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

                  <div className="fw-bold">
                    Email:{"  "}
                    <span className="text-dark fw-normal">
                      harshal@gmail.com
                    </span>
                  </div>
                  <div className="fw-bold">
                    Mobile No:{"  "}
                    <span className="text-dark fw-normal">9999999999</span>
                  </div>
                  <div className="fw-bold">
                    Registar Date:{"  "}
                    <span className="text-dark fw-normal">12/10/2025</span>
                  </div>
                </td>

                {/* Profile Image */}
                <td className="text-center">
                  <div className="avatar avatar-xl">
                    <img
                      src={image}
                      alt="No Image"
                      className="avatar-img rounded-circle"
                    />
                  </div>
                </td>

                {/* Experience */}
                <td className="text-start">
                  <div className="fw-bold">
                    Experience:{"  "}
                    <span className="text-dark fw-normal">1 Year</span>
                  </div>
                  <div className="fw-bold">
                    Skills:{"  "}
                    <span className="text-dark fw-normal">Php,React.js,</span>
                  </div>
                  <div className="fw-bold">
                    Applied Jobs:{"  "}
                    <span className="text-dark fw-normal">5</span>
                  </div>
                </td>

                {/* Resume Button */}
                <td className="text-center">
                  <a className="btn btn-sm  px-3 w-100 btn-success" href="#">
                    View / Download
                  </a>
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
