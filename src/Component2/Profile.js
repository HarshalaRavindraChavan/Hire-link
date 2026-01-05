import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Component2/css/Profile.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// import { resume } from "react-dom/server";
import JobsSAI from "./JobsSAI";

function Profile() {
  // ================= CATEGORY STATES =================

  // Main
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Sub Category
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  // Sub Category 1
  const [subCat1, setSubCat1] = useState([]);
  const [selectedSubCat1, setSelectedSubCat1] = useState("");

  // Sub Category 2
  const [subCat2, setSubCat2] = useState([]);
  const [selectedSubCat2, setSelectedSubCat2] = useState("");

  // Sub Category 3
  const [subCat3, setSubCat3] = useState([]);
  const [selectedSubCat3, setSelectedSubCat3] = useState("");

  // ================= STATE & CITY =================
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // change password code
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const candidateId = localStorage.getItem("candidate_id");

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const res = await axios.get(
        "https://norealtor.in/hirelink_apis/candidate/getdata/tbl_state"
      );

      if (res.data?.status) {
        setStates(res.data.data || []);
      }
    } catch (err) {
      console.error("State fetch error", err);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const res = await axios.get(
        `https://norealtor.in/hirelink_apis/candidate/getdatawhere/tbl_city/city_state_id/${stateId}`
      );

      if (res.data?.status) {
        setCities(res.data.data || []);
      }
    } catch (err) {
      console.error("City fetch error", err);
    }
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;

    setCandidate((prev) => ({
      ...prev,
      can_state: stateId,
      can_city: "",
    }));

    if (stateId) {
      fetchCities(stateId);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;

    setCandidate((prev) => ({
      ...prev,
      can_city: cityId,
    }));
  };

  //Main cat
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://norealtor.in/hirelink_apis/candidate/getdata/tbl_main_category"
      );
      setCategories(res.data.data || []);
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
        `https://norealtor.in/hirelink_apis/candidate/getdatawhere/tbl_subcategory/sc_mc_id/${mc_id}`
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
        `https://norealtor.in/hirelink_apis/candidate/getdatawhere/tbl_subcategory_1/sc1_sc_id/${sc_id}`
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
        `https://norealtor.in/hirelink_apis/candidate/getdatawhere/tbl_subcategory_2/sc2_sc1_id/${sc1_id}`
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
        `https://norealtor.in/hirelink_apis/candidate/getdatawhere/tbl_subcategory_3/sc3_sc2_id/${sc2_id}`
      );
      setSubCat3(res.data.data || []);
    } catch (err) {
      console.error("Sub category 3 error", err);
    }
  };

  const [candidate, setCandidate] = React.useState({
    can_id: "",
    can_state: "",
    can_city: "",
    can_aadhar: "",
    can_pan: "",
    can_resume: "",
    can_cv: "",
    can_experience: "",
    can_skill: "",
    can_about: "",
    can_mc: "",
    can_sc: "",
    can_sc1: "",
    can_sc2: "",
    can_sc3: "",
  });

  // Login Check but not login to redirect Signin page

  // const navigate = useNavigate();
  // React.useEffect(() => {
  //   const stored = localStorage.getItem("candidate");

  //   if (!stored) {
  //     navigate("/signin");
  //     return;
  //   }

  //   const data = JSON.parse(stored);
  //   setCandidate(data);

  //   if (data?.can_state) {
  //     fetchCities(data.can_state);
  //   }
  // }, []);

  // 🔁 SYNC SAVED CATEGORY TO DROPDOWNS (IMPORTANT)
  useEffect(() => {
    if (!candidate || !candidate.can_id) return;

    setSelectedCategory(candidate.can_mc || "");
    setSelectedSubCategory(candidate.can_sc || "");
    setSelectedSubCat1(candidate.can_sc1 || "");
    setSelectedSubCat2(candidate.can_sc2 || "");
    setSelectedSubCat3(candidate.can_sc3 || "");
  }, [candidate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCandidate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============ Profile Update ============
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!candidate?.can_id) {
      toast.error("Candidate ID missing");
      return;
    }

    const fileErrors = {
      can_aadhar: "Please upload Aadhar file",
      can_pan: "Please upload PAN file",
      can_resume: "Please upload Resume",
      can_cv: "Please upload CV",
    };

    for (const key in fileErrors) {
      if (!candidate[key]) {
        toast.error(fileErrors[key]);
        return;
      }
    }

    const categoryPayload = {};
    if (selectedCategory) categoryPayload.can_mc = selectedCategory;
    if (selectedSubCategory) categoryPayload.can_sc = selectedSubCategory;
    if (selectedSubCat1) categoryPayload.can_sc1 = selectedSubCat1;
    if (selectedSubCat2) categoryPayload.can_sc2 = selectedSubCat2;
    if (selectedSubCat3) categoryPayload.can_sc3 = selectedSubCat3;

    try {
      const response = await axios.post(
        `https://norealtor.in/hirelink_apis/candidate/updatedata/tbl_candidate/can_id/${candidate.can_id}`,
        {
          can_experience: candidate.can_experience,
          can_skill: candidate.can_skill,
          can_about: candidate.can_about,
          can_state: candidate.can_state,
          can_city: candidate.can_city,
          // ✅ SAVE CATEGORY HERE
          ...categoryPayload,
          can_aadhar: candidate.can_aadhar,
          can_pan: candidate.can_pan,
          can_resume: candidate.can_resume,
          can_cv: candidate.can_cv,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = response.data;

      if (result?.status === true) {
        toast.success("Profile updated successfully ✅");

        const stateName =
          states.find((s) => s.state_id == candidate.can_state)?.state_name ||
          "";

        const cityName =
          cities.find((c) => c.city_id == candidate.can_city)?.city_name || "";

        const updatedCandidate = {
          ...candidate,

          // ✅ IDs (DO NOT CHANGE)
          can_state: candidate.can_state,
          can_city: candidate.can_city,

          // ✅ Names (SEPARATE FIELDS)
          state_name: stateName,
          city_name: cityName,

          // OTHER FIELDS
          can_experience: candidate.can_experience,
          can_skill: candidate.can_skill,
          can_about: candidate.can_about,

          can_aadhar: candidate.can_aadhar,
          can_pan: candidate.can_pan,
          can_resume: candidate.can_resume,
          can_cv: candidate.can_cv,

          can_mc: selectedCategory || candidate.can_mc,
          can_sc: selectedSubCategory || candidate.can_sc,
          can_sc1: selectedSubCat1 || candidate.can_sc1,
          can_sc2: selectedSubCat2 || candidate.can_sc2,
          can_sc3: selectedSubCat3 || candidate.can_sc3,
        };

        setCandidate(updatedCandidate);
        localStorage.setItem("candidate", JSON.stringify(updatedCandidate));

        setTimeout(() => {
          const modalEl = document.getElementById("editProfileModal");
          if (modalEl && window.bootstrap) {
            const modalInstance =
              window.bootstrap.Modal.getInstance(modalEl) ||
              new window.bootstrap.Modal(modalEl);
            modalInstance.hide();
          }
        }, 800);
      } else {
        toast.error(result?.message || "Update failed");
      }
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      toast.error(error.response?.data?.message || "Server error. Try again.");
    }
  };

  // ============ File Upload API ============
  const uploadFile = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    // ✅ SIZE LIMITS (KB → Bytes)
    const minSize = 30 * 1024; // 30 KB
    const maxSize = 50 * 1024; // 50 KB

    // ❌ TYPE VALIDATION
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG files are allowed");
      e.target.value = "";
      return;
    }

    // ❌ SIZE VALIDATION
    if (file.size < minSize || file.size > maxSize) {
      toast.error("File size must be between 30 KB and 50 KB");
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

      if (res.data.status) {
        const filename = res.data.files[fieldName];

        setCandidate((prev) => ({
          ...prev,
          [fieldName]: filename,
        }));

        toast.success("File uploaded successfully ✅");
      } else {
        toast.error("File not uploaded ❌");
      }
    } catch (err) {
      toast.error("File not uploaded ❌");
      console.error(err);
    }
  };

  // change password
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://norealtor.in/hirelink_apis/candidate/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            candidate_id: candidateId,
            current_password: currentPassword,
            new_password: newPassword,
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.status) {
        alert("Password updated successfully ✅");

        // reset fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        // close modal
        document.querySelector("#changePasswordModal .btn-close")?.click();
      } else {
        alert(result.message || "Current password is incorrect");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <main className="container my-5">
        {/* ================= PROFILE CARD ================= */}
        <div className="card p-4">
          <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4 text-center text-md-start">
            {/* Profile Image */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              className="rounded-circle"
              width="90"
              height="90"
              alt="Candidate"
            />

            {/* Profile Info */}
            <div className="flex-grow-1">
              <h5 className="mb-1 fw-bold">
                {" "}
                {candidate.can_name
                  ?.split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </h5>
              <p className="mb-1 text-muted">
                {candidate.can_email} | {candidate.can_mobile}
              </p>
              <p className="mb-0 text-muted">
                {/* {candidate.can_address}
                <br /> */}
                {candidate.city_name}, {candidate.state_name}
              </p>
            </div>

            {/* Edit Button */}
            <button
              className="btn btn-outline-success mt-3 mt-md-0"
              data-bs-toggle="modal"
              data-bs-target="#editProfileModal"
            >
              Edit Profile
            </button>
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-success mt-md-0 px-4 py-2"
              style={{ minWidth: "80px", height: "40px" }}
              data-bs-toggle="modal"
              data-bs-target="#changePasswordModal"
            >
              Change Password
            </button>
          </div>
        </div>

        <div
          className="modal fade"
          id="changePasswordModal"
          tabIndex="-1"
          aria-labelledby="changePasswordModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="changePasswordModalLabel"
                  style={{ fontWeight: "bold" }}
                >
                  Change Password
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleChangePassword();
                  }}
                >
                  {/* Current Password */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Current Password
                    </label>

                    <div className="input-group">
                      <input
                        type={showCurrent ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />

                      <span
                        className="input-group-text"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowCurrent(!showCurrent)}
                      >
                        <i
                          className={`fa-solid ${
                            showCurrent ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </span>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      New Password
                    </label>

                    <div className="input-group">
                      <input
                        type={showNew ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />

                      <span
                        className="input-group-text"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowNew(!showNew)}
                      >
                        <i
                          className={`fa-solid ${
                            showNew ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </span>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>

                    <div className="input-group">
                      <input
                        type={showConfirm ? "text" : "password"}
                        className="form-control"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />

                      <span
                        className="input-group-text"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowConfirm(!showConfirm)}
                      >
                        <i
                          className={`fa-solid ${
                            showConfirm ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </span>
                    </div>
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <JobsSAI />
        </div>

        <div className="modal fade" id="editProfileModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-scrollable modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              {/* ================= MODAL BODY ================= */}
              <div className="modal-body px-4 py-2">
                {/* PROFILE IMAGE SECTION */}
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    className="rounded-circle border"
                    width="90"
                    height="90"
                    alt="Profile"
                  />

                  <div className="flex-grow-1">
                    <h5 className="mb-1 fw-bold">
                      {" "}
                      {candidate.can_name
                        ?.split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </h5>
                    <p className="mb-1 text-muted">
                      {" "}
                      {candidate.can_email} | {candidate.can_mobile}
                    </p>
                    <p className="mb-0 text-muted">
                      {/* {candidate.city_name}, {candidate.state_name} <br /> */}
                      {/* {candidate.can_address}  */}
                    </p>
                  </div>
                </div>

                <hr className="my-2" />

                {/* BASIC DETAILS */}
                <h6 className="fw-bold mb-2">Professional Information</h6>
                <div className="row g-2 mb-2">
                  <div className="col-md-6">
                    <label className="fw-semibold">State</label>
                    <select
                      className="form-control form-select"
                      value={candidate.can_state || ""}
                      onChange={handleStateChange}
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.state_id} value={state.state_id}>
                          {state.state_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="fw-semibold">City</label>
                    <select
                      className="form-control form-select"
                      value={candidate.can_city || ""}
                      onChange={handleCityChange}
                      disabled={!candidate.can_state}
                    >
                      <option value="">
                        {!candidate.can_state
                          ? "Select state first"
                          : "Select City"}
                      </option>

                      {cities.map((city) => (
                        <option key={city.city_id} value={city.city_id}>
                          {city.city_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    {" "}
                    <label className="btn btn-outline-success w-100">
                      {" "}
                      {candidate.can_aadhar ? (
                        <>
                          <i className="fa-solid fa-circle-check text-success"></i>{" "}
                          <span className="text-success fw-semibold">
                            Aadhar Card Uploaded
                          </span>
                        </>
                      ) : (
                        <>
                          <i className="fa fa-upload text-muted"></i>{" "}
                          <span className="text-muted">Upload Aadhar Card</span>
                        </>
                      )}
                      <input
                        type="file"
                        hidden
                        onChange={(e) => uploadFile(e, "can_aadhar")}
                      />{" "}
                      <input
                        type="hidden"
                        name="can_aadhar"
                        value={candidate.can_aadhar}
                      />
                    </label>{" "}
                  </div>

                  <div className="col-md-6">
                    {" "}
                    <label className="btn btn-outline-success w-100">
                      {" "}
                      {candidate.can_pan ? (
                        <>
                          <i className="fa-solid fa-circle-check text-success"></i>{" "}
                          <span className="text-success fw-semibold">
                            Pan Card Uploaded
                          </span>
                        </>
                      ) : (
                        <>
                          <i className="fa fa-upload text-muted"></i>{" "}
                          <span className="text-muted">Upload Pan Card</span>
                        </>
                      )}
                      <input
                        type="file"
                        hidden
                        onChange={(e) => uploadFile(e, "can_pan")}
                      />{" "}
                      <input
                        type="hidden"
                        name="can_pan"
                        value={candidate.can_pan}
                      />
                    </label>{" "}
                  </div>

                  <div className="col-md-6">
                    {" "}
                    <label className="btn btn-outline-success w-100">
                      {" "}
                      {candidate.can_resume ? (
                        <>
                          <i className="fa-solid fa-circle-check text-success"></i>{" "}
                          <span className="text-success fw-semibold">
                            Resume Uploaded
                          </span>
                        </>
                      ) : (
                        <>
                          <i className="fa fa-upload text-muted"></i>{" "}
                          <span className="text-muted">Upload Resume</span>
                        </>
                      )}
                      <input
                        type="file"
                        hidden
                        onChange={(e) => uploadFile(e, "can_resume")}
                      />{" "}
                      <input
                        type="hidden"
                        name="can_resume"
                        value={candidate.can_resume}
                      />
                    </label>{" "}
                  </div>

                  <div className="col-md-6">
                    {" "}
                    <label className="btn btn-outline-success w-100">
                      {" "}
                      {candidate.can_cv ? (
                        <>
                          <i className="fa-solid fa-circle-check text-success"></i>{" "}
                          <span className="text-success fw-semibold">
                            CV Uploaded
                          </span>
                        </>
                      ) : (
                        <>
                          <i className="fa fa-upload text-muted"></i>{" "}
                          <span className="text-muted">
                            Upload Cover Letter
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        hidden
                        onChange={(e) => uploadFile(e, "can_cv")}
                      />{" "}
                      <input
                        type="hidden"
                        name="can_cv"
                        value={candidate.can_cv}
                      />
                    </label>{" "}
                  </div>

                  <div className="col-md-6">
                    <label className="fw-semibold">Experience</label>
                    <input
                      type="text"
                      name="can_experience"
                      className="form-control form-control-md"
                      placeholder="Experience"
                      value={candidate.can_experience}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="fw-semibold">Skills</label>
                    <input
                      type="text"
                      name="can_skill"
                      className="form-control form-control-md"
                      placeholder="Skills"
                      value={candidate.can_skill}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="fw-semibold">Describe Self</label>
                    <textarea
                      name="can_about"
                      className="form-control form-control-md"
                      rows="2"
                      placeholder="Briefly describe yourself"
                      value={candidate.can_about}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                {/* Categorys */}
                <h6 className="fw-bold mb-2">Category</h6>

                <div className="row g-2">
                  <div className="col-md-6">
                    <select
                      className="form-control form-select rounded-3"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.mc_id} value={cat.mc_id}>
                          {cat.mc_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <select
                      className="form-control form-select rounded-3"
                      value={selectedSubCategory}
                      onChange={(e) => setSelectedSubCategory(e.target.value)}
                      disabled={!selectedCategory || subCategories.length === 0}
                    >
                      <option value="">
                        {!selectedCategory
                          ? "Select Main Category first"
                          : subCategories.length === 0
                          ? "No sub categories available"
                          : "Select"}
                      </option>

                      {subCategories.map((sub) => (
                        <option key={sub.sc_id} value={sub.sc_id}>
                          {sub.sc_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <select
                      className="form-control form-select rounded-3"
                      value={selectedSubCat1}
                      onChange={(e) => setSelectedSubCat1(e.target.value)}
                      disabled={!selectedSubCategory || subCat1.length === 0}
                    >
                      <option value="">
                        {!selectedSubCategory
                          ? "Select Sub Category first"
                          : subCat1.length === 0
                          ? "No sub category available"
                          : "Select"}
                      </option>

                      {subCat1.map((item) => (
                        <option key={item.sc1_id} value={item.sc1_id}>
                          {item.sc1_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <select
                      className="form-control form-select rounded-3"
                      value={selectedSubCat2}
                      onChange={(e) => setSelectedSubCat2(e.target.value)}
                      disabled={!selectedSubCat1 || subCat2.length === 0}
                    >
                      <option value="">
                        {!selectedSubCat1
                          ? "Select previous category first"
                          : subCat2.length === 0
                          ? "No sub category available"
                          : "Select"}
                      </option>

                      {subCat2.map((item) => (
                        <option key={item.sc2_id} value={item.sc2_id}>
                          {item.sc2_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-control form-select rounded-3"
                      value={selectedSubCat3}
                      onChange={(e) => setSelectedSubCat3(e.target.value)}
                      disabled={!selectedSubCat2 || subCat3.length === 0}
                    >
                      <option value="">
                        {!selectedSubCat2
                          ? "Select previous category first"
                          : subCat3.length === 0
                          ? "No sub category available"
                          : "Select"}
                      </option>

                      {subCat3.map((item) => (
                        <option key={item.sc3_id} value={item.sc3_id}>
                          {item.sc3_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* ================= MODAL FOOTER ================= */}
              <div className="modal-footer border-0 px-4 py-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-3"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-success px-4 ms-auto"
                  onClick={handleUpdateProfile}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;
