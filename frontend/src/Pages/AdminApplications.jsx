import { useEffect, useState } from "react";
import api from "../api/api";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get("/admin/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data.applications);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const approveApplication = async (id) => {
    try {
      await api.put(
        `/admin/applications/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchApplications();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to approve");
    }
  };

  const rejectApplication = async (id) => {
    try {
      await api.put(
        `/admin/applications/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchApplications();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to reject");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-purple-600 mb-8">
        Teacher Applications
      </h1>

      {applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          No applications found.
        </div>
      ) : (
        <div className="space-y-6">

          {applications.map((application) => (

            <div
              key={application._id}
              className="bg-white rounded-lg shadow p-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-xl font-semibold">
                    {application.fullName}
                  </h2>

                  <p>{application.email}</p>

                  <p className="mt-2">
                    <strong>Phone:</strong>{" "}
                    {application.phone}
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
                    <strong>Bio:</strong>
                  </p>

                  <p className="mb-3">
                    {application.bio}
                  </p>

                  <p>
                    <strong>Motivation:</strong>
                  </p>

                  <p>
                    {application.motivation}
                  </p>

                  <p className="mt-4">
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

                </div>

                {application.status === "pending" && (

                  <div className="flex flex-col gap-3">

                    <button
                      onClick={() =>
                        approveApplication(application._id)
                      }
                      className="bg-green-600 text-white px-5 py-2 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        rejectApplication(application._id)
                      }
                      className="bg-red-600 text-white px-5 py-2 rounded"
                    >
                      Reject
                    </button>

                  </div>

                )}

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default AdminApplications;