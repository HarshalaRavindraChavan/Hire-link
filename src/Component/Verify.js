import React, { useState, useEffect } from "react";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import { BASE_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Verify() {
  const navigate = useNavigate();

  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");

  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyUser = JSON.parse(localStorage.getItem("verifyUser"));

    if (verifyUser?.email && verifyUser?.role && verifyUser?.mobile) {
      setEmail(verifyUser.email);
      setRole(verifyUser.role);
      setMobile(verifyUser.mobile);
    } else {
      toast.error("Verification details missing. Please signup again.");
      navigate("/signup");
    }
  }, [navigate]);

  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    return `${name.slice(0, 3)}****@${domain}`;
  };

  const maskMobile = (mobile) =>
    mobile ? mobile.replace(/(\d{2})\d{6}(\d{2})/, "$1******$2") : "";

  // ✅ VERIFY MOBILE OTP
  const verifyMobileOtp = async () => {
    if (mobileOtp.length !== 6) {
      toast.error("Enter valid 6 digit Mobile OTP");
      return;
    }

    setLoading(true);

    try {
      const url =
        role === "candidate"
          ? `${BASE_URL}candidate/verifyMobileOtp`
          : `${BASE_URL}employer/verifyMobileOtp`;

      const payload =
        role === "candidate"
          ? { can_mobile: mobile, otp: mobileOtp }
          : { emp_mobile: mobile, otp: mobileOtp };

      const res = await axios.post(url, payload);

      if (res.data?.status) {
        toast.success("Mobile verified ✅");
        setMobileVerified(true);
      } else {
        toast.error(res.data?.message || "Mobile OTP verification failed");
      }
    } catch {
      toast.error("Mobile OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ VERIFY EMAIL OTP
  const verifyEmailOtp = async () => {
    if (emailOtp.length !== 6) {
      toast.error("Enter valid 6 digit Email OTP");
      return;
    }

    setLoading(true);

    try {
      const url =
        role === "candidate"
          ? `${BASE_URL}candidate/verifyEmailOtp`
          : `${BASE_URL}employer/verifyEmailOtp`;

      const payload =
        role === "candidate"
          ? { can_email: email, otp: emailOtp }
          : { emp_email: email, otp: emailOtp };

      const res = await axios.post(url, payload);

      if (res.data?.status) {
        toast.success("Email verified ✅");
        setEmailVerified(true);
      } else {
        toast.error(res.data?.message || "Email OTP verification failed");
      }
    } catch {
      toast.error("Email OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FINAL PAYMENT NAVIGATION
  const proceedToPayment = () => {
    const oldPaymentUser = JSON.parse(
      localStorage.getItem("paymentUser") || "{}",
    );

    localStorage.setItem(
      "paymentUser",
      JSON.stringify({
        ...oldPaymentUser,
        email,
        role,
        for: "Account Create",
        returnTo: role === "candidate" ? "/profile" : "/emp-profile",
      }),
    );

    localStorage.removeItem("verifyUser");
    navigate("/payment");
  };

  return (
    <>
      <SEO
        title={seoConfig.verify.title}
        description={seoConfig.verify.description}
      />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow p-4" style={{ width: "420px" }}>
          <h5 className="text-center fw-bold mb-4">Account Verification</h5>

          {/* MOBILE OTP */}
          <p className="small">
            Mobile OTP sent to <b>{maskMobile(mobile)}</b>
          </p>

           <div className="d-flex gap-2 mb-3">
            <input
              className="form-control"
              placeholder="Mobile OTP"
              maxLength={6}
              disabled={mobileVerified}
              value={mobileOtp}
              onChange={(e) =>
                setMobileOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
            />
            <button
              className="btn btn-success"
              disabled={mobileVerified || loading}
              onClick={verifyMobileOtp}
            >
              {mobileVerified ? "Verified" : "Verify"}
            </button>
          </div>

          {/* <div className="mb-3">
            <input
              className="form-control mb-2"
              placeholder="Mobile OTP"
              maxLength={6}
              disabled={mobileVerified}
              value={mobileOtp}
              onChange={(e) =>
                setMobileOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
            />

            <button
              className="btn btn-success w-100"
              disabled={mobileVerified || loading}
              onClick={verifyMobileOtp}
            >
              {mobileVerified ? "Verified" : "Verify"}
            </button>
          </div> */}

          {/* EMAIL OTP */}
          <p className="small">
            Email OTP sent to <b>{maskEmail(email)}</b>
          </p>

          <div className="d-flex gap-2 mb-4">
            <input
              className="form-control"
              placeholder="Email OTP"
              maxLength={6}
              disabled={emailVerified}
              value={emailOtp}
              onChange={(e) =>
                setEmailOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
            />
            <button
              className="btn btn-success"
              disabled={emailVerified || loading}
              onClick={verifyEmailOtp}
            >
              {emailVerified ? "Verified" : "Verify"}
            </button>
          </div>

          {/* PAYMENT BUTTON */}
          {mobileVerified && emailVerified && (
            <button
              className="btn btn-success w-100 fw-semibold"
              onClick={proceedToPayment}
            >
              Proceed to Payment
            </button>
          )}

          <footer className="text-center mt-3 small text-warning">
            © {new Date().getFullYear()} Pharma Jobs
          </footer>
        </div>
      </div>
    </>
  );
}

export default Verify;
