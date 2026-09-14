import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AdminCourses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses/admin/all");

        setCourses(response.data.courses || []);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load courses"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-purple-600 text-white px-8 py-5 shadow">

        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold">
              Courses
            </h1>

            <p className="text-purple-100">
              Manage all courses
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

        {/* Loading */}
        {loading && (
          <p className="text-gray-600">
            Loading courses...
          </p>
        )}


        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}


        {/* Empty */}
        {!loading &&
          !error &&
          courses.length === 0 && (
            <div className="bg-white rounded-xl shadow p-8">

              <p className="text-gray-600">
                No courses available yet.
              </p>

            </div>
          )}


        {/* Courses */}
        {!loading &&
          !error &&
          courses.length > 0 && (

            <div className="bg-white rounded-xl shadow overflow-hidden">

              {/* Card Header */}
              <div className="p-6 border-b">

                <h2 className="text-2xl font-bold text-purple-600">
                  All Courses
                </h2>

                <p className="text-gray-600 mt-1">
                  Total Courses: {courses.length}
                </p>

              </div>


              {/* Table */}
              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-gray-50">

                    <tr>

                      <th className="text-left p-4">
                        Course
                      </th>

                      <th className="text-left p-4">
                        Category
                      </th>

                      <th className="text-left p-4">
                        Teacher
                      </th>

                      <th className="text-left p-4">
                        Students
                      </th>

                      <th className="text-left p-4">
                        Level
                      </th>

                      <th className="text-left p-4">
                        Status
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {courses.map((course) => (

                      <tr
                        key={course._id}
                        className="border-t hover:bg-gray-50"
                      >

                        {/* Course */}
                        <td className="p-4">

                          <p className="font-semibold">
                            {course.title}
                          </p>

                          <p className="text-sm text-gray-500">
                            {course.duration}
                          </p>

                        </td>


                        {/* Category */}
                        <td className="p-4">
                          {course.category}
                        </td>


                        {/* Teacher */}
                        <td className="p-4">

                          <p className="font-semibold">
                            {course.teacher?.name || "N/A"}
                          </p>

                          <p className="text-sm text-gray-500">
                            {course.teacher?.email || ""}
                          </p>

                        </td>


                        {/* Students */}
                        <td className="p-4">
                          {course.students?.length || 0}
                        </td>


                        {/* Level */}
                        <td className="p-4">
                          {course.level}
                        </td>


                        {/* Status */}
                        <td className="p-4">

                          {course.isPublished ? (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                              Published
                            </span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                              Draft
                            </span>
                          )}

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

export default AdminCourses;