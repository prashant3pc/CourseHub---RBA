import express from "express";

import {
  applyForTeacher,
  getMyApplication,
} from "../controllers/teacherController.js";

import protect from "../middleware/protect.js";

const router = express.Router();

// Submit teacher application
router.post(
  "/apply",
  protect,
  applyForTeacher
);

// Logged in user's application
router.get(
  "/my-application",
  protect,
  getMyApplication
);

export default router;