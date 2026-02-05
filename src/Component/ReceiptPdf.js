import html2pdf from "html2pdf.js/dist/html2pdf.min";

export const generateReceiptPDF = () => {
  const element = document.getElementById("receipt-print-area");

  if (!element) {
    alert("Receipt not found");
    return;
  }

  const options = {
    margin: 8,
    filename: "Hirelink_Receipt.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
  };

  html2pdf().set(options).from(element).save();
};
