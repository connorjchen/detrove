import express from "express";
import { addEmail, addPageView } from "../services/landingServices.js";

const router = express.Router();

router.post("/email", async function (req, res) {
  const { email, branch } = req.body;
  await addEmail(email, branch, req, res);
});

router.post("/pageview", async function (req, res) {
  const { page, branch } = req.body;
  await addPageView(page, branch, req, res);
});

export default router;
