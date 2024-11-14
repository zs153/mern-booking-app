import express from "express";
import { check } from "express-validator";
import { getUser, register } from "../controllers/user";
import verifyToken from "../../middleware/auth";

const router = express.Router();

router.get("/me", verifyToken, getUser);
router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 o more characters required").isLength({
      min: 6,
    }),
  ],
  register
);
export default router;
