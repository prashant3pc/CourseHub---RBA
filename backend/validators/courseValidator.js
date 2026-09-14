import { body } from "express-validator";

export const courseValidation = [

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Course title is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Course title must be at least 3 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Course description is required")
    .bail()
    .isLength({ min: 10 })
    .withMessage(
      "Course description must be at least 10 characters"
    ),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("duration")
    .trim()
    .notEmpty()
    .withMessage("Duration is required"),

  body("level")
    .optional()
    .isIn([
      "Beginner",
      "Intermediate",
      "Advanced",
    ])
    .withMessage(
      "Level must be Beginner, Intermediate, or Advanced"
    ),

  body("thumbnail")
    .optional()
    .trim(),
];