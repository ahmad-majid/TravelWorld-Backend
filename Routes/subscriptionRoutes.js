import express from "express";
const router = express.Router();

import {
  subscribe,
  getAllSubscribers,
} from "../Controller/subscriptionController.js";

router.post("/", subscribe);

router.get("/", getAllSubscribers);

export default router;
