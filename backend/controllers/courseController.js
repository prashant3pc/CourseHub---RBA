import Course from "../models/Course.js";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

export const createCourse = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    duration,
    level,
    thumbnail,
  } = req.body;

  const course = await Course.create({
    title,
    description,
    category,
    duration,
    level,
    thumbnail,
    teacher: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Course created successfully",
    course,
  });
});

export const getMyCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({
    teacher: req.user._id,
  }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    count: courses.length,
    courses,
  });
});

export const getPublishedCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({
    isPublished: true,
  })
    .populate(
      "teacher",
      "name email profileImage"
    )
    .sort({
      createdAt: -1,
    });

  res.status(200).json({
    success: true,
    count: courses.length,
    courses,
  });
});

export const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findOne({
    _id: req.params.id,
    isPublished: true,
  }).populate(
    "teacher",
    "name email profileImage"
  );

  if (!course) {
    throw createError(
      404,
      "Course not found"
    );
  }

  res.status(200).json({
    success: true,
    course,
  });
});

export const enrollCourse = asyncHandler(async (req, res) => {
  const course = await Course.findOne({
    _id: req.params.id,
    isPublished: true,
  });

  if (!course) {
    throw createError(
      404,
      "Course not found"
    );
  }

  if (
    course.teacher.toString() ===
    req.user._id.toString()
  ) {
    throw createError(
      400,
      "You cannot enroll in your own course"
    );
  }

  const alreadyEnrolled =
    course.students.some(
      (studentId) =>
        studentId.toString() ===
        req.user._id.toString()
    );

  if (alreadyEnrolled) {
    throw createError(
      400,
      "You are already enrolled in this course"
    );
  }

  course.students.push(req.user._id);

  await course.save();

  res.status(200).json({
    success: true,
    message:
      "Successfully enrolled in course",
    course,
  });
});

export const getEnrolledCourses = asyncHandler(
  async (req, res) => {
    const courses = await Course.find({
      students: req.user._id,
      isPublished: true,
    })
      .populate(
        "teacher",
        "name email profileImage"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  }
);

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(
    req.params.id
  );

  if (!course) {
    throw createError(
      404,
      "Course not found"
    );
  }

  if (
    course.teacher.toString() !==
    req.user._id.toString()
  ) {
    throw createError(
      403,
      "You are not allowed to update this course"
    );
  }

  const {
    title,
    description,
    category,
    duration,
    level,
    thumbnail,
    isPublished,
  } = req.body;

  course.title = title;
  course.description = description;
  course.category = category;
  course.duration = duration;
  course.level = level;
  course.thumbnail = thumbnail;

  if (
    typeof isPublished !==
    "undefined"
  ) {
    course.isPublished = isPublished;
  }

  const updatedCourse =
    await course.save();

  res.status(200).json({
    success: true,
    message:
      "Course updated successfully",
    course: updatedCourse,
  });
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(
    req.params.id
  );

  if (!course) {
    throw createError(
      404,
      "Course not found"
    );
  }

  if (
    course.teacher.toString() !==
    req.user._id.toString()
  ) {
    throw createError(
      403,
      "You are not allowed to delete this course"
    );
  }

  await course.deleteOne();

  res.status(200).json({
    success: true,
    message:
      "Course deleted successfully",
  });
});

export const getMyStudents = asyncHandler(async (req, res) => {
  const courses = await Course.find({
    teacher: req.user._id,
  })
    .populate(
      "students",
      "name email phone course"
    )
    .select(
      "title students"
    );

  const studentsMap = new Map();

  courses.forEach((course) => {
    course.students.forEach((student) => {
      const studentId =
        student._id.toString();

      if (
        !studentsMap.has(studentId)
      ) {
        studentsMap.set(
          studentId,
          {
            _id: student._id,
            name: student.name,
            email: student.email,
            phone: student.phone,
            course: student.course,
            enrolledCourses: [],
          }
        );
      }

      studentsMap
        .get(studentId)
        .enrolledCourses.push(
          course.title
        );
    });
  });

  const students =
    Array.from(
      studentsMap.values()
    );

  res.status(200).json({
    success: true,
    count: students.length,
    students,
  });
});

export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find()
    .populate(
      "teacher",
      "name email profileImage"
    )
    .populate(
      "students",
      "name email"
    )
    .sort({
      createdAt: -1,
    });

  res.status(200).json({
    success: true,
    count: courses.length,
    courses,
  });
});