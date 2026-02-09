import React, { useState, useEffect } from "react";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import { BASE_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const RESEND_TIME = 30;

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

  const [mobileTimer, setMobileTimer] = useState(0);
  const [emailTimer, setEmailTimer] = useState(0);

  /* =======================
      INIT + RESTORE TIMER
  ======================= */
  useEffect(() => {
    const verifyUser = JSON.parse(localStorage.getItem("verifyUser"));
    if (verifyUser?.email && verifyUser?.mobile && verifyUser?.role) {
      setEmail(verifyUser.email);
      setMobile(verifyUser.mobile);
      setRole(verifyUser.role);
    } else {
      toast.error("Verification details missing. Please signup again.");
      navigate("/signup");
    }

    const mobileTime = localStorage.getItem("mobileOtpTime");
    const emailTime = localStorage.getItem("emailOtpTime");

    if (mobileTime) {
      const diff = Math.floor((Date.now() - mobileTime) / 1000);
      if (diff < RESEND_TIME) setMobileTimer(RESEND_TIME - diff);
    }

    if (emailTime) {
      const diff = Math.floor((Date.now() - emailTime) / 1000);
      if (diff < RESEND_TIME) setEmailTimer(RESEND_TIME - diff);
    }
  }, [navigate]);

  /* =======================
      COUNTDOWN EFFECTS
  ======================= */
  useEffect(() => {
    if (mobileTimer <= 0) return;
    const t = setInterval(() => setMobileTimer((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [mobileTimer]);

  useEffect(() => {
    if (emailTimer <= 0) return;
    const t = setInterval(() => setEmailTimer((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [emailTimer]);

  /* =======================
      MASK
  ======================= */
  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    return `${name.slice(0, 3)}****@${domain}`;
  };

  const maskMobile = (mobile) =>
    mobile ? mobile.replace(/(\d{2})\d{6}(\d{2})/, "$1******$2") : "";

  /* =======================
      VERIFY MOBILE OTP
  ======================= */
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
        localStorage.removeItem("mobileOtpTime");
        setMobileTimer(0);
      } else {
        toast.error(res.data?.message || "Mobile OTP failed");
      }
    } catch {
      toast.error("Mobile OTP failed");
    } finally {
      setLoading(false);
    }
  };

  /* =======================
      VERIFY EMAIL OTP
  ======================= */
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
        localStorage.removeItem("emailOtpTime");
        setEmailTimer(0);
      } else {
        toast.error(res.data?.message || "Email OTP failed");
      }
    } catch {
      toast.error("Email OTP failed");
    } finally {
      setLoading(false);
    }
  };

  /* =======================
      RESEND OTP
  ======================= */
  const resendMobileOtp = async () => {
    const url =
      role === "candidate"
        ? `${BASE_URL}candidate/resendMobileOtp`
        : `${BASE_URL}employer/resendMobileOtp`;

    const payload =
      role === "candidate" ? { can_mobile: mobile } : { emp_mobile: mobile };

    const res = await axios.post(url, payload);
    if (res.data?.status) {
      toast.success("OTP resent to mobile");
      localStorage.setItem("mobileOtpTime", Date.now());
      setMobileTimer(RESEND_TIME);
    }
  };

  const resendEmailOtp = async () => {
    const url =
      role === "candidate"
        ? `${BASE_URL}candidate/resendOtp`
        : `${BASE_URL}employer/resendOtp`;

    const payload =
      role === "candidate" ? { can_email: email } : { emp_email: email };

    const res = await axios.post(url, payload);
    if (res.data?.status) {
      toast.success("OTP resent to email");
      localStorage.setItem("emailOtpTime", Date.now());
      setEmailTimer(RESEND_TIME);
    }
  };

  /* =======================
      PAYMENT
  ======================= */
  const proceedToPayment = () => {
    localStorage.setItem(
      "paymentUser",
      JSON.stringify({
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

          {/* MOBILE */}
          <p className="small">
            Mobile OTP sent to <b>{maskMobile(mobile)}</b>
          </p>

          <div className="d-flex gap-2 mb-5">
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

          {!mobileVerified && (
            <div className="text-center " style={{ margin: "-25px 0 0 0" }}>
              {mobileTimer > 0 ? (
                <small className="text-muted">
                  Resend OTP in {mobileTimer}s
                </small>
              ) : (
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={resendMobileOtp}
                >
                  Send new code
                </button>
              )}
            </div>
          )}

          {/* EMAIL */}
          <p className="small">
            Email OTP sent to <b>{maskEmail(email)}</b>
          </p>

          <div className="d-flex gap-2 mb-5">
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

          {!emailVerified && (
            <div className="text-center" style={{ margin: "-25px 0 0 0" }}>
              {emailTimer > 0 ? (
                <small className="text-muted">
                  Resend OTP in {emailTimer}s
                </small>
              ) : (
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={resendEmailOtp}
                >
                  Send new code
                </button>
              )}
            </div>
          )}

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
