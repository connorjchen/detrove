import express from "express";
import {
  getSneaker,
  getListings,
  updatePurchase,
} from "../services/buyServices.js";

const router = express.Router();

router.get("/sneaker/:sneakerId", async function (req, res) {
  const { sneakerId } = req.params;
  await getSneaker(sneakerId, req, res);
});

router.get("/listings/:sneakerId", async function (req, res) {
  const { sneakerId } = req.params;
  await getListings(sneakerId, req, res);
});

router.patch("/purchase/:listingId", async function (req, res) {
  const { listingId } = req.params;
  const { buyerId } = req.body;
  await updatePurchase(listingId, buyerId, req, res);
});

export default router;
