import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Apply() {
  const location = useLocation();
  const { job } = location.state || {};
  const navigate = useNavigate();

  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const candidate = JSON.parse(localStorage.getItem("candidate"));

  const apl_candidate_id = candidate?.can_id;
  const apl_job_id = job?.job_id;
  const apl_employer_id = job?.jon_employer_id; // backend key check kar

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    experience: "",
    skill: "",
  });

  const handleApplySubmit = async (e) => {
    e.preventDefault();

    if (applied || applying) return;

    if (!apl_candidate_id || !apl_job_id || !apl_employer_id) {
      toast.error("Missing required IDs ❌");
      return;
    }

    setApplying(true);

    try {
      const res = await axios.post(
        "https://norealtor.in/hirelink_apis/admin/insert/tbl_applied",
        {
          apl_candidate_id,
          apl_job_id,
          apl_employer_id,
        }
      );

      if (res.data.status) {
        setApplied(true);
        toast.success("Job applied successfully ✅");
      } else {
        toast.error(res.data.message || "Apply failed ❌");
      }
    } catch (err) {
      toast.error("Something went wrong 🚫");
    } finally {
      setApplying(false);
    }
  };

  useEffect(() => {
    if (candidate) {
      setFormData({
        fullname: candidate.can_name || "",
        email: candidate.can_email || "",
        mobile: candidate.can_mobile || "",
        experience: candidate.can_experience || "",
        skill: candidate.can_skill || "",
      });
    }
  }, [candidate]);

  if (!job) {
    navigate("/signin"); // 🔁 signin route
    return null;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
      <div className="container my-4 my-md-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-12 ">
            <div
              className="card shadow-sm border-0"
              style={{ outline: "0px solid gray" }}
            >
              <div className="card-body p-4">
                <h5
                  className="mb-3"
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  Apply For The Job
                </h5>

                {/* JOB DETAILS (READONLY) */}

                <div className=" row">
                  <div className="mb-2 col-md-6">
                    <label className="form-label">Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={job?.job_title || ""}
                      readOnly
                    />
                  </div>

                  <div className="mb-2 col-md-6">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={job?.job_company || ""}
                      readOnly
                    />
                  </div>
                </div>

                <form onSubmit={handleApplySubmit}>
                  {/* Row 1 */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.fullname}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.email}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Mobile</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.mobile}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Experience</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.experience}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Primary Skill</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.skill}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn btn-success w-100 py-2"
                    disabled={applied || applying}
                  >
                    {applied
                      ? "Already Applied"
                      : applying
                      ? "Applying..."
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
