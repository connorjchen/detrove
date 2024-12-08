import express from "express";
import { addSneaker, addItem, getWaitlist } from "../services/adminServices.js";

const router = express.Router();

router.post("/sneaker", async function (req, res) {
  const {
    brand,
    name,
    gender,
    styleCode,
    retailPrice,
    releaseDate,
    colorway,
    description,
  } = req.body;
  await addSneaker(
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
  );
});

router.post("/item", async function (req, res) {
  const { sneakerId, size, ownerId } = req.body;
  await addItem(sneakerId, size, ownerId, req, res);
});

router.get("/waitlist", async function (req, res) {
  await getWaitlist(req, res);
});

export default router;
