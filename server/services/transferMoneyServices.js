import { query } from "../db.js";
import { v4 as uuid } from "uuid";

export async function getBankAccount(userId, client, req, res) {
  try {
    let result = await query(
      `
      SELECT account_name, account_id, access_token
      FROM bank_accounts
      WHERE user_id = ?
      `,
      [userId]
    );
    if (result.length === 0) {
      res.json({});
    } else {
      result = result[0];
      const identityResponse = await client.identityGet({
        access_token: result.access_token,
        options: {
          account_ids: [result.account_id],
        },
      });

      let availableBalance =
        identityResponse.data.accounts[0].balances.available;
      let accountName = result.account_name;

      res.json({ accountName, availableBalance });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createBankAccount(
  userId,
  accountName,
  ownerName,
  accountId,
  accessToken,
  customerId,
  req,
  res
) {
  await query(
    `
      INSERT INTO bank_accounts
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
    [uuid(), accountName, userId, ownerName, accountId, accessToken, customerId]
  );
}

export async function updateMoney(userId, amount, req, res) {
  try {
    let result = await query(
      `
      UPDATE users
      SET balance = balance + ?
      WHERE id = ?
      `,
      [amount, userId]
    );
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAccessTokenAndAccountId(userId, req, res) {
  try {
    let result = await query(
      `
      SELECT account_id, access_token
      FROM bank_accounts
      WHERE user_id = ?
      `,
      [userId]
    );
    result = result[0];
    return result;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getCustomerId(userId, req, res) {
  try {
    let result = await query(
      `
      SELECT customer_id
      FROM bank_accounts
      WHERE user_id = ?
      `,
      [userId]
    );
    result = result[0];
    return result;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
