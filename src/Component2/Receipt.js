// import React from "react";
// import logo from "../Component2/logo/hirelink.png";

// function Receipt({ payment }) {
//   if (!payment) return null;

//   const receiptNo =
//     payment.receiptNo || `RCPT-${new Date().getTime().toString().slice(-8)}`;

//   const roleLower = (payment.role || "").toLowerCase();

//   const paymentForText =
//     payment.paymentFor ||
//     (roleLower === "candidate"
//       ? "Candidate Signup Fee"
//       : "Employer Signup Fee");

//   const unitPrice = payment.baseAmount || payment.amount || "₹0";
//   const total = payment.amount || "₹0";
//   const ForbyText =
//     payment.for ||
//     (roleLower === "candidate"
//       ? "Account Create"
//       : roleLower === "employer"
//         ? "Account Create"
//         : roleLower === "receipt"
//           ? "Receipt Download"
//           : "Payment");

//   return (
//     <div
//       id="receipt-print-area"
//       style={{
//         fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
//         maxWidth: "600px",
//         margin: "0 auto",
//         background: "#fff",
//         borderRadius: "8px",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
//         overflow: "hidden",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "20px 24px",
//           borderBottom: "1px solid #eee",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
//           <img
//             src={logo}
//             alt="Hirelink Logo"
//             style={{
//               width: "56px",
//               height: "56px",
//               borderRadius: "8px",
//               objectFit: "cover",
//             }}
//           />

//           <div>
//             <div
//               style={{
//                 fontWeight: 700,
//                 fontSize: "18px",
//                 color: "#02a34b",
//               }}
//             >
//               Hirelinkinfo
//             </div>
//             <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
//               123 Business Rd, Mumbai – 400001
//             </div>
//           </div>
//         </div>

//         <div style={{ textAlign: "right" }}>
//           <div style={{ fontWeight: 700, fontSize: "14px", color: "#b37c07" }}>
//             RECEIPT
//           </div>
//           <div style={{ fontSize: "12px", marginTop: "6px" }}>#{receiptNo}</div>
//         </div>
//       </div>

//       {/* Customer Info */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           padding: "18px 24px",
//           borderBottom: "1px solid #f0f0f0",
//         }}
//       >
//         <div>
//           <div style={{ fontSize: "13px", fontWeight: 600, color: "#0a8355" }}>
//             Billed To
//           </div>

//           <div style={{ fontSize: "13px", marginTop: "6px" }}>
//             {payment.email || "-"} <br />
//           </div>

//           <div style={{ fontSize: "12px", color: "#777", marginTop: "8px" }}>
//             <strong>Order ID:</strong> {payment.orderId || "-"} <br />
//             <strong>Payment ID:</strong> {payment.paymentId || "-"} <br />
//             <strong>Payment For:</strong> {ForbyText}
//           </div>
//         </div>

//         <div style={{ textAlign: "right" }}>
//           <div style={{ fontSize: "13px", fontWeight: 600, color: "#078b19" }}>
//             Date
//           </div>
//           <div style={{ fontSize: "13px", marginTop: "6px" }}>
//             {payment.date || new Date().toLocaleDateString()}
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div style={{ padding: "16px" }}>
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             fontSize: "13px",
//           }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: "#1a6433", color: "#fff" }}>
//               <th style={th}>Description</th>
//               <th style={thRight}>Unit Price</th>
//               <th style={thRight}>Total</th>
//             </tr>
//           </thead>

//           <tbody>
//             <tr>
//               <td
//                 style={{
//                   padding: "12px 8px",
//                   textAlign: "left",
//                   borderTop: "1px solid #eee",
//                 }}
//               >
//                 {paymentForText}
//               </td>

//               <td
//                 style={{
//                   padding: "12px 8px",
//                   textAlign: "right",
//                   borderTop: "1px solid #eee",
//                 }}
//               >
//                 {unitPrice}
//               </td>

//               <td
//                 style={{
//                   padding: "12px 8px",
//                   textAlign: "right",
//                   borderTop: "1px solid #eee",
//                 }}
//               >
//                 {total}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Total */}
//       <div style={{ padding: "0 24px 20px" }}>
//         <div style={{ maxWidth: "250px", marginLeft: "auto" }}>
//           <Row label="Subtotal" value={payment.subtotal || total} />
//           <Row label="Total" value={total} bold bg="#f2f8f4" />
//         </div>
//       </div>

//       {/* Notes */}
//       <div
//         style={{
//           padding: "16px 24px",
//           borderTop: "1px dashed #ddd",
//           fontSize: "13px",
//         }}
//       >
//         <strong>Notes:</strong>
//         <p style={{ marginTop: "8px" }}>
//           This receipt confirms successful payment on Hirelinkinfo. Payment is
//           non-refundable.
//         </p>

//         <p>
//           Support:{" "}
//           <a href="mailto:support@hirelinkinfo.com">support@hirelinkinfo.com</a>
//         </p>
//       </div>
//     </div>
//   );
// }

// const th = {
//   padding: "12px 8px",
//   fontWeight: 600,
//   textAlign: "left",
// };

// const thRight = {
//   ...th,
//   textAlign: "right",
// };

// const Row = ({ label, value, bold, bg }) => (
//   <div
//     style={{
//       display: "flex",
//       justifyContent: "space-between",
//       padding: "8px",
//       fontWeight: bold ? 700 : 400,
//       background: bg || "transparent",
//       borderTop: bold ? "1px solid #0a8a4a" : "none",
//     }}
//   >
//     <div>{label}</div>
//     <div>{value}</div>
//   </div>
// );

// export default Receipt;


import React from "react";
import logo from "../Component2/logo/hirelink.png";

function Receipt({ payment }) {
  if (!payment) return null;

  const receiptNo =
    payment.receiptNo || `RCPT-${Date.now().toString().slice(-8)}`;

  const role = (payment.role || "").toLowerCase();

  const paymentForText =
    payment.paymentFor ||
    (role === "candidate" ? "Candidate Signup Fee" : "Employer Signup Fee");

  const total = payment.amount || "₹0";
  const unitPrice = payment.baseAmount || total;

  const ForbyText =
    payment.for ||
    (role === "candidate" || role === "employer"
      ? "Account Creation"
      : "Payment");

  return (
    <div style={container}>
      {/* Header */}
      <div style={header}>
        <div style={brand}>
          <img src={logo} alt="Hirelink" style={logoStyle} />
          <div>
            <h2 style={company}>Hirelinkinfo</h2>
            <p style={address}>Mumbai, Maharashtra – 400001</p>
          </div>
        </div>

        <div style={receiptInfo}>
          <span style={badge}>PAID</span>
          <p style={receiptText}>Receipt</p>
          <p style={receiptNo}>#{receiptNo}</p>
        </div>
      </div>

      {/* User Info */}
      <div style={section}>
        <div>
          <h4 style={sectionTitle}>Billed To</h4>
          <p style={text}>{payment.email || "-"}</p>
          <p style={meta}>
            <strong>Order ID:</strong> {payment.orderId || "-"}
            <br />
            <strong>Payment ID:</strong> {payment.paymentId || "-"}
            <br />
            <strong>Purpose:</strong> {ForbyText}
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <h4 style={sectionTitle}>Payment Date</h4>
          <p style={text}>
            {payment.date || new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Table */}
      <table style={table}>
        <thead>
          <tr style={thead}>
            <th style={th}>Description</th>
            <th style={thRight}>Unit Price</th>
            <th style={thRight}>Total</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={td}>{paymentForText}</td>
            <td style={tdRight}>{unitPrice}</td>
            <td style={tdRight}>{total}</td>
          </tr>
        </tbody>
      </table>

      {/* Total */}
      <div style={totalBox}>
        <Row label="Subtotal" value={total} />
        <Row label="Total Paid" value={total} bold />
      </div>

      {/* Footer */}
      <div style={footer}>
        <p>
          <strong>Note:</strong> This is a system-generated receipt confirming a
          successful payment. The amount paid is non-refundable.
        </p>

        <p>
          Need help? Contact{" "}
          <a href="mailto:support@hirelinkinfo.com">
            support@hirelinkinfo.com
          </a>
        </p>

        <p style={copyright}>
          © {new Date().getFullYear()} Hirelinkinfo
        </p>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  maxWidth: "700px",
  margin: "40px auto",
  background: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  fontFamily: "Inter, Arial, sans-serif",
  overflow: "hidden",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  padding: "24px",
  borderBottom: "1px solid #eee",
};

const brand = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

const logoStyle = {
  width: "60px",
  height: "60px",
  borderRadius: "8px",
};

const company = {
  margin: 0,
  color: "#0a8a4a",
};

const address = {
  margin: "4px 0 0",
  fontSize: "13px",
  color: "#666",
};

const receiptInfo = {
  textAlign: "right",
};

const badge = {
  display: "inline-block",
  background: "#e6f6ee",
  color: "#0a8a4a",
  fontSize: "12px",
  fontWeight: 600,
  padding: "4px 10px",
  borderRadius: "20px",
};

const receiptText = {
  margin: "8px 0 0",
  fontSize: "14px",
  fontWeight: 600,
};

const receiptNo = {
  fontSize: "12px",
  color: "#666",
};

const section = {
  display: "flex",
  justifyContent: "space-between",
  padding: "20px 24px",
};

const sectionTitle = {
  marginBottom: "6px",
  color: "#0a8a4a",
};

const text = {
  fontSize: "14px",
};

const meta = {
  fontSize: "13px",
  color: "#666",
  marginTop: "8px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const thead = {
  background: "#0a8a4a",
  color: "#fff",
};

const th = {
  padding: "12px",
  textAlign: "left",
};

const thRight = {
  ...th,
  textAlign: "right",
};

const td = {
  padding: "14px 12px",
  borderBottom: "1px solid #eee",
};

const tdRight = {
  ...td,
  textAlign: "right",
};

const totalBox = {
  maxWidth: "280px",
  marginLeft: "auto",
  padding: "16px 24px",
};

const footer = {
  padding: "20px 24px",
  borderTop: "1px dashed #ddd",
  fontSize: "13px",
  color: "#555",
};

const copyright = {
  marginTop: "10px",
  fontSize: "12px",
  color: "#999",
};

const Row = ({ label, value, bold }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 0",
      fontWeight: bold ? 700 : 400,
      borderTop: bold ? "1px solid #0a8a4a" : "none",
    }}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default Receipt;
