'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { HiPencilAlt } from 'react-icons/hi';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import {PaginationHeader,PaginationFooter} from './Pagination';
import TopicItem from './TopicItem';


export default function TopicsList() {
  const [topics, setTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch('/api/topics');
        const data = await res.json();      
        setTopics(data);
      } catch (error) {
        console.error('Failed to fetch topics:', error);
      }
    };
    fetchTopics();
  }, []);

  const handleDelete = (id) => {
    setTopics((prevTopics) => prevTopics.filter((topic) => topic._id !== id));
  };

  const filteredTopics = useMemo(() => {
    const search = searchTerm.toLowerCase();
    
    return topics
      .filter((topic) => {
        const titleMatch = topic.title.toLowerCase().includes(search);
        const descriptionMatch = topic.description.toLowerCase().includes(search);
        const dueDateMatch = new Date(topic.dueDate).toISOString().split('T')[0].includes(search);
        return titleMatch || descriptionMatch || dueDateMatch;
      })
      .sort((a, b) => {
        if (!sortBy) return 0;
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortBy === 'dueDate') {
          return sortOrder === 'asc'
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        }
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
  }, [topics, searchTerm, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredTopics.length / pageSize);

  const paginatedTopics = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredTopics.slice(startIndex, startIndex + pageSize);
  }, [filteredTopics, currentPage, pageSize]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <SearchBar onSearch={setSearchTerm} />
        <SortDropdown
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>

      <PaginationHeader
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalItems={filteredTopics.length}
      />

      <ul className="divide-y divide-gray-200">
        {paginatedTopics.map((topic) => (
          <TopicItem key={topic._id} topic={topic} onDelete={handleDelete} />
        ))}
      </ul>

      <PaginationFooter
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
