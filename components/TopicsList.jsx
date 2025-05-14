"use client";

import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import {PaginationHeader, PaginationFooter } from "./Pagination";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import { HiPencilAlt } from "react-icons/hi";
import { useState, useEffect } from 'react';


// const getTopics = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/topics", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch topics");
//     }

//     return res.json();
//   } catch (error) {
//     console.log("Error loading topics: ", error);
//   }
// };

// export default async function TopicsList() {
//   const { topics } = await getTopics();

//   return (
//     <>
//       {topics.map((t) => (
//         <div
//           key={t._id}
//           className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
//         >
//           <div>
//             <h2 className="font-bold text-2xl">{t.title}</h2>
//             <div>{t.description}</div>
//           </div>

//           <div className="flex gap-2">
//             <RemoveBtn id={t._id} />
//             <Link href={`/editTopic/${t._id}`}>
//               <HiPencilAlt size={24} />
//             </Link>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }



export default function TopicsList() {
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
  const fetchTopics = async () => {
    const res = await fetch("/api/topics?paginate=false");
    const data = await res.json();
    setTopics(data.topics);
  };
  fetchTopics();
}, []);

  useEffect(() => {
    // Filter topics based on search term
    let filtered = topics.filter((topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort topics based on sortBy
    filtered.sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else {
        return a[sortBy].localeCompare(b[sortBy]);
      }
    });

    setFilteredTopics(filtered);
    setCurrentPage(1); // Reset to first page on search or sort change
  }, [topics, searchTerm, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredTopics.length / pageSize);
  const paginatedTopics = filteredTopics.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <SearchBar onSearch={setSearchTerm} />
        <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <PaginationHeader
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      <ul className="divide-y divide-gray-200">
        {paginatedTopics.map((topic) => (
          <li key={topic._id} className="py-4">
            <h3 className="text-lg font-semibold">{topic.title}</h3>
            <p className="text-sm text-gray-600">{topic.description}</p>
            <p className="text-sm text-gray-500">
              Due Date: {new Date(topic.dueDate).toLocaleDateString()}
            </p>
          <div className="flex gap-2">
            <RemoveBtn id={topic._id} />
            <Link href={`/editTopic/${topic._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
          </li>
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