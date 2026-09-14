import TeacherApplication from "../models/TeacherApplication.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

export const getAllApplications = asyncHandler(async (req, res) => {
  const applications = await TeacherApplication.find()
    .populate(
      "user",
      "name email role teacherApproved profileImage"
    )
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: applications.length,
    applications,
  });
});

export const approveApplication = asyncHandler(async (req, res) => {
  const application = await TeacherApplication.findById(
    req.params.id
  );

  if (!application) {
    throw createError(404, "Application not found");
  }


  if (application.status === "approved") {
    throw createError(
      400,
      "Application already approved"
    );
  }


  if (application.status === "rejected") {
    throw createError(
      400,
      "Rejected application cannot be approved"
    );
  }


  const user = await User.findById(application.user);

  if (!user) {
    throw createError(404, "User not found");
  }

  
  user.role = "teacher";
  user.teacherApproved = true;

  await user.save();

  application.status = "approved";

  if (req.body.adminRemark) {
    application.adminRemark = req.body.adminRemark;
  }

  await application.save();

  res.status(200).json({
    success: true,
    message: "Teacher approved successfully",
    application,
  });
});

export const rejectApplication = asyncHandler(async (req, res) => {
  const application = await TeacherApplication.findById(
    req.params.id
  );

  if (!application) {
    throw createError(404, "Application not found");
  }

  if (application.status === "approved") {
    throw createError(
      400,
      "Approved application cannot be rejected"
    );
  }

  if (application.status === "rejected") {
    throw createError(
      400,
      "Application already rejected"
    );
  }

  application.status = "rejected";

  if (req.body.adminRemark) {
    application.adminRemark = req.body.adminRemark;
  }

  await application.save();

  res.status(200).json({
    success: true,
    message: "Application rejected",
    application,
  });
});

export const getAllStudents = asyncHandler(async (req, res) => {
  const students = await User.find({
    role: "student",
  })
    .select("-password")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: students.length,
    students,
  });
});

export const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await User.find({
    role: "teacher",
    teacherApproved: true,
  })
    .select("-password")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: teachers.length,
    teachers,
  });
});