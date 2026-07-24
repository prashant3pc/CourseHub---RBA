const teacherOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (
    req.user.role !== "teacher" ||
    !req.user.teacherApproved
  ) {
    return res.status(403).json({
      success: false,
      message: "Teacher access only",
    });
  }

  next();
};

export default teacherOnly;