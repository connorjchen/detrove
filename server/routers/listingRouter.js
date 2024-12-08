import express from "express";
import { getListing, updateListing } from "../services/listingServices.js";

const router = express.Router();

router.get("/listing/:listingId", async function (req, res) {
  const { listingId } = req.params;
  await getListing(listingId, req, res);
});

router.patch("/listing/:listingId", async function (req, res) {
  const { listingId } = req.params;
  const { price, isDeleted } = req.body;
  await updateListing(listingId, price, isDeleted, req, res);
});

export default router;
