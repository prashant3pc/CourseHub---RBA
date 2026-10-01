import { useState } from "react";
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
      const response = await api.get("/courses/published");

      setCourses(response.data.courses || []);
      setShowCourses(true);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const viewCourse = async (courseId) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await api.get(`/courses/${courseId}`);

      setSelectedCourse(response.data.course);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const enrollCourse = async (courseId) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await api.post(`/courses/${courseId}/enroll`);

      setMessage(response.data.message || "Successfully enrolled in course");

      const courseResponse = await api.get(`/courses/${courseId}`);

      setSelectedCourse(courseResponse.data.course);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to enroll in course");
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
      const response = await api.get("/courses/my-enrolled");

      setMyCourses(response.data.courses || []);
      setShowMyCourses(true);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load your courses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ff]">
      {/* ================= SIDEBAR ================= */}
      <aside className="fixed left-0 top-0 bottom-0 hidden lg:flex w-64 bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white flex-col z-50">
        {/* Logo */}
        <div className="px-7 py-7 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center text-xl font-bold shadow-lg">
              C
            </div>

            <div>
              <h1 className="text-xl font-bold">CourseHub</h1>

              <p className="text-xs text-purple-300">Learning Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-4 py-8 flex-1">
          <p className="px-4 text-[11px] font-bold uppercase tracking-widest text-purple-300 mb-4">
            Main Menu
          </p>

          <button
            onClick={() => {
              setShowCourses(false);
              setShowMyCourses(false);
              setSelectedCourse(null);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white font-medium mb-2"
          >
            <span className="text-lg">⌂</span>
            Dashboard
          </button>

          <button
            onClick={browseCourses}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200 hover:bg-white/10 hover:text-white transition mb-2"
          >
            <span className="text-lg">▣</span>
            Browse Courses
          </button>

          <button
            onClick={getMyCourses}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200 hover:bg-white/10 hover:text-white transition mb-2"
          >
            <span className="text-lg">▤</span>
            My Courses
          </button>

          <button
            onClick={() => navigate("/become-teacher")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200 hover:bg-white/10 hover:text-white transition"
          >
            <span className="text-lg">♙</span>
            Become a Teacher
          </button>
        </div>

        {/* User */}
        <div className="p-5 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-400/30 border border-purple-300/30 flex items-center justify-center font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "S"}
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{user?.name}</p>

              <p className="text-xs text-purple-300">Student</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-sm font-semibold transition"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="lg:ml-64">
        {/* ================= TOP BAR ================= */}
        <header className="bg-white/90 backdrop-blur border-b border-purple-100 sticky top-0 z-40">
          <div className="px-6 md:px-10 h-20 flex items-center justify-between">
            <div>
              <p className="text-xl font-bold uppercase tracking-widest text-purple-500">
                Student Portal
              </p>

              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.name}
                </p>

                <p className="text-xs text-gray-400">Student Account</p>
              </div>

              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-purple-200">
                {user?.name?.charAt(0)?.toUpperCase() || "S"}
              </div>
            </div>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <main className="p-6 md:p-10 max-w-[1500px] mx-auto">
          {/* ================= HERO ================= */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 text-white p-8 md:p-10 mb-8 shadow-2xl shadow-purple-200">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>

            <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-indigo-400/20 rounded-full translate-y-1/2"></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-purple-100 text-xs font-semibold mb-5">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  You're ready to learn
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Welcome back, {user?.name?.split(" ")[0] || "Student"}!
                </h2>

                <p className="text-purple-100 text-base md:text-lg leading-relaxed">
                  Explore new courses, continue your learning journey, and build
                  skills that move you forward.
                </p>
              </div>

              <div className="hidden md:flex w-32 h-32 rounded-3xl bg-white/10 border border-white/10 items-center justify-center backdrop-blur">
                <span className="text-6xl">🎓</span>
              </div>
            </div>
          </section>

          {/* ================= ALERTS ================= */}
          {message && (
            <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-2xl shadow-sm">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center font-bold">
                ✓
              </div>

              <p className="text-sm font-semibold">{message}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-2xl shadow-sm">
              <p className="text-sm font-semibold">{error}</p>
            </div>
          )}

          {/* ================= STATS ================= */}
          <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-medium">
                    Enrolled Courses
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {myCourses.length}
                  </p>

                  <p className="text-xs text-purple-600 font-semibold mt-2">
                    Your learning
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                  📚
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-medium">
                    Available Courses
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {courses.length}
                  </p>

                  <p className="text-xs text-indigo-600 font-semibold mt-2">
                    Explore now
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl">
                  🔎
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-medium">
                    Account Type
                  </p>

                  <p className="text-xl font-bold text-gray-900 mt-3">
                    Student
                  </p>

                  <p className="text-xs text-green-600 font-semibold mt-2">
                    Active account
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl">
                  ✓
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-medium">
                    Learning Status
                  </p>

                  <p className="text-xl font-bold text-gray-900 mt-3">Active</p>

                  <p className="text-xs text-purple-600 font-semibold mt-2">
                    Keep learning
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                  ⚡
                </div>
              </div>
            </div>
          </section>

          {/* ================= ACTION CARDS ================= */}
          <section className="grid lg:grid-cols-3 gap-6 mb-10">
            {/* Profile */}
            <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-7">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-purple-200">
                  {user?.name?.charAt(0)?.toUpperCase() || "S"}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    My Profile
                  </h3>

                  <p className="text-sm text-gray-400">Personal information</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Full Name
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {user?.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Email
                  </p>

                  <p className="font-semibold text-gray-800 mt-1 break-all">
                    {user?.email}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Phone
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {user?.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Course
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {user?.course}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Become Teacher */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-7 shadow-lg shadow-purple-100">
              <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-white/10"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-2xl mb-6">
                  🎓
                </div>

                <h3 className="text-xl font-bold mb-3">Become a Teacher</h3>

                <p className="text-purple-100 text-sm leading-relaxed mb-7">
                  Share your knowledge, create courses, and help other students
                  learn.
                </p>

                <button
                  onClick={() => navigate("/become-teacher")}
                  className="w-full bg-white text-purple-700 py-3 rounded-xl font-bold hover:bg-purple-50 transition shadow-lg"
                >
                  Apply as Teacher →
                </button>
              </div>
            </div>

            {/* Learning */}
            <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-7">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-purple-500">
                    Learning Center
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-1">
                    My Learning
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
                  📖
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-7">
                Discover new courses or access the courses you've already
                enrolled in.
              </p>

              <button
                onClick={browseCourses}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition mb-3 shadow-md shadow-purple-100"
              >
                Explore Courses
              </button>

              <button
                onClick={getMyCourses}
                className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 py-3 rounded-xl font-bold transition"
              >
                View My Courses
              </button>
            </div>
          </section>

          {/* ================= AVAILABLE COURSES ================= */}
          {showCourses && (
            <section className="mb-8">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-1">
                    Course Library
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Explore Courses
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setShowCourses(false);
                    setSelectedCourse(null);
                  }}
                  className="text-sm font-semibold text-gray-500 hover:text-purple-600"
                >
                  Close
                </button>
              </div>

              {loading && (
                <div className="bg-white rounded-2xl p-12 text-center border border-purple-100">
                  <p className="text-gray-500">Loading courses...</p>
                </div>
              )}

              {!loading && courses.length === 0 && (
                <div className="bg-white rounded-2xl p-12 text-center border border-purple-100">
                  <div className="text-5xl mb-4">📚</div>

                  <p className="text-gray-500">No courses available.</p>
                </div>
              )}

              {!loading && courses.length > 0 && (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div
                      key={course._id}
                      className="group bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                          <span className="text-5xl">📚</span>
                        </div>
                      )}

                      <div className="p-6">
                        <div className="flex gap-2 mb-4">
                          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                            {course.category}
                          </span>

                          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                            {course.level}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {course.title}
                        </h3>

                        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                          {course.description}
                        </p>

                        <div className="border-t border-gray-100 pt-4 mb-5">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Duration</span>

                            <span className="font-semibold text-gray-700">
                              {course.duration}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Instructor</span>

                            <span className="font-semibold text-gray-700">
                              {course.teacher?.name || "Unknown"}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => viewCourse(course._id)}
                          className="w-full bg-gray-900 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition"
                        >
                          View Course
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ================= COURSE DETAILS ================= */}
          {selectedCourse && (
            <section className="bg-white rounded-3xl border border-purple-100 shadow-xl overflow-hidden mb-8">
              <div className="relative">
                {selectedCourse.thumbnail ? (
                  <img
                    src={selectedCourse.thumbnail}
                    alt={selectedCourse.title}
                    className="w-full h-72 md:h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-72 md:h-96 bg-gradient-to-br from-purple-700 to-indigo-800 flex items-center justify-center">
                    <span className="text-7xl">📚</span>
                  </div>
                )}

                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-5 right-5 px-4 py-2 rounded-xl bg-black/50 backdrop-blur text-white text-sm font-semibold hover:bg-black/70 transition"
                >
                  Close
                </button>
              </div>

              <div className="p-7 md:p-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                    {selectedCourse.category}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                    {selectedCourse.level}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {selectedCourse.title}
                </h2>

                <p className="text-gray-500 leading-relaxed max-w-4xl mb-8">
                  {selectedCourse.description}
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-purple-50 rounded-2xl p-5">
                    <p className="text-xs text-purple-500 font-bold uppercase">
                      Category
                    </p>

                    <p className="font-bold text-gray-800 mt-2">
                      {selectedCourse.category}
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-2xl p-5">
                    <p className="text-xs text-purple-500 font-bold uppercase">
                      Duration
                    </p>

                    <p className="font-bold text-gray-800 mt-2">
                      {selectedCourse.duration}
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-2xl p-5">
                    <p className="text-xs text-purple-500 font-bold uppercase">
                      Level
                    </p>

                    <p className="font-bold text-gray-800 mt-2">
                      {selectedCourse.level}
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-2xl p-5">
                    <p className="text-xs text-purple-500 font-bold uppercase">
                      Instructor
                    </p>

                    <p className="font-bold text-gray-800 mt-2">
                      {selectedCourse.teacher?.name || "Unknown"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => enrollCourse(selectedCourse._id)}
                  disabled={loading}
                  className="w-full md:w-auto px-12 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-bold transition shadow-lg shadow-purple-200"
                >
                  {loading ? "Processing..." : "Enroll in Course"}
                </button>
              </div>
            </section>
          )}

          {/* ================= MY COURSES ================= */}
          {showMyCourses && (
            <section className="mb-8">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-1">
                    Your Learning
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    My Enrolled Courses
                  </h2>
                </div>

                <button
                  onClick={() => setShowMyCourses(false)}
                  className="text-sm font-semibold text-gray-500 hover:text-purple-600"
                >
                  Close
                </button>
              </div>

              {loading && (
                <div className="bg-white rounded-2xl p-12 text-center border border-purple-100">
                  <p className="text-gray-500">Loading your courses...</p>
                </div>
              )}

              {!loading && myCourses.length === 0 && (
                <div className="bg-white rounded-3xl p-14 text-center border border-purple-100 shadow-sm">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-purple-100 flex items-center justify-center text-4xl mb-5">
                    📚
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No courses yet
                  </h3>

                  <p className="text-gray-500 mb-6">
                    Start your learning journey by exploring available courses.
                  </p>

                  <button
                    onClick={browseCourses}
                    className="px-7 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition"
                  >
                    Browse Courses →
                  </button>
                </div>
              )}

              {!loading && myCourses.length > 0 && (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {myCourses.map((course) => (
                    <div
                      key={course._id}
                      className="bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-xl transition"
                    >
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                          <span className="text-5xl">📚</span>
                        </div>
                      )}

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold">
                            ✓ Enrolled
                          </span>

                          <span className="text-xs text-gray-400">Course</span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {course.title}
                        </h3>

                        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                          {course.description}
                        </p>

                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                          <div>
                            <p className="text-xs text-gray-400">Instructor</p>

                            <p className="text-sm font-semibold text-gray-700 mt-1">
                              {course.teacher?.name || "Unknown"}
                            </p>
                          </div>

                          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                            →
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
