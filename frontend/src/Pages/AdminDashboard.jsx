import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
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
      <header className="bg-purple-600 text-white px-8 py-5 flex justify-between items-center shadow">

        <div>
          <h1 className="text-2xl font-bold">
            Admin Dashboard
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

      {/* Main */}
      <main className="max-w-7xl mx-auto p-8">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Teacher Applications */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              Teacher Applications
            </h2>

            <p className="text-gray-600 mb-6">
              Review, approve, or reject teacher applications.
            </p>

            <button
              onClick={() =>
                navigate("/admin/applications")
              }
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
            >
              View Applications
            </button>

          </div>

          {/* Students */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              Students
            </h2>

            <p className="text-gray-600 mb-6">
              Manage registered students.
            </p>

            <button
              disabled
              className="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed"
            >
              Coming Soon
            </button>

          </div>

          {/* Teachers */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              Teachers
            </h2>

            <p className="text-gray-600 mb-6">
              View approved teachers.
            </p>

            <button
              disabled
              className="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed"
            >
              Coming Soon
            </button>

          </div>

          {/* Courses */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              Courses
            </h2>

            <p className="text-gray-600 mb-6">
              Manage all platform courses.
            </p>

            <button
              disabled
              className="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed"
            >
              Coming Soon
            </button>

          </div>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;