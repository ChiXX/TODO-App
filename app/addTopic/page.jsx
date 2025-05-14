"use client";

import TopicEditForm from '@/components/TopicEditForm';
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const router = useRouter();

  const handleAdd = async (data) => {
    if (!data || !data.title || !data.description || !data.dueDate) {
      alert("Title, description, and due date are required.");
      return;
    }

    try {
      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/');
      } else {
        throw new Error('Failed to create a topic');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <TopicEditForm onSubmit={handleAdd} />
    </div>
  );
}
