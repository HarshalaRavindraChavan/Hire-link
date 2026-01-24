import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import Receipt from "../Component2/Receipt";
import { toast } from "react-toastify";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("paymentDetails"));

    if (!saved) {
      navigate("/signin");
      return;
    }

    const finalPayment = {
      ...saved,
      receiptNo: saved.receiptNo || `RCPT-${Date.now().toString().slice(-8)}`,
      paymentFor:
        saved.paymentFor ||
        (saved.role?.toLowerCase() === "candidate"
          ? "Candidate Signup Fee"
          : "Employer Signup Fee"),
      date: saved.date || new Date().toLocaleString(),
    };

    setPayment(finalPayment);
  }, [navigate]);

  const makeSafeFileName = (text = "") => {
    return text
      .toString()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]/g, "")
      .replace(/\-+/g, "-");
  };

  const getFileDate = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const downloadPDF = async () => {
    try {
      setLoading(true);

      const receiptElement = document.getElementById("receipt-print-area");
      if (!receiptElement) {
        toast.error("Receipt UI not found!");
        return;
      }

      // ✅ REAL PDF (not canvas image)
      const pdf = new jsPDF("p", "mm", "a4");

      await pdf.html(receiptElement, {
        x: 10,
        y: 10,
        width: 190, // A4 usable width
        windowWidth: 600, // must match hidden receipt div width
        autoPaging: "text",
      });

      const desc = makeSafeFileName(payment?.paymentFor || "Payment");
      const fileDate = getFileDate();
      const fileName = `${desc}-Receipt-${fileDate}.pdf`;

      pdf.save(fileName);

      toast.success("Receipt downloaded ✅ Redirecting to login in 5 sec...");

      setTimeout(() => {
        navigate("/signin");
      }, 5000);
    } catch (err) {
      console.log(err);
      toast.error("PDF download failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!payment) return null;

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {/* ✅ Only Download button UI */}
      <div className="card shadow p-4 text-center" style={{ maxWidth: 420 }}>
        <h3 className="text-success mb-1">Payment Successful 🎉</h3>

        <p className="text-muted" style={{ fontSize: 14 }}>
          Download your receipt and you will be redirected to Login page.
        </p>

        <button
          className="btn btn-success w-100 mt-2"
          onClick={downloadPDF}
          disabled={loading}
        >
          {loading ? "Generating PDF..." : "📄 Download Receipt PDF"}
        </button>

        <small className="text-muted d-block mt-2">
          Redirecting in 5 seconds...
        </small>
      </div>

      {/* ✅ Hidden Receipt UI (for PDF only) */}
      <div className="d-none" style={{ width: "700px", background: "#fff" }}>
        <Receipt payment={payment} />
      </div>
    </div>
  );
}

export default PaymentSuccess;
