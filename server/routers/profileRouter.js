import express from "express";
import {
  getItems,
  getActiveListings,
  getUser,
  getWatchlist,
  createUser,
} from "../services/profileServices.js";

const router = express.Router();

router.get("/items/:userId", async function (req, res) {
  const { userId } = req.params;
  await getItems(userId, req, res);
});

router.get("/active/listings/:userId", async function (req, res) {
  const { userId } = req.params;
  await getActiveListings(userId, req, res);
});

router.get("/user/:userEmail", async function (req, res) {
  const { userEmail } = req.params;
  await getUser(userEmail, req, res);
});

router.post("/user/:userEmail", async function (req, res) {
  const { userEmail } = req.params;
  const { firstName, lastName, referrerCode } = req.body;
  await createUser(userEmail, firstName, lastName, referrerCode, req, res);
});

router.get("/watchlist/:userId", async function (req, res) {
  const { userId } = req.params;
  await getWatchlist(userId, req, res);
});

export default router;
