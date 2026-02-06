import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../Component/css/PaymentHistory.css";
import { BASE_URL } from "../config/constants";
import { generateReceiptPDF } from "../Component/ReceiptPdf";
import Receipt from "../Component2/Receipt";
import { useNavigate } from "react-router-dom";

function PaymentHistory() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));
  const employer = JSON.parse(localStorage.getItem("employer"));

  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  /* ===== FETCH PAYMENTS (logged-in employer only) ===== */
  useEffect(() => {
    if (!auth || !auth.emp_email) {
      navigate("/signin");
      return;
    }

    axios
      .post(`${BASE_URL}admin/getdatawhere`, {
        table: "tbl_payments",
        column: "pay_email",
        value: auth.emp_email,
      })
      .then((res) => setPayments(res.data.data || []))
      .catch(() => setPayments([]));
  }, [auth?.emp_email]);

  /* ===== ALL PAYMENTS PDF (table format) ===== */
  const downloadAllPaymentsPDF = () => {
    if (payments.length === 0) return;

    const doc = new jsPDF("p", "mm", "a4");
    doc.setFontSize(18);
    doc.text("Payment History Report", 105, 15, { align: "center" });

    const rows = payments.map((p, i) => {
      const total = Number(p.pay_amount);
      const base = +((total * 100) / 118).toFixed(2);
      const gst = +(total - base).toFixed(2);

      return [
        i + 1,
        p.pay_email,
        p.pay_role,
        p.pay_for,
        p.razorpay_payment_id,
        base,
        gst,
        total,
        p.pay_status,
        new Date(p.created_at).toLocaleDateString("en-IN"),
      ];
    });

    autoTable(doc, {
      startY: 25,
      head: [
        [
          "#",
          "Email",
          "role",
          "For",
          "Payment ID",
          "Base",
          "GST",
          "Total",
          "Status",
          "Date",
        ],
      ],
      body: rows,
    });

    doc.save("Hirelink_All_Payments.pdf");
  };

  return (
    <div className="payment-wrapper">
      <h2 className="title">Payment History</h2>

      <div style={{ textAlign: "right", marginBottom: 15 }}>
        <button className="btn-pdf" onClick={downloadAllPaymentsPDF}>
          Download All Payments PDF
        </button>
      </div>

      <div className="table-container">
        <table className="payment-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Payment ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Receipt</th>
            </tr>
          </thead>

          <tbody>
            {payments.length > 0 ? (
              payments.map((pay, index) => (
                <tr key={pay.pay_id}>
                  <td>{index + 1}</td>
                  <td>
                    {pay.pay_email}
                    <br></br>
                    {pay.pay_role}
                    <br></br>
                    {pay.pay_for}
                  </td>
                  <td>{pay.razorpay_payment_id}</td>
                  <td>₹{pay.pay_amount}</td>
                  <td>{pay.pay_status}</td>
                  <td>
                    {new Date(pay.created_at).toLocaleDateString("en-IN")}
                  </td>
                  <td>
                    {pay.pay_status !== "created" ? (
                      <button
                        className="btn-pdf"
                        onClick={() => {
                          setSelectedPayment({
                            name: employer.emp_name,
                            mobile: employer.emp_mobile,
                            email: pay.pay_email,
                            paymentId: pay.razorpay_payment_id,
                            orderId: pay.razorpay_order_id,
                            amount: pay.pay_amount,
                            date: new Date(pay.created_at).toLocaleDateString(
                              "en-IN",
                            ),
                            role: pay.pay_role,
                          });
                          setTimeout(generateReceiptPDF, 300);
                        }}
                      >
                        Download
                      </button>
                    ) : (
                      <span style={{ color: "#999", fontSize: "13px" }}>
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No payment history found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔒 Hidden Receipt (for SAME UI PDF) */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        {selectedPayment && <Receipt payment={selectedPayment} />}
      </div>
    </div>
  );
}

export default PaymentHistory;
