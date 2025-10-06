"use client";

import { useEffect, useState } from "react";

export default function Banner() {
  const [data, setData] = useState<{ visits: number; articles: number } | null>(
    null
  );

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("/api/stats");
      const stats = await res.json();
      setData(stats);
    }
    fetchStats();
  }, []);

  if (!data) return null;

  return (
    <div className="w-full bg-inherit py-4 sticky top-0 h-fit flex flex-row gap-4 justify-center items-center border-b uppercase">
      <div className="stat">
        <p className="text-sm">
          Total Visit Count: <span className="text-xl">{data.visits}</span>
        </p>
      </div>
      <div className="stat">
        <p className="text-sm">
          Total Article Generated:{" "}
          <span className="text-xl">{data.articles}</span>
        </p>
      </div>
    </div>
  );
}
