import { useState } from 'react';

export default function TopicEditForm({ initialData = {}, onSubmit }) {
  const [title, setTitle] = useState(initialData ? initialData.title : '');
  const [description, setDescription] = useState(initialData ? initialData.description : '');
  const [dueDate, setDueDate] = useState(
    initialData && initialData.dueDate
      ? initialData.dueDate.slice(0, 10)
      : new Date().toISOString().slice(0, 10)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {initialData?._id ? 'Update Topic' : 'Add Topic'}
      </button>
    </form>
  );
}
