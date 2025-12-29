import React, { useState, useEffect } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Pagination from "./commenuse/Pagination";
import { toast } from "react-toastify";

function Users() {
  useEffect(() => {
    document.title = "Hirelink | Users";
  }, []);

  const [users, setUsers] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const res = await axios.get(
        "https://norealtor.in/hirelink_apis/admin/getdata/tbl_states"
      );

      if (res.data.status) {
        setStates(res.data.data);
      }
    } catch (err) {
      console.error("State fetch error", err);
    }
  };

  //=========all city

  const fetchCities = async (stateId) => {
    try {
      const res = await axios.get(
        `https://norealtor.in/hirelink_apis/admin/getdata/tbl_city/state_id/${stateId}`
      );

      if (res.data.status) {
        setCities(res.data.data);
      }
    } catch (err) {
      console.error("City fetch error", err);
    }
  };

  //========user add============

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://norealtor.in/hirelink_apis/admin/getdata/tbl_user"
      );
      if (res.data.status === true) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= PAGINATION ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const filteredUsers = users.filter((u) => String(u.user_id) !== "1");

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredUsers.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredUsers.length / recordsPerPage);

  /* ================= DELETE ================= */
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await axios.get(
        `https://norealtor.in/hirelink_apis/admin/deletedata/tbl_user/user_id/${deleteId}`
      );

      if (res.data.status === true) {
        setShowDeleteModal(false);
        setDeleteId(null);
        fetchUsers();
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      toast.error("Delete error");
    }
  };

  /* ================= FILE STATE ================= */
  const [User, setUser] = useState({
    user_aadhar_image: "",
    user_pan_image: "",
  });

  /* ================= VALIDATION ================= */
  const schema = yup.object({
    fullname: yup.string().required(),
    email: yup.string().email().required(),
    mobile: yup
      .string()
      .matches(/^\d{10}$/)
      .required(),
    location: yup.string().required(),
    address: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    joindate: yup.date().required(),
    adhar: yup
      .string()
      .matches(/^\d{12}$/)
      .required(),
    pan: yup
      .string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
      .required(),
    adharupload: yup.string().required("Aadhar upload required"),
    panupload: yup.string().required("PAN upload required"),

    bankpassbook: yup.string().required(),
    experience: yup.string().required(),
    role: yup.string().required(),
    menus: yup.array().min(1).required(),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue, // ✅ ADD THIS
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  /* ================= SUBMIT ================= */
  const onSubmit = async (data) => {
    const payload = {
      user_name: data.fullname,
      user_email: data.email,
      user_mobile: data.mobile,
      user_location: data.location,
      user_address: data.address,
      user_state: data.state,
      user_city: data.city,
      user_joindate: data.joindate,
      user_adhar: data.adhar,
      user_pan: data.pan,
      user_bankpassbook: data.bankpassbook,
      user_experience: data.experience,
      user_role: data.role,
      user_menu_id: data.menus.join(","),
      user_aadhar_image: User.user_aadhar_image,
      user_pan_image: User.user_pan_image,
    };

    try {
      const res = await axios.post(
        "https://norealtor.in/hirelink_apis/admin/insert/tbl_user",
        payload
      );

      if (res.data.status) {
        toast.success("User added successfully");

        reset(); // form reset
        setUser({ user_aadhar_image: "", user_pan_image: "" }); // reset file state
        fetchUsers(); // refresh table

        const modal = document.getElementById("exampleModal");
        const bsModal =
          window.bootstrap.Modal.getInstance(modal) ||
          new window.bootstrap.Modal(modal);

        bsModal.hide(); // close modal
      } else {
        toast.error("User not added");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  /* ================= FILE UPLOAD ================= */
  const uploadFile = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const minSize = 30 * 1024; // 30KB
    const maxSize = 50 * 1024; // 50KB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    // ❌ file type check
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type ❌ Only JPG / JPEG / PNG allowed");
      e.target.value = ""; // reset input
      return;
    }

    // ❌ file too small
    if (file.size < minSize) {
      toast.error(
        `File too small ❌ (${Math.round(
          file.size / 1024
        )}KB). Minimum 30KB required`
      );
      e.target.value = ""; // reset input
      return;
    }

    // ❌ file too large
    if (file.size > maxSize) {
      toast.error(
        `File too large ❌ (${Math.round(
          file.size / 1024
        )}KB). Maximum 50KB allowed`
      );
      e.target.value = ""; // reset input
      return;
    }

    // ✅ valid file → upload
    const formData = new FormData();
    formData.append(field, file);

    try {
      const res = await axios.post(
        "https://norealtor.in/hirelink_apis/admin/fileupload",
        formData
      );

      if (res.data.status) {
        const filename = res.data.files[field];

        // ✔ icon UI state
        setUser((prev) => ({
          ...prev,
          [field]: filename,
        }));

        // React Hook Form hidden field
        if (field === "user_aadhar_image") {
          setValue("adharupload", filename, { shouldValidate: true });
        }

        if (field === "user_pan_image") {
          setValue("panupload", filename, { shouldValidate: true });
        }

        toast.success("File uploaded successfully ✅");
      } else {
        toast.error("Upload failed ❌");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "File upload error ❌");
    }
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
            className="btn btn-success"
          >
            <i className="fa fa-plus"></i> Add User
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm p-3 border">
        <div className="row g-2 align-items-center mb-3">
          <div className="col-md-2">
            <select className="form-select form-control">
              <option value="">Select Experienc</option>
              <option>6 Month</option>
              <option>2 Year</option>
              <option>3 Year</option>
              <option>4 Year</option>
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
                <th className="fs-6 fw-bold">User Detail</th>
                <th className="fs-6 fw-bold">User ID Proof</th>
                <th className="fs-6 fw-bold">User Address</th>
                <th className="fs-6 fw-bold">Activity Detail</th>
              </tr>
            </thead>

            <tbody>
              {records.length > 0 ? (
                records
                  .filter((u) => String(u.user_id) !== "1")
                  .map((u,index) => (
                    <tr
                      key={u.user_id || index}
                      className="text-center align-middle"
                    >
                      <td className="text-center fw-bold">
                        {firstIndex + index + 1}
                      </td>
                      {/* <td className="text-center">{u.user_id}</td> */}
                      <td className="text-start">
                        <div className="fw-bold">
                          Name:
                          <div className="dropdown d-inline ms-2">
                            <span
                              className="fw-bold text-primary"
                              role="button"
                              data-bs-toggle="dropdown"
                            >
                              {u.user_name}
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
                                  onClick={() => handleDeleteClick(u.user_id)}
                                >
                                  <i className="fas fa-trash me-2"></i>Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="fw-bold">
                          Email:{"  "}
                          <span className="text-dark fw-normal">
                            {u.user_email}
                          </span>
                        </div>
                        <div className="fw-bold">
                          Mobile No:{"  "}
                          <span className="text-dark fw-normal">
                            {u.user_mobile}
                          </span>
                        </div>
                        <div className="fw-bold">
                          Experience:{"  "}
                          <span className="text-dark fw-normal">
                            {u.user_experience}
                          </span>
                        </div>
                      </td>

                      {/* User Id Proof */}
                      <td className="text-start">
                        <div className="fw-bold">
                          Aadhar No:{"  "}
                          <span className="text-dark fw-normal">
                            {u.user_adhar}
                          </span>
                        </div>
                        <div className="fw-bold">
                          Pan Card No:{"  "}
                          <span className="text-dark fw-normal">
                            {u.user_pan}
                          </span>
                        </div>
                        <div className="fw-bold">
                          Join Date:{"  "}
                          <span className="text-dark fw-normal">
                            {u.user_joindate}
                          </span>
                        </div>
                      </td>
                      {/* Address */}
                      <td className="text-start">
                        <div className="fw-bold">
                          Location:{"  "}
                          <span className="text-dark fw-normal">
                            {u.user_location}
                          </span>
                        </div>
                        <div className="fw-bold">
                          Address:{"  "}
                          <span className="text-dark fw-normal">
                            {u.user_address}
                          </span>
                        </div>
                        <div className="fw-bold">
                          City:{"  "}
                          <span className="text-dark fw-normal">
                            {u.city_name}
                          </span>
                        </div>
                        <div className="fw-bold">
                          State:{"  "}
                          <span className="text-dark fw-normal">
                            {u.state_name}
                          </span>
                        </div>
                      </td>
                      {/* Activity Detail */}
                      <td className="text-start">
                        <div className="fw-bold ">
                          Added By:{"  "}
                          <span className="text-dark fw-normal">
                            {u.user_added_by}
                          </span>
                        </div>
                        <div className="fw-bold ">
                          Added Date:{"  "}
                          <span className="text-dark fw-normal">
                            {u.user_added_date}
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

      {/* ADD USER MODAL */}
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-success text-white">
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
                <div className="col-md-4">
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
                <div className="col-md-4">
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
                <div className="col-md-4">
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
                <div className="col-md-4">
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
                <div className="col-md-4">
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
                <div className="col-md-4">
                  <label className="fw-semibold">State</label>
                  <select
                    className="form-select form-control"
                    {...register("state")}
                    onChange={(e) => {
                      const stateId = e.target.value;
                      fetchCities(stateId);
                      setValue("city", ""); // ✅ RESET CITY
                    }}
                  >
                    <option value="">Select State</option>
                    {states.map((s) => (
                      <option key={s.state_id} value={s.state_id}>
                        {s.state_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-danger">{errors.state?.message}</p>
                </div>

                {/* City */}
                <div className="col-md-4">
                  <label className="fw-semibold">City</label>
                  <select
                    className="form-select form-control"
                    {...register("city")} 
                    disabled={!cities.length}
                  >
                    <option value="">Select City</option>
                    {cities.map((c) => (
                      <option key={c.city_id} value={c.city_id}>
                        {c.city_name}
                      </option>
                    ))}
                  </select>

                  <p className="text-danger">{errors.city?.message}</p>
                </div>

                {/* Join Date */}
                <div className="col-md-4">
                  <label className="fw-semibold">Join Date</label>
                  <input
                    type="date"
                    {...register("joindate")}
                    className="form-control"
                  />
                  <p className="text-danger">{errors.joindate?.message}</p>
                </div>

                {/* Aadhaar */}
                <div className="col-md-4">
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
                <div className="col-md-4">
                  <label className="fw-semibold">PAN Number</label>
                  <input
                    type="text"
                    {...register("pan")}
                    className="form-control"
                    placeholder="Enter PAN Number"
                  />
                  <p className="text-danger">{errors.pan?.message}</p>
                </div>

                {/* Aadhaar Upload */}
                <div className="col-md-4">
                  <label className="fw-semibold">
                    Aadhar Card Upload
                    {User.user_aadhar_image && (
                      <i className="fa-solid fa-circle-check text-success ms-2"></i>
                    )}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => uploadFile(e, "user_aadhar_image")}
                  />
                  <input type="hidden" {...register("adharupload")} />

                  <p className="text-danger">{errors.adharupload?.message}</p>
                </div>

                {/* PAN Upload */}
                <div className="col-md-4">
                  <label className="fw-semibold">
                    PAN Card Upload
                    {User.user_pan_image && (
                      <i className="fa-solid fa-circle-check text-success ms-2"></i>
                    )}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => uploadFile(e, "user_pan_image")}
                  />
                  <input type="hidden" {...register("panupload")} />
                  <p className="text-danger">{errors.panupload?.message}</p>
                </div>

                {/* Bank */}
                <div className="col-md-4">
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
                <div className="col-md-4">
                  <label className="fw-semibold">Experience</label>
                  <input
                    type="text"
                    {...register("experience")}
                    className="form-control"
                    placeholder="Enter Experience"
                  />
                  <p className="text-danger">{errors.experience?.message}</p>
                </div>

                {/* Role */}
                <div className="col-md-4">
                  <label className="fw-semibold">Role</label>
                  <select
                    {...register("role")}
                    className="form-select form-control"
                  >
                    <option value="">Selete Role</option>
                    <option value="1">Super Admin</option>
                    <option value="2">Sub Admin</option>
                    <option value="3">Backend</option>
                    <option value="4">Accountant</option>
                  </select>
                  <p className="text-danger">{errors.role?.message}</p>
                </div>

                {/* Menus */}
                <div className="col-md-4">
                  <label className="fw-semibold">Menus</label>
                  <select
                    className="form-select form-control"
                    multiple
                    {...register("menus")}
                  >
                    <option value="1">Dashboard</option>
                    <option value="2">Job</option>
                    <option value="3">Candidate</option>
                    <option value="4">Applicant</option>
                    <option value="5">Interview</option>
                    <option value="6">Employer</option>
                    <option value="7">Packages</option>
                    <option value="8">Offers</option>
                    <option value="9">Contact</option>
                    <option value="10">User</option>
                  </select>
                  <p className="text-danger">{errors.menus?.message}</p>
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

export default Users;
