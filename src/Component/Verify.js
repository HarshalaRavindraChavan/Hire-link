import React, { useState } from "react";

function Verify() {
  const [code, setCode] = useState("");
  const phoneNumber = "9876543248"; // Dynamic value API किंवा Props मधून येऊ शकतो

  // Masking function (hide all numbers except last 3)
  const maskPhoneNumber = (phone) => {
    if (!phone) return "";
    const lastThree = phone.slice(-3);
    const masked = "X".repeat(phone.length - 3);
    return masked + lastThree;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Code: ", code);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "420px" }}>
        
        <div className="text-center mb-3">
          <h2 className="fw-bold text-primary">Hirelink</h2>
        </div>

        <h5 className="text-center fw-bold mb-3">2-Step Verification</h5>

        <p className="text-center text-secondary">
          Your verification code has been sent to: <br />
          <b>{maskPhoneNumber(phoneNumber)}</b>
        </p>

        <form onSubmit={handleSubmit}>
          <label className="form-label fw-semibold">Enter code *</label>
          <input
            type="text"
            className="form-control mb-3"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            required
          />

          <p className="small text-secondary">This code will expire in 10 minutes.</p>

          <button className="btn btn-primary w-100 fw-semibold">Submit</button>
        </form>

        <div className="text-center mt-3">
          <button className="btn btn-link fw-semibold text-decoration-none">
            Send new code
          </button>
        </div>

        <div className="text-center mt-2">
          <button className="btn btn-link text-decoration-none small">
            Don't have access to this phone number?
          </button>
        </div>

        <footer className="text-center mt-3 small text-secondary">
          © 2025 Hirelink 
        </footer>
      </div>
    </div>
  );
}

export default Verify;
