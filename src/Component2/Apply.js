import React, { useState } from "react";

function Apply() {
  const [resumeName, setResumeName] = useState("");

  const handleResume = (e) => {
    if (e.target.files.length > 0) {
      setResumeName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application Submitted Successfully 🚀");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-4 p-md-5">
              {/* Header */}
              <div className="text-center mb-4">
                <h4 className="fw-bold text-success">Apply for this Job</h4>
                <p className="text-muted mb-0">
                  Takes less than 2 minutes to apply
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Full Name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    required
                  />
                </div>

                {/* Mobile */}
                <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    id="mobile"
                    placeholder="Mobile"
                    required
                  />
                </div>

                {/* Experience */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Experience Level
                  </label>
                  <select className="form-select rounded-3" required>
                    <option value="">Choose experience</option>
                    <option>Fresher</option>
                    <option>1–2 Years</option>
                    <option>3–5 Years</option>
                    <option>5+ Years</option>
                  </select>
                </div>

                {/* Skill */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="skill"
                    placeholder="Primary Skill"
                  />
                </div>

                {/* Resume Upload */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Resume</label>
                  <div className="border rounded-3 p-3 text-center">
                    <input
                      type="file"
                      className="form-control d-none"
                      id="resume"
                      onChange={handleResume}
                      required
                    />
                    <label htmlFor="resume" className="btn btn-outline-success">
                      Upload Resume
                    </label>
                    <div className="small text-muted mt-2">
                      {resumeName || "PDF / DOC (Max 2MB)"}
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-4">
                  <textarea
                    className="form-control"
                    placeholder="Message"
                    id="message"
                    style={{ height: "90px" }}
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 rounded-3 fw-semibold"
                >
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
