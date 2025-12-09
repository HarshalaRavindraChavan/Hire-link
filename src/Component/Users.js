import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
// import Pagination from "./commenuse/Pagination";

function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      fullname: "Harshal Mahajan",
      email: "harshal1@gmail.com",
      mobile: "9876543201",
      location: "Main Road",
      address: "Main Road",
      city: "Mumbai",
      state: "Maharashtra",
      joindate: "2024-01-05",
      adhar: "1111 2222 3333",
      pan: "ABCDE1234F",
      bankpassbook: "Union Bank",
      experience: "1 Year",
    },
  ]);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    location: "",
    address: "",
    city: "",
    state: "",
    joindate: "",
    adhar: "",
    pan: "",
    bankpassbook: "",
    experience: "",
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
      location: "",
      address: "",
      city: "",
      state: "",
      joindate: "",
      adhar: "",
      pan: "",
      bankpassbook: "",
      experience: "",
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
        <h3 className="fw-bold mb-3">Users</h3>

        <div className="ms-auto">
          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-primary"
          >
            <i className="fa fa-plus"></i> Add User
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
              {records.length > 0 ? (
                records.map((u) => (
                  <tr key={u.id} className="text-center align-middle">
                    <td>
                      <div className="dropdown d-inline-block">
                        <span
                          className="fw-bold text-primary"
                          role="button"
                          data-bs-toggle="dropdown"
                          style={{ cursor: "pointer" }}
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
                      <br />
                      Join: {u.joindate} <br />
                      Exp: {u.experience}
                    </td>
                    <td>
                      Email: {u.email} <br />
                      Mobile: {u.mobile}
                    </td>
                    <td>
                      {u.address}, {u.city}, {u.state} <br />
                      Adhar: {u.adhar}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-3">
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

      {/* ADD USER MODAL */}
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title fw-bold">Add User</h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
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
                  <label className="fw-semibold">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Address"
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
                  <label className="fw-semibold">Join Date</label>
                  <input
                    type="date"
                    name="joindate"
                    value={formData.joindate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Adhar Number</label>
                  <input
                    type="text"
                    name="adhar"
                    value={formData.adhar}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Adhar Number"
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">PAN Number</label>
                  <input
                    type="text"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter PAN Number"
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Bank Passbook</label>
                  <input
                    type="text"
                    name="bankpassbook"
                    value={formData.bankpassbook}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Bank Details"
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Experience"
                  />
                </div>
              </div>

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

      <ConfirmDelete
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default Users;
