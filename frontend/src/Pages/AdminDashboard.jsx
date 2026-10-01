import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // ================= CHART DATA =================
  // Temporary data for UI.
  // We will replace this with real API data later.

  const userData = [
    {
      name: "Students",
      count: 45,
    },
    {
      name: "Teachers",
      count: 12,
    },
  ];

  const courseCategoryData = [
    {
      name: "Programming",
      count: 18,
    },
    {
      name: "Web Development",
      count: 14,
    },
    {
      name: "Database",
      count: 9,
    },
    {
      name: "Design",
      count: 7,
    },
    {
      name: "Other",
      count: 5,
    },
  ];

  const courseStatusData = [
    {
      name: "Published",
      value: 32,
    },
    {
      name: "Draft",
      value: 21,
    },
  ];

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
            Admin Menu
          </p>

          <button
            onClick={() => navigate("/admin")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white font-medium mb-2"
          >
            <span className="text-lg">⌂</span>
            Dashboard
          </button>

          <button
            onClick={() => navigate("/admin/applications")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200 hover:bg-white/10 hover:text-white transition mb-2"
          >
            <span className="text-lg">◉</span>
            Teacher Applications
          </button>

          <button
            onClick={() => navigate("/admin/students")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200 hover:bg-white/10 hover:text-white transition mb-2"
          >
            <span className="text-lg">♙</span>
            Students
          </button>

          <button
            onClick={() => navigate("/admin/teachers")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200 hover:bg-white/10 hover:text-white transition mb-2"
          >
            <span className="text-lg">🎓</span>
            Teachers
          </button>

          <button
            onClick={() => navigate("/admin/courses")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200 hover:bg-white/10 hover:text-white transition mb-2"
          >
            <span className="text-lg">▤</span>
            Courses
          </button>
        </div>

        {/* Admin Profile */}

        <div className="p-5 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-400/30 border border-purple-300/30 flex items-center justify-center font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{user?.name}</p>

              <p className="text-xs text-purple-300">Administrator</p>
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
                Administration
              </p>

              <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.name}
                </p>

                <p className="text-xs text-gray-400">Administrator</p>
              </div>

              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-purple-200">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
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
                  Administrator account
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Welcome back, {user?.name?.split(" ")[0] || "Admin"}!
                </h2>

                <p className="text-purple-100 text-base md:text-lg leading-relaxed">
                  Manage CourseHub users, teacher applications, courses, and the
                  overall learning platform.
                </p>
              </div>

              <div className="hidden md:flex w-32 h-32 rounded-3xl bg-white/10 border border-white/10 items-center justify-center backdrop-blur">
                <span className="text-6xl">🛡️</span>
              </div>
            </div>
          </section>

          {/* ================= STATS ================= */}

          <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            {/* Applications */}

            <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-medium">
                    Teacher Applications
                  </p>

                  <p className="text-2xl font-bold text-gray-900 mt-3">
                    Manage
                  </p>

                  <p className="text-xs text-purple-600 font-semibold mt-2">
                    Review applications
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                  ◉
                </div>
              </div>
            </div>

            {/* Students */}

            <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-medium">Students</p>

                  <p className="text-2xl font-bold text-gray-900 mt-3">
                    Manage
                  </p>

                  <p className="text-xs text-indigo-600 font-semibold mt-2">
                    Registered students
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl">
                  👥
                </div>
              </div>
            </div>

            {/* Teachers */}

            <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-medium">Teachers</p>

                  <p className="text-2xl font-bold text-gray-900 mt-3">
                    Manage
                  </p>

                  <p className="text-xs text-purple-600 font-semibold mt-2">
                    Approved teachers
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                  🎓
                </div>
              </div>
            </div>

            {/* Courses */}

            <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-medium">Courses</p>

                  <p className="text-2xl font-bold text-gray-900 mt-3">
                    Manage
                  </p>

                  <p className="text-xs text-green-600 font-semibold mt-2">
                    Platform courses
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl">
                  📚
                </div>
              </div>
            </div>
          </section>

          {/* ================= ANALYTICS ================= */}

          <section className="mb-10">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-1">
                Platform Analytics
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                CourseHub Overview
              </h2>

              <p className="text-gray-500 mt-2">
                A quick visual overview of users and courses across the
                platform.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* ================= USERS CHART ================= */}

              <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Platform Users
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Students compared with teachers
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                    👥
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />

                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />

                      <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />

                      <Tooltip cursor={{ fill: "#f5f3ff" }} />

                      <Bar
                        dataKey="count"
                        name="Users"
                        fill="#7c3aed"
                        radius={[8, 8, 0, 0]}
                        barSize={55}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ================= COURSE CATEGORY ================= */}

              <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Courses by Category
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Distribution of available courses
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    📚
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={courseCategoryData}
                      margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />

                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11 }}
                        interval={0}
                        angle={-15}
                        textAnchor="end"
                        height={60}
                      />

                      <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />

                      <Tooltip cursor={{ fill: "#f5f3ff" }} />

                      <Bar
                        dataKey="count"
                        name="Courses"
                        fill="#6366f1"
                        radius={[8, 8, 0, 0]}
                        barSize={38}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ================= COURSE STATUS ================= */}

              <div className="lg:col-span-2 bg-white rounded-3xl border border-purple-100 shadow-sm p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Course Status
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Published courses compared with drafts
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                    📊
                  </div>
                </div>

                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={courseStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={75}
                        outerRadius={115}
                        paddingAngle={4}
                        dataKey="value"
                        nameKey="name"
                      >
                        <Cell fill="#7c3aed" />
                        <Cell fill="#c4b5fd" />
                      </Pie>

                      <Tooltip />

                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>

          {/* ================= MANAGEMENT CARDS ================= */}

          <section className="mb-10">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-1">
                Platform Management
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Manage CourseHub
              </h2>

              <p className="text-gray-500 mt-2">
                Access the main administrative areas of the platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Teacher Applications */}

              <div className="group bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-7">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition">
                  ◉
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Teacher Applications
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-7">
                  Review, approve, or reject applications submitted by users who
                  want to become teachers.
                </p>

                <button
                  onClick={() => navigate("/admin/applications")}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition shadow-md shadow-purple-100"
                >
                  View Applications →
                </button>
              </div>

              {/* Students */}

              <div className="group bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-7">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition">
                  👥
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Students
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-7">
                  View and manage registered students on the CourseHub learning
                  platform.
                </p>

                <button
                  onClick={() => navigate("/admin/students")}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition shadow-md shadow-purple-100"
                >
                  View Students →
                </button>
              </div>

              {/* Teachers */}

              <div className="group bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-7">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition">
                  🎓
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Teachers
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-7">
                  View approved teachers and manage teacher accounts across the
                  platform.
                </p>

                <button
                  onClick={() => navigate("/admin/teachers")}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition shadow-md shadow-purple-100"
                >
                  View Teachers →
                </button>
              </div>

              {/* Courses */}

              <div className="group bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-7">
                <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl mb-6 group-hover:bg-green-600 group-hover:text-white transition">
                  📚
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Courses
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-7">
                  Manage all courses available on the CourseHub learning
                  platform.
                </p>

                <button
                  onClick={() => navigate("/admin/courses")}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition shadow-md shadow-purple-100"
                >
                  Manage Courses →
                </button>
              </div>
            </div>
          </section>

          {/* ================= QUICK ACCESS ================= */}

          <section className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 to-indigo-800 text-white p-8 shadow-xl shadow-purple-100">
              <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-white/10"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl mb-6">
                  ⚙️
                </div>

                <h2 className="text-2xl font-bold mb-3">
                  Administration Center
                </h2>

                <p className="text-purple-100 leading-relaxed max-w-xl mb-7">
                  Use the management sections above to review users, process
                  teacher applications, and maintain the platform's course
                  catalog.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate("/admin/applications")}
                    className="bg-white text-purple-700 px-5 py-3 rounded-xl font-bold hover:bg-purple-50 transition"
                  >
                    Applications
                  </button>

                  <button
                    onClick={() => navigate("/admin/courses")}
                    className="bg-white/10 border border-white/20 text-white px-5 py-3 rounded-xl font-bold hover:bg-white/20 transition"
                  >
                    Course Management
                  </button>
                </div>
              </div>
            </div>

            {/* Security Card */}

            <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-8">
              <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl mb-6">
                🛡️
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Admin Access
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                You are currently signed in with an administrator account and
                have access to the management areas.
              </p>

              <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl p-4">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>

                <div>
                  <p className="text-sm font-bold text-green-700">
                    Account Active
                  </p>

                  <p className="text-xs text-green-600 mt-0.5">Administrator</p>
                </div>
              </div>
            </div>
          </section>

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
                  Role
                </p>

                <p className="font-bold text-green-700 mt-2 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
