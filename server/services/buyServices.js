import { query } from "../db.js";
import {
  getSneaker as productServicesGetSneaker,
  getListings as productServicesGetListings,
} from "./productServices.js";

export async function getSneaker(sneakerId, req, res) {
  await productServicesGetSneaker(sneakerId, req, res);
}

export async function getListings(sneakerId, req, res) {
  await productServicesGetListings(sneakerId, req, res);
}

export async function updatePurchase(listingId, buyerId, req, res) {
  try {
    const [buyer] = await query(
      `
      SELECT balance FROM users WHERE id = ?;
      `,
      [buyerId]
    );
    const [listing] = await query(
      `
      SELECT price FROM listings WHERE id = ?;
      `,
      [listingId]
    );

    if (buyer.balance < listing.price * 1.05) {
      res.status(500).json({ message: "Insufficient funds" });
      return;
    }

    const result1 = await query(
      `
      UPDATE listings
      SET sold_at = CURRENT_TIMESTAMP, buyer_id = ? WHERE id = ?;
      `,
      [buyerId, listingId]
    );

    const result2 = await query(
      `
      UPDATE users
      INNER JOIN listings ON users.id = listings.seller_id
      SET users.balance = users.balance + listings.price * 0.95
      WHERE listings.id = ?;
      `,
      [listingId]
    );

    const result3 = await query(
      `
      UPDATE users
      INNER JOIN listings ON users.id = listings.buyer_id
      SET users.balance = users.balance - listings.price * 1.05
      WHERE listings.id = ?;
      `,
      [listingId]
    );

    const result4 = await query(
      `
      UPDATE items
      INNER JOIN listings ON items.id = listings.item_id
      SET owner_id = ?
      WHERE listings.id = ?;
      `,
      [buyerId, listingId]
    );

    const totalAffectedRows =
      result1.affectedRows +
      result2.affectedRows +
      result3.affectedRows +
      result4.affectedRows;

    if (totalAffectedRows < 4) {
      res.status(500).json({ message: "Not all rows were affected" });
      // reset data?
      return;
    }

    res.json({ result4 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
