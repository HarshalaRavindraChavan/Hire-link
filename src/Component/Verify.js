import React, { useState, useEffect, useRef } from "react";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import { BASE_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "../Component/css/Verify.css";
import logo from "./logo/hirelink.png";

function Verify() {
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [shake, setShake] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const OTP_EXPIRY_KEY = "otpExpiryTime";
  const RESEND_LIMIT_KEY = "otpResendCount";
  const RESEND_TIME_KEY = "otpResendTime";

  // ================= LOAD EMAIL =================
  // useEffect(() => {
  //   const verifyUser = JSON.parse(localStorage.getItem("verifyUser"));
  //   if (!verifyUser?.email || !verifyUser?.role) {
  //     toast.error("Session expired. Please signup again.");
  //     navigate("/signup");
  //     return;
  //   }
  //   setEmail(verifyUser.email);
  //   setRole(verifyUser.role);
  // }, [navigate]);

  // ================= OTP TIMER =================
  useEffect(() => {
    let expiry = localStorage.getItem(OTP_EXPIRY_KEY);
    if (!expiry) {
      expiry = Date.now() + 5 * 60 * 1000;
      localStorage.setItem(OTP_EXPIRY_KEY, expiry);
    }

    const interval = setInterval(() => {
      const diff = Math.floor((expiry - Date.now()) / 1000);
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ================= RESEND RATE LIMIT =================
  useEffect(() => {
    const lastTime = localStorage.getItem(RESEND_TIME_KEY);
    if (!lastTime) return;

    const diff = Math.floor((Date.now() - lastTime) / 1000);
    if (diff < 60) {
      setResendCooldown(60 - diff);
    }

    const interval = setInterval(() => {
      setResendCooldown((p) => (p > 0 ? p - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ================= HELPERS =================
  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputsRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // ================= AUTO SUBMIT =================
  useEffect(() => {
    if (otp.join("").length === 6 && timeLeft > 0) verifyOtp();
  }, [otp]); // eslint-disable-line

  // ================= VERIFY =================
  const verifyOtp = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const payload =
        role === "candidate"
          ? { can_email: email, otp: otp.join("") }
          : { emp_email: email, otp: otp.join("") };

      const url =
        role === "candidate"
          ? `${BASE_URL}hirelink_apis/candidate/verifyEmailOtp`
          : `${BASE_URL}hirelink_apis/employer/verifyEmailOtp`;

      const res = await axios.post(url, payload);

      if (res.data?.status) {
        toast.success("Email verified successfully ✅");
        localStorage.removeItem(OTP_EXPIRY_KEY);
        navigate("/payment");
      } else {
        throw new Error();
      }
    } catch {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      toast.error("Invalid OTP");
      setOtp(["", "", "", "", "", ""]);
      inputsRef.current[0].focus();
    } finally {
      setLoading(false);
    }
  };

  // ================= RESEND OTP =================
  const resendOtp = async () => {
    if (resendCooldown > 0) return;

    const count = Number(localStorage.getItem(RESEND_LIMIT_KEY)) || 0;
    if (count >= 3) {
      toast.error("Too many resend attempts. Try after some time.");
      return;
    }

    try {
      const payload =
        role === "candidate" ? { can_email: email } : { emp_email: email };

      const url =
        role === "candidate"
          ? `${BASE_URL}hirelink_apis/candidate/resendOtp`
          : `${BASE_URL}hirelink_apis/employer/resendOtp`;

      await axios.post(url, payload);

      toast.success("OTP resent successfully ✅");

      localStorage.setItem(RESEND_LIMIT_KEY, count + 1);
      localStorage.setItem(RESEND_TIME_KEY, Date.now());

      setResendCooldown(60);
      setTimeLeft(300);
      localStorage.setItem(OTP_EXPIRY_KEY, Date.now() + 300000);
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <>
      <SEO
        title={seoConfig.verify.title}
        description={seoConfig.verify.description}
      />
      <ToastContainer />

      <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
        <div
          className="card p-4 shadow"
          style={{ maxWidth: 420, width: "100%" }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={logo}
              style={{ width: "100px", height: "100px" }}
              alt="logo"
            />
          </div>

          <p className="text-center text-muted" aria-live="polite">
            Enter the 6-digit code sent to your email
          </p>

          <div
            className={`d-flex justify-content-between mb-3 ${shake ? "otp-shake" : ""}`}
            role="group"
            aria-label="OTP input"
          >
            {otp.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                className="form-control otp-input text-center fw-bold"
                style={{ width: 50, height: 20, fontSize: 16 }}
                value={d}
                maxLength={1}
                inputMode="numeric"
                aria-label={`Digit ${i + 1}`}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              />
            ))}
          </div>

          <p className="small text-center">
            OTP expires in <b>{formatTime(timeLeft)}</b>
          </p>

          <button
            className="btn btn-success w-100"
            disabled={loading || timeLeft === 0}
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>

          <div className="text-center mt-3">
            <button
              className="btn btn-link"
              disabled={resendCooldown > 0}
              onClick={resendOtp}
            >
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : "Send new code"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Verify;
