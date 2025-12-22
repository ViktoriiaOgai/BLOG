import "./Pagination.css";
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          className={`page-btn ${page === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}