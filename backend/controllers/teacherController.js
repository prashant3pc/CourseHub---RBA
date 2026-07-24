import TeacherApplication from "../models/TeacherApplication.js";
import User from "../models/User.js";

// =====================================
// Submit Teacher Application
// =====================================
export const applyForTeacher = async (req, res) => {
  try {
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
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "teacher") {
      return res.status(400).json({
        success: false,
        message: "You are already a teacher",
      });
    }

    const existingApplication =
      await TeacherApplication.findOne({
        user: user._id,
      });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message:
          "You have already submitted an application",
      });
    }

    const application =
      await TeacherApplication.create({
        user: user._id,
        fullName: user.name,
        email: user.email,
        phone: phone,
        qualification,
        experience,
        subjects,
        bio,
        motivation,
      });

    res.status(201).json({
      success: true,
      message:
        "Teacher application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get Logged In User Application
// =====================================
export const getMyApplication = async (
  req,
  res
) => {
  try {
    const application =
      await TeacherApplication.findOne({
        user: req.user.id,
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};