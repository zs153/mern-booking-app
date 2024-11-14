import express from "express";
import { param } from "express-validator";
import {
  bookings,
  getHotel,
  getHotels,
  intentPayment,
  search,
} from "../controllers/hotels";
import verifyToken from "../../middleware/auth";

const router = express.Router();

router.get("/search", search);
router.get("/", getHotels);
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  getHotel
);
router.post("/:hotelId/bookings/payment-intent", verifyToken, intentPayment);
router.post("/:hotelId/bookings", verifyToken, bookings);

export default router;
