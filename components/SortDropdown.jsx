'use client';

import { useEffect } from 'react';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';

export default function SortDropdown({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) {
  // Disable sort order selection when no sortBy is selected
  const isSortOrderDisabled = !sortBy;

  // Reset sortOrder when sortBy is cleared
  useEffect(() => {
    if (!sortBy) {
      setSortOrder('');
    }
  }, [sortBy, setSortOrder]);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sortBy" className="text-sm text-gray-700">
        Sort by:
      </label>
      <select
        id="sortBy"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
        aria-label="Sort by"
      >
        <option value="">Select field</option>
        <option value="title">Title</option>
        <option value="description">Description</option>
        <option value="dueDate">Due Date</option>
      </select>

      <label htmlFor="sortOrder" className="text-sm text-gray-700">
        Order:
      </label>
      <select
        id="sortOrder"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
        disabled={isSortOrderDisabled}
        aria-label="Sort order"
      >
        <option value="">Select order</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      {sortOrder === 'asc' && <FaSortAlphaDown className="text-gray-500" />}
      {sortOrder === 'desc' && <FaSortAlphaUp className="text-gray-500" />}
    </div>
  );
}
