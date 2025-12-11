import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Pagination from "./commenuse/Pagination";

function Offer() {
  // tital of tab
  useState(() => {
    document.title = "Hirelink | Offers";
  }, []);

  const [users, setUsers] = useState([
    {
      id: 1,
      title: "New Year Offer",
      code: "NEW50",
      offerin: "Percentage",
      value: "50",
      startDate: "2025-01-01",
      endDate: "2025-01-10",
      usageLimit: "13",
      status: "1",
      added_by: "rohan",
      added_date: "12/11/2025",
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
    status: "1",
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
      offerin: "",
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

  // Define validation schema using Yup
  const schema = yup.object().shape({
    title: yup.string().required("Offer title is required"),
    code: yup.string().required("Coupon code is required"),
    offerin: yup.string().required("Please select offer type"),
    startDate: yup.date().required("Start date is required"),
    endDate: yup.date().required("End date is required"),
    usageLimit: yup
      .number()
      .typeError("Usage limit must be a number")
      .required("Usage limit is required")
      .positive("Usage limit must be positive")
      .integer("Usage limit must be an integer"),
    status: yup.string().required("Status is required"),
    description: yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // call your handleAddOffer API here
    reset(); // reset form after submission
  };

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
            className="btn btn-success"
          >
            <i className="fa fa-plus"></i> Add Offer
          </button>
        </div>
      </div>

      <div className="card shadow-sm p-3">
        <div className="row g-2 align-items-center mb-3">
          <div className="col-md-2">
            <select className="form-select form-control">
              <option value="">Select</option>
              <option value="Percentage">Percentage</option>
              <option value="Flat Amount">Flat Amount</option>
            </select>
          </div>
          <div className="col-6 col-md-2">
            <input type="date" className="form-control" />
          </div>

          <div className="col-6 col-md-2">
            <input type="date" className="form-control" />
          </div>

          <div className="col-12 col-md-3 d-flex justify-content-md-start justify-content-between">
            <button className="btn px-4 me-2 btn-success">Submit</button>

            <button className="btn btn-light border px-3">
              <i className="fa fa-refresh"></i>
            </button>
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light text-center">
              <tr className="text-center">
                <th className="fs-6 fw-bold">ID</th>
                <th className="fs-6 fw-bold">Offer Detail</th>
                <th className="fs-6 fw-bold">Offer Dates</th>
                <th className="fs-6 fw-bold">Offer Image</th>
                <th className="fs-6 fw-bold">Activity Detail</th>
              </tr>
            </thead>

            <tbody>
              {/* Example Row (same style as your screenshot) */}
              {records.length > 0 ? (
                records.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td className="text-start">
                      <div className="fw-bold">
                        Offer Tital:
                        <div className="dropdown d-inline ms-2">
                          <span
                            className="fw-bold text-primary"
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
                      </div>

                      <div className="fw-bold">
                        Coupon Code:{"  "}
                        <span className="text-dark fw-normal">
                          {item.code} j uygyf sfsd Sfsd
                        </span>
                      </div>
                      <div className="fw-bold">
                        Offer In:{"  "}
                        <span className="text-dark fw-normal">
                          {item.offerin}
                        </span>
                      </div>
                      <div className="fw-bold">
                        Usage Limit:{"  "}
                        <span className="text-dark fw-normal">
                          {item.usageLimit}
                        </span>
                      </div>
                    </td>

                    <td className="text-start">
                      <div className="fw-bold">
                        Start:{"  "}
                        <span className="text-dark fw-normal">
                          {item.startDate}
                        </span>
                      </div>
                      <div className="fw-bold">
                        End:{"  "}
                        <span className="text-dark fw-normal">
                          {item.endDate}
                        </span>
                      </div>
                      <div className="fw-bold">
                        Offer Status:{"  "}
                        {item.status === "1" ? (
                          <span className="badge bg-success">Active</span>
                        ) : (
                          <span className="badge bg-danger">Inactive</span>
                        )}
                      </div>
                    </td>
                    {/* Skills */}
                    <td className="text-center">
                      <div className="avatar avatar-xl">
                        <img
                          src="data:image/jpeg;base64,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"
                          className="avatar-img rounded-circle"
                          alt="Offer Image"
                        ></img>
                      </div>
                    </td>
                    <td className="text-start">
                      <div className="fw-bold ">
                        Added By:{"  "}
                        <span className="text-dark fw-normal">
                          {item.added_by}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Added Date:{"  "}
                        <span className="text-dark fw-normal">
                          {item.added_date}
                        </span>
                      </div>
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
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={nPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/* OFFER ADD MODAL */}
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-success text-white rounded-top-4">
              <h5 className="modal-title fw-bold">Add Offer</h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body row">
                <div className="col-md-4">
                  <label>Offer Title</label>
                  <input
                    type="text"
                    {...register("title")}
                    className="form-control"
                    placeholder="Enter Offer Name"
                  />
                  <p className="text-danger">{errors.title?.message}</p>
                </div>

                <div className="col-md-4">
                  <label>Coupon Code</label>
                  <input
                    type="text"
                    {...register("code")}
                    className="form-control"
                    placeholder="Enter Coupon Code"
                  />
                  <p className="text-danger">{errors.code?.message}</p>
                </div>

                <div className="col-md-4 ">
                  <label>Offer In</label>
                  <select
                    {...register("offerin")}
                    className="form-select form-control"
                  >
                    <option value="">Select</option>
                    <option value="Percentage">Percentage</option>
                    <option value="Flat Amount">Flat Amount</option>
                  </select>
                  <p className="text-danger">{errors.offerin?.message}</p>
                </div>

                <div className="col-md-4">
                  <label>Start Date</label>
                  <input
                    type="date"
                    {...register("startDate")}
                    className="form-control"
                  />
                  <p className="text-danger">{errors.startDate?.message}</p>
                </div>

                <div className="col-md-4">
                  <label>End Date</label>
                  <input
                    type="date"
                    {...register("endDate")}
                    className="form-control"
                  />
                  <p className="text-danger">{errors.endDate?.message}</p>
                </div>

                <div className="col-md-4">
                  <label>Usage Limit</label>
                  <input
                    type="number"
                    {...register("usageLimit")}
                    className="form-control"
                    placeholder="Number of User Limit"
                  />
                  <p className="text-danger">{errors.usageLimit?.message}</p>
                </div>

                <div className="col-md-4">
                  <label>Status</label>
                  <select
                    {...register("status")}
                    className="form-select form-control"
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <p className="text-danger">{errors.status?.message}</p>
                </div>

                <div className="col-12">
                  <label>Description</label>
                  <textarea
                    {...register("description")}
                    className="form-control"
                    rows={4}
                    placeholder="Details about offer"
                  ></textarea>
                  <p className="text-danger">{errors.description?.message}</p>
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

      <ConfirmDelete
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default Offer;
