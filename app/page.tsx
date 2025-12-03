 "use client";
import { useEffect, useState } from "react";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [countData, setCountData] = useState({});
     useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
 
        const count = data.reduce((acc, curr) => {
          acc[curr.userId] = (acc[curr.userId] || 0) + 1;
          return acc;
        }, {});

        setCountData(count);
      });
  }, []);
  return (
    <div>
 <div className="p-4 space-y-4">
       {Object.entries(countData).map(([userId, count]) => (
        <div key={userId} className="mb-2 p-3 border rounded">
          <p><strong>User ID:</strong> {userId}</p>
          <p><strong>Total Posts:</strong> {count}</p>
        </div>
      ))}
    </div>
    </div>
  );
}
