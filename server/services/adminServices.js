import { query } from "../db.js";
import { v4 as uuid } from "uuid";

export async function addSneaker(
  brand,
  name,
  gender,
  styleCode,
  retailPrice,
  releaseDate,
  colorway,
  description,
  req,
  res
) {
  try {
    let sneakerId = uuid();

    let result = await query(
      `
      INSERT INTO sneakers
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [
        sneakerId,
        brand,
        name,
        gender,
        styleCode,
        retailPrice,
        releaseDate,
        colorway,
        description,
      ]
    );

    // Add size 9, 10, 11 into Connor's admin account for listing
    let sizes = [9, 10, 11];
    for (let i = 0; i < sizes.length; i++) {
      await query(
        `
        INSERT INTO items
        VALUES (?, ?, ?, ?, DEFAULT)
        `,
        [uuid(), sneakerId, sizes[i], "4d2d8fb3-ff9f-4b97-b5c5-4de8445424e0"]
      );
    }

    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addItem(sneakerId, size, ownerId, req, res) {
  try {
    ownerId = "4d2d8fb3-ff9f-4b97-b5c5-4de8445424e0"; // Connor admin account for safety, can remove after making API priv

    let result = await query(
      `
      INSERT INTO items
      VALUES (?, ?, ?, ?, DEFAULT)
      `,
      [uuid(), sneakerId, size, ownerId]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getWaitlist(req, res) {
  try {
    let result = await query(`SELECT * FROM waitlist_emails`);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
