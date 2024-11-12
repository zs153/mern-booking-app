import express from "express";
import { param } from "express-validator";
import { getHotelDeMierda, getHotels, search } from "../controllers/hotels";

const router = express.Router();

router.get("/", getHotels);
// router.get("/:id",
//   [param("id").notEmpty().withMessage("Hotel ID is required")],
//   getHotelDeMierda
// );
router.get("/search", search);

export default router;
