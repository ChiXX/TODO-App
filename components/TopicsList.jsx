"use client";

import { useState, useEffect, useMemo } from "react";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import { PaginationHeader, PaginationFooter } from "./Pagination";
import TopicItem from "./TopicItem";

export default function TopicsList() {
	const [topics, setTopics] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("createdAt");
	const [sortOrder, setSortOrder] = useState("asc");
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPages, setTotalPages] = useState(1);
	const [totalItems, setTotalItems] = useState(0);
	const [totalItemsInDb, setTotalItemsInDb] = useState(0);

	useEffect(() => {
		const fetchTopics = async () => {
			try {
				const params = new URLSearchParams({
					search: searchTerm,
					sortBy,
					sortOrder,
					page: currentPage,
					pageSize,
				});

				const res = await fetch(`/api/topics?${params.toString()}`);

				if (res.ok) {
					const data = await res.json();
					setTopics(data.topics || []);
					setTotalItemsInDb(data.totalItemsInDb);
					setTotalPages(data.pagination.totalPages);
					setTotalItems(data.pagination.totalItems);
				} else {
					throw new Error("Failed to fetch data", res.error);
				}
			} catch (error) {
				console.error("Failed to fetch topics:", error);
			}
		};

		fetchTopics();
	}, [searchTerm, sortBy, sortOrder, currentPage, pageSize]);

	const handleDelete = (id) => {
		setTopics((prevTopics) =>
			prevTopics.filter((topic) => topic._id !== id)
		);
	};

	return totalItemsInDb > 0 ? (
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
			{topics.length !== 0 ? (
				<>
					<PaginationHeader
						pageSize={pageSize}
						setPageSize={setPageSize}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						totalPages={totalPages}
						totalItems={totalItems}
					/>

					<ul className="divide-y divide-gray-200">
						{topics.map((topic) => (
							<TopicItem
								key={topic._id}
								topic={topic}
								onDelete={handleDelete}
							/>
						))}
					</ul>

					<PaginationFooter
						currentPage={currentPage}
						totalPages={totalPages}
						setCurrentPage={setCurrentPage}
					/>
				</>
			) : (
				<div className="text-gray-600 italic">No records found.</div>
			)}
		</div>
	) : (
		<div className="container mx-auto px-4 py-6">
			<div className="text-gray-600 italic">
				Start by adding your first task to get started!
			</div>
		</div>
	);
}
