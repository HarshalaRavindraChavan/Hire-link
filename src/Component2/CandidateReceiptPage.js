import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Receipt from "../Component2/Receipt";
import { generateReceiptPDF } from "../Component/ReceiptPdf";
import { BASE_URL } from "../config/constants";

function CandidateReceiptPage() {
  const navigate = useNavigate();
  const candidate = JSON.parse(localStorage.getItem("candidate"));
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    if (!candidate || !candidate.can_email) {
      navigate("/signin");
      return;
    }

    axios
      .post(`${BASE_URL}admin/getdatawhere`, {
        table: "tbl_payments",
        column: "pay_email",
        value: candidate.can_email,
      })
      .then((res) => {
        const pay = res.data.data?.[0];
        if (!pay) return;

        setPayment({
          name: candidate.can_name,
          mobile: candidate.can_mobile,
          email: candidate.can_email,
          paymentId: pay.razorpay_payment_id,
          orderId: pay.razorpay_order_id,
          amount: pay.pay_amount,
          date: new Date(pay.created_at).toLocaleDateString("en-IN"),
          role: pay.pay_role,
          paymentFor: pay.pay_for,
        });

        // ✅ PDF generate
        setTimeout(() => {
          generateReceiptPDF();

          // ✅ SAME PAGE ला return
          setTimeout(() => {
            navigate(-1); // 🔥 magic line
          }, 800);
        }, 400);
      })
      .catch(console.error);
  }, []);

  return (
    <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
      {payment && <Receipt payment={payment} />}
    </div>
  );
}

export default CandidateReceiptPage;
