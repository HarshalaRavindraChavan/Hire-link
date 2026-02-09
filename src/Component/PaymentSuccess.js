import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import Receipt from "../Component2/Receipt";
import { toast } from "react-toastify";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(null); // ✅ countdown state

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("paymentDetails"));
    const paymentUser = JSON.parse(localStorage.getItem("paymentUser") || "{}");
    const signupTemp = JSON.parse(
      localStorage.getItem("signupTempData") || "{}",
    );
    const tempData = signupTemp?.data || {};
    if (!saved) {
      navigate("/signin");
      return;
    }

    const finalPayment = {
      ...saved,

      name:
        paymentUser.role === "candidate"
          ? tempData.can_name || paymentUser.name || saved.name
          : paymentUser.role === "employer"
            ? tempData.emp_name || paymentUser.name || saved.name
            : paymentUser.role === "employer_staff"
              ? tempData.emp_name || paymentUser.name || saved.name
              : paymentUser.role === "resume_download"
                ? tempData.emp_name || paymentUser.name || saved.name
                : paymentUser.name || saved.name,

      mobile:
        paymentUser.role === "candidate"
          ? tempData.can_mobile || paymentUser.mobile || saved.mobile
          : paymentUser.role === "employer"
            ? tempData.emp_mobile || paymentUser.mobile || saved.mobile
            : paymentUser.role === "employer_staff"
              ? tempData.emp_mobile || paymentUser.mobile || saved.mobile
              : paymentUser.role === "resume_download"
                ? tempData.emp_mobile || paymentUser.mobile || saved.mobile
                : paymentUser.mobile || saved.mobile,

      receiptNo: saved.receiptNo || `RCPT-${Date.now().toString().slice(-8)}`,
      paymentFor:
        saved.paymentFor ||
        (saved.role?.toLowerCase() === "candidate"
          ? "Candidate Signup Fee"
          : saved.role?.toLowerCase() === "employer"
            ? "Employer Signup Fee"
            : saved.role?.toLowerCase() === "resume_download"
              ? "Resume Download Fee"
              : saved.role?.toLowerCase() === "employer_staff"
                ? "Extended Staff Fee"
                : "Payment"),
      date: saved.date || new Date().toLocaleString(),
    };

    setPayment(finalPayment);
  }, [navigate]);

  // ✅ FINAL SAVE AFTER VERIFIED PAYMENT ONLY
  useEffect(() => {
    const savedPayment = JSON.parse(localStorage.getItem("paymentDetails"));
    const temp = JSON.parse(localStorage.getItem("signupTempData"));

    if (!savedPayment || !temp) return;

    if (temp.role === "candidate") {
      localStorage.setItem("candidate", JSON.stringify(temp.data));
    } else if (temp.role === "employer") {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          role: 100,
          emp_id: temp.data.emp_id,
          emp_companyname: temp.data.emp_companyname,
        }),
      );

      localStorage.setItem("employer", JSON.stringify(temp.data));
    }

    // ✅ cleanup temp
    localStorage.removeItem("signupTempData");
  }, []);

  useEffect(() => {
    if (count === null) return;

    if (count === 0) {
      const paymentUser = JSON.parse(
        localStorage.getItem("paymentUser") || "{}",
      );

      const returnTo =
        paymentUser.role === "candidate"
          ? "/profile"
          : paymentUser.role === "employer"
            ? "/emp-profile"
            : paymentUser.role === "resume_download"
              ? "/candidate"
              : paymentUser.role === "employer_staff"
                ? "/staff"
                : "/signin";

      navigate(returnTo);

      if (paymentUser.role !== "resume_download") {
        localStorage.removeItem("paymentUser");
        localStorage.removeItem("paymentDone");
      }

      return;
    }

    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, navigate]);

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
      if (count === null) setCount(3);

      setLoading(true);

      const receiptElement = document.getElementById("receipt-print-area");
      if (!receiptElement) {
        toast.error("Receipt UI not found!");
        return;
      }

      const pdf = new jsPDF("p", "mm", "a4");

      await pdf.html(receiptElement, {
        x: 10,
        y: 10,
        width: 190,
        windowWidth: 600,
        autoPaging: "text",
      });

      const desc = makeSafeFileName(payment?.paymentFor || "Payment");
      const fileDate = getFileDate();
      const fileName = `${desc}-Receipt-${fileDate}.pdf`;

      pdf.save(fileName);
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

        {/* ✅ countdown show only after download click */}
        {count !== null ? (
          <small className="text-muted d-block mt-2">
            Redirecting in {count} seconds...
          </small>
        ) : null}
      </div>

      {/* ✅ Hidden Receipt UI (for PDF only) */}
      <div className="d-none" style={{ width: "700px", background: "#fff" }}>
        <Receipt payment={payment} />
      </div>
    </div>
  );
}

export default PaymentSuccess;
