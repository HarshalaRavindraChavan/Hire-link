import React, { useState, useEffect } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Pagination from "./commenuse/Pagination";
import { toast } from "react-toastify";

function Users() {

  const [User, setUser] = useState({
  user_aadhar_image: "",
  user_pan_image: "",
});
  // tital of tab
  useState(() => {
    document.title = "Hirelink | Users";
  }, []);

  // Example data: States and their cities
  const stateCityData = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    Karnataka: ["Bengaluru", "Mysore", "Mangalore"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    TamilNadu: ["Chennai", "Coimbatore", "Madurai"],
  };

  const [users, setUsers] = useState([]);

  //=============== all Data Disply=============
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
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

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
  const recordsPerPage = 10;
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
        alert("Delete failed");
      }
    } catch (error) {
      console.error("Delete error", error);
      alert("Something went wrong while deleting");
    }
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
    joindate: yup
      .date()
      .typeError("Please select a valid date")
      .required("Join Date is required"),

    adhar: yup
      .string()
      .matches(/^\d{12}$/, "Adhar number must be 12 digits")
      .required("Adhar number is required"),
    pan: yup
      .string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number")
      .required("PAN number is required"),
    adharupload: yup
      .mixed()
      .required("Aadhar Card is required")
      .test(
        "fileSize",
        "File size is too large (max 500kb)",
        (value) => value && value[0] && value[0].size <= 2 * 500 * 1024
      )
      .test(
        "fileType",
        "Only JPG, PNG or PDF allowed",
        (value) =>
          value &&
          value[0] &&
          ["image/jpeg", "image/png", "application/pdf"].includes(value[0].type)
      ),

    panupload: yup
      .mixed()
      .required("PAN Card is required")
      .test(
        "fileSize",
        "File size is too large (max 500kb)",
        (value) => value && value[0] && value[0].size <= 2 * 500 * 1024
      )
      .test(
        "fileType",
        "Only JPG, PNG or PDF allowed",
        (value) =>
          value &&
          value[0] &&
          ["image/jpeg", "image/png", "application/pdf"].includes(value[0].type)
      ),
    bankpassbook: yup.string().required("Bank passbook details are required"),
    experience: yup.string().required("Experience is required"),
    role: yup.string().required("Please select a role"),
    menus: yup
      .array()
      .min(1, "Select at least one menu")
      .required("Select the menus"),
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

  const uploadFile = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const minSize = 30 * 1024; // 30 KB
    const maxSize = 50 * 1024; // 50 KB

    // TYPE CHECK
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG files are allowed");
      e.target.value = "";
      return;
    }

    // SIZE CHECK
    if (file.size < minSize || file.size > maxSize) {
      toast.error("File size must be between 30 KB and 50 KB");
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append(fieldName, file); // 🔥 KEY MUST MATCH BACKEND

    try {
      const res = await axios.post(
        "https://norealtor.in/hirelink_apis/admin/fileupload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.status) {
        const filename = res.data.files[fieldName];

        setUser((prev) => ({
          ...prev,
          [fieldName]: filename, // save file name
        }));

        toast.success(
          `${
            fieldName === "user_aadhar_image" ? "Aadhar" : "PAN"
          } uploaded successfully ✅`
        );
      } else {
        toast.error("File upload failed ❌");
      }
    } catch (err) {
      toast.error("File upload failed ❌");
      console.error(err);
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

        <table className="table table-bordered">
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
                .map((u) => (
                  <tr key={u.user_id} className="text-center align-middle">
                    <td>{u.user_id}</td>
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
                          {u.user_city}
                        </span>
                      </div>
                      <div className="fw-bold">
                        State:{"  "}
                        <span className="text-dark fw-normal">
                          {u.user_state}
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
                <div className="col-md-4">
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
                <div className="col-md-4">
                  <label className="fw-semibold">Join Date</label>
                  <input
                    type="date"
                    {...register("joindate")}
                    className="form-control"
                  />
                  <p className="text-danger">{errors.joindate?.message}</p>
                </div>

                {/* Adhar */}
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

                {/* adhar Upload */}
                <div className="col-md-4">
                  <label className="fw-semibold">Aadhar Card Upload</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/png, image/jpeg"
                    {...register("adharupload")}
                    onChange={(e) => uploadFile(e, "user_aadhar_image")}
                  />
                  <p className="text-danger">{errors.adharupload?.message}</p>
                </div>

                {/* PAN Upload */}
                <div className="col-md-4">
                  <label className="fw-semibold">PAN Card Upload</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/png, image/jpeg"
                    {...register("panupload")}
                    onChange={(e) => uploadFile(e, "user_pan_image")}
                  />
                  <p className="text-danger">{errors.panupload?.message}</p>
                </div>

                {/* Bank Passbook */}
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
                <div className="col-md-4 ">
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
                    className="form-select form-control"
                    {...register("role")}
                  >
                    <option value="">Selete Role</option>
                    <option>Super Admin</option>
                    <option>Sub Admin</option>
                    <option>Backend</option>
                    <option>Accountant</option>
                  </select>
                  <p className="text-danger">{errors.role?.message}</p>
                </div>

                {/* menus */}
                {/* <div className="col-md-4">
                  <label className="fw-semibold">Menus</label>
                  <select
                    className="form-select form-control"
                    multiple
                    {...register("menus", {
                      onChange: (e) => {
                        const values = Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        );
                        // React Hook Form ला array value द्या
                        e.target.value = values;
                      },
                    })}
                  >
                    <option value="Dashboard">Dashboard</option>
                    <option value="Job">Job</option>
                    <option value="Candidate">Candidate</option>
                    <option value="Interview">Interview</option>
                    <option value="Employer">Employer</option>
                    <option value="Packages">Packages</option>
                    <option value="Offers">Offers</option>
                    <option value="Contact">Contact</option>
                    <option value="User">User</option>
                  </select>

                  <p className="text-danger">{errors.menus?.message}</p>
                </div> */}
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
