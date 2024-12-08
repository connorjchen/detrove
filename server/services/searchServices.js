import { query } from "../db.js";

export async function getSneakers(req, res) {
  try {
    let result = await query(`SELECT DISTINCT id, name FROM sneakers`);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
