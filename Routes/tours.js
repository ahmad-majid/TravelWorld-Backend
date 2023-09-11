import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getSingleTour,
  getTourBySearch,
  updateTour,
  getFeaturedTour,
  getTourCount,
} from "../Controller/tourController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create new tour
router.post("/", verifyAdmin, createTour);

//update new tour
router.put("/:id", verifyAdmin, updateTour);

//delete tour
router.delete("/:id", verifyAdmin, deleteTour);

//getSingleTour
router.get("/:id", getSingleTour);

//getALl TOur
router.get("/", getAllTour);

//get tour by search
router.get("/search/getTourBySearch", getTourBySearch);

//get Featured Tours
router.get("/search/getFeaturedTours", getFeaturedTour);

//get Tours COunt
router.get("/search/getTourCount", getTourCount);

export default router;
