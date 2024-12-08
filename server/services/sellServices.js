import { query } from "../db.js";
import { v4 as uuid } from "uuid";
import { getSneaker as productServicesGetSneaker } from "./productServices.js";

export async function getSneaker(sneakerId, req, res) {
  await productServicesGetSneaker(sneakerId, req, res);
}

export async function getUnlistedItems(userId, sneakerId, req, res) {
  try {
    let result = await query(
      `
      SELECT subquery.*
      FROM (
        SELECT items.*, ROW_NUMBER() OVER(PARTITION BY items.size) row_num
        FROM items
        WHERE id NOT IN (
        SELECT items.id
          FROM items
          INNER JOIN listings ON items.id = listings.item_id
          WHERE listings.sold_at IS NULL
          AND listings.deleted_at IS NULL
        )
        AND items.owner_id = ?
        AND items.sneaker_id = ?
          ) subquery
      WHERE subquery.row_num = 1
      ORDER BY subquery.size
      `,
      [userId, sneakerId]
    );
    result = result.map((row) => ({
      ...row,
      size: Number(row.size),
    }));
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createListing(itemId, sellerId, price, req, res) {
  try {
    let result = await query(
      `
      INSERT INTO listings
      VALUES (?, ?, ?, ?, DEFAULT, DEFAULT, DEFAULT, DEFAULT)
      `,
      [uuid(), itemId, sellerId, price]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
