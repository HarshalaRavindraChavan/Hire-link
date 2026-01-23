import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/constants";
import { toast } from "react-toastify";

function PaymentPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("paymentUser"));

  const [loading, setLoading] = useState(false);
  const [displayAmount, setDisplayAmount] = useState("₹0");
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (!user) {
      toast.error("User not found. Please signup again.");
      navigate("/signup");
      return;
    }

    // ✅ create order once & get amount from backend
    const createOrder = async () => {
      try {
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
          setLoading(false);
          return;
        }

        setOrderData(data);

        // ✅ backend कडून amount येतो paisa मध्ये (example: 500000)
        // convert to rupees
        const amountInRupees = data.amount / 100;
        setDisplayAmount(`₹${amountInRupees}`);

        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to create order");
        setLoading(false);
      }
    };

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
                amount: displayAmount, // ✅ backend amount
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

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 text-center" style={{ maxWidth: 420 }}>
        <h4>Complete Your Payment</h4>
        <p className="text-muted">{user?.role} Payment</p>

        <h3>{loading ? "Loading..." : displayAmount}</h3>

        <button
          className="btn btn-primary w-100 mt-3"
          onClick={openRazorpay}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
