import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import * as yup from "yup";
import Pagination from "./commenuse/Pagination";

function Employes() {
  // tital of tab
  useState(() => {
    document.title = "Hirelink | Employers ";
  }, []);

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      fullname: "Harshal Mahajan",
      email: "harshal1@gmail.com",
      mobile: "9876543201",
      companyname: "HireLink Pvt Ltd",
      Category: "Percentage",
      password: "Harshal@123",
      location: "Main Road",
      city: "Mumbai",
      state: "Maharashtra",
      website: "https://hirelink.in",
      linkedin: "https://linkedin.com/in/harshal",
      facebook: "https://facebook.com/harshal",
      instagram: "https://instagram.com/harshal",
      youtube: "https://youtube.com/harshal",
    },
  ]);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    companyname: "",
    Category: "",
    password: "",
    location: "",
    city: "",
    state: "",
    website: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddUserr = (e) => {
    e.preventDefault();

    const newUser = { id: Date.now(), ...formData };
    setUsers([...users, newUser]);

    setFormData({
      fullname: "",
      email: "",
      mobile: "",
      companyname: "",
      Category: "",
      password: "",
      location: "",
      city: "",
      state: "",
      website: "",
      linkedin: "",
      facebook: "",
      instagram: "",
      youtube: "",
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

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid 10-digit mobile number")
      .required("Mobile number is required"),
    companyname: Yup.string().required("Company name is required"),
    Category: Yup.string().required("Please select a category"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    location: Yup.string().required("Location is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),

    website: yup
      .string()
      .url("Please enter a valid website link (https://...)")
      .required("Website is required"),

    linkedin: yup
      .string()
      .url("Enter a valid LinkedIn link")
      .matches(/linkedin\.com/, "Link must be a LinkedIn profile URL")
      .required("LinkedIn link is required"),

    facebook: yup
      .string()
      .url("Enter a valid Facebook link")
      .matches(/facebook\.com/, "Link must be a Facebook profile URL")
      .required("Facebook link is required"),

    instagram: yup
      .string()
      .url("Enter a valid Instagram link")
      .matches(/instagram\.com/, "Link must be an Instagram profile URL")
      .required("Instagram link is required"),

    youtube: yup
      .string()
      .url("Enter a valid YouTube link")
      .matches(
        /(youtube\.com|youtu\.be)/,
        "Link must be a YouTube channel/video URL"
      )
      .required("YouTube link is required"),
  });

  // ---------------------------
  // 2. React Hook Form
  // ---------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // ---------------------------
  // 3. Submit Handler
  // ---------------------------
  const onSubmit = (data) => {
    console.log("User Saved:", data);
    alert("User Saved Successfully!");
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
      <div className="card shadow-sm p-3">
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
        <div className="table-responsive" style={{ overflowX: "hidden" }}>
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
              {/* Example Row */}
              <tr>
                <td className="text-center fw-bold">1</td>

                {/* User Details */}
                <td style={{ width: "35%" }}>
                  <b>Full Name:</b> Harshala Chavan <br />
                  <b>Email:</b> harshala@example.com <br />
                  <b>Mobile:</b> 9876543210 <br />
                  {/* <b>Password:</b> ******** <br /> */}
                  <b>Location:</b> Pune <br />
                  <b>City:</b> Pune <br />
                  <b>State:</b> Maharashtra
                </td>

                {/* Company Details */}
                <td style={{ width: "30%" }}>
                  <b>Company Name:</b> Monk Vision Pvt Ltd <br />
                  <b>Category:</b> IT / Software <br />
                  <b>Website:</b> https://monkvision.com <br />
                </td>

                {/* Social Media */}
                <td style={{ width: "25%" }}>
                  <b>LinkedIn:</b> linkedin.com/xyz <br />
                  <b>Facebook:</b> facebook.com/xyz <br />
                  <b>Instagram:</b> instagram.com/xyz <br />
                  <b>YouTube:</b> youtube.com/xyz
                </td>

                {/* Registration Date */}
                <td className="text-center">2025-12-09</td>
              </tr>
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
                <div className="col-md-4">
                  <label className="fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                    {...register("fullname")}
                  />
                  <span className="text-danger">
                    {errors.fullname?.message}
                  </span>
                </div>

                {/* Email */}
                <div className="col-md-4">
                  <label className="fw-semibold">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Email"
                    {...register("email")}
                  />
                  <span className="text-danger">{errors.email?.message}</span>
                </div>

                {/* Mobile */}
                <div className="col-md-4">
                  <label className="fw-semibold">Mobile</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Mobile Number"
                    {...register("mobile")}
                  />
                  <span className="text-danger">{errors.mobile?.message}</span>
                </div>

                {/* Company Name */}
                <div className="col-md-4">
                  <label className="fw-semibold">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Company Name"
                    {...register("companyname")}
                  />
                  <span className="text-danger">
                    {errors.companyname?.message}
                  </span>
                </div>

                {/* Category */}
                <div className="col-md-4">
                  <label className="fw-semibold">Category</label>
                  <select className="form-select form-control" {...register("Category")}>
                    <option value="">Select Category</option>
                    <option value="Percentage">Percentage</option>
                    <option value="Flat Amount">Flat Amount</option>
                  </select>
                  <span className="text-danger">
                    {errors.Category?.message}
                  </span>
                </div>

                {/* Password */}
                <div className="col-md-4">
                  <label className="fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    {...register("password")}
                  />
                  <span className="text-danger">
                    {errors.password?.message}
                  </span>
                </div>

                {/* Location */}
                <div className="col-md-4">
                  <label className="fw-semibold">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Location"
                    {...register("location")}
                  />
                  <span className="text-danger">
                    {errors.location?.message}
                  </span>
                </div>

                {/* City */}
                <div className="col-md-4">
                  <label className="fw-semibold">City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter City"
                    {...register("city")}
                  />
                  <span className="text-danger">{errors.city?.message}</span>
                </div>

                {/* State */}
                <div className="col-md-4">
                  <label className="fw-semibold">State</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter State"
                    {...register("state")}
                  />
                  <span className="text-danger">{errors.state?.message}</span>
                </div>

                {/* Website */}
                <div className="col-md-4">
                  <label className="fw-semibold">Website</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Website Link"
                    {...register("website")}
                  />
                  <span className="text-danger">{errors.website?.message}</span>
                </div>

                <div className="col-md-4">
                  <label className="fw-semibold">LinkedIn</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter LinkedIn Link"
                    {...register("linkedin")}
                  />
                  <span className="text-danger">
                    {errors.linkedin?.message}
                  </span>
                </div>

                <div className="col-md-4">
                  <label className="fw-semibold">Facebook</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Facebook Link"
                    {...register("facebook")}
                  />
                  <span className="text-danger">
                    {errors.facebook?.message}
                  </span>
                </div>

                <div className="col-md-4">
                  <label className="fw-semibold">Instagram</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Instagram Link"
                    {...register("instagram")}
                  />
                  <span className="text-danger">
                    {errors.instagram?.message}
                  </span>
                </div>

                <div className="col-md-4">
                  <label className="fw-semibold">YouTube</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter YouTube Link"
                    {...register("youtube")}
                  />
                  <span className="text-danger">{errors.youtube?.message}</span>
                </div>
              </div>

              {/* Submit */}

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
    </>
  );
}

export default Employes;
