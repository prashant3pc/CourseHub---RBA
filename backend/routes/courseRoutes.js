import express from "express";

import {
  createCourse,
  getMyCourses,
  getPublishedCourses,
  getCourse,
  enrollCourse,
  getEnrolledCourses,
  getMyStudents,
  updateCourse,
  deleteCourse,
  getAllCourses,
} from "../controllers/courseController.js";

import protect from "../middleware/protect.js";

import {
  teacherOnly,
  authorize,
} from "../middleware/roleMiddleware.js";

import validationMiddleware from "../middleware/validationMiddleware.js";

import {
  courseValidation,
} from "../validators/courseValidator.js";

const router = express.Router();

router.get(
  "/published",
  protect,
  authorize("student"),
  getPublishedCourses
);

router.get(
  "/my-enrolled",
  protect,
  authorize("student"),
  getEnrolledCourses
);

router.get(
  "/my-courses",
  protect,
  teacherOnly,
  getMyCourses
);

router.get(
  "/my-students",
  protect,
  teacherOnly,
  getMyStudents
);

router.post(
  "/",
  protect,
  teacherOnly,
  courseValidation,
  validationMiddleware,
  createCourse
);

router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  getAllCourses
);

router.get(
  "/:id",
  protect,
  authorize("student"),
  getCourse
);

router.post(
  "/:id/enroll",
  protect,
  authorize("student"),
  enrollCourse
);

router.put(
  "/:id",
  protect,
  teacherOnly,
  courseValidation,
  validationMiddleware,
  updateCourse
);

router.delete(
  "/:id",
  protect,
  teacherOnly,
  deleteCourse
);


export default router;