import { body } from "express-validator";

export const teacherValidation = [

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required") 
    .bail()
    .isLength({ min: 7, max: 15 })
    .withMessage("Phone number must be between 7 and 15 characters"),
    

  body("qualification")
    .trim()
    .notEmpty()
    .withMessage("qualification is required"),

  body("experience")
    .notEmpty()
    .withMessage("Experience is required"),
    
 body("subjects")
    .trim()
    .notEmpty()
    .withMessage("Subjects is required"),

 body("bio")
    .trim()
    .notEmpty()
    .withMessage("Bio is required")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Bio must be at least 10 characters"),

 body("motivation")
    .trim()
    .notEmpty()
    .withMessage("Motivation is required")
    .bail()
    .isLength({ min: 10 })
    .withMessage(
      "Motivation must be at least 10 characters"),

];
