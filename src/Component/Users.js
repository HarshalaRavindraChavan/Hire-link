import React, { useState, useEffect } from "react";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Pagination from "./commenuse/Pagination";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/constants";
import TableSkeleton from "./commenuse/TableSkeleton";
import SearchableDropdown from "./SearchableDropdown";

function Users() {
  const [loading, setLoading] = useState(false);

  // ================= EDUCATION =================
  const [educationType, setEducationType] = useState("");
  const [educationDetail, setEducationDetail] = useState("");

  const educationOptions = {
    Diploma: ["D.Pharm"],
    Graduation: ["B.Sc", "B.Pharm"],
    "Post Graduation": ["M.Sc", "M.Pharm"],
    Other: [], // ✅ ADD
  };

  const [users, setUsers] = useState([]);
  // ================= STATE & CITY =================
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}candidate/getdata/tbl_state`,
      );

      if (res.data?.status) {
        setStates(res.data.data || []);
      }
    } catch (err) {
      console.error("State fetch error", err);
    }
  };

  const fetchCities = async (stateId, selectedCity = null) => {
    try {
      const res = await axios.get(
        `${BASE_URL}candidate/getdatawhere/tbl_city/city_state_id/${stateId}`,
      );

      if (res.data?.status) {
        const cityData = res.data.data || [];
        setCities(cityData);

        // ✅ IMPORTANT: wait till cities set, then set city
        if (selectedCity) {
          setTimeout(() => {
            editSetValue("city", selectedCity, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }, 0);
        }
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
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}admin/getdata/tbl_user`,
      );
      if (res.data.status === true) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= PAGINATION ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 100;

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
        `${BASE_URL}admin/deletedata/tbl_user/user_id/${deleteId}`,
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
    // user_aadhar_image: "",
    // user_pan_image: "",
    user_bankpassbook: "", // ✅ ADD THIS
  });

  /* ================= VALIDATION ================= */
  const addschema = yup.object({
    fullname: yup.string().required("Full name is required"),

    email: yup.string().email("Invalid email").required("Email is required"),

    mobile: yup
      .string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),

    password: yup
      .string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),

    location: yup.string().required("Location is required"),
    address: yup.string().required("Address is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    joindate: yup.date().required("Join date is required"),
    adhar: yup
      .string()
      .required("Aadhar number is required")
      .matches(/^[0-9]{12}$/, "Aadhar number must be 12 digits"),
    pan: yup
      .string()
      .required("PAN number is required")
      .matches(
        /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
        "Invalid PAN number (eg: ABCDE1234F)",
      ),
    bankpassbook: yup.string().required("Bank passbook upload is required"),
    experience: yup.string().required("Experience is required"),
    education_type: yup.string().required("Education Type is required"),
    education_detail: yup.string().required("Education Detail is required"),
    role: yup.string().required("Role is required"),
    menus: yup.array().min(1, "Select at least one menu").required(),
  });

  // ✅ ADD FORM
  const addForm = useForm({
    resolver: yupResolver(addschema),
    defaultValues: {
      state: "",
      city: "",
      // adharupload: "",
      // panupload: "",
      bankpassbook: "",
    },
  });

  const {
    register: addRegister,
    handleSubmit: handleAddSubmit,
    formState: { errors: addErrors },
    reset: resetAdd,
    setValue: addSetValue,
    watch: addWatch, // ✅ ADD THIS
  } = addForm;

  /* ================= SUBMIT ================= */
  const onSubmit = async (data) => {
    const payload = {
      user_name: data.fullname,
      user_email: data.email,
      user_password: data.password,
      user_mobile: data.mobile,
      user_location: data.location,
      user_address: data.address,
      user_state: data.state,
      user_city: data.city,
      user_joindate: data.joindate,
      user_bankpassbook: data.bankpassbook,
      user_experience: data.experience,
      user_education_type: data.education_type,
      user_education_detail: data.education_detail,
      user_role: data.role,
      user_menu_id: data.menus.join(","),
      // user_aadhar_image: User.user_aadhar_image,
      // user_pan_image: User.user_pan_image,
      user_adhar: User.adhar,
      user_pan: User.pan,
      user_status: "Active",
    };

    try {
      const res = await axios.post(
        `${BASE_URL}admin/insert/tbl_user`,
        payload,
      );

      if (res.data.status) {
        toast.success("User added successfully");

        resetAdd(); // form reset
        setUser({
          // user_aadhar_image: "",
          // user_pan_image: "",
          user_bankpassbook: "",
        });
        // reset file state
        fetchUsers(); // refresh table
        setEducationType("");
        setEducationDetail("");

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

    const minSize = 30 * 1024;
    const maxSize = 50 * 1024;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    // helper to reset RHF value
    const resetRHF = () => {
      // if (field === "user_aadhar_image") addSetValue("adharupload", "");
      // if (field === "user_pan_image") addSetValue("panupload", "");
      if (field === "user_bankpassbook") addSetValue("bankpassbook", "");
    };

    // ❌ file type check
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type ❌ Only JPG / JPEG / PNG allowed");
      e.target.value = "";
      resetRHF();

      return;
    }

    // ❌ file too small
    if (file.size < minSize) {
      toast.error(
        `File too small ❌ (${Math.round(
          file.size / 1024,
        )}KB). Minimum 30KB required`,
      );
      e.target.value = "";
      resetRHF();

      return;
    }

    // ❌ file too large
    if (file.size > maxSize) {
      toast.error(
        `File too large ❌ (${Math.round(
          file.size / 1024,
        )}KB). Maximum 50KB allowed`,
      );
      e.target.value = "";
      resetRHF();

      return;
    }

    // ✅ valid file → upload
    const formData = new FormData();
    formData.append(field, file);

    try {
      const res = await axios.post(
        `${BASE_URL}admin/fileupload`,
        formData,
      );

      if (res.data.status) {
        const filename = res.data.files[field];

        // ✔ icon UI state
        setUser((prev) => ({
          ...prev,
          [field]: filename,
        }));

        // React Hook Form hidden field
        // if (field === "user_aadhar_image") {
        //   addSetValue("adharupload", filename, { shouldValidate: true });
        // }

        // if (field === "user_pan_image") {
        //   addSetValue("panupload", filename, { shouldValidate: true });
        // }

        if (field === "user_bankpassbook") {
          addSetValue("bankpassbook", filename, { shouldValidate: true });
        }

        toast.success("File uploaded successfully ✅");
      } else {
        toast.error("Upload failed ❌");
        resetRHF();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "File upload error ❌");
      resetRHF();
    }
  };

  // Edit model code

  const editSchema = yup.object({
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
    // bankpassbook: yup.string().required(),
    experience: yup.string().required(),
    education_type: yup.string().required("Education Type is required"),
    education_detail: yup.string().required("Education Detail is required"),
    role: yup.string().required(),
    menus: yup.array().min(1).required(),
  });

  // ✅ EDIT FORM
  const editForm = useForm({
    resolver: yupResolver(editSchema),
    defaultValues: {
      state: "",
      city: "",
    },
  });

  const {
    register: editRegister,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors },
    reset: resetEdit,
    watch: editWatch, // ✅ ADD THIS LINE
    setValue: editSetValue,
  } = editForm;

  const [editUserId, setEditUserId] = useState(null);

  const openEditUserModal = (user) => {
    if (!user) return;

    setEditUserId(user.user_id);

    resetEdit({
      fullname: user.user_name ?? "",
      email: user.user_email ?? "",
      mobile: user.user_mobile ?? "",
      location: user.user_location ?? "",
      address: user.user_address ?? "",
      state: user.user_state ?? "",
      city: user.user_city ?? "",
      joindate: user.user_joindate?.split("T")[0] ?? "",
      experience: user.user_experience ?? "",
      role: user.user_role ?? "",
      menus: user.user_menu_id ? user.user_menu_id.split(",") : [],
      education_type: user.user_education_type ?? "",
      education_detail: user.user_education_detail ?? "",
    });

    // ✅ MOST IMPORTANT PART
    if (user.user_state && user.user_city) {
      fetchCities(user.user_state, user.user_city);
    }

    setEducationType(user.user_education_type ?? "");
    setEducationDetail(user.user_education_detail ?? "");

    editSetValue("education_type", user.user_education_type ?? "");
    editSetValue("education_detail", user.user_education_detail ?? "");

    const modalEl = document.getElementById("editUserModal");
    const modal =
      window.bootstrap.Modal.getInstance(modalEl) ||
      new window.bootstrap.Modal(modalEl);

    modal.show();
  };

  const handleUpdateUser = async (data) => {
    if (!editUserId) {
      toast.error("User ID missing");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        user_name: data.fullname,
        user_email: data.email,
        user_mobile: data.mobile,
        user_location: data.location,
        user_address: data.address,
        user_state: data.state,
        user_city: data.city,
        user_joindate: data.joindate,
        // user_bankpassbook: data.bankpassbook,
        user_experience: data.experience,
        user_education_type: data.education_type,
        user_education_detail: data.education_detail,
        user_role: data.role,
        user_menu_id: Array.isArray(data.menus)
          ? data.menus.join(",")
          : data.menus,
      };

      const response = await axios.post(
        `${BASE_URL}admin/updatedata/tbl_user/user_id/${editUserId}`,
        payload,
      );

      if (response?.data?.status === true) {
        toast.success("User updated successfully ✅");
        fetchUsers();

        setCities([]);

        const modalEl = document.getElementById("editUserModal");
        const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
        modalInstance?.hide();
      } else {
        toast.error("User update failed");
      }
    } catch (error) {
      console.error("User Update Error:", error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // mobile number star code
  const maskMobile = (mobile) => {
    if (!mobile) return "";
    return "******" + mobile.slice(-4);
  };

  // email hide code
  const maskEmail = (email) => {
    if (!email) return "";

    const [name, domain] = email.split("@");
    if (!domain) return email;

    const maskedName =
      name.length <= 2
        ? name[0] + "*"
        : name.slice(0, 2) + "*".repeat(name.length - 2);

    return `${maskedName}@${domain}`;
  };

  // filter code
  const [search, setSearch] = useState("");
  const [experience, setExperience] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredRecords = React.useMemo(() => {
    return records
      .filter((u) => String(u.user_id) !== "1") // ✅ keep your old logic
      .filter((u) => {
        const searchValue = search.trim().toLowerCase();

        /* 🔍 SEARCH */
        const matchesSearch =
          !searchValue ||
          u?.user_name?.toLowerCase().includes(searchValue) ||
          u?.user_email?.toLowerCase().includes(searchValue) ||
          u?.user_mobile?.toString().includes(searchValue) ||
          u?.user_location?.toLowerCase().includes(searchValue) ||
          u?.city_name?.toLowerCase().includes(searchValue) ||
          u?.state_name?.toLowerCase().includes(searchValue);

        /* 🎯 EXPERIENCE */
        let matchesExperience = true;
        if (experience) {
          const exp = Number(u?.user_experience || 0);
          if (experience === "6 Month") matchesExperience = exp <= 1;
          if (experience === "2 Year") matchesExperience = exp === 2;
          if (experience === "3 Year") matchesExperience = exp === 3;
          if (experience === "4 Year") matchesExperience = exp >= 4;
        }

        /* 📅 DATE */
        const joinDate = u?.user_joindate ? new Date(u.user_joindate) : null;

        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;

        let matchesDate = true;
        if (joinDate) {
          if (from && to) matchesDate = joinDate >= from && joinDate <= to;
          else if (from) matchesDate = joinDate >= from;
          else if (to) matchesDate = joinDate <= to;
        }

        return matchesSearch && matchesExperience && matchesDate;
      });
  }, [records, search, experience, fromDate, toDate]);

  //Status Update Function
  const handleStatusChange = async (userId, newStatus) => {
    try {
      // ✅ optional: loader show
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}admin/updatedata/tbl_user/user_id/${userId}`,
        {
          user_status: newStatus,
        },
      );

      if (res.data?.status === true) {
        toast.success(`Status updated to ${newStatus} ✅`);

        // ✅ UI instant update without refetch
        setUsers((prev) =>
          prev.map((u) =>
            u.user_id === userId ? { ...u, user_status: newStatus } : u,
          ),
        );
      } else {
        toast.error("Status update failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title={seoConfig.a_user.title}
        description={seoConfig.a_user.description}
      />
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
            <select
              className="form-select form-control"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            ></select>
          </div>
          <div className="col-6 col-md-2">
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="col-6 col-md-2">
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-3 d-flex justify-content-md-start justify-content-between">
            <button className="btn px-4 me-2 btn-success">Submit</button>

            <button
              className="btn btn-light border px-3"
              onClick={() => {
                setSearch("");
                setExperience("");
                setFromDate("");
                setToDate("");
                setCurrentPage(1);
              }}
            >
              <i className="fa fa-refresh"></i>
            </button>
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
              {loading ? (
                <TableSkeleton rows={6} columns={5} />
              ) : filteredRecords.length > 0 ? (
                filteredRecords
                  .slice(firstIndex, lastIndex)
                  .filter((u) => String(u.user_id) !== "1")
                  .map((u, index) => (
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
                                <button
                                  className="dropdown-item"
                                  onClick={() => openEditUserModal(u)}
                                >
                                  <i className="fas fa-edit me-2"></i> Edit
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
                          Email:{" "}
                          <span className="text-dark fw-normal">
                            {maskEmail(u.user_email)}
                          </span>
                        </div>

                        <div className="fw-bold">
                          Mobile No:{" "}
                          <span className="text-dark fw-normal">
                            {maskMobile(u.user_mobile)}
                          </span>
                        </div>

                        <div className="fw-bold">
                          Experience:{"  "}
                          <span className="text-dark fw-normal">
                            {u.user_experience} Year
                          </span>
                        </div>
                      </td>

                      {/* User Id Proof */}
                      <td className="text-start">
                        {/* <div className="fw-bold">
                          Aadhar No:{"  "}
                          <span className="text-dark fw-normal">
                            {u.user_adhar}
                          </span>
                        </div> */}
                        {/* <div className="fw-bold">
                          Pan Card No:{"  "}
                          <span className="text-dark fw-normal">
                            {u.user_pan}
                          </span>
                        </div> */}
                        <div className="fw-bold">
                          Join:{" "}
                          <span className="text-dark fw-normal">
                            {u.user_joindate?.split("T")[0]}
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
                        <div className="fw-bold">
                          Status:{" "}
                          <span className="text-dark fw-normal">
                            {/* ✅ Admin can change */}
                            {Number(
                              JSON.parse(localStorage.getItem("auth"))?.role,
                            ) === 1 ? (
                              <select
                                className={`form-select form-select-sm d-inline w-auto ${
                                  u.user_status === "Active"
                                    ? "border-success"
                                    : "border-danger"
                                }`}
                                value={u.user_status}
                                onChange={(e) =>
                                  handleStatusChange(u.user_id, e.target.value)
                                }
                              >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                            ) : (
                              /* ❌ Non admin only view */
                              <span
                                className={`badge ${
                                  u.user_status === "Active"
                                    ? "bg-success"
                                    : "bg-danger"
                                } ms-2`}
                              >
                                {u.user_status}
                              </span>
                            )}
                          </span>
                        </div>

                        <div className="fw-bold ">
                          Added:{"  "}
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

            <form onSubmit={handleAddSubmit(onSubmit)}>
              <div className="modal-body row">
                {/* Full Name */}
                <div className="col-md-4">
                  <label className="fw-semibold">Full Name</label>
                  <input
                    type="text"
                    {...addRegister("fullname")}
                    className="form-control"
                    placeholder="Enter Full Name"
                  />
                  <p className="text-danger">{addErrors.fullname?.message}</p>
                </div>

                {/* Email */}
                <div className="col-md-4">
                  <label className="fw-semibold">Email</label>
                  <input
                    type="text"
                    {...addRegister("email")}
                    className="form-control"
                    placeholder="Enter Email"
                  />
                  <p className="text-danger">{addErrors.email?.message}</p>
                </div>

                {/* Mobile */}
                <div className="col-md-4">
                  <label className="fw-semibold">Mobile</label>
                  <input
                    type="number"
                    {...addRegister("mobile")}
                    className="form-control"
                    placeholder="Enter Mobile Number"
                  />
                  <p className="text-danger">{addErrors.mobile?.message}</p>
                </div>

                {/* password */}
                <div className="col-md-4">
                  <label className="fw-semibold">Password</label>
                  <input
                    type="text"
                    {...addRegister("password")}
                    className="form-control"
                    placeholder="Enter Password"
                  />
                  <p className="text-danger">{addErrors.password?.message}</p>
                </div>

                {/* Address */}
                <div className="col-md-4">
                  <label className="fw-semibold">Address</label>
                  <input
                    type="text"
                    {...addRegister("address")}
                    className="form-control"
                    placeholder="Enter Address"
                  />
                  <p className="text-danger">{addErrors.address?.message}</p>
                </div>

                {/* State */}
                {/* <div className="col-md-4">
                  <label className="fw-semibold">State</label>
                  <select
                    className="form-select form-control"
                    {...addRegister("state")}
                    onChange={(e) => {
                      const stateId = e.target.value;
                      addSetValue("state", stateId);
                      addSetValue("city", ""); // ✅ reset city
                      fetchCities(stateId); // ✅ fetch cities
                    }}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.state_id} value={state.state_id}>
                        {state.state_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-danger">{addErrors.state?.message}</p>
                </div> */}

                <div className="col-md-4">
                  <label className="fw-semibold">State</label>

                  <SearchableDropdown
                    className="form-select form-control"
                    value={addWatch("state")}
                    options={states}
                    placeholder="Select State"
                    searchPlaceholder="Search state..."
                    labelKey="state_name"
                    valueKey="state_id"
                    error={addErrors.state?.message}
                    onChange={(stateId) => {
                      addSetValue("state", stateId, { shouldValidate: true });
                      addSetValue("city", "", { shouldValidate: true });
                      fetchCities(stateId);
                    }}
                  />
                </div>

                {/* city */}
                {/* <div className="col-md-4">
                  <label className="fw-semibold">City</label>
                  <select
                    className="form-select form-control"
                    {...addRegister("city")}
                    disabled={!cities.length}
                  >
                    <option value="">
                      {!cities.length ? "Select state first" : "Select City"}
                    </option>

                    {cities.map((city) => (
                      <option key={city.city_id} value={city.city_id}>
                        {city.city_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-danger">{addErrors.city?.message}</p>
                </div> */}

                <div className="col-md-4">
                  <label className="fw-semibold">City</label>

                  <SearchableDropdown
                    className="form-select form-control"
                    value={addWatch("city")}
                    options={cities}
                    disabled={!cities.length}
                    placeholder={
                      cities.length ? "Select City" : "Select state first"
                    }
                    searchPlaceholder="Search city..."
                    labelKey="city_name"
                    valueKey="city_id"
                    error={addErrors.city?.message}
                    onChange={(cityId) => {
                      addSetValue("city", cityId, { shouldValidate: true });
                    }}
                  />
                </div>

                {/* Location */}
                <div className="col-md-4">
                  <label className="fw-semibold">Location</label>
                  <input
                    type="text"
                    {...addRegister("location")}
                    className="form-control"
                    placeholder="Enter Location"
                  />
                  <p className="text-danger">{addErrors.location?.message}</p>
                </div>

                {/* Join Date */}
                <div className="col-md-4">
                  <label className="fw-semibold">Join Date</label>
                  <input
                    type="date"
                    {...addRegister("joindate")}
                    className="form-control"
                  />
                  <p className="text-danger">{addErrors.joindate?.message}</p>
                </div>

                {/* Aadhaar */}
                <div className="col-md-4">
                  <label className="fw-semibold">Adhar Number</label>
                  <input
                    type="text"
                    {...addRegister("adhar")}
                    className="form-control"
                    placeholder="Enter Adhar Number"
                  />
                  <p className="text-danger">{addErrors.adhar?.message}</p>
                </div>

                {/* PAN */}
                <div className="col-md-4">
                  <label className="fw-semibold">PAN Number</label>
                  <input
                    type="text"
                    {...addRegister("pan")}
                    className="form-control"
                    placeholder="Enter PAN Number"
                  />
                  <p className="text-danger">{addErrors.pan?.message}</p>
                </div>

                {/* Aadhaar Upload */}
                {/* <div className="col-md-4">
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
                  <input type="hidden" {...addRegister("adharupload")} />

                  <p className="text-danger">
                    {addErrors.adharupload?.message}
                  </p>
                </div> */}

                {/* PAN Upload */}
                {/* <div className="col-md-4">
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
                  <input type="hidden" {...addRegister("panupload")} />
                  <p className="text-danger">{addErrors.panupload?.message}</p>
                </div> */}

                {/* Back Upload */}
                <div className="col-md-4">
                  <label className="fw-semibold">
                    BankPassbook Upload
                    {User.user_bankpassbook && (
                      <i className="fa-solid fa-circle-check text-success ms-2"></i>
                    )}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => uploadFile(e, "user_bankpassbook")}
                  />
                  <input type="hidden" {...addRegister("bankpassbook")} />
                  <p className="text-danger">
                    {addErrors.bankpassbook?.message}
                  </p>
                </div>

                {/* Bank */}
                {/* <div className="col-md-4">
                  <label className="fw-semibold">Bank Passbook</label>
                  <input
                    type="text"
                    {...addRegister("bankpassbook")}
                    className="form-control"
                    placeholder="Enter Bank Details"
                  />
                  <p className="text-danger">
                    {addErrors.bankpassbook?.message}
                  </p>
                </div> */}

                {/* Education Type */}
                <div className="col-md-4">
                  <label className="fw-semibold">Education Type</label>
                  <select
                    className="form-select form-control"
                    {...addRegister("education_type")}
                    value={educationType}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEducationType(val);
                      setEducationDetail("");
                      addSetValue("education_type", val, {
                        shouldValidate: true,
                      });
                      addSetValue("education_detail", "", {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="">Select Education</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Post Graduation">Post Graduation</option>
                    <option value="Other">Other</option>
                  </select>
                  <p className="text-danger">
                    {addErrors.education_type?.message}
                  </p>
                </div>

                {/* Education Detail */}
                <div className="col-md-4">
                  <label className="fw-semibold">Education Detail</label>

                  {educationType === "Other" ? (
                    <input
                      type="text"
                      className="form-control round-3"
                      {...addRegister("education_detail")}
                      placeholder="Enter Education"
                      value={educationDetail}
                      onChange={(e) => {
                        setEducationDetail(e.target.value);
                        addSetValue("education_detail", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  ) : (
                    <select
                      className="form-select form-control"
                      {...addRegister("education_detail")}
                      value={educationDetail}
                      onChange={(e) => {
                        setEducationDetail(e.target.value);
                        addSetValue("education_detail", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                      disabled={!educationType}
                    >
                      <option value="">Select</option>
                      {educationOptions[educationType]?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  <p className="text-danger">
                    {addErrors.education_detail?.message}
                  </p>
                </div>

                {/* Experience */}
                <div className="col-md-4">
                  <label className="fw-semibold">Experience</label>
                  <input
                    type="number"
                    {...addRegister("experience")}
                    className="form-control"
                    placeholder="Enter Experience"
                  />
                  <p className="text-danger">{addErrors.experience?.message}</p>
                </div>

                {/* Role */}
                <div className="col-md-4">
                  <label className="fw-semibold">Role</label>
                  <select
                    {...addRegister("role")}
                    className="form-select form-control"
                  >
                    <option value="">Selete Role</option>
                    <option value="2">Sub Admin</option>
                    <option value="3">Backend</option>
                    <option value="4">Accountant</option>
                  </select>
                  <p className="text-danger">{addErrors.role?.message}</p>
                </div>

                {/* Menus */}
                <div className="col-md-4">
                  <label className="fw-semibold">Menus</label>
                  <select
                    className="form-select form-control"
                    multiple
                    {...addRegister("menus")}
                  >
                    <option value="1">Dashboard</option>
                    <option value="2">Job</option>
                    <option value="3">Candidate</option>
                    <option value="4">Applicant</option>
                    <option value="5">Interview</option>
                    <option value="6">Employer</option>
                    {/* <option value="7">Packages</option>
                    <option value="8">Offers</option> */}
                    <option value="9">Contact</option>
                    <option value="10">User</option>
                  </select>
                  <p className="text-danger">{addErrors.menus?.message}</p>
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

      {/* Edit Model Code*/}
      <div className="modal fade" id="editUserModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title fw-bold">Edit User</h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
            </div>

            <form onSubmit={handleEditSubmit(handleUpdateUser)}>
              <div className="modal-body row">
                {/* Full Name */}
                <div className="col-md-4">
                  <label className="fw-semibold">Full Name</label>
                  <input
                    type="text"
                    {...editRegister("fullname")}
                    className="form-control"
                    placeholder="Enter Full Name"
                  />
                  <p className="text-danger">{editErrors.fullname?.message}</p>
                </div>

                {/* Email */}
                <div className="col-md-4">
                  <label className="fw-semibold">Email</label>
                  <input
                    type="text"
                    {...editRegister("email")}
                    className="form-control"
                    placeholder="Enter Email"
                  />
                  <p className="text-danger">{editErrors.email?.message}</p>
                </div>

                {/* Mobile */}
                <div className="col-md-4">
                  <label className="fw-semibold">Mobile</label>
                  <input
                    type="text"
                    {...editRegister("mobile")}
                    className="form-control"
                    placeholder="Enter Mobile Number"
                  />
                  <p className="text-danger">{editErrors.mobile?.message}</p>
                </div>

                {/* Location */}
                <div className="col-md-4">
                  <label className="fw-semibold">Location</label>
                  <input
                    type="text"
                    {...editRegister("location")}
                    className="form-control"
                    placeholder="Enter Location"
                  />
                  <p className="text-danger">{editErrors.location?.message}</p>
                </div>

                {/* Address */}
                <div className="col-md-4">
                  <label className="fw-semibold">Address</label>
                  <input
                    type="text"
                    {...editRegister("address")}
                    className="form-control"
                    placeholder="Enter Address"
                  />
                  <p className="text-danger">{editErrors.address?.message}</p>
                </div>

                {/* State */}
                {/* <div className="col-md-4">
                  <label className="fw-semibold">State</label>
                  <select
                    className="form-select form-control"
                    {...editRegister("state")}
                    onChange={(e) => {
                      const stateId = e.target.value;
                      editSetValue("state", stateId);
                      editSetValue("city", "");
                      fetchCities(stateId);
                    }}
                  >
                    <option value="">Select State</option>
                    {states.map((s) => (
                      <option key={s.state_id} value={s.state_id}>
                        {s.state_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-danger">{editErrors.state?.message}</p>
                </div> */}

                <div className="col-md-4 mt-2">
                  <label className="fw-semibold">State</label>

                  <SearchableDropdown
                    options={states}
                    value={editWatch("state")}
                    labelKey="state_name"
                    valueKey="state_id"
                    placeholder="Select State"
                    searchPlaceholder="Search state..."
                    error={editErrors.state?.message}
                    onChange={(stateId) => {
                      editSetValue("state", stateId, { shouldValidate: true });
                      editSetValue("city", "", { shouldValidate: true });
                      fetchCities(stateId);
                    }}
                  />
                </div>

                {/* City */}
                <div className="col-md-4">
                  <label className="fw-semibold">City</label>

                  <SearchableDropdown
                    options={cities}
                    value={editWatch("city")}
                    disabled={!cities.length}
                    placeholder={
                      !cities.length ? "Select state first" : "Select City"
                    }
                    searchPlaceholder="Search city..."
                    labelKey="city_name"
                    valueKey="city_id"
                    error={editErrors.city?.message}
                    onChange={(cityId) => {
                      editSetValue("city", cityId, { shouldValidate: true });
                    }}
                  />
                </div>

                {/* Join Date */}
                <div className="col-md-4">
                  <label className="fw-semibold">Join Date</label>
                  <input
                    type="date"
                    {...editRegister("joindate")}
                    className="form-control"
                  />
                  <p className="text-danger">{editErrors.joindate?.message}</p>
                </div>

                {/* Bank */}
                {/* <div className="col-md-4">
                  <label className="fw-semibold">Bank Passbook</label>
                  <input
                    type="text"
                    {...editRegister("bankpassbook")}
                    className="form-control"
                    placeholder="Enter Bank Details"
                  />
                  <p className="text-danger">
                    {editErrors.bankpassbook?.message}
                  </p>
                </div> */}

                {/* Education Type */}
                <div className="col-md-4">
                  <label className="fw-semibold">Education Type</label>
                  <select
                    className="form-select"
                    {...editRegister("education_type")}
                    value={educationType}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEducationType(val);
                      setEducationDetail("");
                      editSetValue("education_type", val, {
                        shouldValidate: true,
                      });
                      editSetValue("education_detail", "", {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="">Select Education</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Post Graduation">Post Graduation</option>
                    <option value="Other">Other</option>
                  </select>
                  <p className="text-danger">
                    {editErrors.education_type?.message}
                  </p>
                </div>

                {/* Education Detail */}
                <div className="col-md-4">
                  <label className="fw-semibold">Education Detail</label>

                  {educationType === "Other" ? (
                    <input
                      type="text"
                      className="form-control"
                      {...editRegister("education_detail")}
                      value={educationDetail}
                      onChange={(e) => {
                        setEducationDetail(e.target.value);
                        editSetValue("education_detail", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  ) : (
                    <select
                      className="form-select"
                      {...editRegister("education_detail")}
                      value={educationDetail}
                      onChange={(e) => {
                        setEducationDetail(e.target.value);
                        editSetValue("education_detail", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    >
                      <option value="">Select</option>
                      {educationOptions[educationType]?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  <p className="text-danger">
                    {editErrors.education_detail?.message}
                  </p>
                </div>

                {/* Experience */}
                <div className="col-md-4">
                  <label className="fw-semibold">Experience</label>
                  <input
                    type="number"
                    {...editRegister("experience")}
                    className="form-control"
                    placeholder="Enter Experience"
                  />
                  <p className="text-danger">
                    {editErrors.experience?.message}
                  </p>
                </div>

                {/* Role */}
                <div className="col-md-4">
                  <label className="fw-semibold">Role</label>
                  <select
                    {...editRegister("role")}
                    className="form-select form-control"
                  >
                    <option value="">Selete Role</option>
                    <option value="1">Super Admin</option>
                    <option value="2">Sub Admin</option>
                    <option value="3">Backend</option>
                    <option value="4">Accountant</option>
                  </select>
                  <p className="text-danger">{editErrors.role?.message}</p>
                </div>

                {/* Menus */}
                <div className="col-md-4">
                  <label className="fw-semibold">Menus</label>
                  <select
                    className="form-select form-control"
                    multiple
                    {...editRegister("menus")}
                  >
                    <option value="1">Dashboard</option>
                    <option value="2">Job</option>
                    <option value="3">Candidate</option>
                    <option value="4">Applicant</option>
                    <option value="5">Interview</option>
                    <option value="6">Employer</option>
                    {/* <option value="7">Packages</option>
                    <option value="8">Offers</option> */}
                    <option value="9">Contact</option>
                    <option value="10">User</option>
                  </select>
                  <p className="text-danger">{editErrors.menus?.message}</p>
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
