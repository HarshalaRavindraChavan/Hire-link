import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import Pagination from "./commenuse/Pagination";

function Users() {
  // Example data: States and their cities
  const stateCityData = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    Karnataka: ["Bengaluru", "Mysore", "Mangalore"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    TamilNadu: ["Chennai", "Coimbatore", "Madurai"],
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      fullname: "Harshal Mahajan",
      email: "harshal1@gmail.com",
      mobile: "9876543201",
      location: "Main Road",
      address: "Main Road",
      state: "",
      city: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If state changes, reset city
    if (name === "state") {
      setFormData((prev) => ({ ...prev, state: value, city: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

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

  // Validation schema using Yup
  const schema = yup.object().shape({
    fullname: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    mobile: yup
      .string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile is required"),
    location: yup.string().required("Location is required"),
    address: yup.string().required("Address is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    joindate: yup.date().required("Join Date is required"),
    adhar: yup
      .string()
      .matches(/^\d{12}$/, "Adhar number must be 12 digits")
      .required("Adhar number is required"),
    pan: yup
      .string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number")
      .required("PAN number is required"),
    bankpassbook: yup.string().required("Bank passbook details are required"),
    experience: yup.string().required("Experience is required"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchState = watch("state"); // watch state for city dropdown

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // call your API here
    reset(); // reset form after submission
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

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body row">
                {/* Full Name */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Full Name</label>
                  <input
                    type="text"
                    {...register("fullname")}
                    className="form-control"
                    placeholder="Enter Full Name"
                  />
                  <p className="text-danger">{errors.fullname?.message}</p>
                </div>

                {/* Email */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Email</label>
                  <input
                    type="text"
                    {...register("email")}
                    className="form-control"
                    placeholder="Enter Email"
                  />
                  <p className="text-danger">{errors.email?.message}</p>
                </div>

                {/* Mobile */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Mobile</label>
                  <input
                    type="text"
                    {...register("mobile")}
                    className="form-control"
                    placeholder="Enter Mobile Number"
                  />
                  <p className="text-danger">{errors.mobile?.message}</p>
                </div>

                {/* Location */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Location</label>
                  <input
                    type="text"
                    {...register("location")}
                    className="form-control"
                    placeholder="Enter Location"
                  />
                  <p className="text-danger">{errors.location?.message}</p>
                </div>

                {/* Address */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Address</label>
                  <input
                    type="text"
                    {...register("address")}
                    className="form-control"
                    placeholder="Enter Address"
                  />
                  <p className="text-danger">{errors.address?.message}</p>
                </div>

                {/* State */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">State</label>
                  <select
                    {...register("state")}
                    className="form-select form-control"
                  >
                    <option value="">Select State</option>
                    {Object.keys(stateCityData).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <p className="text-danger">{errors.state?.message}</p>
                </div>

                {/* City */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">City</label>
                  <select
                    {...register("city")}
                    className="form-select form-control"
                    disabled={!watchState}
                  >
                    <option value="">Select City</option>
                    {watchState &&
                      stateCityData[watchState].map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>
                  <p className="text-danger">{errors.city?.message}</p>
                </div>

                {/* Join Date */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Join Date</label>
                  <input
                    type="date"
                    {...register("joindate")}
                    className="form-control"
                  />
                  <p className="text-danger">{errors.joindate?.message}</p>
                </div>

                {/* Adhar */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Adhar Number</label>
                  <input
                    type="text"
                    {...register("adhar")}
                    className="form-control"
                    placeholder="Enter Adhar Number"
                  />
                  <p className="text-danger">{errors.adhar?.message}</p>
                </div>

                {/* PAN */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">PAN Number</label>
                  <input
                    type="text"
                    {...register("pan")}
                    className="form-control"
                    placeholder="Enter PAN Number"
                  />
                  <p className="text-danger">{errors.pan?.message}</p>
                </div>

                {/* Bank Passbook */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Bank Passbook</label>
                  <input
                    type="text"
                    {...register("bankpassbook")}
                    className="form-control"
                    placeholder="Enter Bank Details"
                  />
                  <p className="text-danger">{errors.bankpassbook?.message}</p>
                </div>

                {/* Experience */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Experience</label>
                  <input
                    type="text"
                    {...register("experience")}
                    className="form-control"
                    placeholder="Enter Experience"
                  />
                  <p className="text-danger">{errors.experience?.message}</p>
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
