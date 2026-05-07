import React from 'react';
import './Pagination.css';

function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
      >
        ‹
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`page-btn ${page === p ? 'active' : ''}`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="page-btn"
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
      >
        ›
      </button>

      <span className="page-info">
        {page} / {totalPages}
      </span>
    </div>
  );
}

export default Pagination;
