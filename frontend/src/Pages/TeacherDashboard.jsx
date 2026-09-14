import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../api/api";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    level: "Beginner",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [courses, setCourses] = useState([]);
  const [showMyCourses, setShowMyCourses] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [coursesError, setCoursesError] = useState("");

  const [editingCourse, setEditingCourse] = useState(null);

  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    level: "Beginner",
    thumbnail: "",
    isPublished: true,
  });

  const [editLoading, setEditLoading] = useState(false);

  const [students, setStudents] = useState([]);

  const [showMyStudents, setShowMyStudents] = useState(false);

  const [studentsLoading, setStudentsLoading] = useState(false);

  const [studentsError, setStudentsError] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post(
        "/courses",
        formData
      );

      setMessage(
        response.data.message ||
          "Course created successfully"
      );

      if (response.data.course) {
        setCourses((prevCourses) => [
          response.data.course,
          ...prevCourses,
        ]);
      }

      setFormData({
        title: "",
        description: "",
        category: "",
        duration: "",
        level: "Beginner",
        thumbnail: "",
      });

      setShowCreateForm(false);

    } catch (error) {
      const responseErrors =
        error.response?.data?.errors;

      if (responseErrors?.length > 0) {
        setError(
          responseErrors
            .map((err) => err.msg)
            .join(", ")
        );
      } else {
        setError(
          error.response?.data?.message ||
            "Failed to create course"
        );
      }

    } finally {
      setLoading(false);
    }
  };

  const handleGetMyCourses = async () => {
    setCoursesLoading(true);
    setCoursesError("");

    setShowMyStudents(false);

    try {
      const response = await api.get(
        "/courses/my-courses"
      );

      setCourses(response.data.courses || []);

      setShowMyCourses(true);

    } catch (error) {
      setCoursesError(
        error.response?.data?.message ||
          "Failed to load courses"
      );

    } finally {
      setCoursesLoading(false);
    }
  };

  const handleGetMyStudents = async () => {
    setStudentsLoading(true);
    setStudentsError("");

    setShowMyCourses(false);
    setEditingCourse(null);

    try {
      const response = await api.get(
        "/courses/my-students"
      );

      setStudents(
        response.data.students || []
      );

      setShowMyStudents(true);

    } catch (error) {
      setStudentsError(
        error.response?.data?.message ||
          "Failed to load students"
      );

    } finally {
      setStudentsLoading(false);
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);

    setEditFormData({
      title: course.title || "",
      description: course.description || "",
      category: course.category || "",
      duration: course.duration || "",
      level: course.level || "Beginner",
      thumbnail: course.thumbnail || "",
      isPublished: course.isPublished,
    });

    setError("");
    setMessage("");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();

    setEditLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await api.put(
        `/courses/${editingCourse._id}`,
        editFormData
      );

      const updatedCourse =
        response.data.course;

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === updatedCourse._id
            ? updatedCourse
            : course
        )
      );

      setMessage(
        response.data.message ||
          "Course updated successfully"
      );

      setEditingCourse(null);

    } catch (error) {
      const responseErrors =
        error.response?.data?.errors;

      if (responseErrors?.length > 0) {
        setError(
          responseErrors
            .map((err) => err.msg)
            .join(", ")
        );
      } else {
        setError(
          error.response?.data?.message ||
            "Failed to update course"
        );
      }

    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(
        `/courses/${courseId}`
      );

      setCourses((prevCourses) =>
        prevCourses.filter(
          (course) =>
            course._id !== courseId
        )
      );

      setMessage(
        "Course deleted successfully"
      );

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete course"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-purple-600 text-white shadow">

        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold">
              Teacher Dashboard
            </h1>

            <p className="text-purple-100 mt-1">
              Welcome, {user?.name}
            </p>

          </div>

          <button
            onClick={logout}
            className="bg-white text-purple-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100"
          >
            Logout
          </button>

        </div>

      </header>

      <main className="max-w-7xl mx-auto p-8">

        {message && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {showCreateForm && (

          <div className="bg-white rounded-xl shadow p-8 mb-8">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-purple-600">
                Create New Course
              </h2>

              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setError("");
                }}
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={handleCreateCourse}
              className="space-y-5"
            >

              <div>

                <label className="block font-semibold mb-2">
                  Course Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter course title"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter course description"
                  rows="4"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Example: Web Development"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Duration
                </label>

                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Example: 8 weeks"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Level
                </label>

                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-500"
                >

                  <option value="Beginner">
                    Beginner
                  </option>

                  <option value="Intermediate">
                    Intermediate
                  </option>

                  <option value="Advanced">
                    Advanced
                  </option>

                </select>

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Thumbnail URL
                </label>

                <input
                  type="text"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  placeholder="Enter image URL (optional)"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
              >
                {loading
                  ? "Creating Course..."
                  : "Create Course"}
              </button>

            </form>

          </div>

        )}


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              Create Course
            </h2>

            <p className="text-gray-600 mb-6">
              Create and publish new courses.
            </p>

            <button
              onClick={() => {
                setShowCreateForm(true);
                setError("");
                setShowMyStudents(false);
              }}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
            >
              Create Course
            </button>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              My Courses
            </h2>

            <p className="text-gray-600 mb-6">
              View and manage your courses.
            </p>

            <button
              onClick={handleGetMyCourses}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
            >
              View My Courses
            </button>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              My Students
            </h2>

            <p className="text-gray-600 mb-6">
              View enrolled students.
            </p>

            <button
              onClick={handleGetMyStudents}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              View Students
            </button>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              Analytics
            </h2>

            <p className="text-gray-600 mb-6">
              Course performance and statistics.
            </p>

            <button
              disabled
              className="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed"
            >
              Coming Soon
            </button>

          </div>

        </div>

        {showMyCourses && (

          <div className="mt-10 bg-white rounded-xl shadow p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-purple-600">
                My Courses
              </h2>

              <button
                onClick={() =>
                  setShowMyCourses(false)
                }
                className="text-gray-500 hover:text-gray-800"
              >
                Close
              </button>

            </div>

            {coursesLoading && (
              <p className="text-gray-600">
                Loading courses...
              </p>
            )}

            {coursesError && (
              <p className="text-red-600">
                {coursesError}
              </p>
            )}

            {!coursesLoading &&
              !coursesError &&
              courses.length === 0 && (

                <p className="text-gray-600">
                  You haven't created any courses yet.
                </p>

            )}

            {!coursesLoading &&
              courses.length > 0 && (

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {courses.map((course) => (

                    <div
                      key={course._id}
                      className="border rounded-xl p-5"
                    >

                      {course.thumbnail && (

                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />

                      )}

                      <h3 className="text-xl font-bold mb-2">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 mb-3">
                        {course.description}
                      </p>

                      <div className="space-y-1 text-sm">

                        <p>
                          <strong>
                            Category:
                          </strong>{" "}
                          {course.category}
                        </p>

                        <p>
                          <strong>
                            Duration:
                          </strong>{" "}
                          {course.duration}
                        </p>

                        <p>
                          <strong>
                            Level:
                          </strong>{" "}
                          {course.level}
                        </p>

                        <p>
                          <strong>
                            Students:
                          </strong>{" "}
                          {course.students?.length || 0}
                        </p>

                        <p>
                          <strong>
                            Published:
                          </strong>{" "}
                          {course.isPublished
                            ? "Yes"
                            : "No"}
                        </p>

                      </div>

                      <div className="flex gap-3 mt-5">

                        <button
                          onClick={() =>
                            handleEditCourse(course)
                          }
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteCourse(
                              course._id
                            )
                          }
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

            )}

          </div>

        )}

        {showMyStudents && (

          <div className="mt-10 bg-white rounded-xl shadow p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-green-600">
                My Students
              </h2>

              <button
                onClick={() =>
                  setShowMyStudents(false)
                }
                className="text-gray-500 hover:text-gray-800"
              >
                Close
              </button>

            </div>

            {studentsLoading && (

              <p className="text-gray-600">
                Loading students...
              </p>

            )}

            {studentsError && (

              <p className="text-red-600">
                {studentsError}
              </p>

            )}

            {!studentsLoading &&
              !studentsError &&
              students.length === 0 && (

                <p className="text-gray-600">
                  No students have enrolled in your courses yet.
                </p>

            )}

            {!studentsLoading &&
              !studentsError &&
              students.length > 0 && (

                <div className="overflow-x-auto">

                  <table className="w-full border-collapse">

                    <thead>

                      <tr className="bg-gray-100">

                        <th className="text-left p-4 border">
                          Name
                        </th>

                        <th className="text-left p-4 border">
                          Email
                        </th>

                        <th className="text-left p-4 border">
                          Phone
                        </th>

                        <th className="text-left p-4 border">
                          Enrolled Courses
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {students.map((student) => (

                        <tr
                          key={student._id}
                          className="hover:bg-gray-50"
                        >

                          <td className="p-4 border font-semibold">
                            {student.name}
                          </td>

                          <td className="p-4 border">
                            {student.email}
                          </td>

                          <td className="p-4 border">
                            {student.phone || "N/A"}
                          </td>

                          <td className="p-4 border">

                            <div className="flex flex-wrap gap-2">

                              {student.enrolledCourses?.map(
                                (course, index) => (

                                  <span
                                    key={index}
                                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                                  >
                                    {course}
                                  </span>

                                )
                              )}

                            </div>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

            )}

          </div>

        )}

        {editingCourse && (

          <div className="mt-10 bg-white rounded-xl shadow p-8">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-blue-600">
                Edit Course
              </h2>

              <button
                onClick={() =>
                  setEditingCourse(null)
                }
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={handleUpdateCourse}
              className="space-y-5"
            >

              <div>

                <label className="block font-semibold mb-2">
                  Course Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  rows="4"
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Duration
                </label>

                <input
                  type="text"
                  name="duration"
                  value={editFormData.duration}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Level
                </label>

                <select
                  name="level"
                  value={editFormData.level}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg p-3"
                >

                  <option value="Beginner">
                    Beginner
                  </option>

                  <option value="Intermediate">
                    Intermediate
                  </option>

                  <option value="Advanced">
                    Advanced
                  </option>

                </select>

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Thumbnail URL
                </label>

                <input
                  type="text"
                  name="thumbnail"
                  value={editFormData.thumbnail}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={editFormData.isPublished}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      isPublished:
                        e.target.checked,
                    })
                  }
                  className="w-5 h-5"
                />

                <label className="font-semibold">
                  Publish Course
                </label>

              </div>

              <div className="flex gap-4">

                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {editLoading
                    ? "Updating..."
                    : "Update Course"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setEditingCourse(null)
                  }
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        )}

        <div className="mt-10 bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            Account Information
          </h2>

          <div className="space-y-3">

            <p>
              <strong>Name:</strong>{" "}
              {user?.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {user?.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {user?.phone}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {user?.role}
            </p>

            <p>
              <strong>Status:</strong>{" "}

              <span className="text-green-600 font-semibold">
                Approved Teacher
              </span>

            </p>

          </div>

        </div>

      </main>

    </div>
  );
};

export default TeacherDashboard;