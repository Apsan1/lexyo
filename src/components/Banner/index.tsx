import { pool } from "@/lib/services/db";

export default async function Banner() {
  await pool.query("UPDATE counters SET visits = visits + 1 WHERE id = 1");

  const result = await pool.query(
    "SELECT visits, articles FROM counters WHERE id = 1"
  );
  const { visits, articles } = result.rows[0];

  return (
    <div className="w-full bg-inherit py-4 sticky top-0 h-fit flex flex-row gap-4 justify-center items-center border-b uppercase">
      <div className="stat">
        <p className="text-sm">
          Total Visit Count: <span className="text-xl">{visits}</span>
        </p>
      </div>
      <div className="stat">
        <p className="text-sm">
          Total Article Generated: <span className="text-xl">{articles}</span>
        </p>
      </div>
    </div>
  );
}
