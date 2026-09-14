import TeacherApplication from "../models/TeacherApplication.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

export const applyForTeacher = asyncHandler(async (req, res) => {
  const {
    phone,
    qualification,
    experience,
    subjects,
    bio,
    motivation,
  } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    throw createError(404, "User doesn't exist");
  }

  if (user.role === "teacher") {
    throw createError(
      400,
      "You're already a teacher"
    );
  }

  const existingApplication =
    await TeacherApplication.findOne({
      user: user._id,
    });

  if (existingApplication) {
    throw createError(
      400,
      "You have already submitted an application"
    );
  }

  const application =
    await TeacherApplication.create({
      user: user._id,
      fullName: user.name,
      email: user.email,
      phone,
      qualification,
      experience,
      subjects,
      bio,
      motivation,
    });

  res.status(201).json({
    success: true,
    message: "Teacher application submitted successfully",
    application,
  });
});

export const getMyApplication = asyncHandler(
  async (req, res) => {
    const application =
      await TeacherApplication.findOne({
        user: req.user.id,
      });

    if (!application) {
      throw createError(
        404,
        "Teacher application not found"
      );
    }

    res.status(200).json({
      success: true,
      application,
    });
  }
);