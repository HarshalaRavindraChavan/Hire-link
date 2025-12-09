import React, { useState, useEffect } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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
      status: "1",
      added_by: "rohan",
      added_date: "12/11/2025",
    },
  ]);

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

  // Validation Schema
  const validationSchema = Yup.object().shape({
    packageName: Yup.string().required("Package name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    duration: Yup.string().required("Duration is required"),
    jobLimit: Yup.number()
      .typeError("Job limit must be a number")
      .required("Job post limit is required"),
    resumeLimit: Yup.number()
      .typeError("Resume limit must be a number")
      .required("Resume view limit is required"),
    support: Yup.string().required("Support type is required"),
    description: Yup.string().required("Description is required"),
    benefits: Yup.array()
      .of(Yup.string().required("Benefit is required"))
      .min(1, "At least one benefit is required"),
  });

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
      packageName: "",
      price: "",
      duration: "",
      jobLimit: "",
      resumeLimit: "",
      support: "",
      description: "",
      benefits: [],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "benefits",
  });

  // Ensure first input appears always
  useEffect(() => {
    if (fields.length === 0) {
      append("");
    }
  }, [fields]);

  // Benefit Add logic with validation
  const handleAddBenefit = () => {
    const values = getValues("benefits");
    const lastIndex = values.length - 1;
    const lastValue = values[lastIndex];

    if (!lastValue || lastValue.trim() === "") {
      setError(`benefits.${lastIndex}`, {
        type: "manual",
        message: "Benefit is required",
      });
      return;
    }

    clearErrors(`benefits.${lastIndex}`);
    append("");
  };

  const onSubmit = (data) => {
    const newPackage = {
      id: packages.length + 1,
      added_by: "rohan",
      added_date: "12/11/2025",
      status: "1",
      ...data,
    };

    setPackages([...packages, newPackage]);
    reset({ benefits: [""] });

    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("exampleModal")
    );
    modal.hide();
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
                <th className="fs-6 fw-bold">Id</th>
                <th className="fs-6 fw-bold">Package</th>
                <th className="fs-6 fw-bold">Package Detail</th>
                <th className="fs-6 fw-bold">Benefits</th>
                <th className="fs-6 fw-bold">Status</th>
                <th className="fs-6 fw-bold">Activity Detail</th>
              </tr>
            </thead>

            <tbody>
              {packages.length > 0 ? (
                packages.map((pkg) => (
                  <tr key={pkg.id} className="text-center align-middle">
                    <td>{pkg.id}</td>
                    <td className="text-start">
                      <div className="fw-bold">
                        Package Name:
                        <div className="dropdown d-inline ms-2">
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
                      </div>

                      <div className="fw-bold mt-1">
                        Price:{" "}
                        <span className="text-dark fw-normal">{pkg.price}</span>
                      </div>
                      <div className="fw-bold mt-1">
                        Duration:{" "}
                        <span className="text-dark fw-normal">
                          {pkg.duration}
                        </span>
                      </div>
                    </td>

                    <td className="text-start">
                      <div className="fw-bold mt-1">
                        Job Post Limit:{" "}
                        <span className="text-dark fw-normal">
                          {pkg.jobLimit}
                        </span>
                      </div>
                      <div className="fw-bold mt-1">
                        Resume Limit:{" "}
                        <span className="text-dark fw-normal">
                          {pkg.resumeLimit}
                        </span>
                      </div>
                      <div className="fw-bold mt-1">
                        Support:{" "}
                        <span className="text-dark fw-normal">
                          {pkg.support}
                        </span>
                      </div>
                    </td>

                    <td className="text-start">
                      {pkg.benefits.map((b, i) => (
                        <div key={i}>• {b}</div>
                      ))}
                    </td>

                    <td>
                      {pkg.status === "1" ? (
                        <span className="badge bg-success">Active</span>
                      ) : (
                        <span className="badge bg-danger">Inactive</span>
                      )}
                    </td>
                    <td className="text-start">
                      <div className="fw-bold mt-1">
                        Added By:{" "}
                        <span className="text-dark fw-normal">
                          {pkg.added_by}
                        </span>
                      </div>
                      <div className="fw-bold mt-1">
                        Added Date:{" "}
                        <span className="text-dark fw-normal">
                          {pkg.added_date}
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
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="exampleModal">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Add Package</h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", fontSize: "25px" }}
              ></i>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body row">
                <div className="col-md-4 mb-2">
                  <label>Package Name</label>
                  <input
                    className="form-control"
                    {...register("packageName")}
                    placeholder="Enter Package Name"
                  />
                  <span className="text-danger">
                    {errors.packageName?.message}
                  </span>
                </div>

                <div className="col-md-4 mb-2">
                  <label>Price</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("price")}
                    placeholder="Enter Package Price"
                  />
                  <span className="text-danger">{errors.price?.message}</span>
                </div>

                <div className="col-md-4 mb-2">
                  <label>Duration</label>
                  <select
                    className="form-select form-control"
                    {...register("duration")}
                  >
                    <option value="">Select</option>
                    <option>30 Days</option>
                    <option>60 Days</option>
                    <option>90 Days</option>
                    <option>1 Year</option>
                  </select>
                  <span className="text-danger">
                    {errors.duration?.message}
                  </span>
                </div>

                <div className="col-md-4 mb-2">
                  <label>Job Post Limit</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("jobLimit")}
                    placeholder="Number of Post Limit"
                  />
                  <span className="text-danger">
                    {errors.jobLimit?.message}
                  </span>
                </div>

                <div className="col-md-4 mb-2">
                  <label>Resume View Limit</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("resumeLimit")}
                    placeholder="Number of View Limit"
                  />
                  <span className="text-danger">
                    {errors.resumeLimit?.message}
                  </span>
                </div>

                <div className="col-md-4 mb-2">
                  <label>Support</label>
                  <select
                    className="form-select form-control"
                    {...register("support")}
                  >
                    <option value="">Select</option>
                    <option>Email</option>
                    <option>Chat</option>
                    <option>Phone</option>
                  </select>
                  <span className="text-danger">{errors.support?.message}</span>
                </div>

                <div className="col-md-12 mb-2">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    {...register("description")}
                    placeholder="Enter Package Description"
                  ></textarea>
                  <span className="text-danger">
                    {errors.description?.message}
                  </span>
                </div>

                {/* BENEFITS */}
                <div className="col-md-12 mb-2">
                  <label>Benefits / Features</label>
                  {fields.map((field, index) => (
                    <div className="mb-2" key={field.id}>
                      <div className="d-flex gap-2">
                        <input
                          type="text"
                          className="form-control"
                          {...register(`benefits.${index}`)}
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
                      {errors.benefits?.[index] && (
                        <span className="text-danger">
                          {errors.benefits[index].message}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button className="btn btn-primary" type="submit">
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
