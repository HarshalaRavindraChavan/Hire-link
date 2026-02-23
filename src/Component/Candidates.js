import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import image from "./logo/no image.jpg";
import Pagination from "./commenuse/Pagination";
import axios from "axios";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/constants";
import TableSkeleton from "./commenuse/TableSkeleton";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";

function Candidates() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));
  const isAdmin = Number(auth?.role) === 1;

  useEffect(() => {
    if (!auth) {
      navigate("/signin");
    }
  }, [auth, navigate]);

  // const [search, setSearch] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // filter code
  const [search, setSearch] = useState("");
  const [experience, setExperience] = useState("");
  const [gender, setGender] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCat1, setSubCat1] = useState([]);
  const [subCat2, setSubCat2] = useState([]);
  const [subCat3, setSubCat3] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSubCat1, setSelectedSubCat1] = useState("");
  const [selectedSubCat2, setSelectedSubCat2] = useState("");
  const [selectedSubCat3, setSelectedSubCat3] = useState("");

  useEffect(() => {
    const paymentUser = JSON.parse(localStorage.getItem("paymentUser") || "{}");
    const paymentDone = localStorage.getItem("paymentDone");

    if (
      paymentDone === "true" &&
      paymentUser?.role === "resume_download" &&
      paymentUser?.resumeFile
    ) {
      const fileUrl = `${BASE_URL}Uploads/${paymentUser.resumeFile}`;

      // ✅ Direct download
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", paymentUser.resumeFile);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // ✅ Clear payment flags
      localStorage.removeItem("paymentDone");
      localStorage.removeItem("paymentUser");
    }
  }, []);

  //==================== get All candidate
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}admin/getdata/tbl_candidate`);

      if (res.data.status === true) {
        setCandidates(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching candidates", error);
    } finally {
      setLoading(false);
    }
  };

  //==================== pagination Code

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 100;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  // 🔁 Reset page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    experience,
    gender,
    fromDate,
    toDate,
    selectedCategory,
    selectedSubCategory,
    selectedSubCat1,
    selectedSubCat2,
    selectedSubCat3,
  ]);

  //============================== Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Open Confirm Delete Modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // DELETE CONFIRM
  const confirmDelete = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}admin/deletedata/tbl_candidate/can_id/${deleteId}`,
      );

      if (res.data.status === true) {
        setShowDeleteModal(false);
        setDeleteId(null);

        fetchCandidates();
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(3, "Minimum 3 characters required")
      .required("Full name is required"),

    email: Yup.string()
      .email("Enter valid email address")
      .required("Email is required"),

    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid 10-digit mobile number")
      .required("Mobile number is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    if (isSubmitting) return; // 🔒 block double submit
    setIsSubmitting(true);

    const payload = {
      can_name: data.fullname,
      can_email: data.email,
      can_mobile: data.mobile,
      can_score: data.can_score,
      // can_city: data.location,
      // can_experience: data.experience,
      // can_skil: data.skill,
      // can_added_date: data.registrationDate,
      // can_photo: User.user_aadhar_image,
      // can_resume: User.user_pan_image,
    };

    try {
      const res = await axios.post(
        `${BASE_URL}admin/insert/tbl_candidate`,
        payload,
      );

      if (res.data.status) {
        toast.success("Candidate added successfully");

        reset(); // form reset
        fetchCandidates(); // refresh table

        const modal = document.getElementById("exampleModal");
        const bsModal =
          window.bootstrap.Modal.getInstance(modal) ||
          new window.bootstrap.Modal(modal);

        bsModal.hide(); // close modal
      } else {
        toast.error("Candidate not added");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false); // 🔓 unlock
    }
  };

  //Status Update Function
  const handleCandidateStatusChange = async (canId, newStatus) => {
    if (isUpdatingStatus) return; // 🔒 block fast clicks
    setIsUpdatingStatus(true);

    try {
      const res = await axios.post(
        `${BASE_URL}admin/updatedata/tbl_candidate/can_id/${canId}`,
        {
          can_status: newStatus,
        },
      );

      if (res.data?.status === true) {
        toast.success(`Status updated to ${newStatus} ✅`);

        // ✅ instant UI update
        setCandidates((prev) =>
          prev.map((c) =>
            c.can_id === canId ? { ...c, can_status: newStatus } : c,
          ),
        );
      } else {
        toast.error("Status update failed ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error ❌");
    } finally {
      setIsUpdatingStatus(false); // 🔓 unlock
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

  const handleResumeDownload = async (candidate) => {
    try {
      const employer = JSON.parse(localStorage.getItem("employer") || "{}");
      const staff = JSON.parse(localStorage.getItem("staff") || "{}");

      if (!employer?.emp_email && !staff?.emp_email) {
        toast.error("Please login as Employer first!");
        navigate("/signin");
        return;
      }

      if (!candidate?.can_id || !candidate?.can_resume) {
        toast.error("Resume not available!");
        return;
      }

      const userEmail = employer?.emp_email || staff?.emp_email;

      // ✅ Check payment done for this employer + this candidate
      const checkRes = await axios.post(
        `${BASE_URL}payment/check-resume-payment`,
        {
          email: userEmail,
          candidate_id: candidate.can_id,
        },
      );

      // ✅ If paid => download resume now
      if (checkRes.data?.status === true && checkRes.data?.paid === true) {
        const fileUrl = `${BASE_URL}Uploads/${candidate.can_resume}`;

        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", candidate.can_resume);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      // ❌ Not paid => redirect to payment page
      // toast.error("Pay ₹60 to download this resume");

      localStorage.setItem(
        "paymentUser",
        JSON.stringify({
          email: employer.emp_email || staff.emp_email,
          name: employer.emp_name || staff.emp_name,
          mobile: employer.emp_mobile || staff.emp_mobile,
          role: "resume_download",
          for: "Resume Download",
          candidate_id: candidate.can_id,
          resumeFile: candidate.can_resume,
          returnTo: "/candidate",
        }),
      );

      navigate("/payment");
    } catch (err) {
      console.log(err);
      toast.error("Payment check failed!");
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      !search ||
      candidate.can_name?.toLowerCase().includes(search.toLowerCase()) ||
      candidate.can_email?.toLowerCase().includes(search.toLowerCase()) ||
      candidate.can_mobile?.includes(search);

    const matchesMainCate =
      !selectedCategory ||
      String(candidate.can_mc) === String(selectedCategory);

    const matchesSubCate =
      !selectedSubCategory ||
      String(candidate.can_sc) === String(selectedSubCategory);

    const matchesSubCate1 =
      !selectedSubCat1 || String(candidate.can_sc1) === String(selectedSubCat1);

    const matchesSubCate2 =
      !selectedSubCat2 || String(candidate.can_sc2) === String(selectedSubCat2);

    const matchesSubCate3 =
      !selectedSubCat3 || String(candidate.can_sc3) === String(selectedSubCat3);

    const matchesExperience =
      !experience ||
      (() => {
        const [min, max] = experience.split("-").map(Number);
        const candidateExp = Number(candidate.can_experience);
        return candidateExp >= min && candidateExp <= max;
      })();

    const matchesGender = !gender || candidate.can_gender === gender;

    const matchesDate =
      (!fromDate ||
        (candidate.register_date &&
          new Date(candidate.register_date) >= new Date(fromDate))) &&
      (!toDate ||
        (candidate.register_date &&
          new Date(candidate.register_date) <= new Date(toDate)));

    return (
      matchesSearch &&
      matchesMainCate &&
      matchesSubCate &&
      matchesSubCate1 &&
      matchesSubCate2 &&
      matchesSubCate3 &&
      matchesExperience &&
      matchesGender &&
      matchesDate
    );
  });

  const records = filteredCandidates.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredCandidates.length / recordsPerPage);

  const handleResetAll = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSelectedSubCat1("");
    setSelectedSubCat2("");
    setSelectedSubCat3("");
    setExperience("");
    setGender("");
    setFromDate("");
    setToDate("");
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}candidate/getdata/tbl_main_category`,
      );
      setCategories(res.data.data || []);
      console.log("Main categories:", res.data.data);
    } catch (err) {
      console.error("Main category error", err);
    }
  };

  //Sub cateagory
  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategories(selectedCategory);
    } else {
      setSubCategories([]);
      setSelectedSubCategory("");
    }
  }, [selectedCategory]);

  const fetchSubCategories = async (mc_id) => {
    try {
      const res = await axios.get(
        `${BASE_URL}candidate/getdatawhere/tbl_subcategory/sc_mc_id/${mc_id}`,
      );
      setSubCategories(res.data.data || []);
    } catch (err) {
      console.error("Sub category error", err);
    }
  };

  //Sub Categoray one
  useEffect(() => {
    if (selectedSubCategory) {
      fetchSubCat1(selectedSubCategory);
    } else {
      setSubCat1([]);
      setSelectedSubCat1("");
    }
  }, [selectedSubCategory]);

  const fetchSubCat1 = async (sc_id) => {
    try {
      const res = await axios.get(
        `${BASE_URL}candidate/getdatawhere/tbl_subcategory_1/sc1_sc_id/${sc_id}`,
      );
      setSubCat1(res.data.data || []);
    } catch (err) {
      console.error("Sub category 1 error", err);
    }
  };

  //Sub Categoray Two
  useEffect(() => {
    if (selectedSubCat1) {
      fetchSubCat2(selectedSubCat1);
    } else {
      setSubCat2([]);
      setSelectedSubCat2("");
    }
  }, [selectedSubCat1]);

  const fetchSubCat2 = async (sc1_id) => {
    try {
      const res = await axios.get(
        `${BASE_URL}candidate/getdatawhere/tbl_subcategory_2/sc2_sc1_id/${sc1_id}`,
      );
      setSubCat2(res.data.data || []);
    } catch (err) {
      console.error("Sub category 2 error", err);
    }
  };

  //Sub Categoray Three
  useEffect(() => {
    if (selectedSubCat2) {
      fetchSubCat3(selectedSubCat2);
    } else {
      setSubCat3([]);
      setSelectedSubCat3("");
    }
  }, [selectedSubCat2]);

  const fetchSubCat3 = async (sc2_id) => {
    try {
      const res = await axios.get(
        `${BASE_URL}candidate/getdatawhere/tbl_subcategory_3/sc3_sc2_id/${sc2_id}`,
      );
      setSubCat3(res.data.data || []);
    } catch (err) {
      console.error("Sub category 3 error", err);
    }
  };

  const handleSubmitData = () => {
    console.log({
      selectedCategory,
      selectedSubCategory,
      selectedSubCat1,
      selectedSubCat2,
      selectedSubCat3,
    });
  };

  return (
    <>
      <SEO
        title={seoConfig.a_candidates.title}
        description={seoConfig.a_candidates.description}
      />
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <div>
          <h3 className="fw-bold mb-3">Candidates</h3>
        </div>
        <div className="ms-auto py-2 py-md-0">
          {/* <a href="#" className="btn btn-label-info btn-round me-2">
              Manage
            </a> */}
          {/* <a
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-success"
          >
            <i className="fa fa-plus"></i> Add Candidates
          </a> */}
        </div>
      </div>

      <div className="card shadow-sm p-3 border">
        {/* 🔍 FILTER ROW */}
        <div className="row g-2 align-items-center mb-3">
          {/* Main Category */}
          <div className="col-12 col-md-2">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Main Category</option>
              {categories.map((cat) => (
                <option key={cat.mc_id} value={cat.mc_id}>
                  {cat.mc_name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Category */}
          <div className="col-12 col-md-2">
            <select
              className="form-select"
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              disabled={!selectedCategory || subCategories.length === 0}
            >
              <option value="">Sub Category</option>
              {subCategories.map((sub) => (
                <option key={sub.sc_id} value={sub.sc_id}>
                  {sub.sc_name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Category 1 */}
          <div className="col-12 col-md-2">
            <select
              className="form-select"
              value={selectedSubCat1}
              onChange={(e) => setSelectedSubCat1(e.target.value)}
              disabled={!selectedSubCategory || subCat1.length === 0}
            >
              <option value="">Sub Category 1</option>
              {subCat1.map((item) => (
                <option key={item.sc1_id} value={item.sc1_id}>
                  {item.sc1_name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Category 2 */}
          <div className="col-12 col-md-2">
            <select
              className="form-select"
              value={selectedSubCat2}
              onChange={(e) => setSelectedSubCat2(e.target.value)}
              disabled={!selectedSubCat1 || subCat2.length === 0}
            >
              <option value="">Sub Category 2</option>
              {subCat2.map((item) => (
                <option key={item.sc2_id} value={item.sc2_id}>
                  {item.sc2_name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Category 3 */}
          <div className="col-12 col-md-2">
            <select
              className="form-select"
              value={selectedSubCat3}
              onChange={(e) => setSelectedSubCat3(e.target.value)}
              disabled={!selectedSubCat2 || subCat3.length === 0}
            >
              <option value="">Sub Category 3</option>
              {subCat3.map((item) => (
                <option key={item.sc3_id} value={item.sc3_id}>
                  {item.sc3_name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="col-12 col-md-2 d-flex justify-content-md-start justify-content-between">
            <button
              className="btn px-4 me-2 btn-success"
              onClick={handleSubmitData}
            >
              Submit
            </button>

            <button
              className="btn btn-light border px-3"
              onClick={handleResetAll}
            >
              <i className="fa fa-refresh"></i>
            </button>
          </div>
        </div>

        <div className="row g-2 align-items-center mb-3">
          <div className="col-12 col-md-2">
            {/* Experience */}
            <select
              className="form-select"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option value="">Experience</option>
              <option value="0-1">0–1 Years</option>
              <option value="1-3">1–3 Years</option>
              <option value="3-5">3–5 Years</option>
            </select>
          </div>

          <div className="col-12 col-md-2">
            {/* Gender */}
            <select
              className="form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* From Date */}
          <div className="col-6 col-md-2">
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          {/* To Date */}
          <div className="col-6 col-md-2">
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          {/* Submit + Reset */}
          <div className="col-12 col-md-2 d-flex justify-content-md-start justify-content-between">
            <button className="btn px-4 me-2 btn-success">Submit</button>

            <button
              className="btn btn-light border px-3"
              onClick={() => {
                setSearch("");
                setExperience("");
                setFromDate("");
                setToDate("");
              }}
            >
              <i className="fa fa-refresh"></i>
            </button>
          </div>

          {/* Search */}
          <div className="col-12 col-md-2">
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
          <table className="table table-bordered align-middle">
            <thead className="table-light text-center">
              <tr className="text-center">
                <th className="fs-6 fw-bold">ID</th>
                <th className="fs-6 fw-bold">Candidate Details</th>
                {/* <th className="fs-6 fw-bold">Profile Photo</th> */}
                <th className="fs-6 fw-bold">Experience</th>
                <th className="fs-6 fw-bold">Resume</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <TableSkeleton rows={6} columns={4} />
              ) : records.length > 0 ? (
                records.map((candidate, index) => (
                  <tr key={candidate.can_id}>
                    <td className="text-center fw-bold">
                      {firstIndex + index + 1}
                    </td>

                    {/* Candidate Info */}
                    <td className="text-start w-auto">
                      <div className="fw-bold">
                        Name:
                        <div className="dropdown d-inline ms-2">
                          {/* <span
                            className="fw-bold text-primary"
                            role="button"
                            data-bs-toggle="dropdown"
                          > */}
                          {candidate.can_name}
                          {/* </span> */}
                          {/* <ul className="dropdown-menu shadow">
                            <li>
                              <button className="dropdown-item">
                                <i className="fas fa-edit me-2"></i>Edit
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() =>
                                  handleDeleteClick(candidate.can_id)
                                }
                              >
                                <i className="fas fa-trash me-2"></i>Delete
                              </button>
                            </li>
                          </ul> */}
                        </div>
                      </div>

                      <div className="fw-bold">
                        Email:{" "}
                        <span className="text-dark fw-normal">
                          {maskEmail(candidate.can_email)}
                        </span>
                      </div>

                      <div className="fw-bold">
                        Mobile No:{" "}
                        <span className="text-dark fw-normal">
                          {maskMobile(candidate.can_mobile)}
                        </span>
                      </div>

                      <div className="fw-bold">
                        Score:{" "}
                        <span
                          className="text-dark "
                          style={{ fontSize: "15px" }}
                        >
                          {candidate.can_score}/1000
                        </span>
                      </div>

                      {/* <div className="fw-bold">
                        Registar Date:{" "}
                        <span className="text-dark fw-normal">
                          {candidate.register_date}
                        </span>
                      </div> */}
                    </td>

                    {/* Profile Image */}
                    {/* <td className="text-center">
                      <div className="avatar avatar-xl">
                        <img
                          src={candidate.profile_photo || image}
                          alt="No Image"
                          className="avatar-img rounded-circle"
                        />
                      </div>
                    </td> */}

                    {/* Experience */}
                    <td className="text-start">
                      <div className="fw-bold">
                        Experience:{" "}
                        <span className="text-dark fw-normal">
                          {candidate.can_experience || "N/A"} Year
                        </span>
                      </div>
                      <div className="fw-bold">
                        Education Type:{" "}
                        <span className="text-dark fw-normal">
                          {candidate.can_education_type || "N/A"}
                        </span>
                      </div>
                      <div className="fw-bold">
                        Education:{" "}
                        <span className="text-dark fw-normal">
                          {candidate.can_education_detail || "N/A"}
                        </span>
                      </div>
                      <div className="fw-bold">
                        Skills:{" "}
                        <span className="text-dark fw-normal">
                          {candidate.can_skill || "N/A"}
                        </span>
                      </div>
                      <div className="fw-bold">
                        Status:{" "}
                        {isAdmin ? (
                          <select
                            className="form-select form-select-sm d-inline w-auto ms-2"
                            value={candidate.can_status || "Inactive"}
                            disabled={isUpdatingStatus}
                            onChange={(e) =>
                              handleCandidateStatusChange(
                                candidate.can_id,
                                e.target.value,
                              )
                            }
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        ) : (
                          <span
                            className={`badge ms-2 ${
                              candidate.can_status === "Active"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {candidate.can_status || "N/A"}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="text-center">
                      {candidate.can_resume ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success"
                          onClick={() => handleResumeDownload(candidate)}
                        >
                          <i className="fas fa-download me-1"></i>
                          Download
                        </button>
                      ) : (
                        <span className="text-muted">No Resume</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No Candidates Found
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

      {/* DELETE CONFIRM MODAL */}
      <ConfirmDelete
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* ADD FORM MODAL */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content shadow-lg border-0 rounded-4">
            <div className="modal-header text-white rounded-top-4 bg-success">
              <h5 className="modal-title fw-bold" style={{ color: "white" }}>
                Candidate Details
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
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter full name"
                    {...register("fullname")}
                  />
                  {errors.fullname && (
                    <span className="text-danger">
                      {errors.fullname.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email address"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email.message}</span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    className="form-control"
                    placeholder="Enter 10-digit mobile number"
                    {...register("mobile")}
                  />
                  {errors.mobile && (
                    <span className="text-danger">{errors.mobile.message}</span>
                  )}
                </div>

                {/* Location / City */}
                {/* <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Location / City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter city or location"
                    {...register("location")}
                  />
                  {errors.location && (
                    <span className="text-danger">
                      {errors.location.message}
                    </span>
                  )}
                </div> */}

                {/* Experience */}
                {/* <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Experience (Years)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter experience in years"
                    {...register("experience")}
                  />
                  {errors.experience && (
                    <span className="text-danger">
                      {errors.experience.message}
                    </span>
                  )}
                </div> */}

                {/* Skills */}
                {/* <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Skills</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Eg: React, Node, PHP"
                    {...register("skill")}
                  />
                  {errors.skill && (
                    <span className="text-danger">{errors.skill.message}</span>
                  )}
                </div> */}

                {/* Profile Photo */}
                {/* <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    {...register("profilePhoto")}
                  />
                  {errors.profilePhoto && (
                    <span className="text-danger">
                      {errors.profilePhoto.message}
                    </span>
                  )}
                </div> */}

                {/* Resume */}
                {/* <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Upload Resume
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".pdf,.doc,.docx"
                    {...register("resume")}
                  />
                  {errors.resume && (
                    <span className="text-danger">{errors.resume.message}</span>
                  )}
                </div> */}

                {/* Registration Date */}
                {/* <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Registration Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    {...register("registrationDate")}
                  />
                  {errors.registrationDate && (
                    <span className="text-danger">
                      {errors.registrationDate.message}
                    </span>
                  )}
                </div> */}

                {/* Applied Jobs Count */}
                {/* <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Applied Jobs Count
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter applied jobs count"
                    {...register("appliedJobsCount")}
                  />
                  {errors.appliedJobsCount && (
                    <span className="text-danger">
                      {errors.appliedJobsCount.message}
                    </span>
                  )}
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

                <button
                  type="submit"
                  className="btn btn-success px-4 ms-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Candidates;
