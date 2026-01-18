import React, { useEffect, useState } from "react";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../config/constants";

function Apply() {
  const { job_id } = useParams(); // job_id
  const navigate = useNavigate();

  const candidateLS = JSON.parse(localStorage.getItem("candidate"));

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileUpdating, setProfileUpdating] = useState(false);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  // ✅ Education Options
  const educationOptions = {
    Diploma: ["D.Pharm"],
    Graduation: ["B.Sc", "B.Pharm"],
    "Post Graduation": ["M.Sc", "M.Pharm"],
  };

  // ✅ Form Data (Candidate Profile + Apply)
  const [formData, setFormData] = useState({
    can_full_name: "",
    can_email: "",
    can_phone: "",

    education_type: "",
    education_detail: "",
    education_other: "",

    experience: "",
    skills: "",

    can_resume: "", // ✅ hidden resume filename
  });

  /* ================= JOB DETAIL ================= */
  const fetchJobDetail = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}hirelink_apis/candidate/getdatawhere/tbl_job/job_id/${job_id}`
      );

      if (res?.data?.status === true || res?.data?.status === "success") {
        const jData = Array.isArray(res.data.data)
          ? res.data.data[0]
          : res.data.data;

        console.log("✅ JOB DATA =>", jData);
        setJob(jData);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load job details");
    }
  };

  /* ================= CANDIDATE PROFILE (FROM DB) ================= */
  const fetchCandidateProfile = async () => {
    try {
      if (!candidateLS?.can_id) return;

      const res = await axios.get(
        `${BASE_URL}hirelink_apis/candidate/getdatawhere/tbl_candidate/can_id/${candidateLS.can_id}`
      );

      if (res.data.status === true || res.data.status === "success") {
        const cData = Array.isArray(res.data.data)
          ? res.data.data[0]
          : res.data.data;

        setFormData((prev) => ({
          ...prev,
          can_full_name: cData?.can_name || candidateLS?.can_name || "",
          can_email: cData?.can_email || candidateLS?.can_email || "",
          can_phone: cData?.can_mobile || candidateLS?.can_mobile || "",

          education_type: cData?.can_education_type || "",
          education_detail: cData?.can_education_detail || "",
          education_other: "",

          experience: cData?.can_experience || "",
          skills: cData?.can_skill || "",

          can_resume: cData?.can_resume || "",
        }));

        // ✅ localStorage update (optional)
        localStorage.setItem(
          "candidate",
          JSON.stringify({
            ...candidateLS,
            ...cData,
          })
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load candidate profile");
    }
  };

  useEffect(() => {
    fetchJobDetail();
    fetchCandidateProfile();
    checkAlreadyApplied(); // ✅ ADD THIS
  }, [job_id]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= CHECK ALREADY APPLIED ================= */
  const checkAlreadyApplied = async () => {
    try {
      const candidate = JSON.parse(localStorage.getItem("candidate"));
      if (!candidate?.can_id) return;

      const res = await axios.get(
        `${BASE_URL}hirelink_apis/admin/getdatawhere/tbl_applied/apl_job_id/${job_id}`
      );

      if (res.data.status === true || res.data.status === "success") {
        const appliedList = Array.isArray(res.data.data) ? res.data.data : [];

        const found = appliedList.some(
          (item) => Number(item.apl_candidate_id) === Number(candidate.can_id)
        );

        if (found) {
          setAlreadyApplied(true);
        } else {
          setAlreadyApplied(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEducationTypeChange = (e) => {
    const type = e.target.value;

    setFormData((prev) => ({
      ...prev,
      education_type: type,
      education_detail: "",
      education_other: "",
    }));
  };

  /* ================= RESUME UPLOAD (PDF Only) ================= */
  const uploadFile = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ allow only PDF
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    setResumeUploading(true);

    const formDataFile = new FormData();
    formDataFile.append(fieldName, file);

    try {
      const res = await axios.post(
        `${BASE_URL}hirelink_apis/candidate/fileupload`,
        formDataFile
      );

      if (res.data.status === true || res.data.status === "success") {
        const filename = res.data.files[fieldName];

        // ✅ set hidden resume field
        setFormData((prev) => ({
          ...prev,
          can_resume: filename,
        }));

        // ✅ localStorage update so refresh madhe pan disel
        const oldCand = JSON.parse(localStorage.getItem("candidate"));
        localStorage.setItem(
          "candidate",
          JSON.stringify({
            ...oldCand,
            can_resume: filename,
          })
        );

        toast.success("Resume uploaded successfully ✅");
      } else {
        toast.error("Resume not uploaded ❌");
      }
    } catch (err) {
      toast.error("Resume not uploaded ❌");
      console.error(err);
    } finally {
      setResumeUploading(false);
    }
  };

  /* ================= PROFILE UPDATE (JSON) ================= */
  const updateCandidateProfile = async () => {
    const candidate = JSON.parse(localStorage.getItem("candidate"));

    if (!candidate?.can_id) {
      toast.error("Candidate not found");
      return false;
    }

    // ✅ validations
    if (!formData.education_type) {
      toast.warn("Please select Education Type");
      return false;
    }

    const finalEducation =
      formData.education_type === "Other"
        ? formData.education_other
        : formData.education_detail;

    if (!finalEducation?.trim()) {
      toast.warn("Please select/enter Education Detail");
      return false;
    }

    if (!formData.skills.trim()) {
      toast.warn("Please enter Skills");
      return false;
    }

    if (!formData.experience.trim()) {
      toast.warn("Please enter Experience");
      return false;
    }

    if (!formData.can_resume) {
      toast.warn("Please upload Resume (PDF)");
      return false;
    }

    setProfileUpdating(true);

    try {
      // ✅ DB field names exact
      const payload = {
        can_education_type: formData.education_type,
        can_education_detail: finalEducation,
        can_experience: formData.experience,
        can_skill: formData.skills, // ✅ IMPORTANT: can_skill
        can_resume: formData.can_resume,
      };

      const res = await axios.post(
        `${BASE_URL}hirelink_apis/candidate/updatedata/tbl_candidate/can_id/${candidate.can_id}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.status === true || res.data.status === "success") {
        toast.success("✅ Profile Updated Successfully!");

        // ✅ localStorage update
        const updatedCandidate = {
          ...candidate,
          can_education_type: formData.education_type,
          can_education_detail: finalEducation,
          can_experience: formData.experience,
          can_skill: formData.skills,
          can_resume: formData.can_resume,
        };

        localStorage.setItem("candidate", JSON.stringify(updatedCandidate));

        // ✅ UI refresh
        setFormData((prev) => ({
          ...prev,
          education_type: formData.education_type,
          education_detail: finalEducation,
          education_other: "",
          experience: formData.experience,
          skills: formData.skills,
          can_resume: formData.can_resume,
        }));

        return true;
      } else {
        toast.error(res.data.message || "Profile update failed");
        return false;
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error while updating profile");
      return false;
    } finally {
      setProfileUpdating(false);
    }
  };

  /* ================= APPLY JOB ================= */
  const handleApplySubmit = async (e) => {
    e.preventDefault();

    const candidate = JSON.parse(localStorage.getItem("candidate"));

    if (!candidate?.can_id) {
      toast.warn("Please login first");
      navigate("/signin");
      return;
    }

    if (alreadyApplied) {
      toast.warn("You already applied for this job ✅");
      return;
    }

    // ✅ first update profile
    const ok = await updateCandidateProfile();
    if (!ok) return;

    if (!job?.job_employer_id) {
      toast.error("Employer ID not found");
      return;
    }

    setLoading(true);

    const payload = {
      apl_candidate_id: candidate.can_id,
      apl_job_id: Number(job_id),
      apl_employer_id: job.job_employer_id,
    };

    try {
      const res = await axios.post(
        `${BASE_URL}hirelink_apis/admin/insert/tbl_applied`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status === true || res.data.status === "success") {
        toast.success("✅ Job Applied Successfully!");
        setTimeout(() => navigate("/profile/applied-jobs"), 1200);
      } else {
        toast.error(res.data.message || "Failed to apply job");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error while applying job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title={`${seoConfig.c_apply.title} - ${job.job_title}`}
        description={seoConfig.c_apply.description}
      />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="container mt-5 mb-5">
        <h3 className="fw-bold mb-3 ps-3">Apply Job</h3>

        {/* ✅ Job Info */}
        {job && (
          <div className="card p-3 mb-4 shadow-sm">
            <h5 className="fw-bold">{job.job_title}</h5>
            <p className="text-muted m-0">
              {job.job_company} · {job.city_name}, {job.state_name}
            </p>
            {/* <p className="text-success fw-semibold mt-2">
              ₹{job.job_salary}/month
            </p> */}
          </div>
        )}

        {/* ✅ APPLY FORM */}
        <div className="card p-4 shadow-sm">
          <form onSubmit={handleApplySubmit}>
            <div className="row">
              {/* Name */}
              <div className="col-6 mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.can_full_name}
                  disabled
                />
              </div>

              {/* Email */}
              <div className="col-6 mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.can_email}
                  disabled
                />
              </div>

              {/* Phone */}
              <div className="col-6 mb-3">
                <label className="form-label fw-semibold">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.can_phone}
                  disabled
                />
              </div>

              {/* Education Type */}
              <div className="col-6 mb-3">
                <label className="form-label fw-semibold">Education Type</label>
                <select
                  className="form-select form-control"
                  value={formData.education_type}
                  onChange={handleEducationTypeChange}
                >
                  <option value="">-- Select Education Type --</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Post Graduation">Post Graduation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Education Detail */}
              {formData.education_type &&
                formData.education_type !== "Other" && (
                  <div className="col-6 mb-3">
                    <label className="form-label fw-semibold">
                      Education Detail
                    </label>
                    <select
                      className="form-select form-control"
                      name="education_detail"
                      value={formData.education_detail}
                      onChange={handleChange}
                    >
                      <option value="">-- Select --</option>
                      {educationOptions[formData.education_type]?.map(
                        (item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}

              {/* Other Education */}
              {formData.education_type === "Other" && (
                <div className="col-6 mb-3">
                  <label className="form-label fw-semibold">
                    Enter Education
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="education_other"
                    value={formData.education_other}
                    onChange={handleChange}
                    placeholder="Ex: BCA, MCA, ITI, etc..."
                  />
                </div>
              )}

              {/* Experience */}
              <div className="col-6 mb-3">
                <label className="form-label fw-semibold">Experience</label>
                <input
                  type="text"
                  className="form-control"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Ex: 1 year / Fresher"
                />
              </div>

              {/* Skills */}
              <div className="col-6 mb-3">
                <label className="form-label fw-semibold">Skills</label>
                <input
                  type="text"
                  className="form-control"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Ex: React, PHP, MySQL, HTML, CSS"
                />
              </div>

              {/* Resume Upload */}
              <div className="col-6 mb-3">
                {/* Desktop only */}
                <label className="form-label fw-semibold d-none d-md-block">
                  Upload Resume (PDF Only)
                </label>

                {/* Mobile only */}
                <label className="form-label fw-semibold d-block d-md-none">
                  Upload Resume
                </label>

                <input
                  type="file"
                  className="form-control"
                  accept="application/pdf"
                  onChange={(e) => uploadFile(e, "can_resume")}
                />

                {/* ✅ hidden input */}
                <input
                  type="hidden"
                  name="can_resume"
                  value={formData.can_resume}
                />

                {resumeUploading && (
                  <small className="text-warning">Uploading resume...</small>
                )}

                {formData.can_resume && (
                  <small className="text-success">✅ Uploaded Resume</small>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={
                loading || profileUpdating || resumeUploading || alreadyApplied
              }
            >
              {alreadyApplied
                ? "Already Applied ✅"
                : resumeUploading
                  ? "Uploading Resume..."
                  : profileUpdating
                    ? "Updating Profile..."
                    : loading
                      ? "Applying..."
                      : "Apply"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Apply;
