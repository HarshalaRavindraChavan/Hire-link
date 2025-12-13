import "../css/Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <nav className="d-flex justify-content-end mt-3">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>

        {[...Array(totalPages).keys()].map((n) => (
          <li
            key={n}
            className={`page-item ${currentPage === n + 1 ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPageChange(n + 1)}>
              {n + 1}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
