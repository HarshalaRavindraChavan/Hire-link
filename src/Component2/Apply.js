import React, { useState } from "react";
import "../Component2/css/Apply.css";

function Apply() {
  const [activeStep, setActiveStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    resumeFile: null,
    question: "",
    experience: "",
    skills: "",
  });

  const steps = [
    { id: 1, title: "Personal Details" },
    { id: 2, title: "Resume" },
    { id: 3, title: "Company Questions" },
    { id: 4, title: "Experience & Skills" },
    { id: 5, title: "Review & Submit" },
  ];

  const nextStep = () => {
    if (activeStep < steps.length) setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitApplication = () => {
    alert("Application Submitted Successfully ✅");
    setShowPreview(false);
  };

  return (
    <div className="container my-4">
      <h4 className="fw-bold mb-4 ms-3">Apply Job</h4>

      <div className="row g-4">
        {steps.map((step) => (
          <div className="col-md-4" key={step.id}>
            <div
              className={`card h-100 shadow-sm
              ${activeStep === step.id ? "border-success" : ""}
              ${activeStep !== step.id ? "opacity-50" : ""}`}
              style={{
                pointerEvents: activeStep === step.id ? "auto" : "none",
              }}
            >
              <div className="card-body d-flex flex-column">
                <h6 className="fw-semibold mb-3">
                  Step {step.id}: {step.title}
                </h6>

                {/* STEP 1 */}
                {step.id === 1 && activeStep === 1 && (
                  <>
                    <input
                      type="text"
                      name="fullname"
                      className="form-control mb-2"
                      placeholder="Full Name"
                      onChange={handleChange}
                    />
                    <input
                      type="email"
                      name="email"
                      className="form-control mb-3"
                      placeholder="Email"
                      onChange={handleChange}
                    />
                  </>
                )}

                {/* STEP 2 – RESUME UPLOAD */}
                {step.id === 2 && activeStep === 2 && (
                  <>
                    <label className="fw-medium mb-1">Upload Resume</label>
                    <input
                      type="file"
                      className="form-control mb-2"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          resumeFile: e.target.files[0],
                        })
                      }
                    />
                    <small className="text-muted">PDF / DOC / DOCX only</small>
                  </>
                )}

                {/* STEP 3 */}
                {step.id === 3 && activeStep === 3 && (
                  <textarea
                    name="question"
                    className="form-control mb-3"
                    rows="4"
                    placeholder="Why should we hire you?"
                    onChange={handleChange}
                  ></textarea>
                )}

                {/* STEP 4 */}
                {step.id === 4 && activeStep === 4 && (
                  <>
                    <input
                      type="text"
                      name="experience"
                      className="form-control mb-2"
                      placeholder="Total Experience"
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="skills"
                      className="form-control mb-3"
                      placeholder="Skills"
                      onChange={handleChange}
                    />
                  </>
                )}

                {/* STEP 5 */}
                {step.id === 5 && activeStep === 5 && (
                  <p className="text-muted">
                    Click preview to verify details before submission.
                  </p>
                )}

                {/* ACTION BUTTONS */}
                {activeStep === step.id && (
                  <div className="mt-auto d-flex gap-2">
                    {step.id > 1 && (
                      <button
                        className="btn btn-outline-secondary w-50"
                        onClick={prevStep}
                      >
                        Back
                      </button>
                    )}

                    {step.id < 5 && (
                      <button
                        className="btn btn-success w-50"
                        onClick={nextStep}
                      >
                        Save & Next
                      </button>
                    )}

                    {step.id === 5 && (
                      <button
                        className="btn btn-success w-50"
                        onClick={() => setShowPreview(true)}
                      >
                        Preview
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PREVIEW MODAL */}
      {showPreview && (
        <div className="modal fade show d-block preview-backdrop">
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content preview-modal">
              <div className="modal-header preview-header">
                <h5 className="modal-title text-white">Application Preview</h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowPreview(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="preview-card">
                      <h6>Personal Details</h6>
                      <p>
                        <span>Name:</span> {formData.fullname}
                      </p>
                      <p>
                        <span>Email:</span> {formData.email}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="preview-card">
                      <h6>Resume</h6>
                      <p>
                        <span>File:</span>{" "}
                        {formData.resumeFile
                          ? formData.resumeFile.name
                          : "Not uploaded"}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="preview-card">
                      <h6>Company Question</h6>
                      <p>{formData.question}</p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="preview-card">
                      <h6>Experience</h6>
                      <p>{formData.experience}</p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="preview-card">
                      <h6>Skills</h6>
                      <p>{formData.skills}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer preview-footer">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPreview(false)}
                >
                  Back & Edit
                </button>
                <button
                  className="btn btn-success px-4"
                  onClick={submitApplication}
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Apply;
