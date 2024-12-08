import { query } from "../db.js";
import { v4 as uuid } from "uuid";

export async function getSneaker(sneakerId, req, res) {
  try {
    let result = await query(`SELECT * FROM sneakers WHERE id = ?`, [
      sneakerId,
    ]);
    result = result[0];
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getListings(sneakerId, req, res) {
  try {
    let result = await query(
      `
      SELECT subquery.*
      FROM (
        SELECT listings.*, items.size, ROW_NUMBER() OVER(PARTITION BY items.size ORDER BY listings.price) row_num
          FROM items
          INNER JOIN listings ON items.id = listings.item_id
        WHERE listings.sold_at IS NULL
          AND listings.deleted_at IS NULL
          AND items.sneaker_id = ?
        ) subquery
      WHERE subquery.row_num = 1
      ORDER BY subquery.size
      `,
      [sneakerId]
    );
    result = result.map((row) => ({
      ...row,
      size: Number(row.size),
      price: Number(row.price),
    }));
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getIsWatchlistItem(userId, sneakerId, req, res) {
  try {
    let result = await query(
      `
      SELECT * FROM watchlist_items
      WHERE user_id = ?
      AND sneaker_id = ?
      AND deleted_at IS NULL
      `,
      [userId, sneakerId]
    );
    res.json({ result: result.length > 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createWatchlistItem(userId, sneakerId, req, res) {
  try {
    let result = await query(
      `
      INSERT INTO watchlist_items
      VALUES (?, ?, ?, DEFAULT, DEFAULT)
      `,
      [uuid(), userId, sneakerId]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteWatchlistItem(userId, sneakerId, req, res) {
  try {
    let result = await query(
      `
      UPDATE watchlist_items
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE user_id = ?
      AND sneaker_id = ?
      `,
      [userId, sneakerId]
    );

    if (result.affectedRows === 0) {
      res.status(500).json({ message: "No rows were affected" });
      return;
    }

    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
