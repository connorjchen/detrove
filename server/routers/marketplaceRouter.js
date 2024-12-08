import express from "express";
import { getListings } from "../services/marketplaceServices.js";

const router = express.Router();

router.get("/listings", async function (req, res) {
  await getListings(req, res);
});

export default router;
