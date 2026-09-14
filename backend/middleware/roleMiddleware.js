import createError from "http-errors";

export const authorize = (...roles) => {
  return (req, res, next) => {

    if (!req.user) {
      throw createError(
        401,
        "Unauthorized"
      );
    }

    if (!roles.includes(req.user.role)) {
      throw createError(
        403,
        "Access denied"
      );
    }

    next();
  };
};

export const teacherOnly = (req, res, next) => {

  if (!req.user) {
    throw createError(
      401,
      "Unauthorized"
    );
  }

  if (req.user.role !== "teacher") {
    throw createError(
      403,
      "Only teachers can access this resource."
    );
  }

  if (!req.user.teacherApproved) {
    throw createError(
      403,
      "Your teacher application is still pending approval."
    );
  }

  next();
};