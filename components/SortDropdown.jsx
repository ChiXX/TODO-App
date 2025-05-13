"use client";

export default function SortDropdown({ sortBy, setSortBy }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sortBy" className="text-sm text-gray-700">Sort by:</label>
      <select
        id="sortBy"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
      >
        <option value="title">Title</option>
        <option value="description">Description</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>
  );
}
