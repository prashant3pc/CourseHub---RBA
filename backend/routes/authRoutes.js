import express from "express";

import {
  registerValidation,
  loginValidation,
} from "../validators/authValidator.js";

import validationMiddleware from "../middleware/validationMiddleware.js";

import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authController.js";

import protect from "../middleware/protect.js";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validationMiddleware,
  registerUser,
);

router.post("/login", loginValidation, validationMiddleware, loginUser);

router.get("/me", protect, getMe);

export default router;
