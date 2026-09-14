import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  const [showCourses, setShowCourses] = useState(false);
  const [showMyCourses, setShowMyCourses] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const browseCourses = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    setSelectedCourse(null);
    setShowMyCourses(false);

    try {
      const response = await api.get(
        "/courses/published"
      );

      setCourses(response.data.courses || []);
      setShowCourses(true);

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load courses"
      );
    } finally {
      setLoading(false);
    }
  };

  const viewCourse = async (courseId) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await api.get(
        `/courses/${courseId}`
      );

      setSelectedCourse(response.data.course);

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load course"
      );
    } finally {
      setLoading(false);
    }
  };

  const enrollCourse = async (courseId) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await api.post(
        `/courses/${courseId}/enroll`
      );

      setMessage(
        response.data.message ||
          "Successfully enrolled in course"
      );

      const courseResponse = await api.get(
        `/courses/${courseId}`
      );

      setSelectedCourse(
        courseResponse.data.course
      );

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to enroll in course"
      );
    } finally {
      setLoading(false);
    }
  };

  const getMyCourses = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    setSelectedCourse(null);
    setShowCourses(false);

    try {
      const response = await api.get(
        "/courses/my-enrolled"
      );

      setMyCourses(response.data.courses || []);
      setShowMyCourses(true);

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load your courses"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-purple-600 text-white px-8 py-5 flex justify-between items-center shadow">

        <div>
          <h1 className="text-2xl font-bold">
            Student Dashboard
          </h1>

          <p className="text-purple-100">
            Welcome, {user?.name}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-white text-purple-600 px-5 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>

      </header>

      <main className="max-w-6xl mx-auto p-8">

        {message && (
          <div className="mb-6 bg-green-100 text-green-700 px-5 py-4 rounded-lg">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-100 text-red-700 px-5 py-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">
              My Profile
            </h2>

            <p>
              <strong>Name:</strong>{" "}
              {user?.name}
            </p>

            <p className="mt-2">
              <strong>Email:</strong>{" "}
              {user?.email}
            </p>

            <p className="mt-2">
              <strong>Phone:</strong>{" "}
              {user?.phone}
            </p>

            <p className="mt-2">
              <strong>Course:</strong>{" "}
              {user?.course}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">
              Become a Teacher
            </h2>

            <p className="text-gray-600 mb-6">
              Apply to become a teacher and start
              creating your own courses.
            </p>

            <button
              onClick={() =>
                navigate("/become-teacher")
              }
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
            >
              Apply Now
            </button>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">
              My Courses
            </h2>

            <p className="text-gray-600 mb-6">
              Browse and enroll in courses.
            </p>

            <div className="space-y-3">

              <button
                onClick={browseCourses}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
              >
                Browse Courses
              </button>

              <button
                onClick={getMyCourses}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
              >
                My Enrolled Courses
              </button>

            </div>

          </div>

        </div>

        {showCourses && (
          <div className="mt-8 bg-white rounded-xl shadow p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-blue-600">
                Available Courses
              </h2>

              <button
                onClick={() => {
                  setShowCourses(false);
                  setSelectedCourse(null);
                }}
                className="text-gray-500 hover:text-gray-800"
              >
                Close
              </button>

            </div>

            {loading && (
              <p className="text-gray-600">
                Loading courses...
              </p>
            )}

            {!loading &&
              courses.length === 0 && (
                <p className="text-gray-600">
                  No courses available.
                </p>
              )}

            {!loading &&
              courses.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {courses.map((course) => (
                    <div
                      key={course._id}
                      className="border rounded-xl p-5 hover:shadow-lg transition"
                    >
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                      ) : (
                        <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}

                      <h3 className="text-xl font-bold mb-2">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 mb-4">
                        {course.description}
                      </p>

                      <div className="text-sm space-y-1 mb-5">

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
                            Teacher:
                          </strong>{" "}
                          {course.teacher?.name ||
                            "Unknown"}
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          viewCourse(course._id)
                        }
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                      >
                        View Details
                      </button>

                    </div>
                  ))}

                </div>
              )}

          </div>
        )}

        {selectedCourse && (
          <div className="mt-8 bg-white rounded-xl shadow p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-blue-600">
                Course Details
              </h2>

              <button
                onClick={() =>
                  setSelectedCourse(null)
                }
                className="text-gray-500 hover:text-gray-800"
              >
                Close
              </button>

            </div>

            {selectedCourse.thumbnail ? (
              <img
                src={selectedCourse.thumbnail}
                alt={selectedCourse.title}
                className="w-full max-h-80 object-cover rounded-xl mb-6"
              />
            ) : (
              <div className="w-full h-60 bg-gray-200 rounded-xl mb-6 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            <h3 className="text-3xl font-bold mb-4">
              {selectedCourse.title}
            </h3>

            <p className="text-gray-700 mb-6">
              {selectedCourse.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">

              <div className="bg-gray-50 p-4 rounded-lg">
                <strong>Category</strong>
                <p className="text-gray-600">
                  {selectedCourse.category}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <strong>Duration</strong>
                <p className="text-gray-600">
                  {selectedCourse.duration}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <strong>Level</strong>
                <p className="text-gray-600">
                  {selectedCourse.level}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <strong>Teacher</strong>
                <p className="text-gray-600">
                  {selectedCourse.teacher?.name ||
                    "Unknown"}
                </p>
              </div>

            </div>

            <button
              onClick={() =>
                enrollCourse(
                  selectedCourse._id
                )
              }
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold"
            >
              {loading
                ? "Processing..."
                : "Enroll in Course"}
            </button>

          </div>
        )}

        {showMyCourses && (
          <div className="mt-8 bg-white rounded-xl shadow p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-green-600">
                My Enrolled Courses
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

            {loading && (
              <p className="text-gray-600">
                Loading your courses...
              </p>
            )}

            {!loading &&
              myCourses.length === 0 && (
                <p className="text-gray-600">
                  You have not enrolled in any courses yet.
                </p>
              )}

            {!loading &&
              myCourses.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {myCourses.map((course) => (
                    <div
                      key={course._id}
                      className="border rounded-xl p-5"
                    >

                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                      ) : (
                        <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}

                      <h3 className="text-xl font-bold mb-2">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 mb-4">
                        {course.description}
                      </p>

                      <p className="text-sm">
                        <strong>
                          Teacher:
                        </strong>{" "}
                        {course.teacher?.name ||
                          "Unknown"}
                      </p>

                      <div className="mt-5 bg-green-100 text-green-700 text-center py-2 rounded-lg font-semibold">
                        Enrolled
                      </div>

                    </div>
                  ))}

                </div>
              )}

          </div>
        )}

      </main>

    </div>
  );
};

export default StudentDashboard;