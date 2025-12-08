import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
// import Pagination from "./commenuse/Pagination";

function Packages() {
  const [packages, setPackages] = useState([
    {
      id: 1,
      packageName: "Basic Plan",
      price: "499",
      duration: "30 Days",
      jobLimit: "5",
      resumeLimit: "50",
      support: "Email",
      description: "Suitable for small recruiters",
      benefits: ["5 Job Posts", "Email Support", "50 Resume Views"],
      status: "Active",
    },
  ]);

  const [formData, setFormData] = useState({
    packageName: "",
    price: "",
    duration: "",
    jobLimit: "",
    resumeLimit: "",
    support: "",
    description: "",
    status: "Active",
  });

  const [benefit, setBenefit] = useState("");
  const [benefits, setBenefits] = useState([]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const addBenefit = () => {
    if (benefit.trim() !== "") {
      setBenefits([...benefits, benefit]);
      setBenefit("");
    }
  };

  const removeBenefit = (index) => {
    const updated = benefits.filter((_, i) => i !== index);
    setBenefits(updated);
  };

  const handleAddPackage = (e) => {
    e.preventDefault();

    const newPackage = {
      id: Date.now(),
      ...formData,
      benefits: benefits,
    };

    setPackages([...packages, newPackage]);

    setFormData({
      packageName: "",
      price: "",
      duration: "",
      jobLimit: "",
      resumeLimit: "",
      support: "",
      description: "",
      status: "Active",
    });

    setBenefits([]);

    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("exampleModal")
    );
    modal.hide();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 1;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = packages.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(packages.length / recordsPerPage);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const filtered = packages.filter((p) => p.id !== deleteId);
    setPackages(filtered);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <h3 className="fw-bold mb-3">Packages</h3>
        <div className="ms-auto">
          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-primary"
          >
            <i className="fa fa-plus"></i> Add Package
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr className="text-center">
                <th>Name</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Benefits</th>
              </tr>
            </thead>

            <tbody>
              {records.length > 0 ? (
                records.map((pkg) => (
                  <tr key={pkg.id} className="text-center align-middle">
                    <td>
                      <div className="dropdown">
                        <span
                          className="fw-bold text-primary"
                          role="button"
                          data-bs-toggle="dropdown"
                        >
                          {pkg.packageName}
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
                              onClick={() => handleDeleteClick(pkg.id)}
                            >
                              <i className="fas fa-trash me-2"></i>Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>{pkg.price}</td>
                    <td>{pkg.duration}</td>
                    <td>{pkg.status}</td>
                    <td className="text-start">
                      <ul style={{ paddingLeft: "18px" }}>
                        {pkg.benefits?.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
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

      {/* ADD PACKAGE MODAL */}
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title fw-bold">Add Package</h5>
                <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
            </div>

            <form onSubmit={handleAddPackage}>
              <div className="modal-body row">
                <div className="col-md-4 mb-2">
                  <label>Package Name</label>
                  <input
                    type="text"
                    name="packageName"
                    value={formData.packageName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Basic / Premium"
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="499"
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <label>Duration</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option>30 Days</option>
                    <option>60 Days</option>
                    <option>90 Days</option>
                    <option>1 Year</option>
                  </select>
                </div>

                <div className="col-md-4 mb-2">
                  <label>Job Post Limit</label>
                  <input
                    type="number"
                    name="jobLimit"
                    value={formData.jobLimit}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="10"
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <label>Resume View Limit</label>
                  <input
                    type="number"
                    name="resumeLimit"
                    value={formData.resumeLimit}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="50"
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <label>Support</label>
                  <select
                    name="support"
                    value={formData.support}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option>Email</option>
                    <option>Chat</option>
                    <option>Phone</option>
                  </select>
                </div>

                <div className="col-md-12 mb-2">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    rows={4}
                    placeholder="Write something..."
                  ></textarea>
                </div>

                <div className="col-md-6 mb-2">
                  <label>Benefits / Features</label>
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter benefit"
                      value={benefit}
                      onChange={(e) => setBenefit(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={addBenefit}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="col-md-5 mb-2 border">
                  <ul className="mt-2" style={{ paddingLeft: "18px" }}>
                    {benefits.map((b, i) => (
                      <li key={i} className="d-flex justify-content-between">
                        {b}
                        <button
                          type="button"
                          className="btn btn-sm text-danger"
                          onClick={() => removeBenefit(i)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary px-4">
                  Save Package
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

export default Packages;
