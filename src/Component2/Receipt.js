// export default Receipt;
import React from "react";
import logo from "../Component2/logo/hirelink.png";
import "../Component2/css/Receip.css";

/* 🔹 Receipt Component */
function Receipt({ payment }) {
  if (!payment) return null;

  const roleLower = (payment.role || "").toLowerCase();

  const paymentForText =
    payment.paymentFor ||
    (roleLower === "candidate"
      ? "Candidate Signup Fee"
      : roleLower === "employer"
        ? "Employer Signup Fee"
        : roleLower === "employer_staff"
          ? "Extended Staff Fee"
          : roleLower === "resume_download"
            ? "Resume Download Fee"
            : "Payment");

  const receiptNo =
    payment.receiptNo || `RCPT-${Date.now().toString().slice(-8)}`;

  /* 🔢 GST INCLUDED AMOUNT */
  const amount = Number(String(payment.amount || 0).replace(/[^\d.]/g, ""));

  const gstRate = 18;

  // ✅ Base amount (excluding GST)
  const baseAmount = +((amount * 100) / (100 + gstRate)).toFixed(2);

  // ✅ GST amount (18%)
  const gstAmount = +(amount - baseAmount).toFixed(2);

  return (
    <div id="receipt-print-area" className="hl-rec-wrapper">
      {/* PAID Stamp */}
      {/* <div className="hl-rec-paid">PAID</div> */}

      {/* Header */}
      <div className="hl-rec-header">
        <div className="hl-rec-company">
          <img src={logo} alt="Hirelink" />
          {/* <div>
            <h2>Hirelinkinfo</h2>
            <p>123 Business Rd, Mumbai – 400001</p>
          </div> */}
        </div>

        <div className="hl-rec-meta">
          <div className="hl-rec-title">RECEIPT</div>
          <div>#{receiptNo}</div>
        </div>
      </div>

      {/* Billing */}
      <div className="hl-rec-billing">
        <div>
          <div className="hl-rec-label">Billed To</div>

          <div>
            <b>Name:</b> {payment.name || "-"}
          </div>
          <div>
            <b>Email:</b> {payment.email || "-"}
          </div>
          <div>
            <b>Mobile:</b> {payment.mobile || "-"}
          </div>
          <div>
            <b>Order ID:</b> {payment.orderId}
          </div>
          <div>
            <b>Payment ID:</b> {payment.paymentId}
          </div>
        </div>
        <div className="hl-rec-right">
          <div className="hl-rec-label">Date</div>
          <div>{payment.date}</div>
        </div>
      </div>

      {/* Table */}
      <table className="hl-rec-table">
        <thead>
          <tr>
            <th>Description</th>
            <th className="r">Amount</th>
            <th className="r">Total</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{paymentForText}</td>
            <td className="r">{baseAmount}</td>
            <td className="r">{baseAmount}</td>
          </tr>

          <tr>
            <td>GST (18%)</td>
            <td className="r">{gstAmount}</td>
            <td className="r">{gstAmount}</td>
          </tr>
        </tbody>
      </table>

      {/* Total */}
      <div className="hl-rec-total-box">
        <div className="row total">
          <span>Total</span>
          <span>{amount}</span>
        </div>
      </div>

      {/* Notes */}
      <div className="hl-rec-notes">
        <b>Notes:</b>
        <p>
          This receipt confirms successful payment on Hirelinkinfo. Payment is
          non-refundable.
        </p>
      </div>
    </div>
  );
}

export default Receipt;
