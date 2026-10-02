import { Pool } from "pg";
import { env } from "../config/env";
import { logger } from "./logger";

export const pool = new Pool({
    connectionString: env.DATABASE_URL,
    connectionTimeoutMillis: 2000,
});

pool.on("error", (err) => {
    logger.error(err, "Unexpected error on idle database client");
});