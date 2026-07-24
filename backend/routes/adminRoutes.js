import express from "express";

import {
  getAllApplications,
  approveApplication,
  rejectApplication,
} from "../controllers/adminController.js";

import protect from "../middleware/protect.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

// All teacher applications
router.get(
  "/applications",
  protect,
  adminOnly,
  getAllApplications
);

// Approve application
router.put(
  "/applications/:id/approve",
  protect,
  adminOnly,
  approveApplication
);

// Reject application
router.put(
  "/applications/:id/reject",
  protect,
  adminOnly,
  rejectApplication
);

export default router;