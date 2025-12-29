import React, { useState, useEffect } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Pagination from "./commenuse/Pagination";
import { toast } from "react-toastify";

function Employes() {
  // tital of tab
  useEffect(() => {
    document.title = "Hirelink | Employers";
  }, []);

  const [search, setSearch] = useState("");
  const [employer, setEmployer] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployers();
  }, []);

  const fetchEmployers = async () => {
    try {
      const res = await axios.get(
        "https://norealtor.in/hirelink_apis/admin/getdata/tbl_employer"
      );

      if (res.data.status === true) {
        setEmployer(res.data.data);
      }
    } catch (error) {
      console.error("Error Employer Fetch:", error);
    }
  };

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const records = employer.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(employer.length / recordsPerPage);

  // DELETE
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await axios.get(
        `https://norealtor.in/hirelink_apis/admin/deletedata/tbl_employer/emp_id/${deleteId}`
      );

      if (res.data.status === true) {
        setShowDeleteModal(false);
        setDeleteId(null);

        fetchEmployers();
      } else {
        toast.error("Employer delete failed");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Server error while deleting employer");
    }
  };

  const validationSchema = Yup.object().shape({
    emp_name: Yup.string().required("Full name is required"),

    emp_email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    emp_mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid 10-digit mobile number")
      .required("Mobile number is required"),

    emp_password: Yup.string()
      .min(6, "Password must be 6 characters")
      .required("Password is required"),

    emp_companyname: Yup.string().required("Company name is required"),

    emp_location: Yup.string().required("Location is required"),

    emp_city: Yup.string().required("City is required"),

    emp_state: Yup.string().required("State is required"),
  });

  // 2. React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue, // ✅ MUST ADD
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  });

  const empLogo = watch("emp_logo");

  // Submit form as JSON
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        emp_name: data.emp_name,
        emp_email: data.emp_email,
        emp_mobile: data.emp_mobile,
        emp_password: data.emp_password,
        emp_companyname: data.emp_companyname,
        emp_location: data.emp_location,
        emp_city: data.emp_city,
        emp_state: data.emp_state,
        emp_website: data.emp_website,
        emp_linkedin: data.emp_linkedin,
        emp_facebook: data.emp_Facebook,
        emp_instagram: data.emp_Instagram,
        emp_youtube: data.emp_YouTube,
        emp_com_logo: data.emp_logo, // ✅ FILE NAME
      };

      const res = await axios.post(
        "https://norealtor.in/hirelink_apis/employer/insert/tbl_employer",
        payload
      );

      if (res.data.status === true) {
        toast.success("Employer added successfully");

        // ✅ 1. reset form
        reset();

        // ✅ 2. refresh table
        fetchEmployers();

        // ✅ 3. close modal
        const modal = document.getElementById("exampleModal");
        const bsModal = window.bootstrap.Modal.getInstance(modal);
        bsModal.hide();
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong while adding employer";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ============ File Upload API ============
  const uploadFile = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const minSize = 30 * 1024;
    const maxSize = 50 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type ❌ Only JPG / JPEG / PNG allowed");
      e.target.value = "";
      return;
    }

    if (file.size < minSize) {
      toast.error(
        `File too small ❌ (${Math.round(
          file.size / 1024
        )}KB). Minimum 30KB required`
      );
      e.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      toast.error(
        `File too large ❌ (${Math.round(
          file.size / 1024
        )}KB). Maximum 50KB allowed`
      );
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append(fieldName, file);

    try {
      const res = await axios.post(
        "https://norealtor.in/hirelink_apis/candidate/fileupload",
        formData
      );

      if (res.data.status === true) {
        const filename = res.data.files[fieldName];
        setValue(fieldName, filename);
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
        <h3 className="fw-bold mb-3">Employers</h3>

        <div className="ms-auto">
          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-success"
          >
            <i className="fa fa-plus"></i> Add Employer
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm p-3 border">
        {/* 🔍 FILTER ROW */}
        <div className="row g-2 align-items-center mb-3">
          {/* Category */}
          <div className="col-12 col-md-2">
            <select className="form-select  form-control">
              <option value="">Select Categor</option>
              <option>IT</option>
              <option>Finance</option>
              <option>Marketing</option>
              <option>HR</option>
            </select>
          </div>

          {/* From Date */}
          <div className="col-6 col-md-2">
            <input type="date" className="form-control" />
          </div>

          {/* To Date */}
          <div className="col-6 col-md-2">
            <input type="date" className="form-control" />
          </div>

          {/* Submit + Reset */}
          <div className="col-12 col-md-3 d-flex justify-content-md-start justify-content-between">
            <button className="btn px-4 me-2 btn-success">Submit</button>

            <button className="btn btn-light border px-3">
              <i className="fa fa-refresh"></i>
            </button>
          </div>

          {/* Search */}
          <div className="col-12 col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle mb-0">
            <thead className="table-light text-center">
              <tr>
                <th>ID</th>
                <th>User Details</th>
                <th>Company Details</th>
                <th>Social Media</th>
                <th>Registration Date</th>
              </tr>
            </thead>

            <tbody>
              {records.length > 0 ? (
                records.map((emp, index) => (
                  <tr key={emp.emp_id || index}>
                    <td className="text-center fw-bold">
                      {firstIndex + index + 1}
                    </td>

                    {/* User Details */}
                    <td style={{ width: "35%" }}>
                      <div className="fw-bold">
                        Name:
                        <div className="dropdown d-inline ms-2">
                          <span
                            className="fw-bold text-primary"
                            role="button"
                            data-bs-toggle="dropdown"
                          >
                            {emp.emp_name}
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
                                onClick={() => handleDeleteClick(emp.emp_id)}
                              >
                                <i className="fas fa-trash me-2"></i>Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <b>Email:</b> {emp.emp_email} <br />
                      <b>Mobile:</b> {emp.emp_mobile} <br />
                      <b>Location:</b> {emp.emp_location} <br />
                      <b>City:</b> {emp.emp_city} <br />
                      <b>State:</b> {emp.emp_state}
                    </td>

                    {/* Company Details */}
                    <td style={{ width: "30%" }}>
                      <b>Company:</b> {emp.emp_companyname} <br />
                      <b>Website:</b> {emp.emp_website}
                    </td>

                    {/* Social Media */}
                    <td style={{ width: "25%" }}>
                      <b>LinkedIn:</b> {emp.emp_linkedin} <br />
                      <b>Facebook:</b> {emp.emp_facebook} <br />
                      <b>Instagram:</b> {emp.emp_instagram} <br />
                      <b>YouTube:</b> {emp.emp_youtube}
                    </td>

                    {/* Registration Date */}
                    <td className="text-center">{emp.emp_added_date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Employers Found
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

      {/* Delete Modal */}
      <ConfirmDelete
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* ADD FORM MODAL */}
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4">
            <div className="modal-header  text-white bg-success">
              <h5 className="modal-title fw-bold" style={{ color: "white" }}>
                Add Employer
              </h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body row">
                {/* Full Name */}
                <div className="col-12 col-sm-6 col-md-4 mb-2">
                  <label className="fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                    {...register("emp_name", {
                      required: "Full Name is required",
                    })}
                  />
                  <span className="text-danger">
                    {errors.emp_name?.message}
                  </span>
                </div>

                {/* Email */}
                <div className="col-12 col-sm-6 col-md-4 mb-2">
                  <label className="fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    {...register("emp_email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  <span className="text-danger">
                    {errors.emp_email?.message}
                  </span>
                </div>

                {/* Mobile No */}
                <div className="col-12 col-sm-6 col-md-4 mb-2">
                  <label className="fw-semibold">Mobile No</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Email"
                    {...register("emp_mobile")}
                  />
                  <span className="text-danger">
                    {errors.emp_mobile?.message}
                  </span>
                </div>

                {/* Password */}
                <div className="col-12 col-sm-6 col-md-4 mb-2">
                  <label className="fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    {...register("emp_password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters" },
                    })}
                  />
                  <span className="text-danger">
                    {errors.emp_password?.message}
                  </span>
                </div>

                {/* Company Name */}
                <div className="col-12 col-sm-6 col-md-4 mb-2">
                  <label className="fw-semibold">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Company Name"
                    {...register("emp_companyname", {
                      required: "Company Name is required",
                    })}
                  />
                  <span className="text-danger">
                    {errors.emp_companyname?.message}
                  </span>
                </div>

                {/* Company Logo */}
                <div className="col-12 col-sm-6 col-md-4 mb-2">
                  <label className="fw-semibold">
                    Company Logo
                    {empLogo && (
                      <i className="fa-solid fa-circle-check text-success ms-2"></i>
                    )}
                  </label>

                  {/* FILE INPUT */}
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => uploadFile(e, "emp_logo")}
                  />

                  {/* HIDDEN INPUT (IMPORTANT) */}
                  <input type="hidden" {...register("emp_logo")} />
                </div>

                {/* Location */}
                <div className="col-12 col-sm-6 col-md-4 mb-2">
                  <label className="fw-semibold">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Location"
                    {...register("emp_location", {
                      required: "Location is required",
                    })}
                  />
                  <span className="text-danger">
                    {errors.emp_location?.message}
                  </span>
                </div>

                {/* City */}
                <div className="col-12 col-sm-6 col-md-4 mb-2">
                  <label className="fw-semibold">City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter City"
                    {...register("emp_city", { required: "City is required" })}
                  />
                  <span className="text-danger">
                    {errors.emp_city?.message}
                  </span>
                </div>

                {/* State */}
                <div className="col-12 col-sm-6 col-md-4 mb-2">
                  <label className="fw-semibold">State</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter State"
                    {...register("emp_state", {
                      required: "State is required",
                    })}
                  />
                  <span className="text-danger">
                    {errors.emp_state?.message}
                  </span>
                </div>

                {/* Website */}
                <div className="col-12 col-sm-6 col-md-4 mb-2">
                  <label className="fw-semibold">Website</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Website"
                    {...register("emp_website")}
                  />
                </div>

                {/* LinkedIn */}
                <div className="col-12 col-sm-6 col-md-4 mb-2">
                  <label className="fw-semibold">LinkedIn</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter LinkedIn"
                    {...register("emp_linkedin")}
                  />
                </div>

                {/* Facebook */}
                <div className="col-12 col-sm-6 col-md-4 mb-2">
                  <label className="fw-semibold">Facebook</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Facebook"
                    {...register("emp_Facebook")}
                  />
                </div>

                {/* Instagram */}
                <div className="col-12 col-sm-6 col-md-4 mb-2">
                  <label className="fw-semibold">Instagram</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Instagram"
                    {...register("emp_Instagram")}
                  />
                </div>

                {/* YouTube */}
                <div className="col-12 col-sm-6 col-md-4 mb-2">
                  <label className="fw-semibold">YouTube</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter YouTube"
                    {...register("emp_YouTube")}
                  />
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
                  {loading ? "Processing..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Employes;
