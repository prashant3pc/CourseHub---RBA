import { useEffect, useState } from "react";
import api from "../api/api";

const BecomeTeacher = () => {
  const [formData, setFormData] = useState({
    phone: "",
    qualification: "",
    experience: "",
    subjects: "",
    bio: "",
    motivation: "",
  });

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        "/teacher/my-application",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplication(res.data.application);
    } catch (error) {
      if (error.response?.status !== 404) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitApplication = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/teacher/apply",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);

      fetchApplication();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Failed to submit application"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (application) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">

          <h1 className="text-3xl font-bold text-purple-600 mb-6">
            Teacher Application
          </h1>

          <div className="space-y-4">

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  application.status === "approved"
                    ? "text-green-600"
                    : application.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                }
              >
                {application.status.toUpperCase()}
              </span>
            </p>

            <p>
              <strong>Qualification:</strong>{" "}
              {application.qualification}
            </p>

            <p>
              <strong>Experience:</strong>{" "}
              {application.experience}
            </p>

            <p>
              <strong>Subjects:</strong>{" "}
              {application.subjects}
            </p>

            <p>
              <strong>Bio:</strong>{" "}
              {application.bio}
            </p>

            <p>
              <strong>Motivation:</strong>{" "}
              {application.motivation}
            </p>

            {application.adminRemark && (
              <div className="bg-gray-100 p-4 rounded">
                <strong>Admin Remark</strong>
                <p>{application.adminRemark}</p>
              </div>
            )}

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">

      <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow">

        <h1 className="text-3xl font-bold text-purple-600 mb-6">
          Apply to Become a Teacher
        </h1>

        {message && (
          <div className="mb-4 bg-green-100 text-green-700 p-3 rounded">
            {message}
          </div>
        )}

        <form
          onSubmit={submitApplication}
          className="space-y-5"
        >

          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          />

          <input
            type="text"
            name="experience"
            placeholder="Teaching Experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          />

          <input
            type="text"
            name="subjects"
            placeholder="Subjects"
            value={formData.subjects}
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          />

          <textarea
            rows="4"
            name="bio"
            placeholder="Tell us about yourself"
            value={formData.bio}
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          />

          <textarea
            rows="4"
            name="motivation"
            placeholder="Why do you want to become a teacher?"
            value={formData.motivation}
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
          >
            Submit Application
          </button>

        </form>

      </div>

    </div>
  );
};

export default BecomeTeacher;