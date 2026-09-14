import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, course } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createError(400, "Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    course,
    role: "student",
    teacherApproved: false,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, "Invalid Email or Password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw createError(401, "Invalid Email or Password");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.status(200).json({
    success: true,
    data: token,
    message: "Login successful",
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    throw createError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});
