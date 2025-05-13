"use client";

import { useState } from "react";

export function PaginationHeader({ pageSize, setPageSize, currentPage, setCurrentPage, totalPages }) {
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

  // Determine the range of page numbers to display
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
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

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 rounded border text-sm ${
            page === currentPage
              ? 'bg-blue-500 text-white border-blue-500'
              : 'border-gray-300'
          }`}
        >
          {page}
        </button>
      ))}

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