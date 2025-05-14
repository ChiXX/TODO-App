import Link from 'next/link';
import { HiPencilAlt } from 'react-icons/hi';
import RemoveBtn from './RemoveBtn';

export default function TopicItem({ topic, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 transition-transform transform hover:scale-105">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{topic.title}</h3>
          <p className="text-gray-600 mt-2">{topic.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            Due Date: {new Date(topic.dueDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <RemoveBtn id={topic._id} onDelete={onDelete} />
          <Link href={`/editTopic/${topic._id}`} aria-label={`Edit ${topic.title}`}>
            <HiPencilAlt size={24} className="text-blue-500 hover:text-blue-700" />
          </Link>
        </div>
      </div>
    </div>
  );
}
