import { Pool } from "pg";

const globalForPool = global as unknown as { pool?: Pool };

export const pool =
    globalForPool.pool ||
    new Pool({
        connectionString: process.env.DB_URI,
        ssl: { rejectUnauthorized: false }, // important for Neon/Supabase
    });

if (process.env.NODE_ENV !== "production") globalForPool.pool = pool;
