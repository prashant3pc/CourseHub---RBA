import TeacherApplication from "../models/TeacherApplication.js";
import User from "../models/User.js";

// =====================================
// Get All Teacher Applications
// =====================================
export const getAllApplications = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Approve Teacher Application
// =====================================
export const approveApplication = async (req, res) => {
  try {
    const application = await TeacherApplication.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.status === "approved") {
      return res.status(400).json({
        success: false,
        message: "Application already approved",
      });
    }

    const user = await User.findById(application.user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Reject Teacher Application
// =====================================
export const rejectApplication = async (req, res) => {
  try {
    const application = await TeacherApplication.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.status === "rejected") {
      return res.status(400).json({
        success: false,
        message: "Application already rejected",
      });
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};