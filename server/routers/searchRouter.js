import express from "express";
import { getSneakers } from "../services/searchServices.js";

const router = express.Router();

router.get("/sneakers", async function (req, res) {
  await getSneakers(req, res);
});

export default router;
