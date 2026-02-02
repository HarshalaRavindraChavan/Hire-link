// import React, { useState, useEffect } from "react";
// import SEO from "../SEO";
// import { seoConfig } from "../config/seoConfig";
// import { BASE_URL } from "../config/constants";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";

// function Verify() {
//   const navigate = useNavigate();

//   const [code, setCode] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState(""); // ✅ candidate / employer
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const verifyUser = JSON.parse(localStorage.getItem("verifyUser"));

//     if (verifyUser?.email && verifyUser?.role) {
//       setEmail(verifyUser.email);
//       setRole(verifyUser.role);
//     } else {
//       toast.error("No email found. Please signup again.");
//       navigate("/signup");
//     }
//   }, [navigate]);

//   const maskEmail = (email) => {
//     if (!email) return "";
//     const [name, domain] = email.split("@");
//     if (!domain) return email;

//     const maskedName =
//       name.length <= 2
//         ? name[0] + "*"
//         : name.slice(0, 3) + "*".repeat(name.length - 3);

//     return `${maskedName}@${domain}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (code.length !== 6) {
//       toast.error("Enter valid 6 digit OTP");
//       return;
//     }

//     if (!email || !role) {
//       toast.error("Verification details missing. Please signup again.");
//       navigate("/signup");
//       return;
//     }

//     setLoading(true);

//     try {
//       let url = "";
//       let payload = {};

//       if (role === "candidate") {
//         url = `${BASE_URL}hirelink_apis/candidate/verifyEmailOtp`;
//         payload = { can_email: email, otp: code };
//       } else {
//         url = `${BASE_URL}hirelink_apis/employer/verifyEmailOtp`;
//         payload = { emp_email: email, otp: code };
//       }

//       const res = await axios.post(url, payload);
//       const data = res.data;

//       if (data.status === true) {
//         toast.success("Email verified successfully ✅");

//         // ✅ store payment user info for payment page
//         localStorage.setItem(
//           "paymentUser",
//           JSON.stringify({
//             email: email,
//             role: role,
//             for: "Account Creat",
//           }),
//         );

//         // ✅ clear verifyUser
//         localStorage.removeItem("verifyUser");

//         setTimeout(() => {
//           navigate("/payment");
//         }, 800);
//       } else {
//         toast.error(data.message || "OTP verification failed");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Resend OTP
//   const resendOtp = async () => {
//     if (!email || !role) {
//       toast.error("Verification details missing. Please signup again.");
//       navigate("/signup");
//       return;
//     }

//     try {
//       let url = "";
//       let payload = {};

//       if (role === "candidate") {
//         url = `${BASE_URL}hirelink_apis/candidate/resendOtp`;
//         payload = { can_email: email };
//       } else {
//         url = `${BASE_URL}hirelink_apis/employer/resendOtp`;
//         payload = { emp_email: email };
//       }

//       const res = await axios.post(url, payload);

//       if (res.data?.status === true) {
//         toast.success("OTP resent to email ✅");
//       } else {
//         toast.error(res.data?.message || "Failed to resend OTP");
//       }
//     } catch (error) {
//       toast.error("Failed to resend OTP");
//     }
//   };

//   return (
//     <>
//       <SEO
//         title={seoConfig.verify.title}
//         description={seoConfig.verify.description}
//       />
//       <ToastContainer position="top-right" autoClose={3000} theme="colored" />

//       <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//         <div className="card shadow p-4" style={{ width: "420px" }}>
//           <div className="text-center mb-3">
//             <h2 className="fw-bold text-success">Hirelink</h2>
//           </div>

//           <h5 className="text-center fw-bold mb-3">Email Verification</h5>

//           <p className="text-center" style={{ color: "#928f8fff" }}>
//             OTP sent to: <br />
//             <b>{maskEmail(email)}</b>
//           </p>

//           <form onSubmit={handleSubmit}>
//             <label className="form-label fw-semibold">Enter OTP *</label>
//             <input
//               type="text"
//               className="form-control mb-3"
//               value={code}
//               onChange={(e) =>
//                 setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
//               }
//               placeholder="Enter 6-digit code"
//               required
//             />

//             <p className="small text-dark">
//               This OTP will expire in 5 minutes.
//             </p>

//             <button
//               className="btn btn-success w-100 fw-semibold"
//               disabled={loading}
//             >
//               {loading ? "Verifying..." : "Verify & Continue"}
//             </button>
//           </form>

//           <div className="text-center mt-3">
//             <button
//               onClick={resendOtp}
//               className="btn btn-link fw-semibold text-decoration-none"
//               style={{ color: "#928f8fff" }}
//               type="button"
//             >
//               Send new code
//             </button>
//           </div>

//           <footer className="text-center mt-3 small text-warning">
//             © {new Date().getFullYear()} Hirelink
//           </footer>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Verify;

import React, { useState, useEffect } from "react";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import { BASE_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Verify() {
  const navigate = useNavigate();

  const [step, setStep] = useState("email"); // email | mobile
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
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

  // ✅ EMAIL OTP VERIFY
  const verifyEmailOtp = async (e) => {
    e.preventDefault();

    if (emailOtp.length !== 6) {
      toast.error("Enter valid 6 digit Email OTP");
      return;
    }

    setLoading(true);

    try {
      const url =
        role === "candidate"
          ? `${BASE_URL}hirelink_apis/candidate/verifyEmailOtp`
          : `${BASE_URL}hirelink_apis/employer/verifyEmailOtp`;

      const payload =
        role === "candidate"
          ? { can_email: email, otp: emailOtp }
          : { emp_email: email, otp: emailOtp };

      const res = await axios.post(url, payload);

      if (res.data?.status) {
        toast.success("Email verified successfully ✅");
        setStep("mobile"); // 👉 move to mobile OTP
      } else {
        toast.error(res.data?.message || "Email OTP verification failed");
      }
    } catch {
      toast.error("Email OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ MOBILE OTP VERIFY
  const verifyMobileOtp = async (e) => {
    e.preventDefault();

    if (mobileOtp.length !== 6) {
      toast.error("Enter valid 6 digit Mobile OTP");
      return;
    }

    setLoading(true);

    try {
      const url =
        role === "candidate"
          ? `${BASE_URL}hirelink_apis/candidate/verifyMobileOtp`
          : `${BASE_URL}hirelink_apis/employer/verifyMobileOtp`;

      const payload =
        role === "candidate"
          ? { can_mobile: mobile, otp: mobileOtp }
          : { emp_mobile: mobile, otp: mobileOtp };

      const res = await axios.post(url, payload);

      if (res.data?.status) {
        toast.success("Mobile number verified ✅");

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

        setTimeout(() => navigate("/payment"), 800);
      } else {
        toast.error(res.data?.message || "Mobile OTP verification failed");
      }
    } catch {
      toast.error("Mobile OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const resendMobileOtp = async () => {
    if (!mobile || !role) {
      toast.error("Verification details missing. Please signup again.");
      navigate("/signup");
      return;
    }

    try {
      let url = "";
      let payload = {};

      if (role === "candidate") {
        url = `${BASE_URL}hirelink_apis/candidate/resendMobileOtp`;
        payload = { can_mobile: mobile };
      } else {
        url = `${BASE_URL}hirelink_apis/employer/resendMobileOtp`;
        payload = { emp_mobile: mobile };
      }

      const res = await axios.post(url, payload);

      if (res.data?.status === true) {
        toast.success("OTP resent to mobile");
      } else {
        toast.error(res.data?.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  const resendEmailOtp = async () => {
    if (!email || !role) {
      toast.error("Verification details missing. Please signup again.");
      navigate("/signup");
      return;
    }

    try {
      let url = "";
      let payload = {};

      if (role === "candidate") {
        url = `${BASE_URL}hirelink_apis/candidate/resendOtp`;
        payload = { can_email: email };
      } else {
        url = `${BASE_URL}hirelink_apis/employer/resendOtp`;
        payload = { emp_email: email };
      }

      const res = await axios.post(url, payload);

      if (res.data?.status === true) {
        toast.success("OTP resent to email ✅");
      } else {
        toast.error(res.data?.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
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
          <h5 className="text-center fw-bold mb-3">
            {step === "email" ? "Email Verification" : "Mobile Verification"}
          </h5>

          {step === "email" && (
            <>
              <p className="text-center small">
                OTP sent to <b>{maskEmail(email)}</b>
              </p>

              <form onSubmit={verifyEmailOtp}>
                <input
                  className="form-control mb-3"
                  type="tel"
                  placeholder="Enter Email OTP"
                  maxLength={6}
                  value={emailOtp}
                  onChange={(e) =>
                    setEmailOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                />

                <button className="btn btn-success w-100" disabled={loading}>
                  {loading ? "Verifying..." : "Verify Email"}
                </button>

                <div className="text-center mt-3">
                  <button
                    onClick={resendEmailOtp}
                    className="btn btn-link fw-semibold text-decoration-none"
                    style={{ color: "#928f8fff" }}
                    type="button"
                  >
                    Send new code
                  </button>{" "}
                </div>
              </form>
              <footer className="text-center mt-3 small text-warning">
                {" "}
                © {new Date().getFullYear()} Hirelink{" "}
              </footer>
            </>
          )}

          {step === "mobile" && (
            <>
              <p className="text-center small">
                OTP sent to <b>{maskMobile(mobile)}</b>
              </p>

              <form onSubmit={verifyMobileOtp}>
                <input
                  className="form-control mb-3"
                  type="tel"
                  placeholder="Enter Mobile OTP"
                  maxLength={6}
                  value={mobileOtp}
                  onChange={(e) =>
                    setMobileOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                />

                <button className="btn btn-success w-100" disabled={loading}>
                  {loading ? "Verifying..." : "Verify Mobile"}
                </button>

                <div className="text-center mt-3">
                  <button
                    onClick={resendMobileOtp}
                    className="btn btn-link fw-semibold text-decoration-none"
                    style={{ color: "#928f8fff" }}
                    type="button"
                  >
                    Send new code
                  </button>{" "}
                </div>
              </form>
              <footer className="text-center mt-3 small text-warning">
                © {new Date().getFullYear()} Hirelink
              </footer>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Verify;
