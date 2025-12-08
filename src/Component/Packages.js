import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";

function Packages() {
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

  return (
    <>
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <div>
          <h3 className="fw-bold mb-3">Packages</h3>
        </div>
        <div className="ms-auto py-2 py-md-0">
          <a href="#" className="btn btn-label-info btn-round me-2">
            Manage
          </a>
          <a
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-primary btn-round"
          >
            <i className="fa fa-plus"> </i> Add
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
              <h5 className="modal-title fw-bold">User Details</h5>
            </div>

            <form>
              <div className="modal-body row">
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Name"
                  ></input>
                </div>

                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="text"
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Name"
                  ></input>
                </div>

                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Mobile</label>
                  <input
                    type="text"
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Name"
                  ></input>
                </div>

                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Location</label>
                  <input
                    type="text"
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Name"
                  ></input>
                </div>

                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Address</label>
                  <input
                    type="text"
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Name"
                  ></input>
                </div>

                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">City</label>
                  <input
                    type="text"
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Name"
                  ></input>
                </div>

                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">State</label>
                  <input
                    type="text"
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Name"
                  ></input>
                </div>

                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Joindate</label>
                  <input
                    type="email"
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Email"
                  ></input>
                </div>

                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Aadher Number
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Email"
                  ></input>
                </div>

                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Pan Number</label>
                  <input
                    type="email"
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Email"
                  ></input>
                </div>

                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">
                    Bank Passbook
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Email"
                  ></input>
                </div>

                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Experience</label>
                  <input
                    type="email"
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Email"
                  ></input>
                </div>
              </div>

              <div className="modal-footer bg-light rounded-bottom-4">
                <button
                  className="btn btn-outline-secondary px-4 rounded-3"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button className="btn btn-primary px-4 rounded-3">
                  Save Changes
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

export default Packages;
