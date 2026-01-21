import React, { useState } from "react";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import { BASE_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";

function Verify() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const email = "harshal@gmail.com";

  const maskEmail = (email) => {
    if (!email) return "";

    const [name, domain] = email.split("@");
    if (!domain) return email;

    const maskedName =
      name.length <= 2
        ? name[0] + "*"
        : name.slice(0, 3) + "*".repeat(name.length - 2);

    return `${maskedName}@${domain}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      navigate("/payment");

  };

  return (
    <>
      <SEO
        title={seoConfig.verify.title}
        description={seoConfig.verify.description}
      />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow p-4" style={{ width: "420px" }}>
          <div className="text-center mb-3">
            <h2 className="fw-bold text-success">Hirelink</h2>
          </div>

          <h5 className="text-center fw-bold mb-3">Email Verification</h5>

          <p className="text-center" style={{ color: "#928f8fff" }}>
            Your verification code has been sent to: <br />
            <b>{maskEmail(email)}</b>
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

            <p className="small text-dark">
              This code will expire in 10 minutes.
            </p>

            <button className="btn btn-success w-100 fw-semibold">
              Submit
            </button>
          </form>

          <div className="text-center mt-3">
            <button
              className="btn btn-link fw-semibold text-decoration-none"
              style={{ color: "#928f8fff" }}
            >
              Send new code
            </button>
          </div>

          {/* <div className="text-center mt-2">
          <button className="btn btn-link text-decoration-none small">
            Don't have access to this phone number?
          </button>
        </div> */}

          <footer className="text-center mt-3 small text-warning">
            © {new Date().getFullYear()} Hirelink
          </footer>
        </div>
      </div>
    </>
  );
}

export default Verify;
