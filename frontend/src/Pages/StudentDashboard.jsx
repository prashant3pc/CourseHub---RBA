import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
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

      {/* Main */}
      <main className="max-w-6xl mx-auto p-8">

        <div className="grid md:grid-cols-3 gap-6">

          {/* Profile */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">
              My Profile
            </h2>

            <p>
              <strong>Name:</strong> {user?.name}
            </p>

            <p className="mt-2">
              <strong>Email:</strong> {user?.email}
            </p>

            <p className="mt-2">
              <strong>Phone:</strong> {user?.phone}
            </p>

            <p className="mt-2">
              <strong>Course:</strong> {user?.course}
            </p>

          </div>

          {/* Become Teacher */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">
              Become a Teacher
            </h2>

            <p className="text-gray-600 mb-6">
              Apply to become a teacher and start creating your own courses.
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

          {/* Courses */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">
              My Courses
            </h2>

            <p className="text-gray-600 mb-6">
              Browse and enroll in courses.
            </p>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              Browse Courses
            </button>

          </div>

        </div>

      </main>

    </div>
  );
};

export default StudentDashboard;