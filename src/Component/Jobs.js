import React, { useState, useRef, useEffect } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Pagination from "./commenuse/Pagination";

import { toast, ToastContainer } from "react-toastify";

function Jobs() {
  // tital of tab
  useState(() => {
    document.title = "Hirelink | Jobs";
  }, []);

  // Login ckeck and role
  const auth = JSON.parse(localStorage.getItem("auth"));
  const role = auth?.role;
  const employerId = auth?.emp_id;
  //=================

  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  //==============status
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

  //============================= Get Data Code ============================

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      let res;

      // ADMIN / SUBADMIN / BACKEND → ALL DATA
      if (["1", "2", "3", "4"].includes(role)) {
        res = await axios.get(
          "https://norealtor.in/hirelink_apis/admin/getdata/tbl_job"
        );
      }

      // EMPLOYER → ONLY HIS DATA
      if (role === "employer") {
        res = await axios.get(
          `https://norealtor.in/hirelink_apis/employer/getdatawhere/tbl_job/job_employer_id/${employerId}`
        );
      }

      if (res?.data?.status) {
        setJobs(res.data.data);
      }
    } catch (error) {
      console.error("Jobs fetch error:", error);
      toast.error("Failed to load jobs");
    }
  };

  //==========Pagination=========================
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = jobs.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(jobs.length / recordsPerPage);
  //===================================================

  // Delete modal state
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
        `https://norealtor.in/hirelink_apis/admin/deletedata/tbl_job/job_id/${deleteId}`
      );

      if (res.data.status === true) {
        setShowDeleteModal(false);
        setDeleteId(null);

        fetchJobs();
      } else {
        toast.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong while deleting");
    }
  };

  //=======================================================

  const modalRef = useRef(null);

  // Validation Schema (NO if/else)
  const validationSchema = Yup.object({
    job_title: Yup.string().required("Job Title is required"),
    job_company: Yup.string().required("Company Name is required"),
    job_no_hiring: Yup.number()
      .typeError("Applications Count must be a number")
      .required("Applications Count is required"),
    job_type: Yup.string().required("Job Type is required"),
    job_salary: Yup.string().required("Salary Range is required"),
    job_status: Yup.string().required("Status is required"),
    job_date: Yup.string().required("Posted Date is required"),
    job_location: Yup.string().required("Location is required"),
    job_state: Yup.string().required(),
    job_city: Yup.string().required(),
    job_skills: Yup.string().required("Skills is required"),
    job_experience: Yup.string().required("Experience is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    if (role !== "employer") {
      toast.error("Only employer can add jobs");
      return;
    }

    try {
      const payload = {
        job_title: data.job_title,
        job_company: data.job_company,
        job_mc: selectedCategory || null,
        job_sc: selectedSubCategory || null,
        job_sc1: selectedSubCat1 || null,
        job_sc2: selectedSubCat2 || null,
        job_sc3: selectedSubCat3 || null,
        job_no_hiring: Number(data.job_no_hiring),
        job_type: data.job_type,
        job_salary: data.job_salary,
        job_status: data.job_status,
        job_date: data.job_date,
        job_skills: data.job_skills,
        job_location: data.job_location,
        job_state: data.job_state,
        job_city: data.job_city,
        job_experience: data.job_experience,
        job_employer_id: employerId,
      };

      const res = await axios.post(
        "https://norealtor.in/hirelink_apis/admin/insert/tbl_job",
        payload
      );

      if (res.data?.status === true) {
        reset();
        toast.success("Job Added Successfully");
        fetchJobs();

        const modal = window.bootstrap.Modal.getInstance(modalRef.current);
        modal.hide();
      } else {
        toast.error(
          res.data?.message || "Failed to add job. Please try again."
        );
      }
    } catch (error) {
      console.error("Add job error:", error);

      toast.error(
        error.response?.data?.message || "Failed to add job. Please try again."
      );
    }
  };

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

  const [categoryErrors, setCategoryErrors] = useState({});

  // 🔥 CLEAR CATEGORY ERRORS ON CHANGE
  useEffect(() => {
    setCategoryErrors({});
  }, [
    selectedCategory,
    selectedSubCategory,
    selectedSubCat1,
    selectedSubCat2,
    selectedSubCat3,
  ]);

  const handleSelectChange = (key, value, setter) => {
    setter(value);
    setCategoryErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  //Main cat
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://norealtor.in/hirelink_apis/admin/getdata/tbl_main_category"
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
        `https://norealtor.in/hirelink_apis/admin/getdatawhere/tbl_subcategory/sc_mc_id/${mc_id}`
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
        `https://norealtor.in/hirelink_apis/admin/getdatawhere/tbl_subcategory_1/sc1_sc_id/${sc_id}`
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
        `https://norealtor.in/hirelink_apis/admin/getdatawhere/tbl_subcategory_2/sc2_sc1_id/${sc1_id}`
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
        `https://norealtor.in/hirelink_apis/admin/getdatawhere/tbl_subcategory_3/sc3_sc2_id/${sc2_id}`
      );
      setSubCat3(res.data.data || []);
    } catch (err) {
      console.error("Sub category 3 error", err);
    }
  };

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = (job) => {
    setValue("job_title", job.job_title);
    setValue("job_company", job.job_company);
    setValue("job_no_hiring", job.job_no_hiring);
    setValue("job_type", job.job_type);
    setValue("job_salary", job.job_salary);
    setValue("job_status", job.job_status);
    setValue("job_date", job.job_date);
    setValue("job_location", job.job_location);
    setValue("job_experience", job.job_experience);
    setValue("job_skills", job.job_skills);

    // category dropdowns (if needed)
    setSelectedCategory(job.job_mc);
    setSelectedSubCategory(job.job_sc);
    setSelectedSubCat1(job.job_sc1);
    setSelectedSubCat2(job.job_sc2);
    setSelectedSubCat3(job.job_sc3);
  };

  return (
    <>
      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <div>
          <h3 className="fw-bold mb-3">Jobs</h3>
        </div>
        {role === "employer" && (
          <div className="ms-auto py-2 py-md-0">
            <a
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              className="btn btn-success"
            >
              <i className="fa fa-plus"></i> Add Jobs
            </a>
          </div>
        )}
      </div>

      <div className="card shadow-sm p-3 border">
        {/* FILTER ROW */}
        <div className="row g-2 align-items-center mb-3">
          {/* Job Type */}
          <div className="col-12 col-md-2">
            <select className="form-select form-control">
              <option value="">Select Type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Remote</option>
              <option>Contract</option>
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
          <table className="table table-bordered ">
            <thead className="table-light text-center">
              <tr className="text-center">
                <th className="fs-6 fw-bold">ID</th>
                <th className="fs-6 fw-bold">Job Detail</th>
                <th className="fs-6 fw-bold">Job By</th>
                <th className="fs-6 fw-bold">Other Detail</th>
                <th className="fs-6 fw-bold">Status</th>
              </tr>
            </thead>

            <tbody>
              {records.length > 0 ? (
                records.map((job, index) => (
                  <tr key={job.job_id}>
                    <td>{firstIndex + index + 1}</td>
                    <td className="text-start fw-bold">
                      {" "}
                      <div className="fw-bold">
                        Title:
                        <div className="dropdown d-inline ms-2">
                          <span
                            className="fw-bold text-primary"
                            role="button"
                            data-bs-toggle="dropdown"
                          >
                            {job.job_title}
                          </span>
                          <ul className="dropdown-menu shadow">
                            <li>
                              <button
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                  setIsEdit(true);

                                  setValue("job_title", "Frontend Developer");
                                  setValue("job_company", "Tech Solutions");
                                  setValue("job_type", "Full-time");
                                  setValue("job_location", "Pune");
                                }}
                              >
                                <i className="fas fa-edit me-2"></i>Edit
                              </button>
                            </li>

                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => handleDeleteClick(job.job_id)}
                              >
                                <i className="fas fa-trash me-2"></i>Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="fw-bold ">
                        Type:{" "}
                        <span className="text-dark fw-normal">
                          {job.job_type}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Exp. Required:{" "}
                        <span className="text-dark fw-normal">
                          {job.job_experience}
                        </span>
                      </div>
                    </td>

                    <td className="text-start">
                      <div className="fw-bold ">
                        Company Name:{" "}
                        <span className="text-dark fw-normal">
                          {job.job_company}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Main cate:{" "}
                        <span className="text-dark fw-normal">
                          {job.mc_name}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Subcate :{" "}
                        <span className="text-dark fw-normal">
                          {job.sc_name ?? null}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Subcate 1 :{" "}
                        <span className="text-dark fw-normal">
                          {job.sc1_name ?? null}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        subcate 2 :{" "}
                        <span className="text-dark fw-normal">
                          {job.sc2_name ?? null}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        subcate 3 :{" "}
                        <span className="text-dark fw-normal">
                          {job.sc3_name ?? null}
                        </span>
                      </div>
                    </td>
                    <td className="text-start">
                      <div className="fw-bold ">
                        Posted Date:{" "}
                        <span className="text-dark fw-normal">
                          {job.job_date}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Applications:{" "}
                        <span className="text-dark fw-normal">
                          {job.job_applications}
                        </span>
                      </div>
                    </td>
                    <td className="text-center">
                      {job.job_status === "1" ? (
                        <span className="badge bg-success">Active</span>
                      ) : (
                        <span className="badge bg-warning">Pending</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No jobs found
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

      {/* ADD FORM MODAL */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content shadow-lg border-0 rounded-4">
            <div className="modal-header text-white rounded-top-4 bg-success">
              <h5 className="modal-title fw-bold" style={{ color: "white" }}>
                Job Details
              </h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body row">
                {/* Job Title */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Job Title</label>
                  <input
                    type="text"
                    {...register("job_title")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Job Title"
                  />
                  <span className="text-danger">
                    {errors.job_title?.message}
                  </span>
                </div>

                {/* Company Name */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Company Name</label>
                  <input
                    type="text"
                    {...register("job_company")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Company Name"
                  />
                  <span className="text-danger">
                    {errors.job_company?.message}
                  </span>
                </div>

                {/* Job Category */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Main Category
                  </label>
                  <select
                    className="form-control form-select rounded-3"
                    value={selectedCategory}
                    onChange={(e) =>
                      handleSelectChange(
                        "job_mc",
                        e.target.value,
                        setSelectedCategory
                      )
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.mc_id} value={cat.mc_id}>
                        {cat.mc_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Sub Category</label>
                  <select
                    className="form-control form-select rounded-3"
                    value={selectedSubCategory}
                    onChange={(e) =>
                      handleSelectChange(
                        "job_sc",
                        e.target.value,
                        setSelectedSubCategory
                      )
                    }
                    disabled={!selectedCategory || subCategories.length === 0}
                  >
                    <option value="">Select</option>
                    {subCategories.map((sub) => (
                      <option key={sub.sc_id} value={sub.sc_id}>
                        {sub.sc_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Sub Category 1
                  </label>
                  <select
                    className="form-control form-select rounded-3"
                    value={selectedSubCat1}
                    onChange={(e) =>
                      handleSelectChange(
                        "job_sc1",
                        e.target.value,
                        setSelectedSubCat1
                      )
                    }
                    disabled={!selectedSubCategory || subCat1.length === 0}
                  >
                    <option value="">Select</option>
                    {subCat1.map((item) => (
                      <option key={item.sc1_id} value={item.sc1_id}>
                        {item.sc1_name}
                      </option>
                    ))}
                  </select>

                  {categoryErrors.job_sc1 && (
                    <small className="text-danger">
                      {categoryErrors.job_sc1}
                    </small>
                  )}
                </div>

                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Sub Category 2
                  </label>
                  <select
                    className="form-control form-select rounded-3"
                    value={selectedSubCat2}
                    onChange={(e) =>
                      handleSelectChange(
                        "job_sc2",
                        e.target.value,
                        setSelectedSubCat2
                      )
                    }
                    disabled={!selectedSubCat1 || subCat2.length === 0}
                  >
                    <option value="">Select</option>
                    {subCat2.map((item) => (
                      <option key={item.sc2_id} value={item.sc2_id}>
                        {item.sc2_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Sub Category 3
                  </label>
                  <select
                    className="form-control form-select rounded-3"
                    value={selectedSubCat3}
                    onChange={(e) =>
                      handleSelectChange(
                        "job_sc3",
                        e.target.value,
                        setSelectedSubCat3
                      )
                    }
                    disabled={!selectedSubCat2 || subCat3.length === 0}
                  >
                    <option value="">Select</option>
                    {subCat3.map((item) => (
                      <option key={item.sc3_id} value={item.sc3_id}>
                        {item.sc3_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Applications Count */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    No of Candidates Hiring
                  </label>
                  <input
                    type="number"
                    {...register("job_no_hiring")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter No of Candidates Hiring"
                  />
                  <span className="text-danger">
                    {errors.job_no_hiring?.message}
                  </span>
                </div>

                {/* Job Type */}
                <div className="col-md-4 mb-2 position-relative">
                  <label className="form-label fw-semibold">Job Type</label>
                  <select
                    {...register("job_type")}
                    className="form-control form-control-md rounded-3"
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                  </select>
                  <span className="text-danger">
                    {errors.job_type?.message}
                  </span>
                </div>

                {/* Salary Range */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Salary Range</label>
                  <input
                    type="text"
                    {...register("job_salary")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Salary Range"
                  />
                  <span className="text-danger">
                    {errors.job_salary?.message}
                  </span>
                </div>

                {/* Status */}
                <div className="col-md-4 mb-2 position-relative">
                  <label className="form-label fw-semibold">Status</label>
                  <select
                    {...register("job_status")}
                    className="form-control form-control-md rounded-3"
                  >
                    <option value="">Select Status</option>
                    <option value="1">Active</option>
                    <option value="2">Pending</option>
                  </select>
                  <span className="text-danger">
                    {errors.job_status?.message}
                  </span>
                </div>

                {/* Posted Date */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Posted Date</label>
                  <input
                    type="date"
                    {...register("job_date")}
                    className="form-control form-control-md rounded-3"
                  />
                  <span className="text-danger">
                    {errors.job_date?.message}
                  </span>
                </div>

                {/* Location */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Location</label>
                  <input
                    type="text"
                    {...register("job_location")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Location"
                  />
                  <span className="text-danger">
                    {errors.job_location?.message}
                  </span>
                </div>

                {/* State */}
                <div className="col-md-4">
                  <label className="fw-semibold">State</label>
                  <select
                    className="form-select form-control"
                    {...register("job_state")}
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
                    {...register("job_city")} // ✅ CORRECT
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

                {/* Experience Required */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Experience Required
                  </label>
                  <input
                    type="text"
                    {...register("job_experience")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Experience Required"
                  />
                  <span className="text-danger">
                    {errors.job_experience?.message}
                  </span>
                </div>

                {/* Location */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Skills</label>
                  <input
                    type="text"
                    {...register("job_skills")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Required Skills"
                  />
                  <span className="text-danger">
                    {errors.job_skills?.message}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
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

      {/* DELETE CONFIRM MODAL */}
      <ConfirmDelete
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default Jobs;
