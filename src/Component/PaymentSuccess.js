import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Receipt from "../Component2/Receipt";

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
        (saved.role === "Candidate"
          ? "Candidate Signup Fee"
          : "Employer Signup Fee"),
      date: saved.date || new Date().toLocaleString(),
    };

    setPayment(finalPayment);
  }, [navigate]);

  if (!payment) return null;

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

  const generatePDF = async () => {
    try {
      setLoading(true);

      const receiptElement = document.getElementById("receipt-print-area");
      if (!receiptElement) {
        alert("Receipt UI not found!");
        setLoading(false);
        return;
      }

      // ✅ capture receipt UI exactly as it is
      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      // ✅ create pdf
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // ✅ multi-page support (if receipt height is bigger)
      while (heightLeft > 0) {
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        if (heightLeft > 0) {
          position -= pdfHeight;
          pdf.addPage();
        }
      }

      // ✅ PDF name format: Description-Receipt-Date.pdf
      const desc = makeSafeFileName(payment.paymentFor || "Payment");
      const fileDate = getFileDate();
      const fileName = `${desc}-Receipt-${fileDate}.pdf`;

      pdf.save(fileName);

      // ✅ redirect ONLY after pdf generated/downloaded
      if (payment.role === "Candidate") navigate("/profile");
      else navigate("/emp-profile");
    } catch (err) {
      console.log(err);
      alert("PDF generate failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {/* ✅ Payment Success UI ONLY */}
      <div className="card shadow p-4 text-center" style={{ maxWidth: 520 }}>
        <h2 className="text-success">Payment Successful 🎉</h2>
        <p className="text-muted mt-2">
          PDF Receipt download करून पुढे जाईल ✅
        </p>

        <div className="border rounded p-3 mt-3 text-start">
          <p>
            <strong>Email:</strong> {payment.email}
          </p>
          <p>
            <strong>Role:</strong> {payment.role}
          </p>
          <p>
            <strong>Payment For:</strong> {payment.paymentFor}
          </p>
          <p>
            <strong>Amount:</strong> {payment.amount}
          </p>
        </div>

        <button
          className="btn btn-success w-100 mt-3"
          onClick={generatePDF}
          disabled={loading}
        >
          {loading ? "Generating PDF..." : "📄 Download Receipt PDF & Continue"}
        </button>

        <p className="text-muted mt-2" style={{ fontSize: 13 }}>
          Redirect फक्त PDF download नंतर होईल ✅
        </p>
      </div>

      {/* ✅ Receipt UI Hidden (User ला दिसणार नाही पण PDF capture होईल) */}
      <div
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: "700px",
          background: "#fff",
        }}
      >
        <Receipt payment={payment} />
      </div>
    </div>
  );
}

export default PaymentSuccess;
