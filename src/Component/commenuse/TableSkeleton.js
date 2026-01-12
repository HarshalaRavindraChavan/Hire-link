import React from "react";

function TableSkeleton({ rows = 5, columns = 5 }) {
  const shimmerStyle = {
    background: "linear-gradient(90deg, #e9ecef 25%, #f8f9fa 37%, #e9ecef 63%)",
    backgroundSize: "400% 100%",
    animation: "shimmer 1.4s ease infinite",
    borderRadius: "4px",
    height: "12px",
  };

  return (
    <>
      <style>
        {`
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}
      </style>

      {[...Array(rows)].map((_, rowIndex) => (
        <tr key={rowIndex}>
          {[...Array(columns)].map((_, colIndex) => (
            <td key={colIndex}>
              <div style={shimmerStyle}></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default TableSkeleton;
