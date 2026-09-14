import express from "express";

import { applyForTeacher, getMyApplication,} from "../controllers/teacherController.js";

import validationMiddleware from "../middleware/validationMiddleware.js";
import {teacherValidation,} from "../validators/teacherValidator.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.post(
  "/apply",
  protect,
  teacherValidation,
  validationMiddleware,
  applyForTeacher
);

router.get(
  "/my-application",
  protect,
  getMyApplication
);

export default router;