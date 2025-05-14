'use client';

import { useState, useEffect } from 'react';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');

  // Debounce input to optimize performance
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 300); 

    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  // Trigger search when debounced input changes
  useEffect(() => {
    onSearch(debouncedInput);
  }, [debouncedInput, onSearch]);

  return (
    <div className="relative w-full max-w-md">
      <label htmlFor="search" className="sr-only">
        Search topics
      </label>
      <input
        id="search"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search by title, description, or due date..."
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search topics"
      />
    </div>
  );
}