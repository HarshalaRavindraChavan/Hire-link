import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/constants";
import { toast } from "react-toastify";
import "../Component/css/Payment.css";

function PaymentPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("paymentUser") || "{}");

  const calledOnce = useRef(false);

  const [loading, setLoading] = useState(false);
  const [displayAmount, setDisplayAmount] = useState("₹0");
  const [orderData, setOrderData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  /* ================= CREATE ORDER ================= */
  const createOrder = async () => {
    try {
      if (!user?.email || !user?.role) {
        toast.error("Payment session expired.");
        setErrorMsg("Payment session expired.");
        return;
      }

      setErrorMsg("");
      setLoading(true);

      const roleLower = String(user.role).toLowerCase();

      const payload = {
        email: user.email,
        role: roleLower,
        for: user.for,
        employer_id: user.employer_id || null,
      };

      if (roleLower === "resume_download") {
        payload.candidate_id = user.candidate_id;
      }

      const response = await axios.post(
        `${BASE_URL}payment/create-order`,
        payload,
      );

      let data = response.data;

      // ✅ HANDLE "at{...}" ISSUE WITHOUT parseApiResponse
      if (typeof data === "string") {
        const jsonStart = data.indexOf("{");
        if (jsonStart !== -1) {
          data = JSON.parse(data.substring(jsonStart));
        }
      }

      // ✅ FIXED CONDITION
      if (data?.status !== true) {
        toast.error(data?.message || "Order creation failed");
        setErrorMsg(data?.message || "Order creation failed");
        setLoading(false);
        return;
      }

      /* ✅ FREE PAYMENT */
      if (data.is_free === true || data.amount === 0) {
        toast.success("Free access granted 🎉");

        localStorage.setItem("paymentDone", "true");

        localStorage.setItem(
          "paymentDetails",
          JSON.stringify({
            paymentId: "FREE_" + Date.now(),
            orderId: "FREE_ORDER",
            email: user.email,
            mobile: user.mobile,
            name: user.name,
            role: roleLower,
            for: user.for,
            amount: "₹0",
            date: new Date().toLocaleString(),
          }),
        );

        const temp = JSON.parse(localStorage.getItem("signupTempData") || "{}");

        if (roleLower === "candidate") {
          if (temp?.data) {
            localStorage.setItem("candidate", JSON.stringify(temp.data));
          }
          navigate("/profile");
        } else if (roleLower === "employer") {
          if (temp?.data) {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                role: 100,
                emp_id: temp.data.emp_id,
                emp_companyname: temp.data.emp_companyname,
              }),
            );

            localStorage.setItem("employer", JSON.stringify(temp.data));
          }
          navigate("/emp-profile");
        } else if (roleLower === "resume_download") {
          navigate("/candidate");
        } else if (roleLower === "employer_staff") {
          navigate("/staff");
        } else {
          navigate("/signin");
        }

        setLoading(false);
        return;
      }

      /* 💰 NORMAL FLOW */
      const amountInRupees = data.amount / 100;

      setOrderData(data);
      setDisplayAmount(`₹${amountInRupees}`);
      setLoading(false);
    } catch (error) {
      console.error(error);

      toast.error("Failed to create order");

      if (error?.response?.status === 503) {
        setErrorMsg("Server down. Try again later.");
      } else {
        setErrorMsg("Something went wrong.");
      }

      setLoading(false);
    }
  };

  /* ================= INIT ================= */
  useEffect(() => {
    if (!user?.email || !user?.role) {
      toast.error("Payment session expired.");
      navigate("/signin");
      return;
    }

    if (calledOnce.current) return;
    calledOnce.current = true;

    createOrder();
  }, [user, navigate]);

  /* ================= RAZORPAY ================= */
  const openRazorpay = () => {
    try {
      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      if (!orderData) {
        toast.error("Order not ready");
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "HireLink",
        description: "Payment",
        order_id: orderData.id,
        handler: async (response) => {
          try {
            const roleLower = String(user.role).toLowerCase();

            const verifyPayload = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              email: user.email,
              mobile: user.mobile,
              role: roleLower,
              for: user.for,
            };

            if (roleLower === "resume_download") {
              verifyPayload.candidate_id = user.candidate_id;
            }

            const verifyRes = await axios.post(
              `${BASE_URL}payment/verify`,
              verifyPayload,
            );

            let verify = verifyRes.data;

            // ✅ HANDLE STRING RESPONSE
            if (typeof verify === "string") {
              const jsonStart = verify.indexOf("{");
              if (jsonStart !== -1) {
                verify = JSON.parse(verify.substring(jsonStart));
              }
            }

            if (verify?.status === true) {
              toast.success("Payment successful 🎉");

              // ✅ GET STAFF DATA
              const pendingStaff = JSON.parse(
                localStorage.getItem("pendingStaff"),
              );

              if (user.for === "staff_add" && pendingStaff) {
                try {
                  const saveRes = await axios.post(
                    `${BASE_URL}admin/insert/tbl_staff`,
                    pendingStaff,
                  );

                  if (saveRes.data?.status === true) {
                    toast.success("Staff added successfully ✅");
                    localStorage.removeItem("pendingStaff");
                  } else {
                    toast.error("Staff save failed ❌");
                  }
                } catch (err) {
                  toast.error("Staff save error ❌");
                }
              }

              localStorage.setItem("paymentDone", "true");

              localStorage.setItem("paymentUser", JSON.stringify(user));

              navigate("/payment-success");
            }
          } catch (err) {
            toast.error("Verification failed");
          }
        },

        prefill: {
          email: user.email,
        },

        theme: {
          color: "#0d6efd",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment failed");
    }
  };

  /* ================= UI ================= */
  const isPayDisabled = loading || !orderData || !!errorMsg;

  return (
    <div className="hl-payment-wrapper">
      <div className="hl-payment-card">
        <div className="hl-header">
          <h3>Complete Your Payment</h3>
          <p>{user?.role} Payment</p>
        </div>

        <div className="hl-amount-box">
          <span>Total Amount</span>
          <h2>{loading ? "Loading..." : displayAmount}</h2>
        </div>

        {errorMsg && <div className="hl-error-box">{errorMsg}</div>}

        <button
          className="hl-pay-btn"
          onClick={openRazorpay}
          disabled={isPayDisabled}
        >
          {loading ? "Processing..." : "Pay Securely"}
        </button>

        {errorMsg && (
          <button
            className="hl-retry-btn"
            onClick={createOrder}
            disabled={loading}
          >
            Retry Order
          </button>
        )}

        <div className="hl-footer">🔒 Secure payment powered by Razorpay</div>
      </div>
    </div>
  );
}

export default PaymentPage;
