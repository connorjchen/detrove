import { query } from "../db.js";

export async function addEmail(email, branch, req, res) {
  try {
    let result = await query(
      `
      INSERT INTO waitlist_emails
      VALUES (?, ?, DEFAULT)
      `,
      [email, branch]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addPageView(page, branch, req, res) {
  try {
    let result = await query(
      `
      INSERT INTO page_views
      VALUES (?, ?, DEFAULT)
      `,
      [page, branch]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
