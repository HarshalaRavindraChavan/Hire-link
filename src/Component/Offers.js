import React, { useState, useEffect } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import axios from "axios";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Pagination from "./commenuse/Pagination";
import { toast, ToastContainer } from "react-toastify";

function Offer() {
  // tital of tab
  useEffect(() => {
    document.title = "Hirelink | Offers";
  }, []);

  const modalRef = useRef(null);
  const [offers, setOffers] = useState([]);

  //============All Offer Disply==================================

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await axios.get(
        "https://norealtor.in/hirelink_apis/admin/getdata/tbl_offer"
      );

      if (res.data.status === true) {
        setOffers(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching offers", error);
      toast.error("Failed to load offers ❌", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // =================================================================

  // Pagination start
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = offers.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(offers.length / recordsPerPage);

  // pagination End

  // Delete modal start
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await axios.get(
        `https://norealtor.in/hirelink_apis/admin/deletedata/tbl_offer/offer_id/${deleteId}`
      );

      if (res.data.status === true) {
        setShowDeleteModal(false);
        setDeleteId(null);
        toast.success("Offer deleted successfully 🗑️", {
          position: "top-right",
          autoClose: 3000,
        });

        fetchOffers();
      } else {
        toast.success("Offer deleted successfully 🗑️", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Delete error:", error);

      toast.error("Server error while deleting offer ⚠️", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Delete modal End

  // Define validation schema using Yup
  const schema = yup.object().shape({
    offer_title: yup.string().required("Offer title is required"),

    offer_coupon_code: yup.string().required("Coupon code is required"),

    offer_in: yup.string().required("Please select offer type"),

    offer_start_date: yup.date().required("Start date is required"),

    offer_end_date: yup.date().required("End date is required"),

    offer_usage_limit: yup
      .number()
      .typeError("Usage limit must be a number")
      .required("Usage limit is required")
      .positive("Usage limit must be positive")
      .integer("Usage limit must be an integer"),

    offer_status: yup.string().required("Status is required"),

    offer_description: yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        offer_title: data.offer_title,
        offer_coupon_code: data.offer_coupon_code,
        offer_in: data.offer_in,
        offer_start_date: data.offer_start_date,
        offer_end_date: data.offer_end_date,
        offer_usage_limit: Number(data.offer_usage_limit),
        offer_status: data.offer_status,
        offer_description: data.offer_description,
      };

      const res = await axios.post(
        "https://norealtor.in/hirelink_apis/admin/insert/tbl_offer",
        payload
      );

      if (res.data.status === true) {
        reset();

        const modal = window.bootstrap.Modal.getInstance(modalRef.current);
        modal.hide();

        toast.success("Offer Added Successfully 🎉", {
          position: "top-right",
          autoClose: 3000,
        });
        fetchOffers();
      } else {
        toast.warning(res.data.message || "Something went wrong ⚠️");
      }
    } catch (error) {
      console.error("Add offer error:", error);
      toast.error("Failed to add offer. Please try again ❌", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Edit Model Code
  const [editOfferId, setEditOfferId] = useState(null);
  const [loading, setLoading] = useState(false);

  const openEditOfferModal = (offer) => {
  if (!offer) return;

  setEditOfferId(offer.offer_id);

  reset({
    offer_title: offer.offer_title ?? "",
    offer_coupon_code: offer.offer_coupon_code ?? "",
    offer_in: offer.offer_in ?? "",
    offer_start_date: offer.offer_start_date ?? "",
    offer_end_date: offer.offer_end_date ?? "",
    offer_usage_limit: offer.offer_usage_limit ?? "",
    offer_status: offer.offer_status ?? "",
    offer_description: offer.offer_description ?? "",
  });

  const modalEl = document.getElementById("editOfferModal");
  if (!modalEl || !window.bootstrap) return;

  const modalInstance =
    window.bootstrap.Modal.getInstance(modalEl) ||
    new window.bootstrap.Modal(modalEl);

  modalInstance.show();
};


 const handleUpdateOffer = async (data) => {
  if (!editOfferId) {
    toast.error("Offer ID missing");
    return;
  }

  try {
    setLoading(true);

    const payload = {
      offer_title: data.offer_title,
      offer_coupon_code: data.offer_coupon_code,
      offer_in: data.offer_in,
      offer_start_date: data.offer_start_date,
      offer_end_date: data.offer_end_date,
      offer_usage_limit: Number(data.offer_usage_limit),
      offer_status: data.offer_status,
      offer_description: data.offer_description,
    };

    const response = await axios.post(
      `https://norealtor.in/hirelink_apis/admin/updatedata/tbl_offer/offer_id/${editOfferId}`,
      payload
    );

    if (response?.data?.status === true) {
      toast.success("Offer updated successfully ✅");
      fetchOffers();

      const modalEl = document.getElementById("editOfferModal");
      if (modalEl && window.bootstrap) {
        const modalInstance =
          window.bootstrap.Modal.getInstance(modalEl);
        modalInstance?.hide();
      }
    } else {
      toast.error("Offer update failed");
    }
  } catch (error) {
    console.error("Update Offer Error:", error);
    toast.error("Server error");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
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

      <div className="card shadow-sm p-3 border">
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
                {/* <th className="fs-6 fw-bold">Offer Image</th> */}
                <th className="fs-6 fw-bold">Activity Detail</th>
              </tr>
            </thead>

            <tbody>
              {/* Example Row (same style as your screenshot) */}
              {records.length > 0 ? (
                records.map((item, index) => (
                  <tr key={item.offer_id || index}>
                    <td className="text-center fw-bold">
                      {firstIndex + index + 1}
                    </td>
                    {/* <td className="text-center">{item.offer_id}</td> */}

                    <td className="text-start">
                      <div className="fw-bold">
                        Offer Tital:
                        <div className="dropdown d-inline ms-2">
                          <span
                            className="fw-bold text-primary"
                            role="button"
                            data-bs-toggle="dropdown"
                          >
                            {item.offer_title}
                          </span>
                          <ul className="dropdown-menu shadow">
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => openEditOfferModal(item)}
                              >
                                <i className="fas fa-edit me-2"></i> Edit
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => handleDeleteClick(item.offer_id)}
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
                          {item.offer_coupon_code}
                        </span>
                      </div>
                      <div className="fw-bold">
                        Offer In:{"  "}
                        <span className="text-dark fw-normal">
                          {item.offer_in}
                        </span>
                      </div>
                      <div className="fw-bold">
                        Usage Limit:{"  "}
                        <span className="text-dark fw-normal">
                          {item.offer_usage_limit}
                        </span>
                      </div>
                       <div className="fw-bold">
                        Description:{"  "}
                        <span className="text-dark fw-normal">
                          {item.offer_description}
                        </span>
                      </div>
                    </td>

                    <td className="text-start">
                      <div className="fw-bold">
                        Start:{"  "}
                        <span className="text-dark fw-normal">
                          {item.offer_start_date}
                        </span>
                      </div>
                      <div className="fw-bold">
                        End:{"  "}
                        <span className="text-dark fw-normal">
                          {item.offer_end_date}
                        </span>
                      </div>
                      <div className="fw-bold">
                        Offer Status:{"  "}
                        {item.offer_status === "1" ? (
                          <span className="badge bg-success">Active</span>
                        ) : (
                          <span className="badge bg-danger">Inactive</span>
                        )}
                      </div>
                    </td>

                    <td className="text-start">
                      <div className="fw-bold ">
                        Added By:{"  "}
                        <span className="text-dark fw-normal">
                          {item.offer_added_by}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Added Date:{"  "}
                        <span className="text-dark fw-normal">
                          {item.offer_added_date}
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
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        ref={modalRef}
      >
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
                    {...register("offer_title")}
                    className="form-control"
                    placeholder="Enter Offer Name"
                  />
                  <p className="text-danger">{errors.offer_title?.message}</p>
                </div>

                <div className="col-md-4">
                  <label>Coupon Code</label>
                  <input
                    type="text"
                    {...register("offer_coupon_code")}
                    className="form-control"
                    placeholder="Enter Coupon Code"
                  />
                  <p className="text-danger">
                    {errors.offer_coupon_code?.message}
                  </p>
                </div>

                <div className="col-md-4 ">
                  <label>Offer In</label>
                  <select
                    {...register("offer_in")}
                    className="form-select form-control"
                  >
                    <option value="">Select</option>
                    <option value="Percentage">Percentage</option>
                    <option value="Flat Amount">Flat Amount</option>
                  </select>
                  <p className="text-danger">{errors.offer_in?.message}</p>
                </div>

                <div className="col-md-4">
                  <label>Start Date</label>
                  <input
                    type="date"
                    {...register("offer_start_date")}
                    className="form-control"
                  />
                  <p className="text-danger">
                    {errors.offer_start_date?.message}
                  </p>
                </div>

                <div className="col-md-4">
                  <label>End Date</label>
                  <input
                    type="date"
                    {...register("offer_end_date")}
                    className="form-control"
                  />
                  <p className="text-danger">
                    {errors.offer_end_date?.message}
                  </p>
                </div>

                <div className="col-md-4">
                  <label>Usage Limit</label>
                  <input
                    type="number"
                    {...register("offer_usage_limit")}
                    className="form-control"
                    placeholder="Number of User Limit"
                  />
                  <p className="text-danger">
                    {errors.offer_usage_limit?.message}
                  </p>
                </div>

                <div className="col-md-4">
                  <label>Status</label>
                  <select
                    {...register("offer_status")}
                    className="form-select form-control"
                  >
                    <option value="">Select Status</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                  <p className="text-danger">{errors.offer_status?.message}</p>
                </div>

                <div className="col-12">
                  <label>Description</label>
                  <textarea
                    {...register("offer_description")}
                    className="form-control"
                    rows={4}
                    placeholder="Details about offer"
                  ></textarea>
                  <p className="text-danger">
                    {errors.offer_description?.message}
                  </p>
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

      {/* Edit Model */}
      <div
        className="modal fade"
        id="editOfferModal"
        tabIndex="-1"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-success text-white rounded-top-4">
              <h5 className="modal-title fw-bold">Edit Offer</h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
            </div>

            <form onSubmit={handleSubmit(handleUpdateOffer)}>
              <div className="modal-body row">
                <div className="col-md-4">
                  <label>Offer Title</label>
                  <input
                    type="text"
                    {...register("offer_title")}
                    className="form-control"
                    placeholder="Enter Offer Name"
                  />
                  <p className="text-danger">{errors.offer_title?.message}</p>
                </div>

                <div className="col-md-4">
                  <label>Coupon Code</label>
                  <input
                    type="text"
                    {...register("offer_coupon_code")}
                    className="form-control"
                    placeholder="Enter Coupon Code"
                  />
                  <p className="text-danger">
                    {errors.offer_coupon_code?.message}
                  </p>
                </div>

                <div className="col-md-4 ">
                  <label>Offer In</label>
                  <select
                    {...register("offer_in")}
                    className="form-select form-control"
                  >
                    <option value="">Select</option>
                    <option value="Percentage">Percentage</option>
                    <option value="Flat Amount">Flat Amount</option>
                  </select>
                  <p className="text-danger">{errors.offer_in?.message}</p>
                </div>

                <div className="col-md-4">
                  <label>Start Date</label>
                  <input
                    type="date"
                    {...register("offer_start_date")}
                    className="form-control"
                  />
                  <p className="text-danger">
                    {errors.offer_start_date?.message}
                  </p>
                </div>

                <div className="col-md-4">
                  <label>End Date</label>
                  <input
                    type="date"
                    {...register("offer_end_date")}
                    className="form-control"
                  />
                  <p className="text-danger">
                    {errors.offer_end_date?.message}
                  </p>
                </div>

                <div className="col-md-4">
                  <label>Usage Limit</label>
                  <input
                    type="number"
                      {...register("offer_usage_limit", { valueAsNumber: true })}
                    className="form-control"
                    placeholder="Number of User Limit"
                  />
                  <p className="text-danger">
                    {errors.offer_usage_limit?.message}
                  </p>
                </div>

                <div className="col-md-4">
                  <label>Status</label>
                  <select
                    {...register("offer_status")}
                    className="form-select form-control"
                  >
                    <option value="">Select Status</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                  <p className="text-danger">{errors.offer_status?.message}</p>
                </div>

                <div className="col-12">
                  <label>Description</label>
                  <textarea
                    {...register("offer_description")}
                    className="form-control"
                    rows={4}
                    placeholder="Details about offer"
                  ></textarea>
                  <p className="text-danger">
                    {errors.offer_description?.message}
                  </p>
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
