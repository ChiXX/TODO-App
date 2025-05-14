"use client";

import { useState } from "react";

export function PaginationHeader({ pageSize, setPageSize, currentPage, setCurrentPage, totalPages, totalItems  }) {
  const [goto, setGoto] = useState('');

  const handleGoto = () => {
    const page = parseInt(goto, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setGoto('');
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-2">
        <label htmlFor="pageSize" className="text-sm text-gray-700">Items per page:</label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div className="text-sm text-gray-700">
        Total items: {totalItems}
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="gotoPage" className="text-sm text-gray-700">Go to page:</label>
        <input
          id="gotoPage"
          type="number"
          min="1"
          max={totalPages}
          value={goto}
          onChange={(e) => setGoto(e.target.value)}
          className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
        />
        <button
          onClick={handleGoto}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          Go
        </button>
      </div>
    </div>
  );
}

export function PaginationFooter({ currentPage, totalPages, setCurrentPage }) {
  const pages = [];

  const delta = 1; // Number of pages to show around the current page

  const range = [];

  for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    range.unshift('...');
  }
  if (currentPage + delta < totalPages - 1) {
    range.push('...');
  }

  range.unshift(1);
  if (totalPages > 1) {
    range.push(totalPages);
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-4" aria-label="Pagination">
      {/* Previous button */}
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50"
      >
        Previous
      </button>

      {/* Page number buttons */}
      {range.map((page, index) =>
        page === '...' ? (
          <span key={index} className="px-3 py-1 text-sm text-gray-500">...</span>
        ) : (
          <button
            key={`btn-${page}`}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded border text-sm ${
              page === currentPage
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300'
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next button */}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
}