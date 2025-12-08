import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import Pagination from "./commenuse/Pagination";

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

  const handleAddUser = (e) => {
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

          <Pagination
            currentPage={currentPage}
            totalPages={nPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
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
            </div>

            <form onSubmit={handleAddUser}>
              <div className="modal-body row">
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
                </div>

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
                </div>

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
                </div>

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
                </div>

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
                </div>

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
                </div>

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
                </div>

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
                </div>

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
                </div>

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
                </div>

                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">linkedin</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Linkedin Link"
                  />
                </div>

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
                </div>

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
                </div>

                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">You Tube</label>
                  <input
                    type="text"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Youtube Link"
                  />
                </div>
              </div>

              <div className="modal-footer bg-light rounded-bottom-4">
                <button
                  className="btn btn-outline-secondary px-4 rounded-3"
                  data-bs-dismiss="modal"
                  type="button"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary px-4">
                  Save Employer
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
