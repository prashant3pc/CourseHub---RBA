import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AdminStudents = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/admin/students");

        setStudents(response.data.students || []);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load students"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-purple-600 text-white px-8 py-5 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold">
              Students
            </h1>

            <p className="text-purple-100">
              Manage registered students
            </p>
          </div>

          <button
            onClick={() => navigate("/admin-dashboard")}
            className="bg-white text-purple-600 px-5 py-2 rounded-lg font-semibold"
          >
            Back to Dashboard
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto p-8">

        {loading && (
          <p className="text-gray-600">
            Loading students...
          </p>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          students.length === 0 && (
            <div className="bg-white rounded-xl shadow p-8">
              <p className="text-gray-600">
                No students registered yet.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          students.length > 0 && (
            <div className="bg-white rounded-xl shadow overflow-hidden">

              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-purple-600">
                  Registered Students
                </h2>

                <p className="text-gray-600 mt-1">
                  Total Students: {students.length}
                </p>
              </div>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4">
                        Name
                      </th>

                      <th className="text-left p-4">
                        Email
                      </th>

                      <th className="text-left p-4">
                        Phone
                      </th>

                      <th className="text-left p-4">
                        Course
                      </th>

                      <th className="text-left p-4">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {students.map((student) => (
                      <tr
                        key={student._id}
                        className="border-t hover:bg-gray-50"
                      >

                        <td className="p-4 font-semibold">
                          {student.name}
                        </td>

                        <td className="p-4">
                          {student.email}
                        </td>

                        <td className="p-4">
                          {student.phone || "N/A"}
                        </td>

                        <td className="p-4">
                          {student.course || "N/A"}
                        </td>

                        <td className="p-4">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Active
                          </span>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </div>
          )}

      </main>

    </div>
  );
};

export default AdminStudents;