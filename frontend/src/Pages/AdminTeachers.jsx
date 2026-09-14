
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AdminTeachers = () => {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get("/admin/teachers");

        setTeachers(response.data.teachers || []);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load teachers"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-purple-600 text-white px-8 py-5 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold">
              Teachers
            </h1>

            <p className="text-purple-100">
              Manage approved teachers
            </p>
          </div>

          <button
            onClick={() => navigate("/admin-dashboard")}
            className="bg-white text-purple-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100"
          >
            Back to Dashboard
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto p-8">

        {loading && (
          <p className="text-gray-600">
            Loading teachers...
          </p>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          teachers.length === 0 && (
            <div className="bg-white rounded-xl shadow p-8">
              <p className="text-gray-600">
                No approved teachers found.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          teachers.length > 0 && (
            <div className="bg-white rounded-xl shadow overflow-hidden">

              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-purple-600">
                  Approved Teachers
                </h2>

                <p className="text-gray-600 mt-1">
                  Total Teachers: {teachers.length}
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
                        Role
                      </th>

                      <th className="text-left p-4">
                        Status
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {teachers.map((teacher) => (
                      <tr
                        key={teacher._id}
                        className="border-t hover:bg-gray-50"
                      >

                        <td className="p-4 font-semibold">
                          {teacher.name}
                        </td>

                        <td className="p-4">
                          {teacher.email}
                        </td>

                        <td className="p-4">
                          {teacher.phone || "N/A"}
                        </td>

                        <td className="p-4">
                          {teacher.role}
                        </td>

                        <td className="p-4">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Approved
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

export default AdminTeachers;
