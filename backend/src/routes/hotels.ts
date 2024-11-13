import express from "express";
import { param } from "express-validator";
import { getHotel, getHotels, search } from "../controllers/hotels";

const router = express.Router();

router.get("/search", search);
router.get("/", getHotels);
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  getHotel
);

export default router;
