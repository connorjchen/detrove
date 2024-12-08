import { query } from "../db.js";
import { v4 as uuid } from "uuid";

export async function getItems(userId, req, res) {
  try {
    let result = await query(
      `
      SELECT items.*, sneakers.brand, sneakers.name, listings.price
      FROM items
      INNER JOIN sneakers ON items.sneaker_id = sneakers.id
      INNER JOIN listings ON items.id = listings.item_id
      WHERE items.owner_id = ?
      AND listings.sold_at IS NULL
      AND listings.deleted_at IS NULL

      UNION

      SELECT  items.*, sneakers.brand, sneakers.name, NULL as price
      FROM items
      INNER JOIN sneakers ON items.sneaker_id = sneakers.id
      WHERE items.id NOT IN (
      SELECT items.id
        FROM items
        INNER JOIN listings ON items.id = listings.item_id
        WHERE listings.sold_at IS NULL
        AND listings.deleted_at IS NULL
      )
      AND items.owner_id = ?
      `,
      [userId, userId]
    );
    result = result.map((item) => {
      item.size = Number(item.size);
      if (item.price) {
        item.price = Number(item.price);
      }
      return item;
    });
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getActiveListings(userId, req, res) {
  try {
    let result = await query(
      `
      SELECT listings.*, items.size, sneakers.name, items.sneaker_id
      FROM listings
      INNER JOIN items ON listings.item_id = items.id
      INNER JOIN sneakers ON items.sneaker_id = sneakers.id
      WHERE seller_id = ?
      AND sold_at IS NULL
      AND deleted_at IS NULL 
      ORDER BY created_at DESC
      `,
      [userId]
    );
    result = result.map((listing) => {
      listing.size = Number(listing.size);
      listing.price = Number(listing.price);
      return listing;
    });
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getUser(userEmail, req, res) {
  try {
    let result = await query(`SELECT * FROM users WHERE email = ?`, [
      userEmail,
    ]);
    if (result.length === 0) {
      res.json({ result: null });
    } else {
      result = result[0];
      res.json({ result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createUser(
  userEmail,
  firstName,
  lastName,
  referrerCode,
  req,
  res
) {
  try {
    await query(
      `
      INSERT INTO users
      VALUES (?, ?, 0, ?, ?, ?, DEFAULT)
      `,
      [uuid(), userEmail, firstName, lastName, referrerCode]
    );
    let result = await query(`SELECT * FROM users WHERE email = ?`, [
      userEmail,
    ]);
    result = result[0];
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getWatchlist(userId, req, res) {
  try {
    let result1 = await query(
      `
      SELECT watchlist_items.*, sneakers.name, NULL as price
      FROM watchlist_items
      INNER JOIN sneakers ON watchlist_items.sneaker_id = sneakers.id
      WHERE watchlist_items.user_id = ?
      AND watchlist_items.deleted_at IS NULL
      AND watchlist_items.sneaker_id NOT IN (
        SELECT items.sneaker_id
          FROM items
          INNER JOIN listings ON items.id = listings.item_id
          WHERE listings.sold_at IS NULL
          AND listings.deleted_at IS NULL
        )
      `,
      [userId]
    );

    let result2 = await query(
      `
      SELECT subquery.*
      FROM (
        SELECT watchlist_items.*, sneakers.name, listings.price, ROW_NUMBER() OVER(PARTITION BY sneakers.id ORDER BY listings.price) row_num
          FROM watchlist_items
          INNER JOIN items ON watchlist_items.sneaker_id = items.sneaker_id
          INNER JOIN sneakers ON watchlist_items.sneaker_id = sneakers.id
          INNER JOIN listings ON items.id = listings.item_id
        WHERE listings.sold_at IS NULL
        AND listings.deleted_at IS NULL
        AND watchlist_items.user_id = ?
        AND watchlist_items.deleted_at IS NULL
        ) subquery
      WHERE subquery.row_num = 1
      `,
      [userId]
    );

    let result = [...result1, ...result2];

    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
