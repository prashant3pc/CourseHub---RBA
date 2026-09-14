import { useEffect, useState } from "react";
import api from "../api/api";
import Loader from "../components/Loader";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses/published");

        setCourses(res.data.courses || []);
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-purple-600 mb-6">
        Courses
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {!error && courses.length === 0 ? (
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">
            No courses available yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white p-5 rounded-lg shadow"
            >

              <h2 className="text-xl font-bold">
                {course.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {course.description}
              </p>

              <p className="text-sm text-gray-500 mt-3">
                Category: {course.category}
              </p>

              <p className="text-sm text-gray-500">
                Duration: {course.duration}
              </p>

              <p className="text-sm text-gray-500">
                Level: {course.level}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Teacher: {course.teacher?.name || "N/A"}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Courses;