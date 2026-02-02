import React, { useState, useEffect } from "react";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Pagination from "./commenuse/Pagination";
import { BASE_URL } from "../config/constants";
import TableSkeleton from "./commenuse/TableSkeleton";
import SearchableDropdown from "./SearchableDropdown";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Staff() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const employer = JSON.parse(localStorage.getItem("employer"));

  const role = auth?.role;
  const employerId = auth?.emp_id;

  const employerEmail = auth?.emp_email || employer?.emp_email;

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ================= EDUCATION =================
  const [educationType, setEducationType] = useState("");
  const [educationDetail, setEducationDetail] = useState("");

  const educationOptions = {
    Diploma: ["D.Pharm"],
    Graduation: ["B.Sc", "B.Pharm"],
    "Post Graduation": ["M.Sc", "M.Pharm"],
    Other: [],
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

  // ================= GET STAFF =================
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      let res;

      // ✅ ADMIN / SUBADMIN / BACKEND / ACCOUNTANT → ALL STAFF
      if (["1", "2", "3", "4", "5"].includes(String(role))) {
        res = await axios.get(
          `${BASE_URL}admin/getdata/tbl_staff`,
        );
      }

      // ✅ EMPLOYER → ONLY HIS STAFF
      if (Number(role) === 100) {
        res = await axios.get(
          `${BASE_URL}admin/getdatawhere/tbl_staff/staff_employer_id/${employerId}`,
        );
      }

      if (res?.data?.status === true) {
        setUsers(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load staff ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= PAGINATION ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 100;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const records = users.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(users.length / recordsPerPage);

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
        `${BASE_URL}admin/deletedata/tbl_staff/staff_id/${deleteId}`,
      );

      if (res.data.status === true) {
        setShowDeleteModal(false);
        setDeleteId(null);
        fetchUsers();
      } else {
        toast.error("Delete failed ❌");
      }
    } catch (err) {
      toast.error("Delete error ❌");
    }
  };

  /* ================= FILE STATE ================= */
  const [User, setUser] = useState({
    // staff_aadhar_image: "",
    // staff_pan_image: "",
    staff_bankpassbook: "",
  });

  /* ================= VALIDATION ================= */
  const addschema = yup.object({
    fullname: yup.string().required(),
    email: yup.string().email().required(),
    mobile: yup
      .string()
      .matches(/^\d{10}$/)
      .required(),
    password: yup.string().min(6, "Minimum 6 characters").required(),
    location: yup.string().required(),
    address: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    joindate: yup.date().required(),
    // adharupload: yup.string().required("Aadhar upload required"),
    // panupload: yup.string().required("PAN upload required"),
    bankpassbook: yup.string().required("BackPassbook upload required"),
    experience: yup.string().required(),
    education_type: yup.string().required("Education Type is required"),
    education_detail: yup.string().required("Education Detail is required"),
    role: yup.string().required(),
    menus: yup.array().min(1).required(),
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
    watch: addWatch,
  } = addForm;

  useEffect(() => {
    const paid = localStorage.getItem("paymentDone");

    if (paid === "true") {
      resetAdd();

      const modalEl = document.getElementById("exampleModal");
      const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();

      localStorage.removeItem("paymentDone");
    }
  }, []);

  /* ================= SUBMIT ================= */
  const onSubmit = async (data) => {
    if (isSubmitting) return; // ✅ double click block

    setIsSubmitting(true); // ✅ disable + spinner start

    try {
      // ✅ Role check
      if (Number(role) !== 100) {
        toast.error("Only Employer can add staff ❌");
        setIsSubmitting(false);
        return;
      }

      // ✅ Employer Id check
      if (!employerId) {
        toast.error("Employer ID missing ❌");
        setIsSubmitting(false);
        return;
      }

      // ✅ Employer Email check
      if (!employerEmail) {
        toast.error("Employer email missing ❌");
        setIsSubmitting(false);
        return;
      }

      // ✅ 1) DUPLICATE CHECK BEFORE PAYMENT
      const dupRes = await axios.post(
        `${BASE_URL}admin/checkStaffDuplicate`,
        {
          email: data.email,
          mobile: data.mobile,
        },
      );

      // ✅ If duplicate found -> stop here (NO PAYMENT)
      if (dupRes.data?.emailExists) {
        toast.error("This email is already registered ❌");
        setIsSubmitting(false);
        return;
      }

      if (dupRes.data?.mobileExists) {
        toast.error("This mobile number is already registered ❌");
        setIsSubmitting(false);
        return;
      }

      // ✅ 2) Create Payload
      const payload = {
        staff_name: data.fullname,
        staff_email: data.email,
        staff_mobile: data.mobile,
        staff_password: data.password,
        staff_location: data.location,
        staff_address: data.address,
        staff_state: data.state,
        staff_city: data.city,
        staff_joindate: data.joindate,
        staff_experience: data.experience,
        staff_education_type: data.education_type,
        staff_education_detail: data.education_detail,
        staff_role: data.role,
        staff_menu_id: data.menus.join(","),
        // staff_aadhar_image: User.staff_aadhar_image,
        // staff_pan_image: User.staff_pan_image,
        staff_adhar: data.adhar,
        staff_pan: data.pan,
        staff_bankpassbook: User.staff_bankpassbook,
        staff_status: "Active",
        staff_employer_id: employerId,
        staff_added_by: employerId,
      };

      // ✅ 3) Save Staff data temporarily
      localStorage.setItem("pendingStaff", JSON.stringify(payload));

      // ✅ 4) Save Payment User
      localStorage.setItem(
        "paymentUser",
        JSON.stringify({
          email: employerEmail,
          name:data.fullname,
          mobile:data.mobile,
          role: "employer_staff",
          for: "staff_add",
          employer_id: employerId,
          returnTo: "/staff",
        }),
      );

      // ✅ 5) Close modal
      const modal = document.getElementById("exampleModal");
      const bsModal =
        window.bootstrap.Modal.getInstance(modal) ||
        new window.bootstrap.Modal(modal);

      bsModal.hide();

      // ✅ 6) Redirect to payment
      window.location.href = "/payment";
    } catch (err) {
      console.error("Staff Submit Error:", err);

      const msg = err?.response?.data?.message;

      toast.error(msg || "Something went wrong ❌");
      setIsSubmitting(false);
    }
  };

  /* ================= FILE UPLOAD ================= */
  const uploadFile = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const minSize = 30 * 1024;
    const maxSize = 50 * 1024;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    const resetRHF = () => {
      if (field === "staff_aadhar_image") addSetValue("adharupload", "");
      if (field === "staff_pan_image") addSetValue("panupload", "");
      if (field === "staff_bankpassbook") addSetValue("bankpassbook", "");
    };

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type ❌ Only JPG / JPEG / PNG allowed");
      e.target.value = "";
      resetRHF();
      return;
    }

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

    const formData = new FormData();
    formData.append(field, file);

    try {
      const res = await axios.post(
        `${BASE_URL}admin/fileupload`,
        formData,
      );

      if (res.data.status) {
        const filename = res.data.files[field];

        setUser((prev) => ({
          ...prev,
          [field]: filename,
        }));

        if (field === "staff_aadhar_image") {
          addSetValue("adharupload", filename, { shouldValidate: true });
        }
        if (field === "staff_pan_image") {
          addSetValue("panupload", filename, { shouldValidate: true });
        }
        if (field === "staff_bankpassbook") {
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

  // ================= EDIT =================
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
    experience: yup.string().required(),
    education_type: yup.string().required("Education Type is required"),
    education_detail: yup.string().required("Education Detail is required"),
    role: yup.string().required(),
    menus: yup.array().min(1).required(),
  });

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
    watch: editWatch,
    setValue: editSetValue,
  } = editForm;

  const [editUserId, setEditUserId] = useState(null);

  const openEditUserModal = (user) => {
    if (!user) return;

    setEditUserId(user.staff_id);

    resetEdit({
      fullname: user.staff_name ?? "",
      email: user.staff_email ?? "",
      mobile: user.staff_mobile ?? "",
      location: user.staff_location ?? "",
      address: user.staff_address ?? "",
      state: user.staff_state ?? "",
      city: user.staff_city ?? "",
      joindate: user.staff_joindate?.split("T")[0] ?? "",
      experience: user.staff_experience ?? "",
      role: user.staff_role ?? "",
      menus: user.staff_menu_id ? user.staff_menu_id.split(",") : [],
      education_type: user.staff_education_type ?? "",
      education_detail: user.staff_education_detail ?? "",
    });

    if (user.staff_state && user.staff_city) {
      fetchCities(user.staff_state, user.staff_city);
    }

    setEducationType(user.staff_education_type ?? "");
    setEducationDetail(user.staff_education_detail ?? "");

    editSetValue("education_type", user.staff_education_type ?? "");
    editSetValue("education_detail", user.staff_education_detail ?? "");

    const modalEl = document.getElementById("editUserModal");
    const modal =
      window.bootstrap.Modal.getInstance(modalEl) ||
      new window.bootstrap.Modal(modalEl);

    modal.show();
  };

  const handleUpdateUser = async (data) => {
    if (!editUserId) {
      toast.error("Staff ID missing ❌");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        staff_name: data.fullname,
        staff_email: data.email,
        staff_mobile: data.mobile,
        staff_location: data.location,
        staff_address: data.address,
        staff_state: data.state,
        staff_city: data.city,
        staff_joindate: data.joindate,
        staff_experience: data.experience,
        staff_education_type: data.education_type,
        staff_education_detail: data.education_detail,
        staff_role: data.role,
        staff_menu_id: Array.isArray(data.menus)
          ? data.menus.join(",")
          : data.menus,
      };

      const response = await axios.post(
        `${BASE_URL}admin/updatedata/tbl_staff/staff_id/${editUserId}`,
        payload,
      );

      if (response?.data?.status === true) {
        toast.success("Staff updated successfully ✅");
        fetchUsers();
        setCities([]);

        const modalEl = document.getElementById("editUserModal");
        const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
        modalInstance?.hide();
      } else {
        toast.error("Staff update failed ❌");
      }
    } catch (error) {
      console.error("Staff Update Error:", error);
      toast.error("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================= MASK =================
  const maskMobile = (mobile) => {
    if (!mobile) return "";
    return "******" + mobile.slice(-4);
  };

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

  // ================= FILTER =================
  const [search, setSearch] = useState("");
  const [experience, setExperience] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredRecords = React.useMemo(() => {
    return records.filter((u) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        u?.staff_name?.toLowerCase().includes(searchValue) ||
        u?.staff_email?.toLowerCase().includes(searchValue) ||
        u?.staff_mobile?.toString().includes(searchValue) ||
        u?.staff_location?.toLowerCase().includes(searchValue) ||
        u?.city_name?.toLowerCase().includes(searchValue) ||
        u?.state_name?.toLowerCase().includes(searchValue);

      let matchesExperience = true;
      if (experience) {
        const exp = Number(u?.staff_experience || 0);
        if (experience === "6 Month") matchesExperience = exp <= 1;
        if (experience === "2 Year") matchesExperience = exp === 2;
        if (experience === "3 Year") matchesExperience = exp === 3;
        if (experience === "4 Year") matchesExperience = exp >= 4;
      }

      const joinDate = u?.staff_joindate ? new Date(u.staff_joindate) : null;

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

  // ================= STATUS CHANGE =================
  const handleStatusChange = async (staffId, newStatus) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}admin/updatedata/tbl_staff/staff_id/${staffId}`,
        {
          staff_status: newStatus,
        },
      );

      if (res.data?.status === true) {
        toast.success(`Status updated to ${newStatus} ✅`);

        setUsers((prev) =>
          prev.map((u) =>
            u.staff_id === staffId ? { ...u, staff_status: newStatus } : u,
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
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <SEO
        title={`${seoConfig.a_staff.title} of ${employer?.emp_companyname
          ?.split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}`}
        description={seoConfig.a_staff.description}
      />

      {/* HEADER */}
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <h3 className="fw-bold mb-3">Staff</h3>

        {/* ✅ ONLY EMPLOYER CAN ADD */}
        {Number(role) === 100 && (
          <div className="ms-auto">
            <button
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              className="btn btn-success"
            >
              <i className="fa fa-plus"></i> Add Staff
            </button>
          </div>
        )}
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
                <th className="fs-6 fw-bold">Staff Detail</th>
                <th className="fs-6 fw-bold">Staff Proof</th>
                <th className="fs-6 fw-bold">Staff Address</th>
                <th className="fs-6 fw-bold">Activity Detail</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <TableSkeleton rows={6} columns={5} />
              ) : filteredRecords.length > 0 ? (
                filteredRecords.map((u, index) => (
                  <tr
                    key={u.staff_id || index}
                    className="text-center align-middle"
                  >
                    <td className="text-center fw-bold">
                      {firstIndex + index + 1}
                    </td>

                    <td className="text-start">
                      <div className="fw-bold">
                        Name:
                        <div className="dropdown d-inline ms-2">
                          <span
                            className="fw-bold text-primary"
                            role="button"
                            data-bs-toggle="dropdown"
                          >
                            {u.staff_name}
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
                                onClick={() => handleDeleteClick(u.staff_id)}
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
                          {maskEmail(u.staff_email)}
                        </span>
                      </div>

                      <div className="fw-bold">
                        Mobile No:{" "}
                        <span className="text-dark fw-normal">
                          {maskMobile(u.staff_mobile)}
                        </span>
                      </div>

                      <div className="fw-bold">
                        Experience:{" "}
                        <span className="text-dark fw-normal">
                          {u.staff_experience} Year
                        </span>
                      </div>
                    </td>

                    <td className="text-start">
                      <div className="fw-bold">
                        Join:{" "}
                        <span className="text-dark fw-normal">
                          {u.staff_joindate?.split("T")[0]}
                        </span>
                      </div>
                    </td>

                    <td className="text-start">
                      <div className="fw-bold">
                        Location:{" "}
                        <span className="text-dark fw-normal">
                          {u.staff_location}
                        </span>
                      </div>
                      <div className="fw-bold">
                        Address:{" "}
                        <span className="text-dark fw-normal">
                          {u.staff_address}
                        </span>
                      </div>
                      <div className="fw-bold">
                        City:{" "}
                        <span className="text-dark fw-normal">
                          {u.city_name}
                        </span>
                      </div>
                      <div className="fw-bold">
                        State:{" "}
                        <span className="text-dark fw-normal">
                          {u.state_name}
                        </span>
                      </div>
                    </td>

                    <td className="text-start">
                      <div className="fw-bold">
                        Status:{" "}
                        <span className="text-dark fw-normal">
                          {Number(role) === 1 ? (
                            <select
                              className={`form-select form-select-sm d-inline w-auto ${
                                u.staff_status === "Active"
                                  ? "border-success"
                                  : "border-danger"
                              }`}
                              value={u.staff_status}
                              onChange={(e) =>
                                handleStatusChange(u.staff_id, e.target.value)
                              }
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                          ) : (
                            <span
                              className={`badge ${
                                u.staff_status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              } ms-2`}
                            >
                              {u.staff_status}
                            </span>
                          )}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">
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

      {/* ADD STAFF MODAL */}
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title fw-bold">Add Staff</h5>
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
                    maxLength={10}
                    placeholder="Enter Mobile Number"
                  />
                  <p className="text-danger">{addErrors.mobile?.message}</p>
                </div>

                {/* Password */}
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
                <div className="col-md-4">
                  <label className="fw-semibold">State</label>
                  <SearchableDropdown
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

                {/* City */}
                <div className="col-md-4">
                  <label className="fw-semibold">City</label>
                  <SearchableDropdown
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
                    maxLength={12}
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
                    maxLength={10}
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
                    {User.staff_aadhar_image && (
                      <i className="fa-solid fa-circle-check text-success ms-2"></i>
                    )}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => uploadFile(e, "staff_aadhar_image")}
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
                    {User.staff_pan_image && (
                      <i className="fa-solid fa-circle-check text-success ms-2"></i>
                    )}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => uploadFile(e, "staff_pan_image")}
                  />
                  <input type="hidden" {...addRegister("panupload")} />
                  <p className="text-danger">{addErrors.panupload?.message}</p>
                </div> */}

                {/* Bank Upload */}
                <div className="col-md-4">
                  <label className="fw-semibold">
                    BankPassbook Upload
                    {User.staff_bankpassbook && (
                      <i className="fa-solid fa-circle-check text-success ms-2"></i>
                    )}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => uploadFile(e, "staff_bankpassbook")}
                  />
                  <input type="hidden" {...addRegister("bankpassbook")} />
                  <p className="text-danger">
                    {addErrors.bankpassbook?.message}
                  </p>
                </div>

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
                    <option value="5">Other</option>
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
                    <option value="12">Staff</option>
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

                <button
                  type="submit"
                  className="btn btn-success px-4 ms-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Please wait...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* EDIT MODAL (Same UI, only mapping fixed) */}
      <div className="modal fade" id="editUserModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title fw-bold">Edit Staff</h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
            </div>

            <form onSubmit={handleEditSubmit(handleUpdateUser)}>
              <div className="modal-body row">
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

                <div className="col-md-4">
                  <label className="fw-semibold">Join Date</label>
                  <input
                    type="date"
                    {...editRegister("joindate")}
                    className="form-control"
                  />
                  <p className="text-danger">{editErrors.joindate?.message}</p>
                </div>

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

                <div className="col-md-4">
                  <label className="fw-semibold">Role</label>
                  <select
                    {...editRegister("role")}
                    className="form-select form-control"
                  >
                    <option value="">Selete Role</option>
                    <option value="2">Sub Admin</option>
                    <option value="3">Backend</option>
                    <option value="4">Accountant</option>
                    <option value="5">Other</option>
                  </select>
                  <p className="text-danger">{editErrors.role?.message}</p>
                </div>

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
                    <option value="12">Staff</option>
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

export default Staff;
