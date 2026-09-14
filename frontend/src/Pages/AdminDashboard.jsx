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

      <header className="bg-purple-600 text-white px-8 py-5 shadow">

        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold">
              Admin Dashboard
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              Teacher Applications
            </h2>

            <p className="text-gray-600 mb-6">
              Review, approve, or reject teacher applications.
            </p>

            <button
              onClick={() => navigate("/admin/applications")}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
            >
              View Applications
            </button>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              Students
            </h2>

            <p className="text-gray-600 mb-6">
              View and manage registered students.
            </p>

            <button
              onClick={() => navigate("/admin/students")}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
            >
              View Students
            </button>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              Teachers
            </h2>

            <p className="text-gray-600 mb-6">
              View approved teachers.
            </p>

            <button
              onClick={() => navigate("/admin/teachers")}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
            >
              View Teachers
            </button>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              Courses
            </h2>

            <p className="text-gray-600 mb-6">
              Manage all courses on the platform.
            </p>

            <button
              onClick={() => navigate("/admin/courses")}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
            >
              Manage Courses
            </button>

          </div>

        </div>

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
              {user?.phone || "N/A"}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {user?.role}
            </p>

          </div>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;