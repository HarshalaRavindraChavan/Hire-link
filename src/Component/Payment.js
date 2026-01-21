import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/constants";
import { toast } from "react-toastify";

function PaymentPage() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("paymentUser"));

  // 🔐 Protect payment page
  useEffect(() => {
    if (!user) {
      navigate("/signup");
    }
  }, []);

  // 💰 Amount by role
  const amount =
    user?.role === "Employer" ? 5000 : 300; 

  const displayAmount =
    user?.role === "Employer" ? "₹5000" : "₹300";

  const openRazorpay = async () => {
    try {
      // 1️⃣ Create order (backend decides final amount)
      const { data } = await axios.post(
        `${BASE_URL}hirelink_apis/payment/create-order`,
        {
          email: user.email,
          role: user.role,
          amount: amount,
        }
      );

      const options = {
        key: "rzp_test_S6R1KcyZUZIQxd",
        amount: data.amount,
        currency: "INR",
        name: "HireLink",
        description: "Account Activation Fee",
        order_id: data.id,

        handler: async function (response) {
          // 2️⃣ Verify payment
          const verify = await axios.post(
            `${BASE_URL}hirelink_apis/payment/verify`,
            {
              ...response,
              email: user.email,
              role: user.role,
              amount: amount,
            }
          );

          if (verify.data.status === true) {
            localStorage.setItem("paymentDone", "true");

            toast.success("Payment successful!");

            // ✅ Final redirect
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
      toast.error("Payment failed. Try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 text-center" style={{ maxWidth: 420 }}>
        <h4 className="mb-2">Complete Your Payment</h4>

        <p className="text-muted mb-3">
          {user?.role} Account Activation
        </p>

        <h3 className="mb-3">{displayAmount}</h3>

        <button className="btn btn-primary w-100" onClick={openRazorpay}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
