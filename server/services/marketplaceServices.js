import { query } from "../db.js";

export async function getListings(req, res) {
  try {
    let sneakersWithListings = await query(
      `
      SELECT subquery.*
      FROM (
        SELECT sneakers.*, items.size, listings.price, ROW_NUMBER() OVER(PARTITION BY sneakers.id, items.size ORDER BY listings.price) row_num
          FROM items
          INNER JOIN sneakers ON items.sneaker_id = sneakers.id
          INNER JOIN listings ON items.id = listings.item_id
        WHERE listings.sold_at IS NULL
        AND listings.deleted_at IS NULL
        ) subquery
      WHERE subquery.row_num = 1
      ORDER BY subquery.id, subquery.price
      `
    );

    let result = [];
    let currentSneaker = null;
    for (let i = 0; i < sneakersWithListings.length; i++) {
      let row = sneakersWithListings[i];
      if (currentSneaker === null || currentSneaker.id !== row.id) {
        let { price, size, ...sneakerInfo } = row;
        currentSneaker = {
          ...sneakerInfo,
          listings: [],
        };
        result.push(currentSneaker);
      }
      currentSneaker.listings.push({
        size: Number(row.size),
        price: Number(row.price),
      });
    }

    let sneakersWithoutListings = await query(
      `
      SELECT *
      FROM sneakers
      WHERE id NOT IN (
        SELECT items.sneaker_id
          FROM items
          INNER JOIN listings ON items.id = listings.item_id
          WHERE listings.sold_at IS NULL
          AND listings.deleted_at IS NULL
        )
      `
    );

    if (sneakersWithoutListings.length > 0) {
      result = result.concat(
        sneakersWithoutListings.map((row) => ({ ...row, listings: [] }))
      );
    }

    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
