import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
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

      {/* Main */}
      <main className="max-w-7xl mx-auto p-8">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Create Course */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              Create Course
            </h2>

            <p className="text-gray-600 mb-6">
              Create and publish new courses.
            </p>

            <button
              disabled
              className="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed"
            >
              Coming Soon
            </button>

          </div>

          {/* My Courses */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              My Courses
            </h2>

            <p className="text-gray-600 mb-6">
              View and manage your courses.
            </p>

            <button
              disabled
              className="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed"
            >
              Coming Soon
            </button>

          </div>

          {/* Students */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              My Students
            </h2>

            <p className="text-gray-600 mb-6">
              View enrolled students.
            </p>

            <button
              disabled
              className="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed"
            >
              Coming Soon
            </button>

          </div>

          {/* Analytics */}
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

        {/* Teacher Status */}
        <div className="mt-10 bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            Account Information
          </h2>

          <div className="space-y-3">

            <p>
              <strong>Name:</strong> {user?.name}
            </p>

            <p>
              <strong>Email:</strong> {user?.email}
            </p>

            <p>
              <strong>Phone:</strong> {user?.phone}
            </p>

            <p>
              <strong>Role:</strong> {user?.role}
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