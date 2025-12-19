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
    <div className="container my-4 my-md-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-12 ">
          <div className="card shadow-sm border-0" style={{ outline: "0px solid gray" }}>
            <div className="card-body p-4">
              <h5
                className="mb-3"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Apply For This Job
              </h5>

              <form onSubmit={handleSubmit}>
                {/* Row 1 */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
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
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Experience</label>
                    <select
                      className="form-select"
                      required
                      style={{ height: "45px" }}
                    >
                      <option value="">Select experience</option>
                      <option>Fresher</option>
                      <option>1–2 Years</option>
                      <option>3–5 Years</option>
                      <option>5+ Years</option>
                    </select>
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
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Upload Resume</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleResume}
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label className="form-label">Message (optional)</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Any additional information"
                  ></textarea>
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
