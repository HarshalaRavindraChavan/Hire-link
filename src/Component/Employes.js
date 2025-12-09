import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
// import Pagination from "./commenuse/Pagination";

function Employes() {
  const [users, setUsers] = useState([
    {
      id: 1,
      fullname: "Harshal Mahajan",
      email: "harshal1@gmail.com",
      mobile: "9876543201",
      companyname: "HireLink Pvt Ltd",
      Category: "Percentage",
      password: "Harshal@123",
      location: "Main Road",
      city: "Mumbai",
      state: "Maharashtra",
      website: "https://hirelink.in",
      linkedin: "https://linkedin.com/in/harshal",
      facebook: "https://facebook.com/harshal",
      instagram: "https://instagram.com/harshal",
      youtube: "https://youtube.com/harshal",
    },
  ]);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    companyname: "",
    Category: "",
    password: "",
    location: "",
    city: "",
    state: "",
    website: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddUserr = (e) => {
    e.preventDefault();

    const newUser = { id: Date.now(), ...formData };
    setUsers([...users, newUser]);

    setFormData({
      fullname: "",
      email: "",
      mobile: "",
      companyname: "",
      Category: "",
      password: "",
      location: "",
      city: "",
      state: "",
      website: "",
      linkedin: "",
      facebook: "",
      instagram: "",
      youtube: "",
    });

    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("exampleModal")
    );
    modal.hide();
  };
  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(users.length / recordsPerPage);

  // DELETE
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

  const [formDataa, setFormDataa] = useState({
    fullname: "",
    email: "",
    mobile: "",
    companyname: "",
    Category: "",
    password: "",
    location: "",
    city: "",
    state: "",
    website: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChangee = (e) => {
    setFormData({ ...formDataa, [e.target.name]: e.target.value });
  };

  // URL Validator
  const isValidUrl = (url) => {
    if (!url) return true; // optional fields
    const pattern = /^(https?:\/\/)?([\w\d\-]+\.)+[\w]{2,}(\/.*)?$/;
    return pattern.test(url);
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};

    if (!formDataa.fullname.trim())
      newErrors.fullname = "Full Name is required";

    if (!formDataa.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formDataa.email))
      newErrors.email = "Enter a valid email";

    if (!formDataa.mobile.trim())
      newErrors.mobile = "Mobile number is required";
    else if (!/^[0-9]{10}$/.test(formDataa.mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number";

    if (!formDataa.companyname.trim())
      newErrors.companyname = "Company Name is required";

    if (!formDataa.Category.trim()) newErrors.Category = "Category is required";

    if (!formDataa.password.trim()) newErrors.password = "Password is required";
    else if (formDataa.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formDataa.location.trim()) newErrors.location = "Location is required";

    if (!formDataa.city.trim()) newErrors.city = "City is required";

    if (!formDataa.state.trim()) newErrors.state = "State is required";

    if (!isValidUrl(formDataa.website))
      newErrors.website = "Enter a valid Website URL";

    if (!isValidUrl(formDataa.linkedin))
      newErrors.linkedin = "Enter a valid Linkedin link";

    if (!isValidUrl(formDataa.facebook))
      newErrors.facebook = "Enter a valid Facebook link";

    if (!isValidUrl(formDataa.instagram))
      newErrors.instagram = "Enter a valid Instagram link";

    if (!isValidUrl(formDataa.youtube))
      newErrors.youtube = "Enter a valid YouTube link";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    alert("Employer Added Successfully ✔");
  };

  return (
    <>
      {/* HEADER */}
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <h3 className="fw-bold mb-3">Employers</h3>

        <div className="ms-auto">
          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-primary"
          >
            <i className="fa fa-plus"></i> Add Employer
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="card">
        <div className="card-body table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr className="text-center">
                <th>Name</th>
                <th>Contact</th>
                <th>Location</th>
              </tr>
            </thead>

            <tbody>
              {records.length ? (
                records.map((u) => (
                  <tr key={u.id} className="text-center align-middle">
                    <td>
                      <div className="dropdown d-inline-block">
                        <span
                          className="fw-bold text-primary"
                          role="button"
                          data-bs-toggle="dropdown"
                        >
                          {u.fullname}
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
                              onClick={() => handleDeleteClick(u.id)}
                            >
                              <i className="fas fa-trash me-2"></i>Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>

                    <td>
                      Email: {u.email} <br />
                      Mobile: {u.mobile}
                    </td>

                    <td>
                      {u.location}, {u.city}, {u.state}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-3">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* <Pagination
            currentPage={currentPage}
            totalPages={nPages}
            onPageChange={(page) => setCurrentPage(page)}
          /> */}
        </div>
      </div>

      {/* Delete Modal */}
      <ConfirmDelete
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* ADD FORM MODAL */}
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title fw-bold">Add Employer</h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
            </div>

            <form onSubmit={handleAddUser}>
              <div className="modal-body row">
                {/* Full Name */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Full Name"
                  />
                  {errors.fullname && (
                    <span className="text-danger">{errors.fullname}</span>
                  )}
                </div>

                {/* Email */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Email"
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>

                {/* Mobile */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Mobile Number"
                  />
                  {errors.mobile && (
                    <span className="text-danger">{errors.mobile}</span>
                  )}
                </div>

                {/* Company Name */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Company Name</label>
                  <input
                    type="text"
                    name="companyname"
                    value={formData.companyname}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Company Name"
                  />
                  {errors.companyname && (
                    <span className="text-danger">{errors.companyname}</span>
                  )}
                </div>

                {/* Category */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Category</label>
                  <select
                    name="Category"
                    value={formData.Category}
                    onChange={handleChange}
                    className="form-select form-control"
                  >
                    <option value="">Select Category</option>
                    <option>Percentage</option>
                    <option>Flat Amount</option>
                  </select>
                  {errors.Category && (
                    <span className="text-danger">{errors.Category}</span>
                  )}
                </div>

                {/* Password */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Password"
                  />
                  {errors.password && (
                    <span className="text-danger">{errors.password}</span>
                  )}
                </div>

                {/* Location */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Location"
                  />
                  {errors.location && (
                    <span className="text-danger">{errors.location}</span>
                  )}
                </div>

                {/* City */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter City"
                  />
                  {errors.city && (
                    <span className="text-danger">{errors.city}</span>
                  )}
                </div>

                {/* State */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter State"
                  />
                  {errors.state && (
                    <span className="text-danger">{errors.state}</span>
                  )}
                </div>

                {/* Website */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Website</label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Website Link"
                  />
                  {errors.website && (
                    <span className="text-danger">{errors.website}</span>
                  )}
                </div>

                {/* Linkedin */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Linkedin</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Linkedin Link"
                  />
                  {errors.linkedin && (
                    <span className="text-danger">{errors.linkedin}</span>
                  )}
                </div>

                {/* Facebook */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Facebook</label>
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Facebook Link"
                  />
                  {errors.facebook && (
                    <span className="text-danger">{errors.facebook}</span>
                  )}
                </div>

                {/* Instagram */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Instagram Link"
                  />
                  {errors.instagram && (
                    <span className="text-danger">{errors.instagram}</span>
                  )}
                </div>

                {/* YouTube */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">YouTube</label>
                  <input
                    type="text"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter YouTube Link"
                  />
                  {errors.youtube && (
                    <span className="text-danger">{errors.youtube}</span>
                  )}
                </div>
              </div>

              {/* Submit */}
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
    </>
  );
}

export default Employes;
