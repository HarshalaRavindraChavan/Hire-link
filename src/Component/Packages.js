import React, { useState, useEffect, useRef } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Pagination from "./commenuse/Pagination";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function Packages() {
  // Correct: useEffect for title
  useEffect(() => {
    document.title = "Hirelink | Packages";
    fetchPackages(); // ✅ REQUIRED
  }, []);

  const [packages, setPackages] = useState([]);

  // ---------------- Pagination Fix ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const records = packages.slice(firstIndex, lastIndex); // FIXED
  const nPages = Math.ceil(packages.length / recordsPerPage); // FIXED
  // --------------------------------------------------

  // Validation Schema
  const validationSchema = Yup.object().shape({
    pack_name: Yup.string().required("Package name is required"),

    pack_price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
      .positive("Price must be positive"),

    pack_duration: Yup.string().required("Duration is required"),

    pack_jplimit: Yup.number()
      .typeError("Job post limit must be a number")
      .required("Job post limit is required")
      .integer("Job post limit must be an integer")
      .min(1, "At least 1 job post is required"),

    pack_rvlimit: Yup.number()
      .typeError("Resume view limit must be a number")
      .required("Resume view limit is required")
      .integer("Resume view limit must be an integer")
      .min(1, "At least 1 resume view is required"),

    pack_support: Yup.string().required("Support type is required"),

    pack_description: Yup.string().required("Description is required"),

    pack_benefits: Yup.array()
      .of(Yup.string().required("Benefit is required"))
      .min(1, "At least one benefit is required"),
  });

  const modalRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      pack_name: "",
      pack_price: "",
      pack_duration: "",
      pack_jplimit: "",
      pack_rvlimit: "",
      pack_support: "",
      pack_description: "",
      pack_benefits: [""], // ✅ one benefit by default
    },
  });

  // // Ensure first input always appears

  const onSubmit = async (data) => {
    try {
      const payload = {
        pack_name: data.pack_name,
        pack_price: Number(data.pack_price),
        pack_duration: data.pack_duration,
        pack_jplimit: Number(data.pack_jplimit),
        pack_rvlimit: Number(data.pack_rvlimit),
        pack_support: data.pack_support,
        pack_description: data.pack_description,
        pack_benefits: data.pack_benefits,
      };

      const res = await axios.post(
        "https://norealtor.in/hirelink_apis/admin/insert/tbl_package",
        payload
      );

      if (res.data.status === true) {
        reset();

        const modal = window.bootstrap.Modal.getInstance(modalRef.current);
        modal.hide();

        toast.success("Package Added Successfully 🎉");
        fetchPackages();
      }
    } catch (error) {
      console.error("Add package error:", error);
      toast.error("Failed to add package. Please try again ❌");
    }
  };

  const { fields, append } = useFieldArray({
    control,
    name: "pack_benefits",
  });

  // ✅ NOW it is safe to use fields
  useEffect(() => {
    if (fields.length === 0) {
      append("");
    }
  }, [fields.length, append]);

  const handleAddBenefit = () => {
    const values = getValues("pack_benefits");
    const lastIndex = values.length - 1;
    const lastValue = values[lastIndex];

    if (!lastValue || lastValue.trim() === "") {
      setError(`pack_benefits.${lastIndex}`, {
        type: "manual",
        message: "Benefit is required",
      });
      return;
    }

    clearErrors(`pack_benefits.${lastIndex}`);
    append("");
  };

  // getdata API
  const fetchPackages = async () => {
    try {
      const res = await axios.get(
        "https://norealtor.in/hirelink_apis/admin/getdata/tbl_package"
      );

      if (res.data.status === true) {
        setPackages(res.data.data);
      }
    } catch (error) {
      console.error("Fetch packages error:", error);
      toast.error("Failed to load packages");
    }
  };

  // delete model code
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePackageId, setDeletePackageId] = useState(null);

  const confirmDelete = async () => {
    try {
      const res = await axios.get(
        `https://norealtor.in/hirelink_apis/admin/deletedata/tbl_package/pack_id/${deletePackageId}`
      );

      if (res.data.status === true) {
        setShowDeleteModal(false);
        setDeletePackageId(null);

        toast.success("Package deleted successfully 🗑️", {
          position: "top-right",
          autoClose: 3000,
        });

        fetchPackages();
      } else {
        toast.error("Failed to delete package ❌", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Package delete error:", error);

      toast.error("Server error while deleting package ⚠️", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleDeleteClick = (pack_id) => {
    setDeletePackageId(pack_id);
    setShowDeleteModal(true);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <h3 className="fw-bold mb-3">Packages</h3>
        <div className="ms-auto">
          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-success"
          >
            <i className="fa fa-plus"></i> Add Package
          </button>
        </div>
      </div>

      <div className="card shadow-sm p-3 border">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light text-center">
              <tr className="text-center">
                <th className="fs-6 fw-bold">Id</th>
                <th className="fs-6 fw-bold">Package</th>
                <th className="fs-6 fw-bold">Package Detail</th>
                <th className="fs-6 fw-bold">Benefits</th>
                <th className="fs-6 fw-bold">Activity Detail</th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? (
                records.map((pkg, index) => (
                  <tr
                    key={pkg.pack_id || index}
                    className="text-center align-middle"
                  >
                    <td className="text-center fw-bold">
                      {firstIndex + index + 1}
                    </td>

                    {/* <td className="text-center">{pkg.pack_id}</td> */}

                    {/* PACKAGE INFO */}
                    <td className="text-start">
                      <div className="fw-bold">
                        Name:
                        <div className="dropdown d-inline ms-2">
                          <span
                            className="fw-bold text-primary"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {pkg.pack_name}
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
                                onClick={() => handleDeleteClick(pkg.pack_id)}
                              >
                                <i className="fas fa-trash me-2"></i>Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="fw-bold">
                        Price:{" "}
                        <span className="fw-normal">{pkg.pack_price}</span>
                      </div>

                      <div className="fw-bold">
                        Duration:{" "}
                        <span className="fw-normal">{pkg.pack_duration}</span>
                      </div>
                      <div className="fw-bold">
                        {pkg.pack_status === "1" ? (
                          <span className="badge bg-success">Active</span>
                        ) : (
                          <span className="badge bg-danger">Inactive</span>
                        )}
                      </div>
                    </td>

                    {/* LIMITS */}
                    <td className="text-start">
                      <div className="fw-bold">
                        Job Post Limit:{" "}
                        <span className="fw-normal">{pkg.pack_jplimit}</span>
                      </div>
                      <div className="fw-bold">
                        Resume View Limit:{" "}
                        <span className="fw-normal">{pkg.pack_rvlimit}</span>
                      </div>
                      <div className="fw-bold">
                        Support:{" "}
                        <span className="fw-normal">{pkg.pack_support}</span>
                      </div>
                    </td>

                    {/* BENEFITS */}
                    <td className="text-start">
                      {pkg.pack_benefits ? (
                        (() => {
                          try {
                            const benefits = JSON.parse(pkg.pack_benefits); // ✅ FIX
                            return benefits.length > 0 ? (
                              benefits.map((b, i) => <div key={i}>• {b}</div>)
                            ) : (
                              <div className="text-muted">No benefits</div>
                            );
                          } catch (err) {
                            return (
                              <div className="text-danger">
                                Invalid benefits data
                              </div>
                            );
                          }
                        })()
                      ) : (
                        <div className="text-muted">No benefits</div>
                      )}
                    </td>

                    {/* META */}
                    <td className="text-start">
                      <div className="fw-bold">
                        Added By:{" "}
                        <span className="fw-normal">{pkg.added_by}</span>
                      </div>
                      <div className="fw-bold">
                        Added Date:{" "}
                        <span className="fw-normal">{pkg.added_date}</span>
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

          <Pagination
            currentPage={currentPage}
            totalPages={nPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        // ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Add Package</h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", fontSize: "25px" }}
              ></i>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body row">
                {/* PACKAGE NAME */}
                <div className="col-md-4">
                  <label>Package Name</label>
                  <input
                    className="form-control"
                    {...register("pack_name")}
                    placeholder="Enter Package Name"
                  />
                  <span className="text-danger">
                    {errors.pack_name?.message}
                  </span>
                </div>

                {/* PRICE */}
                <div className="col-md-4">
                  <label>Price</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("pack_price")}
                    placeholder="Enter Package Price"
                  />
                  <span className="text-danger">
                    {errors.pack_price?.message}
                  </span>
                </div>

                {/* DURATION */}
                <div className="col-md-4">
                  <label>Duration</label>
                  <select
                    className="form-select form-control"
                    {...register("pack_duration")}
                  >
                    <option value="">Select</option>
                    <option value="30 Days">30 Days</option>
                    <option value="60 Days">60 Days</option>
                    <option value="90 Days">90 Days</option>
                    <option value="1 Year">1 Year</option>
                  </select>
                  <span className="text-danger">
                    {errors.pack_duration?.message}
                  </span>
                </div>

                {/* JOB POST LIMIT */}
                <div className="col-md-4">
                  <label>Job Post Limit</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("pack_jplimit")}
                    placeholder="Number of Post Limit"
                  />
                  <span className="text-danger">
                    {errors.pack_jplimit?.message}
                  </span>
                </div>

                {/* RESUME VIEW LIMIT */}
                <div className="col-md-4">
                  <label>Resume View Limit</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("pack_rvlimit")}
                    placeholder="Number of View Limit"
                  />
                  <span className="text-danger">
                    {errors.pack_rvlimit?.message}
                  </span>
                </div>

                {/* SUPPORT */}
                <div className="col-md-4">
                  <label>Support</label>
                  <select
                    className="form-select form-control"
                    {...register("pack_support")}
                  >
                    <option value="">Select</option>
                    <option value="Email">Email</option>
                    <option value="Chat">Chat</option>
                    <option value="Phone">Phone</option>
                  </select>
                  <span className="text-danger">
                    {errors.pack_support?.message}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <div className="col-md-12">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    {...register("pack_description")}
                    placeholder="Enter Package Description"
                  />
                  <span className="text-danger">
                    {errors.pack_description?.message}
                  </span>
                </div>

                {/* BENEFITS */}
                <div className="col-md-12">
                  <label>Benefits / Features</label>

                  {fields.map((field, index) => (
                    <div key={field.id} className="mb-2">
                      <div className="d-flex gap-2">
                        <input
                          type="text"
                          className="form-control"
                          {...register(`pack_benefits.${index}`)}
                          placeholder={`Benefit ${index + 1}`}
                        />

                        {index === fields.length - 1 && (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleAddBenefit}
                          >
                            Add
                          </button>
                        )}
                      </div>

                      {errors.pack_benefits?.[index] && (
                        <span className="text-danger">
                          {errors.pack_benefits[index]?.message}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer bg-light d-flex">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-success ms-auto">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Delete Confirm */}
      <ConfirmDelete
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default Packages;
