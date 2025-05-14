'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TopicEditForm from '@/components/TopicEditForm';


export default function EditTopic() {
  const router = useRouter();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await fetch(`/api/topics/${id}`);
        if (res.ok) {
          const data = await res.json();
          
          setInitialData(data.topic);
        } else {
          throw new Error('Failed to fetch topic');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopic();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      
      const res = await fetch(`/api/topics/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/');
      } else {
        throw new Error('Failed to update topic');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      <TopicEditForm initialData={initialData} onSubmit={handleUpdate} />
    </div>
  );
}
