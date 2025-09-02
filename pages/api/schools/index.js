import { getPool } from "../../../lib/db";

export default async function handler(req, res) {
  const pool = getPool();
  if (req.method === "GET") {
    try {
      const [rows] = await pool.query("SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY id DESC");
      return res.status(200).json({ success: true, data: rows });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ success: false, error: "DB error" });
    }
  } else {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
