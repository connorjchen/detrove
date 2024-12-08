import express from "express";
import {
  getSneaker,
  getListings,
  getIsWatchlistItem,
  createWatchlistItem,
  deleteWatchlistItem,
} from "../services/productServices.js";

const router = express.Router();

router.get("/sneaker/:sneakerId", async function (req, res) {
  const { sneakerId } = req.params;
  await getSneaker(sneakerId, req, res);
});

router.get("/listings/:sneakerId", async function (req, res) {
  const { sneakerId } = req.params;
  await getListings(sneakerId, req, res);
});

router.get("/watchlist/:userId/:sneakerId", async function (req, res) {
  const { userId, sneakerId } = req.params;
  await getIsWatchlistItem(userId, sneakerId, req, res);
});

router.post("/watchlist", async function (req, res) {
  const { userId, sneakerId } = req.body;
  await createWatchlistItem(userId, sneakerId, req, res);
});

router.patch("/watchlist/:userId/:sneakerId", async function (req, res) {
  const { userId, sneakerId } = req.params;
  await deleteWatchlistItem(userId, sneakerId, req, res);
});

export default router;
