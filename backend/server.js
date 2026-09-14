import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();

// =====================================
// Database
// =====================================

connectDB();

const app = express();

// =====================================
// Global Middleware
// =====================================

app.use(cors());

app.use(express.json());

// =====================================
// Test Route
// =====================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running Successfully",
  });
});

// =====================================
// Routes
// =====================================

app.use("/api/auth", authRoutes);

app.use("/api/teacher", teacherRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/courses", courseRoutes);

// =====================================
// Global Error Handler
// MUST be after all routes
// =====================================

app.use(errorHandler);

// =====================================
// Start Server
// =====================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});