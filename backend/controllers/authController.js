import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const registerUser = asyncHandler (async (req, res) => {
  
    const {
      name,
      email,
      password,
      phone,
      course,
    } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      throw createError(400, "Email already registered");
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      course,
      role: "student",
      teacherApproved: false,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        course: user.course,
        role: user.role,
        teacherApproved: user.teacherApproved,
      },
    });
});

export const loginUser = asyncHandler (async (req, res) => {
  
    const { email, password } =
      req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      throw createError(401, "Invalid Email or Password");
    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {
      throw createError(401, "Invalid Email or PAssword");
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        course: user.course,
        role: user.role,
        teacherApproved:
          user.teacherApproved,
      },
    });
});

export const getMe = asyncHandler (async (
  req,
  res
) => {

    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    if (!user) {
        throw createError(404, "User not found");
    }

    res.status(200).json({
      success: true,
      user,
    });
});