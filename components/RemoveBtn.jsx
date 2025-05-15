'use client';

import { HiOutlineTrash } from 'react-icons/hi';

export default function RemoveBtn({ id, onDelete }) {
  const removeTopic = async () => {
    const confirmed = confirm('Are you sure?');

    if (confirmed) {
      try {
        const res = await fetch(`/api/topics/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          onDelete(id);
        } else {
          throw new Error('Failed to delete topic');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
