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
      navigate("/signup");
    }
  }, []);

  const displayAmount = user?.role === "Employer" ? "₹5000" : "₹300";

  const openRazorpay = async () => {
    try {
      // ✅ 1) Create order (backend decides amount)
      const { data } = await axios.post(
        `${BASE_URL}hirelink_apis/payment/create-order`,
        {
          email: user.email,
          role: user.role,
        },
      );

      if (!data.status) {
        toast.error(data.message || "Order create failed");
        return;
      }

      const options = {
        key: data.key, // ✅ backend key
        amount: data.amount,
        currency: data.currency,
        name: "HireLink",
        description: "Account Activation Fee",
        order_id: data.id,

        handler: async function (response) {
          // ✅ 2) Verify payment
          const verify = await axios.post(
            `${BASE_URL}hirelink_apis/payment/verify`,
            {
              ...response,
              email: user.email,
              role: user.role,
            },
          );

          if (verify.data.status === true) {
            localStorage.setItem("paymentDone", "true");
            toast.success("Payment successful!");

            // ✅ redirect after payment
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

        <p className="text-muted mb-3">{user?.role} Account Activation</p>

        <h3 className="mb-3">{displayAmount}</h3>

        <button className="btn btn-primary w-100" onClick={openRazorpay}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
