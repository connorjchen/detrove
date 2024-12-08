import express from "express";
import {
  getSneaker,
  getUnlistedItems,
  createListing,
} from "../services/sellServices.js";

const router = express.Router();

router.get("/sneaker/:sneakerId", async function (req, res) {
  const { sneakerId } = req.params;
  await getSneaker(sneakerId, req, res);
});

router.get("/unlisted/items/:userId/:sneakerId", async function (req, res) {
  const { userId, sneakerId } = req.params;
  await getUnlistedItems(userId, sneakerId, req, res);
});

router.post("/listing", async function (req, res) {
  const { itemId, sellerId, price } = req.body;
  await createListing(itemId, sellerId, price, req, res);
});

export default router;
