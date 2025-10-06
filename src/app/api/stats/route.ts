import { NextResponse } from "next/server";
import { pool } from "@/lib/services/db";

export async function GET() {
    await pool.query("UPDATE counters SET visits = visits + 1 WHERE id = 1");
    const result = await pool.query("SELECT visits, articles FROM counters WHERE id = 1");
    return NextResponse.json(result.rows[0]);
}
