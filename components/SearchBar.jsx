"use client";

import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  // Create a debounced version of the onSearch function
  const debouncedSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);

  useEffect(() => {
    debouncedSearch(input);
    // Cleanup function to cancel debounce on unmount
    return () => debouncedSearch.cancel();
  }, [input, debouncedSearch]);

  return (
    <input
      type="text"
      placeholder="Search topics..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
    />
  );
}
