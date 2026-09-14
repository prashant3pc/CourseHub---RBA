import express from "express";

import {
  getAllApplications,
  approveApplication,
  rejectApplication,
  getAllStudents,
  getAllTeachers,
} from "../controllers/adminController.js";

import protect from "../middleware/protect.js";

import {
  authorize,
} from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/applications",
  protect,
  authorize("admin"),
  getAllApplications
);


router.put(
  "/applications/:id/approve",
  protect,
  authorize("admin"),
  approveApplication
);


router.put(
  "/applications/:id/reject",
  protect,
  authorize("admin"),
  rejectApplication
);

router.get(
  "/students",
  protect,
  authorize("admin"),
  getAllStudents
);

router.get(
  "/teachers",
  protect,
  authorize("admin"),
  getAllTeachers
);


export default router;