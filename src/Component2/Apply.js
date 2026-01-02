import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Apply() {
  const location = useLocation();
  const { jobId, employerId } = location.state || {};

  const candidate = JSON.parse(localStorage.getItem("candidate"));

  const apl_candidate_id = candidate?.can_id;
  const apl_job_id = jobId;
  const apl_employer_id = employerId;

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    experience: "",
    skill: "",
  });

  const handleApplySubmit = async (e) => {
    e.preventDefault();

    if (!apl_candidate_id || !apl_job_id || !apl_employer_id) {
      alert("Missing required IDs");
      return;
    }

    const payload = {
      apl_candidate_id,
      apl_job_id,
      apl_employer_id,

      // optional extra fields (if backend allows)
      fullname: formData.fullname,
      email: formData.email,
      mobile: formData.mobile,
      experience: formData.experience,
      primary_skill: formData.skill,
    };

    try {
      const res = await axios.post(
        "https://norealtor.in/hirelink_apis/admin/insert/tbl_applied",
        payload
      );

      if (res.data.status) {
        alert("Job applied successfully ✅");
      } else {
        alert(res.data.message || "Apply failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
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

              <form onSubmit={handleApplySubmit}>
                {/* Row 1 */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter full name"
                      value={formData.fullname}
                      onChange={(e) =>
                        setFormData({ ...formData, fullname: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Mobile</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter mobile number"
                      value={formData.mobile}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Experience</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Experience"
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({ ...formData, experience: e.target.value })
                      }
                      required
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
                      placeholder="Eg: React, Java"
                      value={formData.skill}
                      onChange={(e) =>
                        setFormData({ ...formData, skill: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-success w-100 py-2">
                  Apply Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apply;
