import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

function PaymentSuccess() {
  const navigate = useNavigate();
  const payment = JSON.parse(localStorage.getItem("paymentDetails"));

  useEffect(() => {
    if (!payment) {
      navigate("/signin");
      return;
    }

    // ⏳ auto redirect after 3 sec
    const timer = setTimeout(() => {
      payment.role === "Candidate"
        ? navigate("/profile")
        : navigate("/emp-profile");
    }, 3000);

    return () => clearTimeout(timer);
  }, [payment, navigate]);

  if (!payment) return null;

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Payment Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Payment ID: ${payment.paymentId}`, 20, 40);
    doc.text(`Order ID: ${payment.orderId}`, 20, 50);
    doc.text(`Email: ${payment.email}`, 20, 60);
    doc.text(`Role: ${payment.role}`, 20, 70);
    doc.text(`Amount Paid: ${payment.amount}`, 20, 80);
    doc.text(`Date: ${payment.date}`, 20, 90);
    doc.text("Status: Payment Successful ✅", 20, 110);

    doc.save("HireLink_Payment_Receipt.pdf");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 text-center" style={{ maxWidth: 500 }}>
        <h2 className="text-success">Payment Successful 🎉</h2>
        <p className="text-muted mt-2">Thank you for completing your payment</p>

        <div className="border rounded p-3 mt-3 text-start">
          <p><strong>Amount:</strong> {payment.amount}</p>
          <p><strong>Email:</strong> {payment.email}</p>
          <p><strong>Role:</strong> {payment.role}</p>
          <p><strong>Date:</strong> {payment.date}</p>
        </div>

        <button
          className="btn btn-outline-success w-100 mt-3"
          onClick={generatePDF}
        >
          📄 Generate PDF Receipt
        </button>

        <p className="text-muted mt-2">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}

export default PaymentSuccess;
