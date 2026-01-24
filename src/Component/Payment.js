import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/constants";
import { toast } from "react-toastify";

function PaymentPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("paymentUser"));

  const calledOnce = useRef(false);

  const [loading, setLoading] = useState(false);
  const [displayAmount, setDisplayAmount] = useState("₹0");
  const [orderData, setOrderData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const createOrder = async () => {
    try {
      setErrorMsg("");
      setLoading(true);

      const { data } = await axios.post(
        `${BASE_URL}hirelink_apis/payment/create-order`,
        {
          email: user.email,
          role: user.role,
        },
      );

      if (!data.status) {
        toast.error(data.message || "Order creation failed");
        setErrorMsg(data.message || "Order creation failed");
        setLoading(false);
        return;
      }

      setOrderData(data);

      const amountInRupees = data.amount / 100;
      setDisplayAmount(`₹${amountInRupees}`);

      setLoading(false);
    } catch (error) {
      console.error(error);

      // ✅ 503 special message
      if (error?.response?.status === 503) {
        setErrorMsg("Server down (503). Please try again after sometime.");
        toast.error("Server down (503). Please try again.");
      } else {
        setErrorMsg("Failed to create order. Please try again.");
        toast.error("Failed to create order");
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      toast.error("User not found. Please signup again.");
      navigate("/signup");
      return;
    }

    // ✅ call only once (React Strict Mode safe)
    if (calledOnce.current) return;
    calledOnce.current = true;

    createOrder();
  }, [user, navigate]);

  const openRazorpay = async () => {
    try {
      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      if (!orderData) {
        toast.error("Order not ready, please wait...");
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
          const verify = await axios.post(
            `${BASE_URL}hirelink_apis/payment/verify`,
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              email: user.email,
              role: user.role,
              for: user.for,
            },
          );

          if (verify.data.status) {
            toast.success("Payment successful 🎉");
            localStorage.setItem("paymentDone", "true");

            localStorage.setItem(
              "paymentDetails",
              JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                email: user.email,
                role: user.role,
                for: user.for,
                amount: displayAmount,
                date: new Date().toLocaleString(),
              }),
            );

            navigate("/payment-success");
          } else {
            toast.error("Payment verification failed");
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
      console.error(error);
      toast.error("Payment failed. Please try again.");
    }
  };

  const isPayDisabled = loading || !orderData || !!errorMsg;

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 text-center" style={{ maxWidth: 420 }}>
        <h4>Complete Your Payment</h4>
        <p className="text-muted">{user?.role} Payment</p>

        {/* ✅ Amount */}
        <h3>{loading ? "Loading..." : displayAmount}</h3>

        {/* ✅ Error UI */}
        {errorMsg ? (
          <div className="alert alert-danger mt-3 p-2">{errorMsg}</div>
        ) : null}

        {/* ✅ Buttons */}
        <button
          className="btn btn-primary w-100 mt-3"
          onClick={openRazorpay}
          disabled={isPayDisabled}
        >
          {loading ? "Please wait..." : "Pay Now"}
        </button>

        {/* ✅ Retry Button */}
        {errorMsg ? (
          <button
            className="btn btn-outline-secondary w-100 mt-2"
            onClick={createOrder}
            disabled={loading}
          >
            Retry Order
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default PaymentPage;
