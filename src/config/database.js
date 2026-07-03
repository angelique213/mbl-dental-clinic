// import dotenv so we can use variables from .env
import dotenv from "dotenv";

// import postgres pool
import pg from "pg";

// load .env file
dotenv.config();

// get Pool from pg
const { Pool } = pg;

// create database connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,

    // Render PostgreSQL needs SSL
    ssl: {
        rejectUnauthorized: false
    }
});

// export pool so models can use it
export default pool;