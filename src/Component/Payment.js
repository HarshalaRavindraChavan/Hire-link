import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/constants";
import { toast } from "react-toastify";

function PaymentPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("paymentUser"));

  useEffect(() => {
    if (!user) {
      toast.error("User not found. Please signup again.");
      navigate("/signup");
    }
  }, [user, navigate]);

  const displayAmount = user?.role === "Employer" ? "₹5000" : "₹300";

  const openRazorpay = async () => {
    try {
      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      // 1️⃣ Create order from backend
      const { data } = await axios.post(
        `${BASE_URL}hirelink_apis/payment/create-order`
        {
          email: user.email,
          role: user.role,
        }
      );

      if (!data.status) {
        toast.error(data.message || "Order creation failed");
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "HireLink",
        description: "Account Activation Fee",
        order_id: data.id,

        handler: async (response) => {
          // 2️⃣ Verify payment
          const verify = await axios.post(
            `${BASE_URL}hirelink_apis/payment/verify`,
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              email: user.email,
              role: user.role,
            }
          );

          if (verify.data.status) {
            toast.success("Payment successful 🎉");
            localStorage.setItem("paymentDone", "true");

            // 3️⃣ Redirect based on role
            if (user.role === "Candidate") {
              navigate("/profile");
            } else {
              navigate("/emp-profile");
            }
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
        <p className="text-muted">{user?.role} Account Activation</p>
        <h3>{displayAmount}</h3>

        <button
          className="btn btn-primary w-100 mt-3"
          onClick={openRazorpay}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
