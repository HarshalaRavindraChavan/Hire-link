import React, { useState, useRef, useEffect } from "react";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm, Watch } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Pagination from "./commenuse/Pagination";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../config/constants";
import TableSkeleton from "./commenuse/TableSkeleton";
import SearchableDropdown from "./SearchableDropdown";
import { useNavigate } from "react-router-dom";

function Jobs() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const auth = JSON.parse(localStorage.getItem("auth"));

  //   if (!auth || !auth?.role) {
  //     navigate("/signin");
  //     return;
  //   }

  //   const role = auth?.role;
  //   if (!["1", "2", "3", "4", 100, "100"].includes(role)) {
  //     navigate("/signin");
  //   }
  // }, [navigate]);

  // Login ckeck and role
  const auth = JSON.parse(localStorage.getItem("auth"));
  const staff = JSON.parse(localStorage.getItem("staff"));
  const role = auth?.role;
  const employerId = auth?.emp_id;
  const staffemploId = staff?.staff_employer_id;
  //=================

  const [timeNow, setTimeNow] = useState(Date.now());

  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);

  // ================= EDUCATION =================
  const [educationType, setEducationType] = useState("");
  const [educationDetail, setEducationDetail] = useState("");

  const educationOptions = {
    Diploma: ["D.Pharm"],
    Graduation: ["B.Sc", "B.Pharmacy."],
    "Post Graduation": ["M.Sc", "M.Pharm"],
  };

  // ================= STATE & CITY =================
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const res = await axios.get(`${BASE_URL}candidate/getdata/tbl_state`);

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
        const cityList = res.data.data || [];
        setCities(cityList);

        // ✅ IMPORTANT FIX
        if (selectedCity) {
          setTimeout(() => {
            setEditValue("job_city", selectedCity, {
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

  //============================= Get Data Code ============================

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      let res;

      // ADMIN / SUBADMIN / BACKEND → ALL DATA
      if (["1", "2", "3", "4"].includes(role)) {
        res = await axios.get(`${BASE_URL}admin/getdata/tbl_job`);
      }

      // EMPLOYER → ONLY HIS DATA
      if (Number(role) === 100) {
        res = await axios.get(
          `${BASE_URL}employer/getdatawhere/tbl_job/job_employer_id/${employerId}`,
        );
      }

      if (Number(role) === 200) {
        res = await axios.get(
          `${BASE_URL}employer/getdatawhere/tbl_job/job_employer_id/${staffemploId}`,
        );
      }
      if (res?.data?.status) {
        setJobs(res.data.data);
      }
    } catch (error) {
      console.error("Jobs fetch error:", error);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  //==========Pagination=========================
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 100;
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
        `${BASE_URL}admin/deletedata/tbl_job/job_id/${deleteId}`,
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
  // Validation Schema (NO if/else)
  const validationSchema = Yup.object({
    job_title: Yup.string().required("Job Title is required"),
    job_no_hiring: Yup.number()
      .typeError("Applications Count must be a number")
      .required("Applications Count is required"),
    job_type: Yup.string().required("Job Type is required"),
    job_salary: Yup.string().required("Salary Range is required"),
    job_status: Yup.string().nullable(),
    job_location: Yup.string().required("Location is required"),
    job_state: Yup.string().required("State is required"),
    job_city: Yup.string().required("City is required"),
    job_skills: Yup.string().required("Skills is required"),
    job_experience: Yup.string().required("Experience is required"),
    job_education_type: Yup.string().required("Education Type is required"),
    job_education_detail: Yup.string().required("Education Detail is required"),
    job_description: Yup.string().required("Description is required"),
  });

  const addForm = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      job_state: "",
      job_city: "",
    },
  });

  const editForm = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    register: addRegister,
    handleSubmit: handleAddSubmit,
    formState: { errors: addErrors },
    reset: resetAdd,
    setValue: setAddValue,
    watch: addWatch,
  } = addForm;

  const {
    register: editRegister,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors },
    reset: resetEdit,
    setValue: setEditValue,
    watch: editWatch,
  } = editForm;

  const toMySQLDateTimeIST = (date) => {
    const istDate = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    );

    const pad = (n) => String(n).padStart(2, "0");

    return (
      istDate.getFullYear() +
      "-" +
      pad(istDate.getMonth() + 1) +
      "-" +
      pad(istDate.getDate()) +
      " " +
      pad(istDate.getHours()) +
      ":" +
      pad(istDate.getMinutes()) +
      ":" +
      pad(istDate.getSeconds())
    );
  };

  const onSubmit = async (data) => {
    if (Number(role) !== 100 || Number(role) !== 200) {
      toast.error("Only employer can add jobs");
      return;
    }

    try {
      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // +30 min

      const payload = {
        job_title: data.job_title,
        job_company: auth?.emp_companyname,
        job_mc: selectedCategory || null,
        job_sc: selectedSubCategory || null,
        job_sc1: selectedSubCat1 || null,
        job_sc2: selectedSubCat2 || null,
        job_sc3: selectedSubCat3 || null,

        job_processing_start: toMySQLDateTimeIST(startTime),
        job_processing_end: toMySQLDateTimeIST(endTime),

        job_no_hiring: Number(data.job_no_hiring),
        job_type: data.job_type,
        job_salary: data.job_salary,

        job_status: "Processing", // ✅ DEFAULT Processing

        job_date: data.job_date,
        job_skills: data.job_skills,
        job_location: data.job_location,
        job_state: data.job_state,
        job_city: data.job_city,
        job_education_type: educationType,
        job_education_detail: educationDetail,
        job_experience: data.job_experience,
        job_employer_id: employerId || staffemploId,
        job_description: data.job_description,
      };

      const res = await axios.post(`${BASE_URL}admin/insert/tbl_job`, payload);

      if (res.data?.status === true) {
        resetAdd();

        // ✅ state-city reset
        setCities([]);

        setEducationType("");
        setEducationDetail("");

        setSelectedCategory("");
        setSelectedSubCategory("");
        setSelectedSubCat1("");
        setSelectedSubCat2("");
        setSelectedSubCat3("");

        toast.success("Job Added Successfully");
        fetchJobs();

        const modal = window.bootstrap.Modal.getInstance(addModalRef.current);
        modal.hide();
      } else {
        toast.error(
          res.data?.message || "Failed to add job. Please try again.",
        );
      }
    } catch (error) {
      console.error("Add job error:", error);

      toast.error(
        error.response?.data?.message || "Failed to add job. Please try again.",
      );
    }
  };

  const addModalRef = useRef(null);
  const editModalRef = useRef(null);
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
      const res = await axios.get(`${BASE_URL}admin/getdata/tbl_main_category`);
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
        `${BASE_URL}admin/getdatawhere/tbl_subcategory/sc_mc_id/${mc_id}`,
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
        `${BASE_URL}admin/getdatawhere/tbl_subcategory_1/sc1_sc_id/${sc_id}`,
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
        `${BASE_URL}admin/getdatawhere/tbl_subcategory_2/sc2_sc1_id/${sc1_id}`,
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
        `${BASE_URL}admin/getdatawhere/tbl_subcategory_3/sc3_sc2_id/${sc2_id}`,
      );
      setSubCat3(res.data.data || []);
    } catch (err) {
      console.error("Sub category 3 error", err);
    }
  };

  // Edit model code
  const [editJobId, setEditJobId] = useState(null);
  const [loading, setLoading] = useState(false);
  // const modalRef = useRef(null);

  const openEditJobModal = (job) => {
    if (!job) return;

    // ================= BASIC =================
    setEditJobId(job.job_id);

    resetEdit({
      job_title: job.job_title ?? "",
      job_no_hiring: job.job_no_hiring ?? "",
      job_type: job.job_type ?? "",
      job_salary: job.job_salary ?? "",
      job_status: job.job_status ?? "",
      job_date: job.job_date ?? "",
      job_location: job.job_location ?? "",
      job_state: job.job_state ?? "",
      job_city: job.job_city ?? "",
      job_experience: job.job_experience ?? "",
      job_skills: job.job_skills ?? "",
      job_education_type: job.job_education_type ?? "",
      job_education_detail: job.job_education_detail ?? "",
      job_description: job.job_description ?? "",
    });

    // ================= STATE → CITY (AUTO SELECT) =================
    if (job.job_state) {
      fetchCities(job.job_state, job.job_city);
    } else {
      setCities([]);
    }

    // ================= CATEGORY CHAIN =================
    setSelectedCategory(job.job_mc ?? "");
    setSelectedSubCategory(job.job_sc ?? "");
    setSelectedSubCat1(job.job_sc1 ?? "");
    setSelectedSubCat2(job.job_sc2 ?? "");
    setSelectedSubCat3(job.job_sc3 ?? "");

    // ================= EDUCATION =================
    setEducationType(job.job_education_type ?? "");
    setEducationDetail(job.job_education_detail ?? "");

    setEditValue("job_education_type", job.job_education_type ?? "");
    setEditValue("job_education_detail", job.job_education_detail ?? "");

    // ================= OPEN MODAL =================
    const modalEl = document.getElementById("editjobexampleModal");
    if (!modalEl || !window.bootstrap) return;

    const modal =
      window.bootstrap.Modal.getInstance(modalEl) ||
      new window.bootstrap.Modal(modalEl);

    modal.show();
  };

  const handleUpdateJob = async (data) => {
    if (!editJobId) {
      toast.error("Job ID missing");
      return;
    }

    try {
      const payload = {
        job_title: data.job_title,
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
        job_location: data.job_location,
        job_state: data.job_state,
        job_city: data.job_city,
        job_experience: data.job_experience,
        job_skills: data.job_skills,
        job_education_type: educationType,
        job_education_detail: educationDetail,
        job_description: data.job_description,
      };

      const response = await axios.post(
        `${BASE_URL}admin/updatedata/tbl_job/job_id/${editJobId}`,
        payload,
      );

      if (response?.data?.status === true) {
        toast.success("Job updated successfully ✅");
        fetchJobs();

        setCities([]); // ✅ IMPORTANT cleanup

        const modalEl = document.getElementById("editjobexampleModal");
        const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
        modalInstance?.hide();
      } else {
        toast.error("Job update failed");
      }
    } catch (error) {
      console.error("Job Update Error:", error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const alreadyUpdatedRef = useRef({});

  const markJobActive = async (jobId) => {
    try {
      if (alreadyUpdatedRef.current[jobId]) return;

      alreadyUpdatedRef.current[jobId] = true;

      await axios.post(`${BASE_URL}admin/updatedata/tbl_job/job_id/${jobId}`, {
        job_status: "Active",
      });

      fetchJobs();
    } catch (err) {
      console.log("Auto Active Error", err);
    }
  };

  const formatTime = (ms) => {
    if (ms <= 0) return "00:00";

    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  // filter code
  // const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredJobs = React.useMemo(() => {
    return records.filter((job) => {
      /* 🔍 SEARCH */
      const searchText = search.toLowerCase().trim();
      const matchesSearch =
        !searchText ||
        job?.job_title?.toLowerCase().includes(searchText) ||
        job?.job_company?.toLowerCase().includes(searchText) ||
        job?.mc_name?.toLowerCase().includes(searchText) ||
        job?.sc_name?.toLowerCase().includes(searchText);

      /* 🎯 JOB TYPE */
      const matchesType = !jobType || job?.job_type === jobType;

      /* 📅 DATE FILTER */
      let matchesDate = true;
      if (fromDate || toDate) {
        const jobDate = job?.job_date
          ? new Date(job.job_date.replace(" ", "T"))
          : null;

        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;

        if (jobDate) {
          if (from && to) matchesDate = jobDate >= from && jobDate <= to;
          else if (from) matchesDate = jobDate >= from;
          else if (to) matchesDate = jobDate <= to;
        }
      }

      return matchesSearch && matchesType && matchesDate;
    });
  }, [records, search, jobType, fromDate, toDate]);

  return (
    <>
      <SEO
        title={seoConfig.a_jobs.title}
        description={seoConfig.a_jobs.description}
      />
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
        {(Number(role) === 100 || Number(role) === 200) && (
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
            <select
              className="form-select form-control"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            ></select>
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
          <div className="col-12 col-md-3 d-flex justify-content-md-start justify-content-between">
            <button className="btn px-4 me-2 btn-success">Submit</button>

            <button
              className="btn btn-light border px-3"
              onClick={() => {
                setSearch("");
                setJobType("");
                setFromDate("");
                setToDate("");
                setCurrentPage(1);
              }}
            >
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
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <TableSkeleton rows={6} columns={4} />
              ) : filteredJobs.length > 0 ? (
                filteredJobs.slice(firstIndex, lastIndex).map((job, index) => (
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
                          {(Number(role) === 100 || Number(role) === 200) && (
                            <ul className="dropdown-menu shadow">
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => openEditJobModal(job)}
                                >
                                  <i className="fas fa-edit me-2"></i> Edit
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
                          )}
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
                          {job.job_experience}Year
                        </span>
                      </div>
                    </td>

                    <td className="text-start">
                      <div className="fw-bold ">
                        Company:{" "}
                        <span className="text-dark fw-normal">
                          {job.job_company}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Main Cate:{" "}
                        <span className="text-dark fw-normal">
                          {job.mc_name || "N/A"}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Subcate :{" "}
                        <span className="text-dark fw-normal">
                          {job.sc_name || "N/A"}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Subcate 1 :{" "}
                        <span className="text-dark fw-normal">
                          {job.sc1_name || "N/A"}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Subcate 2 :{" "}
                        <span className="text-dark fw-normal">
                          {job.sc2_name || "N/A"}
                        </span>
                      </div>
                      <div className="fw-bold ">
                        Subcate 3 :{" "}
                        <span className="text-dark fw-normal">
                          {job.sc3_name || "N/A"}
                        </span>
                      </div>
                    </td>

                    <td className="text-center">
                      <div className="fw-bold">
                        Posted Date:{" "}
                        <span className="text-dark fw-normal">
                          {job.job_date}
                        </span>
                      </div>
                      {job.job_status === "Closed" ? (
                        <span className="badge bg-danger">Closed</span>
                      ) : job.job_status === "Active" ? (
                        <span className="badge bg-success">Active</span>
                      ) : (
                        (() => {
                          const end = job.job_processing_end
                            ? new Date(
                                job.job_processing_end.replace(" ", "T"),
                              ).getTime()
                            : null;

                          if (!end || isNaN(end)) {
                            return (
                              <span className="badge bg-primary">
                                Processing
                              </span>
                            );
                          }

                          const diff = end - timeNow;

                          if (diff <= 0 && job.job_status === "Processing") {
                            markJobActive(job.job_id);
                            return (
                              <span className="badge bg-success">Active</span>
                            );
                          }

                          return (
                            <span className="badge bg-primary">
                              Processing ({formatTime(diff)})
                            </span>
                          );
                        })()
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
        ref={addModalRef}
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

            <form onSubmit={handleAddSubmit(onSubmit)}>
              <div className="modal-body row">
                {/* Job Title */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Job Title</label>
                  <input
                    type="text"
                    {...addRegister("job_title")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Job Title"
                  />
                  <span className="text-danger">
                    {addErrors.job_title?.message}
                  </span>
                </div>

                {/* Company Name */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Company Name</label>
                  <input
                    type="text"
                    value={auth?.emp_companyname || ""}
                    className="form-control form-control-md rounded-3"
                    readOnly
                  />
                </div>

                {/* Job Category */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Main Category
                  </label>
                  <select
                    className="form-control form-control-md rounded-3"
                    value={selectedCategory}
                    {...addRegister("job_mc")}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelectedCategory(val);
                      setAddValue("job_mc", val);
                    }}
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
                    className="form-control form-control-md rounded-3"
                    value={selectedSubCategory}
                    {...addRegister("job_sc")}
                    onChange={(e) =>
                      handleSelectChange(
                        "job_sc",
                        e.target.value,
                        setSelectedSubCategory,
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
                    className="form-control form-control-md rounded-3"
                    value={selectedSubCat1}
                    {...addRegister("job_sc1")}
                    onChange={(e) =>
                      handleSelectChange(
                        "job_sc1",
                        e.target.value,
                        setSelectedSubCat1,
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
                    className="form-control form-control-md rounded-3"
                    value={selectedSubCat2}
                    {...addRegister("job_sc2")}
                    onChange={(e) =>
                      handleSelectChange(
                        "job_sc2",
                        e.target.value,
                        setSelectedSubCat2,
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
                    className="form-control form-control-md rounded-3"
                    value={selectedSubCat3}
                    {...addRegister("job_sc3")}
                    onChange={(e) =>
                      handleSelectChange(
                        "job_sc3",
                        e.target.value,
                        setSelectedSubCat3,
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
                    {...addRegister("job_no_hiring")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter No of Candidates Hiring"
                  />
                  <span className="text-danger">
                    {addErrors.job_no_hiring?.message}
                  </span>
                </div>

                {/* Job Type */}
                <div className="col-md-4 mb-2 position-relative">
                  <label className="form-label fw-semibold">Job Type</label>
                  <select
                    {...addRegister("job_type")}
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
                    {addErrors.job_type?.message}
                  </span>
                </div>

                {/* Salary Range */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Salary Range</label>
                  <input
                    type="number"
                    {...addRegister("job_salary")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Salary Range"
                  />
                  <span className="text-danger">
                    {addErrors.job_salary?.message}
                  </span>
                </div>

                {/* state */}
                {/* <div className="col-md-4">
                  <label className="fw-semibold">State</label>
                  <select
                    className="form-select form-control"
                    {...addRegister("job_state")}
                    onChange={(e) => {
                      const stateId = e.target.value;
                      setAddValue("job_state", stateId);
                      setAddValue("job_city", "");
                      fetchCities(stateId);
                    }}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.state_id} value={state.state_id}>
                        {state.state_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-danger">{addErrors.job_state?.message}</p>
                </div> */}

                <div className="col-md-4">
                  <label className="fw-semibold">State</label>

                  <SearchableDropdown
                    options={states}
                    value={addWatch("job_state")}
                    labelKey="state_name"
                    valueKey="state_id"
                    error={addErrors.job_state?.message}
                    onChange={(stateId) => {
                      setAddValue("job_state", stateId);
                      setAddValue("job_city", "");
                      fetchCities(stateId);
                    }}
                  />
                </div>

                {/* city */}
                {/* <div className="col-md-4">
                  <label className="fw-semibold">City</label>
                  <select
                    className="form-select form-control"
                    {...addRegister("job_city")}
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
                  <p className="text-danger">{addErrors.job_city?.message}</p>
                </div> */}
                <div className="col-md-4">
                  <label className="fw-semibold">City</label>

                  <SearchableDropdown
                    options={cities}
                    value={addWatch("job_city")}
                    labelKey="city_name"
                    valueKey="city_id"
                    disabled={!cities.length}
                    error={addErrors.job_city?.message}
                    onChange={(cityId) => {
                      setAddValue("job_city", cityId);
                    }}
                  />
                </div>

                {/* Location */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Location</label>
                  <input
                    type="text"
                    {...addRegister("job_location")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Location"
                  />
                  <span className="text-danger">
                    {addErrors.job_location?.message}
                  </span>
                </div>

                {/* eduction type */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Education Type</label>
                  <select
                    className="form-select form-control"
                    {...addRegister("job_education_type")}
                    value={educationType}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEducationType(val);
                      setEducationDetail("");
                      setAddValue("job_education_type", val, {
                        shouldValidate: true,
                      });
                      setAddValue("job_education_detail", "", {
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
                    {addErrors.job_education_type?.message}
                  </p>
                </div>

                {/* eduction Detail */}

                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Education Detail</label>

                  {educationType === "Other" ? (
                    <input
                      type="text"
                      className="form-control"
                      {...addRegister("job_education_detail")}
                      placeholder="Enter Education"
                      value={educationDetail}
                      onChange={(e) => {
                        setEducationDetail(e.target.value);
                        setAddValue("job_education_detail", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  ) : (
                    <select
                      className="form-select form-control"
                      {...addRegister("job_education_detail")}
                      value={educationDetail}
                      onChange={(e) => {
                        setEducationDetail(e.target.value);
                        setAddValue("job_education_detail", e.target.value, {
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
                    {addErrors.job_education_detail?.message}
                  </p>
                </div>

                {/* Experience Required */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Experience Required
                  </label>
                  <input
                    type="number"
                    {...addRegister("job_experience")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Experience Required"
                  />
                  <span className="text-danger">
                    {addErrors.job_experience?.message}
                  </span>
                </div>

                {/* Skills */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Skills</label>
                  <input
                    type="text"
                    {...addRegister("job_skills")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Required Skills"
                  />
                  <span className="text-danger">
                    {addErrors.job_skills?.message}
                  </span>
                </div>

                {/* Description */}
                <div className="col-md-12 mb-2">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    rows={5}
                    {...addRegister("job_description")}
                    className="form-control"
                    placeholder="Enter Job Description"
                  ></textarea>

                  <span className="text-danger">
                    {addErrors.job_description?.message}
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

      {/* Edit Model Code  */}
      <div
        className="modal fade"
        id="editjobexampleModal"
        tabIndex="-1"
        aria-hidden="true"
        ref={editModalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content shadow-lg border-0 rounded-4">
            <div className="modal-header text-white rounded-top-4 bg-success">
              <h5 className="modal-title fw-bold" style={{ color: "white" }}>
                Job Edit
              </h5>
              <i
                className="fa-regular fa-circle-xmark"
                data-bs-dismiss="modal"
                style={{ cursor: "pointer", color: "white", fontSize: "25px" }}
              ></i>
            </div>

            <form onSubmit={handleEditSubmit(handleUpdateJob)}>
              <div className="modal-body row">
                {/* Job Title */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Job Title</label>
                  <input
                    type="text"
                    {...editRegister("job_title")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Job Title"
                  />
                  <span className="text-danger">
                    {editErrors.job_title?.message}
                  </span>
                </div>

                {/* Company Name */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Company Name</label>
                  <input
                    type="text"
                    value={auth?.emp_companyname}
                    className="form-control form-control-md rounded-3"
                    readOnly
                  />
                </div>

                {/* Job Category */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Main Category
                  </label>
                  <select
                    className="form-control form-control-md rounded-3"
                    value={selectedCategory}
                    {...editRegister("job_mc")}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelectedCategory(val);
                      setEditValue("job_mc", val);
                    }}
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
                    {...editRegister("job_sc")}
                    onChange={(e) =>
                      handleSelectChange(
                        "job_sc",
                        e.target.value,
                        setSelectedSubCategory,
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
                    {...editRegister("job_sc1")}
                    onChange={(e) =>
                      handleSelectChange(
                        "job_sc1",
                        e.target.value,
                        setSelectedSubCat1,
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
                    {...editRegister("job_sc2")}
                    onChange={(e) =>
                      handleSelectChange(
                        "job_sc2",
                        e.target.value,
                        setSelectedSubCat2,
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
                    {...editRegister("job_sc3")}
                    onChange={(e) =>
                      handleSelectChange(
                        "job_sc3",
                        e.target.value,
                        setSelectedSubCat3,
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
                    {...editRegister("job_no_hiring")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter No of Candidates Hiring"
                  />
                  <span className="text-danger">
                    {editErrors.job_no_hiring?.message}
                  </span>
                </div>

                {/* Job Type */}
                <div className="col-md-4 mb-2 position-relative">
                  <label className="form-label fw-semibold">Job Type</label>
                  <select
                    {...editRegister("job_type")}
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
                    {editErrors.job_type?.message}
                  </span>
                </div>

                {/* Salary Range */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Salary Range</label>
                  <input
                    type="text"
                    {...editRegister("job_salary")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Salary Range"
                  />
                  <span className="text-danger">
                    {editErrors.job_salary?.message}
                  </span>
                </div>

                {/* Status */}
                <div className="col-md-4 mb-2 position-relative">
                  <label className="form-label fw-semibold">Status</label>
                  <select
                    {...editRegister("job_status")}
                    className="form-control form-control-md rounded-3"
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <span className="text-danger">
                    {editErrors.job_status?.message}
                  </span>
                </div>

                {/* Location */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Location</label>
                  <input
                    type="text"
                    {...editRegister("job_location")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Location"
                  />
                  <span className="text-danger">
                    {editErrors.job_location?.message}
                  </span>
                </div>

                {/* State */}
                <div className="col-md-4 ">
                  <label className="fw-semibold">State</label>

                  <SearchableDropdown
                    options={states}
                    value={editWatch("job_state")}
                    labelKey="state_name"
                    valueKey="state_id"
                    error={editErrors.job_state?.message}
                    onChange={(stateId) => {
                      setEditValue("job_state", stateId);
                      setEditValue("job_city", "");
                      fetchCities(stateId);
                    }}
                  />
                </div>

                {/* City */}
                {/* <div className="col-md-4">
                  <label className="fw-semibold">City</label>
                  <select
                    className="form-select form-control"
                    {...editRegister("job_city")}
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

                  <p className="text-danger">{editErrors.job_city?.message}</p>
                </div> */}

                <div className="col-md-4">
                  <label className="fw-semibold">City</label>

                  <SearchableDropdown
                    options={cities}
                    value={editWatch("job_city")}
                    labelKey="city_name"
                    valueKey="city_id"
                    disabled={!cities.length}
                    error={editErrors.job_city?.message}
                    onChange={(cityId) => {
                      setEditValue("job_city", cityId);
                    }}
                  />
                </div>

                {/* Eduction Type */}
                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Education Type</label>
                  <select
                    className="form-select form-control"
                    {...editRegister("job_education_type")}
                    value={educationType}
                    onChange={(e) => {
                      const val = e.target.value;

                      setEducationType(val);
                      setEducationDetail("");

                      setEditValue("job_education_type", val, {
                        shouldValidate: true,
                      });
                      setEditValue("job_education_detail", "", {
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
                    {editErrors.job_education_type?.message}
                  </p>
                </div>

                {/* eduction Detail */}

                <div className="col-md-4 mb-2">
                  <label className="fw-semibold">Education Detail</label>

                  {educationType === "Other" ? (
                    <input
                      type="text"
                      className="form-control rounded-3"
                      {...editRegister("job_education_detail")}
                      placeholder="Enter Education"
                      value={educationDetail}
                      onChange={(e) => {
                        setEducationDetail(e.target.value);
                        setEditValue("job_education_detail", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  ) : (
                    <select
                      className="form-select form-control"
                      {...editRegister("job_education_detail")}
                      value={educationDetail}
                      onChange={(e) => {
                        setEducationDetail(e.target.value);
                        setEditValue("job_education_detail", e.target.value, {
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
                    {editErrors.job_education_detail?.message}
                  </p>
                </div>

                {/* Experience Required */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">
                    Experience Required
                  </label>
                  <input
                    type="number"
                    {...editRegister("job_experience")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Experience Required"
                  />
                  <span className="text-danger">
                    {editErrors.job_experience?.message}
                  </span>
                </div>

                {/* Location */}
                <div className="col-md-4 mb-2">
                  <label className="form-label fw-semibold">Skills</label>
                  <input
                    type="text"
                    {...editRegister("job_skills")}
                    className="form-control form-control-md rounded-3"
                    placeholder="Enter Required Skills"
                  />
                  <span className="text-danger">
                    {editErrors.job_skills?.message}
                  </span>
                </div>

                {/* Description */}
                <div className="col-md-12 mb-2">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    rows={5}
                    {...editRegister("job_description")}
                    className="form-control"
                    placeholder="Enter Job Description"
                  ></textarea>

                  <span className="text-danger">
                    {editErrors.job_description?.message}
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
