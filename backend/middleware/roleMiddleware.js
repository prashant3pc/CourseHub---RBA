// ==============================
// Allow only specific roles
// Example:
// router.get("/admin", protect, authorize("admin"), controller)
// ==============================

export const authorize = (...roles) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    next();
  };
};

// ==============================
// Allow only approved teachers
// ==============================

export const teacherOnly = (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.user.role !== "teacher") {
    return res.status(403).json({
      success: false,
      message: "Only teachers can access this resource.",
    });
  }

  if (!req.user.teacherApproved) {
    return res.status(403).json({
      success: false,
      message: "Your teacher application is still pending approval.",
    });
  }

  next();
};

// ==============================
// Admin Only
// ==============================

export const adminOnly = (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only.",
    });
  }

  next();
};