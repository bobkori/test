"use client";
import { useEffect, useState } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [countData, setCountData] = useState<Record<number, number>>({});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data: Post[]) => {
        setPosts(data);

        const count = data.reduce((acc: Record<number, number>, curr) => {
          acc[curr.userId] = (acc[curr.userId] || 0) + 1;
          return acc;
        }, {});

        setCountData(count);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User-wise Post Count</h2>

      {Object.entries(countData).map(([userId, count]) => (
        <div
          key={userId}
          className="mb-2 p-3 border rounded bg-gray-100 shadow-sm"
        >
          <p><strong>User ID:</strong> {userId}</p>
          <p><strong>Total Posts:</strong> {count}</p>
        </div>
      ))}
    </div>
  );
}
