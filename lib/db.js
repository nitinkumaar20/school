import mysql from "mysql2/promise";

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "schooldb",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      connectionLimit: 10,
    });
  }
  return pool;
}
