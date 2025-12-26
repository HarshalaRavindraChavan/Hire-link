import React from "react";

const EmpProfile = () => {
  return (
    <div className="container-fluid py-4 bg-light">
      <div className="container">
        {/* Page Title */}
        <div className="mb-4">
          <h5 className="fw-bold">My Profile</h5>
          <small className="text-muted">Home / My Profile</small>
        </div>

        {/* Card */}
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">

            {/* ================= Your Information ================= */}
            <h6 className="fw-bold mb-3">Your Information</h6>
            <div className="row g-3">
              <div className="col-md-6 col-12">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value="SANTOSH TUKARAM MOHOL"
                  readOnly
                />
              </div>

              <div className="col-md-6 col-12">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>

              <div className="col-md-6 col-12">
                <label className="form-label">Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  value="9922963636"
                  readOnly
                />
              </div>

              <div className="col-md-6 col-12">
                <label className="form-label">Status</label>
                <input
                  type="text"
                  className="form-control"
                  value="Active"
                  readOnly
                />
              </div>
            </div>

            <hr className="my-4" />

            {/* ================= Bank Details ================= */}
            <h6 className="fw-bold mb-3">Bank Details</h6>
            <div className="row g-3">
              <div className="col-md-6 col-12">
                <label className="form-label">Bank Holder Name</label>
                <input type="text" className="form-control" />
              </div>

              <div className="col-md-6 col-12">
                <label className="form-label">Account Number</label>
                <input type="text" className="form-control" />
              </div>

              <div className="col-md-6 col-12">
                <label className="form-label">IFSC Code</label>
                <input type="text" className="form-control" />
              </div>

              <div className="col-md-6 col-12">
                <label className="form-label">Bank Name</label>
                <input type="text" className="form-control" />
              </div>

              <div className="col-md-6 col-12">
                <label className="form-label">Bank Location</label>
                <input type="text" className="form-control" />
              </div>

              <div className="col-md-6 col-12">
                <label className="form-label">
                  Passbook Photo / Cancel Cheque
                </label>
                <input type="file" className="form-control" />
              </div>
            </div>

            {/* Save Button */}
            <div className="text-center mt-4">
              <button className="btn btn-success px-5">
                Save
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpProfile;
