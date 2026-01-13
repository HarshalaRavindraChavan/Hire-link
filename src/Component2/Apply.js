import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../config/constants";

function Apply() {
   const [updateStatus, setUpdateStatus] = useState("");
  // "", "updating", "success", "error"
  const location = useLocation();
  const { job } = location.state || {};
  const navigate = useNavigate();

  const [applied, setApplied] = useState(false);
  const [showProfileHint, setShowProfileHint] = useState(false);
  const [loading, setLoading] = useState(false);

  const candidate = JSON.parse(localStorage.getItem("candidate"));

  const apl_candidate_id = candidate?.can_id;
  const apl_job_id = job?.job_id;
  const apl_employer_id = job?.job_employer_id;

  const [originalCandidate, setOriginalCandidate] = useState(null);
  const [isProfileDirty, setIsProfileDirty] = useState(false);

  const [candidateData, setCandidateData] = useState({
    can_experience: "",
    can_skill: "",
    can_education_type: "",
    can_education_detail: "",
    can_resume: "",
  });

  useEffect(() => {
    if (candidate) {
      const snapshot = {
        can_experience: candidate.can_experience || "",
        can_skill: candidate.can_skill || "",
        can_education_type: candidate.can_education_type || "",
        can_education_detail: candidate.can_education_detail || "",
        can_resume: candidate.can_resume || "",
      };

      setOriginalCandidate(snapshot);
      setCandidateData(snapshot);
    }
  }, [candidate]);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    if (candidate) {
      setFormData({
        fullname: candidate.can_name || "",
        email: candidate.can_email || "",
        mobile: candidate.can_mobile || "",
      });
    }
  }, [candidate]);

  useEffect(() => {
    if (!job) {
      navigate("/signin", { replace: true });
    }
  }, [job, navigate]);

  if (!job) return null;

  const educationOptions = {
    Diploma: ["D.Form"],
    Graduation: ["B.Sc", "B.Form"],
    "Post Graduation": ["M.Sc", "M.Form"],
  };

  const updateCandidateField = (key, value) => {
    setCandidateData((prev) => {
      const updated = { ...prev, [key]: value };

      if (!originalCandidate) {
        setIsProfileDirty(true);
        return updated;
      }

      setIsProfileDirty(
        JSON.stringify(updated) !== JSON.stringify(originalCandidate)
      );
      return updated;
    });
  };

  const uploadFile = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      e.target.value = "";
      return;
    }

    setLoading(true);

    const fd = new FormData();
    fd.append(fieldName, file);

    try {
      const res = await axios.post(
        `${BASE_URL}hirelink_apis/candidate/fileupload`,
        fd
      );

      if (res.data.status) {
        updateCandidateField(fieldName, res.data.files[fieldName]);
        setShowProfileHint(false);
        toast.success("Resume uploaded successfully ✅");
      } else {
        toast.error("Resume upload failed ❌");
      }
    } catch {
      toast.error("Resume upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const isProfileComplete = () => {
    return (
      candidateData.can_education_type &&
      candidateData.can_education_detail &&
      candidateData.can_resume
    );
  };
 

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (loading || applied) return;

    if (!isProfileComplete()) {
      setShowProfileHint(true);
      toast.info("Please complete your profile to apply");
      return;
    }

    setLoading(true);

    try {
      if (isProfileDirty) {
        try {
          setUpdateStatus("updating");

          const updateRes = await axios.post(
            `${BASE_URL}hirelink_apis/candidate/updatedata/tbl_candidate/can_id/${apl_candidate_id}`,
            candidateData
          );

          if (!updateRes.data?.status) {
            setUpdateStatus("error");
            toast.error("Profile update failed ❌");
            return;
          }

          setUpdateStatus("success");
          toast.success("Profile updated successfully ✅");
        } catch (err) {
          setUpdateStatus("error");
          toast.error("Profile update error ❌");
          return;
        }
      }

      const applyRes = await axios.post(
        `${BASE_URL}hirelink_apis/admin/insert/tbl_applied`,
        { apl_candidate_id, apl_job_id, apl_employer_id }
      );

      if (applyRes.data?.status) {
        toast.success("Job applied successfully ✅");
        // setApplied(true);

        localStorage.setItem(
          "candidate",
          JSON.stringify({ ...candidate, ...candidateData })
        );

        // setOriginalCandidate(candidateData);
        // setIsProfileDirty(false);

        // setTimeout(() => {
        navigate("/profile/applied-jobs", { replace: true });
        // }, 1500);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isApplyDisabled = loading || applied;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="container my-4 my-md-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h5 className="text-center fw-bold mb-3">Apply For The Job</h5>

                <div className="row">
                  <div className="mb-2 col-md-6">
                    <label>Job Title</label>
                    <input
                      className="form-control"
                      value={job.job_title}
                      readOnly
                    />
                  </div>
                  <div className="mb-2 col-md-6">
                    <label>Company Name</label>
                    <input
                      className="form-control"
                      value={job.job_company}
                      readOnly
                    />
                  </div>
                </div>

                <form onSubmit={handleApplySubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Full Name</label>
                      <input
                        className="form-control"
                        value={formData.fullname}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Email</label>
                      <input
                        className="form-control"
                        value={formData.email}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Mobile</label>
                      <input
                        className="form-control"
                        value={formData.mobile}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Upload Resume</label>
                      <label
                        className="btn btn-outline-success w-100"
                        style={{ marginTop: "0" }}
                      >
                        {candidateData.can_resume
                          ? "Resume Uploaded"
                          : "Upload Resume (PDF)"}
                        <input
                          hidden
                          type="file"
                          accept=".pdf"
                          onChange={(e) => uploadFile(e, "can_resume")}
                        />
                      </label>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Education Type</label>
                      <select
                        className="form-select form-control"
                        value={candidateData.can_education_type}
                        onChange={(e) => {
                          updateCandidateField(
                            "can_education_type",
                            e.target.value
                          );
                          updateCandidateField("can_education_detail", "");
                        }}
                      >
                        <option value="">Select</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Graduation">Graduation</option>
                        <option value="Post Graduation">Post Graduation</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Education Detail</label>

                      {candidateData.can_education_type === "Other" ? (
                        <input
                          className="form-control"
                          value={candidateData.can_education_detail}
                          placeholder="Enter Your Education"
                          onChange={(e) =>
                            updateCandidateField(
                              "can_education_detail",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        <select
                          className="form-select form-control"
                          disabled={!candidateData.can_education_type}
                          value={candidateData.can_education_detail}
                          onChange={(e) =>
                            updateCandidateField(
                              "can_education_detail",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select</option>
                          {educationOptions[
                            candidateData.can_education_type
                          ]?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Experience</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Experience"
                        value={candidateData.can_experience}
                        onChange={(e) =>
                          updateCandidateField("can_experience", e.target.value)
                        }
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Primary Skill</label>
                      <input
                        className="form-control"
                        placeholder="Enter Primary Skill"
                        value={candidateData.can_skill}
                        onChange={(e) =>
                          updateCandidateField("can_skill", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {showProfileHint && (
                    <small className="text-muted d-block mb-2">
                      Please complete your profile to apply
                    </small>
                  )}

                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={isApplyDisabled}
                  >
                    {loading
                      ? "Updating & Applying..."
                      : applied
                      ? "Already Applied"
                      : "Apply Now"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Apply;
