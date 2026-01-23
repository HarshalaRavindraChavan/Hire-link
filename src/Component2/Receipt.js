import React from "react";
import logo from "../Component2/logo/hirelink.png";

function Receipt({ payment }) {
  if (!payment) return null;

  const receiptNo =
    payment.receiptNo || `RCPT-${new Date().getTime().toString().slice(-8)}`;

  const paymentForText =
    payment.paymentFor ||
    (payment.role === "Candidate"
      ? "Candidate Signup Fee"
      : "Employer Signup Fee");

  const unitPrice = payment.baseAmount || payment.amount || "₹0";
  const total = payment.amount || "₹0";

  return (
    <div
      style={{
        fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
        background: "#f4f6f8",
        padding: "20px",
      }}
    >
      <div
        id="receipt-print-area"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid #eee",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <img
              src={logo}
              alt="Hirelink Logo"
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />

            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "#02a34b",
                }}
              >
                Hirelinkinfo
              </div>
              <div
                style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}
              >
                123 Business Rd, Mumbai – 400001
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div
              style={{ fontWeight: 700, fontSize: "14px", color: "#b37c07" }}
            >
              RECEIPT
            </div>
            <div style={{ fontSize: "12px", marginTop: "6px" }}>
              #{receiptNo}
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "18px 24px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div>
            <div
              style={{ fontSize: "13px", fontWeight: 600, color: "#0a8355" }}
            >
              Billed To
            </div>

            <div style={{ fontSize: "13px", marginTop: "6px" }}>
              {/* {payment.name || "User"} <br /> */}
              {payment.email || "-"} <br />
              {/* {payment.phone || "-"} */}
            </div>

            <div style={{ fontSize: "12px", color: "#777", marginTop: "8px" }}>
              <strong>Order ID:</strong> {payment.orderId || "-"} <br />
              <strong>Payment ID:</strong> {payment.paymentId || "-"}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div
              style={{ fontSize: "13px", fontWeight: 600, color: "#078b19" }}
            >
              Date
            </div>
            <div style={{ fontSize: "13px", marginTop: "6px" }}>
              {payment.date || new Date().toLocaleDateString()}
            </div>

            {/* <div style={{ fontSize: "12px", color: "#777", marginTop: "8px" }}>
              <strong>Role:</strong> {payment.role || "-"}
            </div> */}
          </div>
        </div>

        {/* Table */}
        <div style={{ padding: "16px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#1a6433", color: "#fff" }}>
                <th style={th}>Description</th>
                <th style={thRight}>Unit Price</th>
                <th style={thRight}>Total</th>
              </tr>
            </thead>

            <tbody>
              {[[paymentForText, unitPrice, total]].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, idx) => (
                    <td
                      key={idx}
                      style={{
                        padding: "12px 8px",
                        textAlign: idx === 0 ? "left" : "right",
                        borderTop: "1px solid #eee",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div style={{ padding: "0 24px 20px" }}>
          <div style={{ maxWidth: "250px", marginLeft: "auto" }}>
            <Row label="Subtotal" value={payment.subtotal || total} />
            <Row label="GST" value={payment.gst || "Included"} />
            <Row label="Total" value={total} bold bg="#f2f8f4" />
          </div>
        </div>

        {/* Notes */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px dashed #ddd",
            fontSize: "13px",
          }}
        >
          <strong>Notes:</strong>
          <p style={{ marginTop: "8px" }}>
            This receipt confirms successful payment on Hirelinkinfo. Payment is
            non-refundable.
          </p>

          <p>
            Support:{" "}
            <a href="mailto:support@hirelinkinfo.com">
              support@hirelinkinfo.com
            </a>
          </p>

          <div style={{ fontSize: "12px", color: "#999" }}>
            GSTIN: 27AAAA0000A1Z5
          </div>
        </div>
      </div>
    </div>
  );
}

const th = {
  padding: "12px 8px",
  fontWeight: 600,
  textAlign: "left",
};

const thRight = {
  ...th,
  textAlign: "right",
};

const Row = ({ label, value, bold, bg }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "8px",
      fontWeight: bold ? 700 : 400,
      background: bg || "transparent",
      borderTop: bold ? "1px solid #0a8a4a" : "none",
    }}
  >
    <div>{label}</div>
    <div>{value}</div>
  </div>
);

export default Receipt;
