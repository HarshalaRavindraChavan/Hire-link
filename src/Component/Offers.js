import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
// import Pagination from "./commenuse/Pagination";

function Offer() {
  const [users, setUsers] = useState([
    {
      id: 1,
      title: "New Year Offer",
      code: "NEW50",
      discountType: "Percentage",
      value: "50",
      startDate: "2025-01-01",
      endDate: "2025-01-10",
      status: "Active",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    code: "",
    discountType: "",
    value: "",
    startDate: "",
    endDate: "",
    applyOn: "",
    usageLimit: "",
    description: "",
    status: "Active",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddOffer = (e) => {
    e.preventDefault();

    const newOffer = { id: Date.now(), ...formData };
    setUsers([...users, newOffer]);

    // Reset form
    setFormData({
      title: "",
      code: "",
      discountType: "",
      value: "",
      startDate: "",
      endDate: "",
      applyOn: "",
      usageLimit: "",
      description: "",
      status: "Active",
    });

    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("exampleModal")
    );
    modal.hide();
  };

  // Pagination start
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(users.length / recordsPerPage);
  // pagination End

  // Delete modal start
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

  // Delete modal End

  return (
    <>
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <div>
          <h3 className="fw-bold mb-3">Offers</h3>
        </div>
        <div className="ms-auto py-2 py-md-0">
          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-primary"
          >
            <i className="fa fa-plus"></i> Add Offer
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr className="text-center">
                <th>Offer Title</th>
                <th>Code</th>
                <th>Discount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {records.length > 0 ? (
                records.map((item) => (
                  <tr key={item.id} className="text-center align-middle">
                    <td>
                      <div className="dropdown">
                        <span
                          className="text-primary fw-semibold"
                          role="button"
                          data-bs-toggle="dropdown"
                        >
                          {item.title}
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
                              onClick={() => handleDeleteClick(item.id)}
                            >
                              <i className="fas fa-trash me-2"></i>Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>{item.code}</td>
                    <td>
                      {item.value}{" "}
                      {item.discountType === "Percentage" ? "%" : "₹"}
                    </td>
                    <td>{item.status}</td>
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

      {/* OFFER ADD MODAL */}
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-primary text-white rounded-top-4">
              <h5 className="modal-title fw-bold">Add Offer</h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
            </div>

            <form onSubmit={handleAddOffer}>
              <div className="modal-body row">
                <div className="col-md-4 mb-2">
                  <label>Offer Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Festive Sale"
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <label>Coupon Code</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="NEW50"
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <label>Discount Type</label>
                  <select
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleChange}
                    className="form-select form-control"
                  >
                    <option value="">Select</option>
                    <option>Percentage</option>
                    <option>Flat Amount</option>
                  </select>
                </div>

                <div className="col-md-4 mb-2">
                  <label>Value</label>
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="50"
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <label>Usage Limit</label>
                  <input
                    type="number"
                    name="usageLimit"
                    value={formData.usageLimit}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="1"
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select form-control"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>

                <div className="col-12 mb-2">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    rows={4}
                    placeholder="Details about offer"
                  ></textarea>
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

export default Offer;
