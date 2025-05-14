"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, title, description, dueDate }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newDueDate, setNewDueDate] = useState(() => {
    if (dueDate) {
      // Format the existing due date to 'YYYY-MM-DD'
      return new Date(dueDate).toISOString().split("T")[0];
    } else {
      // Default to today's date in 'YYYY-MM-DD' format
      return new Date().toISOString().split("T")[0];
    }
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription, newDueDate }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      <input
        onChange={(e) => setNewDueDate(e.target.value)}
        value={newDueDate}
        className="border border-slate-500 px-8 py-2"
        type="date"
        placeholder="Due Date"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  );
}
