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
      const response = await api.post("/courses", formData);

      setMessage(response.data.message || "Course created successfully");

      if (response.data.course) {
        setCourses((prevCourses) => [response.data.course, ...prevCourses]);
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
      const responseErrors = error.response?.data?.errors;

      if (responseErrors?.length > 0) {
        setError(responseErrors.map((err) => err.msg).join(", "));
      } else {
        setError(error.response?.data?.message || "Failed to create course");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGetMyCourses = async () => {
    setCoursesLoading(true);
    setCoursesError("");
    setMessage("");
    setError("");

    setShowMyStudents(false);
    setEditingCourse(null);

    try {
      const response = await api.get("/courses/my-courses");

      setCourses(response.data.courses || []);
      setShowMyCourses(true);
    } catch (error) {
      setCoursesError(
        error.response?.data?.message || "Failed to load courses",
      );
    } finally {
      setCoursesLoading(false);
    }
  };

  const handleGetMyStudents = async () => {
    setStudentsLoading(true);
    setStudentsError("");
    setMessage("");
    setError("");

    setShowMyCourses(false);
    setEditingCourse(null);

    try {
      const response = await api.get("/courses/my-students");

      setStudents(response.data.students || []);
      setShowMyStudents(true);
    } catch (error) {
      setStudentsError(
        error.response?.data?.message || "Failed to load students",
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

    setShowMyStudents(false);
    setShowMyCourses(true);
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
        editFormData,
      );

      const updatedCourse = response.data.course;

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === updatedCourse._id ? updatedCourse : course,
        ),
      );

      setMessage(response.data.message || "Course updated successfully");

      setEditingCourse(null);
    } catch (error) {
      const responseErrors = error.response?.data?.errors;

      if (responseErrors?.length > 0) {
        setError(responseErrors.map((err) => err.msg).join(", "));
      } else {
        setError(error.response?.data?.message || "Failed to update course");
      }
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/courses/${courseId}`);

      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId),
      );

      setMessage("Course deleted successfully");
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete course");
    }
  };

  const goDashboard = () => {
    setShowCreateForm(false);
    setShowMyCourses(false);
    setShowMyStudents(false);
    setEditingCourse(null);
    setMessage("");
    setError("");
  };

  const openCreateCourse = () => {
    setShowCreateForm(true);
    setShowMyCourses(false);
    setShowMyStudents(false);
    setEditingCourse(null);
    setMessage("");
    setError("");
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
            Teacher Menu
          </p>

          <button
            onClick={goDashboard}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white font-medium mb-2"
          >
            <span className="text-lg">⌂</span>
            Dashboard
          </button>

          <button
            onClick={openCreateCourse}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200 hover:bg-white/10 hover:text-white transition mb-2"
          >
            <span className="text-lg">＋</span>
            Create Course
          </button>

          <button
            onClick={handleGetMyCourses}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200 hover:bg-white/10 hover:text-white transition mb-2"
          >
            <span className="text-lg">▤</span>
            My Courses
          </button>

          <button
            onClick={handleGetMyStudents}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200 hover:bg-white/10 hover:text-white transition mb-2"
          >
            <span className="text-lg">♙</span>
            My Students
          </button>

          <button
            disabled
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-purple-400/60 cursor-not-allowed"
          >
            <span className="text-lg">◈</span>
            Analytics
          </button>
        </div>

        {/* User */}

        <div className="p-5 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-400/30 border border-purple-300/30 flex items-center justify-center font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "T"}
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{user?.name}</p>

              <p className="text-xs text-purple-300">Teacher</p>
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
                Teacher Portal
              </p>

              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.name}
                </p>

                <p className="text-xs text-gray-400">Teacher Account</p>
              </div>

              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-purple-200">
                {user?.name?.charAt(0)?.toUpperCase() || "T"}
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
                  Teacher account active
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Welcome back, {user?.name?.split(" ")[0] || "Teacher"}!
                </h2>

                <p className="text-purple-100 text-base md:text-lg leading-relaxed">
                  Create engaging courses, manage your content, and help
                  students build valuable skills.
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
                    My Courses
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {courses.length}
                  </p>

                  <p className="text-xs text-purple-600 font-semibold mt-2">
                    Course library
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
                    My Students
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {students.length}
                  </p>

                  <p className="text-xs text-indigo-600 font-semibold mt-2">
                    Enrolled students
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl">
                  👥
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
                    Teacher
                  </p>

                  <p className="text-xs text-green-600 font-semibold mt-2">
                    Approved account
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
                    Teaching Status
                  </p>

                  <p className="text-xl font-bold text-gray-900 mt-3">Active</p>

                  <p className="text-xs text-purple-600 font-semibold mt-2">
                    Keep teaching
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
                  {user?.name?.charAt(0)?.toUpperCase() || "T"}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    My Profile
                  </h3>

                  <p className="text-sm text-gray-400">Account information</p>
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
                      {user?.phone || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Role
                    </p>

                    <p className="font-semibold text-gray-800 mt-1 capitalize">
                      {user?.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Create Course */}

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-7 shadow-lg shadow-purple-100">
              <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-white/10"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-2xl mb-6">
                  ✨
                </div>

                <h3 className="text-xl font-bold mb-3">Create a Course</h3>

                <p className="text-purple-100 text-sm leading-relaxed mb-7">
                  Share your knowledge, create engaging content, and help
                  students learn new skills.
                </p>

                <button
                  onClick={openCreateCourse}
                  className="w-full bg-white text-purple-700 py-3 rounded-xl font-bold hover:bg-purple-50 transition shadow-lg"
                >
                  Create New Course →
                </button>
              </div>
            </div>

            {/* Teaching Center */}

            <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-7">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-purple-500">
                    Teaching Center
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-1">
                    Manage Learning
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
                  📖
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-7">
                Manage your courses, review enrolled students, and keep your
                teaching content organized.
              </p>

              <button
                onClick={handleGetMyCourses}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition mb-3 shadow-md shadow-purple-100"
              >
                Manage My Courses
              </button>

              <button
                onClick={handleGetMyStudents}
                className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 py-3 rounded-xl font-bold transition"
              >
                View My Students
              </button>
            </div>
          </section>

          {/* ================= CREATE COURSE ================= */}

          {showCreateForm && (
            <section className="bg-white rounded-3xl border border-purple-100 shadow-xl overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-7 md:p-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-purple-200 mb-2">
                      Course Management
                    </p>

                    <h2 className="text-2xl md:text-3xl font-bold">
                      Create New Course
                    </h2>

                    <p className="text-purple-100 text-sm mt-2">
                      Add a new course to your teaching library.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setError("");
                    }}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <form onSubmit={handleCreateCourse} className="p-7 md:p-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Course Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter course title"
                      className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter course description"
                      rows="5"
                      className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Category
                    </label>

                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="Example: Web Development"
                      className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Duration
                    </label>

                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="Example: 8 weeks"
                      className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Level
                    </label>

                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition bg-white"
                    >
                      <option value="Beginner">Beginner</option>

                      <option value="Intermediate">Intermediate</option>

                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Thumbnail URL
                    </label>

                    <input
                      type="text"
                      name="thumbnail"
                      value={formData.thumbnail}
                      onChange={handleChange}
                      placeholder="Enter image URL (optional)"
                      className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3 mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3.5 rounded-xl font-bold transition shadow-lg shadow-purple-100"
                  >
                    {loading ? "Creating Course..." : "Create Course"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setError("");
                    }}
                    className="md:w-40 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl font-bold transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* ================= MY COURSES ================= */}

          {showMyCourses && (
            <section className="mb-8">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-1">
                    Course Library
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    My Courses
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setShowMyCourses(false);
                    setEditingCourse(null);
                  }}
                  className="text-sm font-semibold text-gray-500 hover:text-purple-600 transition"
                >
                  Close
                </button>
              </div>

              {coursesLoading && (
                <div className="bg-white rounded-2xl p-12 text-center border border-purple-100 shadow-sm">
                  <div className="text-4xl mb-4">📚</div>

                  <p className="text-gray-500">Loading your courses...</p>
                </div>
              )}

              {coursesError && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-5 mb-6">
                  <p className="text-sm font-semibold">{coursesError}</p>
                </div>
              )}

              {!coursesLoading && !coursesError && courses.length === 0 && (
                <div className="bg-white rounded-3xl p-14 text-center border border-purple-100 shadow-sm">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-purple-100 flex items-center justify-center text-4xl mb-5">
                    📚
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No courses yet
                  </h3>

                  <p className="text-gray-500 mb-6">
                    Start teaching by creating your first course.
                  </p>

                  <button
                    onClick={openCreateCourse}
                    className="px-7 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition"
                  >
                    Create Course →
                  </button>
                </div>
              )}

              {!coursesLoading && !coursesError && courses.length > 0 && (
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
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="flex gap-2">
                            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                              {course.category}
                            </span>

                            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                              {course.level}
                            </span>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              course.isPublished
                                ? "bg-green-50 text-green-600"
                                : "bg-yellow-50 text-yellow-600"
                            }`}
                          >
                            {course.isPublished ? "Published" : "Draft"}
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
                            <span className="text-gray-400">Students</span>

                            <span className="font-semibold text-gray-700">
                              {course.students?.length || 0}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEditCourse(course)}
                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteCourse(course._id)}
                            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl font-bold transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ================= EDIT COURSE ================= */}

          {editingCourse && (
            <section className="bg-white rounded-3xl border border-purple-100 shadow-xl overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-7 md:p-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-purple-200 mb-2">
                      Course Management
                    </p>

                    <h2 className="text-2xl md:text-3xl font-bold">
                      Edit Course
                    </h2>

                    <p className="text-purple-100 text-sm mt-2">
                      Update your course information and publishing status.
                    </p>
                  </div>

                  <button
                    onClick={() => setEditingCourse(null)}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <form onSubmit={handleUpdateCourse} className="p-7 md:p-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Course Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditChange}
                      className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditChange}
                      rows="5"
                      className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Category
                    </label>

                    <input
                      type="text"
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditChange}
                      className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Duration
                    </label>

                    <input
                      type="text"
                      name="duration"
                      value={editFormData.duration}
                      onChange={handleEditChange}
                      className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Level
                    </label>

                    <select
                      name="level"
                      value={editFormData.level}
                      onChange={handleEditChange}
                      className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition bg-white"
                    >
                      <option value="Beginner">Beginner</option>

                      <option value="Intermediate">Intermediate</option>

                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Thumbnail URL
                    </label>

                    <input
                      type="text"
                      name="thumbnail"
                      value={editFormData.thumbnail}
                      onChange={handleEditChange}
                      className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3 bg-purple-50 border border-purple-100 rounded-xl p-4">
                      <input
                        type="checkbox"
                        checked={editFormData.isPublished}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            isPublished: e.target.checked,
                          })
                        }
                        className="w-5 h-5 accent-purple-600"
                      />

                      <div>
                        <label className="font-bold text-gray-800">
                          Publish Course
                        </label>

                        <p className="text-xs text-gray-500 mt-1">
                          Published courses can be discovered by students.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3 mt-8">
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3.5 rounded-xl font-bold transition shadow-lg shadow-purple-100"
                  >
                    {editLoading ? "Updating..." : "Update Course"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingCourse(null)}
                    className="md:w-40 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl font-bold transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* ================= MY STUDENTS ================= */}

          {showMyStudents && (
            <section className="mb-8">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-1">
                    Your Students
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    My Students
                  </h2>
                </div>

                <button
                  onClick={() => setShowMyStudents(false)}
                  className="text-sm font-semibold text-gray-500 hover:text-purple-600 transition"
                >
                  Close
                </button>
              </div>

              {studentsLoading && (
                <div className="bg-white rounded-2xl p-12 text-center border border-purple-100 shadow-sm">
                  <div className="text-4xl mb-4">👥</div>

                  <p className="text-gray-500">Loading students...</p>
                </div>
              )}

              {studentsError && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-5 mb-6">
                  <p className="text-sm font-semibold">{studentsError}</p>
                </div>
              )}

              {!studentsLoading && !studentsError && students.length === 0 && (
                <div className="bg-white rounded-3xl p-14 text-center border border-purple-100 shadow-sm">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-purple-100 flex items-center justify-center text-4xl mb-5">
                    👥
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No students yet
                  </h3>

                  <p className="text-gray-500">
                    Students who enroll in your courses will appear here.
                  </p>
                </div>
              )}

              {!studentsLoading && !studentsError && students.length > 0 && (
                <div className="bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                        👥
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-900">
                          Enrolled Students
                        </h3>

                        <p className="text-sm text-gray-400">
                          Students enrolled in your courses
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-purple-50/70">
                          <th className="text-left px-6 py-4 text-xs uppercase tracking-wide font-bold text-purple-600">
                            Student
                          </th>

                          <th className="text-left px-6 py-4 text-xs uppercase tracking-wide font-bold text-purple-600">
                            Email
                          </th>

                          <th className="text-left px-6 py-4 text-xs uppercase tracking-wide font-bold text-purple-600">
                            Phone
                          </th>

                          <th className="text-left px-6 py-4 text-xs uppercase tracking-wide font-bold text-purple-600">
                            Enrolled Courses
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {students.map((student) => (
                          <tr
                            key={student._id}
                            className="border-t border-gray-100 hover:bg-purple-50/30 transition"
                          >
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold">
                                  {student.name?.charAt(0)?.toUpperCase() ||
                                    "S"}
                                </div>

                                <span className="font-semibold text-gray-800">
                                  {student.name}
                                </span>
                              </div>
                            </td>

                            <td className="px-6 py-5 text-sm text-gray-600">
                              {student.email}
                            </td>

                            <td className="px-6 py-5 text-sm text-gray-600">
                              {student.phone || "N/A"}
                            </td>

                            <td className="px-6 py-5">
                              <div className="flex flex-wrap gap-2">
                                {student.enrolledCourses?.map(
                                  (course, index) => (
                                    <span
                                      key={index}
                                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold"
                                    >
                                      {course}
                                    </span>
                                  ),
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ================= ACCOUNT INFORMATION ================= */}

          <section className="bg-white rounded-3xl border border-purple-100 shadow-sm p-7 md:p-8">
            <div className="flex items-center justify-between mb-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-1">
                  Account
                </p>

                <h2 className="text-2xl font-bold text-gray-900">
                  Account Information
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                👤
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-purple-50 rounded-2xl p-5">
                <p className="text-xs text-purple-500 font-bold uppercase">
                  Name
                </p>

                <p className="font-bold text-gray-800 mt-2">{user?.name}</p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-5">
                <p className="text-xs text-purple-500 font-bold uppercase">
                  Email
                </p>

                <p className="font-bold text-gray-800 mt-2 break-all">
                  {user?.email}
                </p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-5">
                <p className="text-xs text-purple-500 font-bold uppercase">
                  Phone
                </p>

                <p className="font-bold text-gray-800 mt-2">
                  {user?.phone || "N/A"}
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-5">
                <p className="text-xs text-green-600 font-bold uppercase">
                  Status
                </p>

                <p className="font-bold text-green-700 mt-2">
                  Approved Teacher
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
