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
        },
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
        },
      );

      fetchApplications();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to reject");
    }
  };

  const pendingCount = applications.filter(
    (application) => application.status === "pending",
  ).length;

  const approvedCount = applications.filter(
    (application) => application.status === "approved",
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status === "rejected",
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f3ff] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-600 font-medium">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f3ff]">
      {/* ================= HEADER ================= */}

      <header className="bg-white border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-[1500px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-500 mb-1">
              Administration
            </p>

            <h1 className="text-2xl font-bold text-gray-900">
              Teacher Applications
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-purple-50 border border-purple-100 px-4 py-2.5 rounded-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

              <span className="text-sm font-semibold text-purple-700">
                Admin Portal
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}

      <main className="max-w-[1500px] mx-auto px-6 md:px-10 py-8 md:py-10">
        {/* ================= HERO ================= */}

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 text-white p-7 md:p-9 mb-8 shadow-xl shadow-purple-200">
          <div className="absolute -right-20 -top-24 w-80 h-80 rounded-full bg-white/10"></div>

          <div className="absolute -bottom-24 left-1/3 w-64 h-64 rounded-full bg-indigo-400/20"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-purple-100 text-xs font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-yellow-300"></span>
                Application Management
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Review Teacher Applications
              </h2>

              <p className="text-purple-100 max-w-2xl leading-relaxed">
                Review applications submitted by users who want to become
                teachers and manage their application status.
              </p>
            </div>

            <div className="hidden md:flex w-24 h-24 rounded-3xl bg-white/10 border border-white/10 items-center justify-center backdrop-blur">
              <span className="text-5xl">🎓</span>
            </div>
          </div>
        </section>

        {/* ================= SUMMARY ================= */}

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Total */}

          <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Total Applications
                </p>

                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {applications.length}
                </p>

                <p className="text-xs text-purple-600 font-semibold mt-2">
                  All submissions
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                ◉
              </div>
            </div>
          </div>

          {/* Pending */}

          <div className="bg-white rounded-2xl border border-yellow-100 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Pending</p>

                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {pendingCount}
                </p>

                <p className="text-xs text-yellow-600 font-semibold mt-2">
                  Awaiting review
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center text-xl">
                ⏳
              </div>
            </div>
          </div>

          {/* Approved */}

          <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Approved</p>

                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {approvedCount}
                </p>

                <p className="text-xs text-green-600 font-semibold mt-2">
                  Accepted teachers
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl">
                ✓
              </div>
            </div>
          </div>

          {/* Rejected */}

          <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Rejected</p>

                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {rejectedCount}
                </p>

                <p className="text-xs text-red-600 font-semibold mt-2">
                  Declined applications
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl">
                ×
              </div>
            </div>
          </div>
        </section>

        {/* ================= APPLICATION LIST ================= */}

        <section>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-1">
                Applications
              </p>

              <h2 className="text-2xl font-bold text-gray-900">
                Submitted Applications
              </h2>

              <p className="text-gray-500 mt-1">
                Review applicant information and take action on pending
                applications.
              </p>
            </div>

            <div className="text-sm font-semibold text-gray-500">
              {applications.length}{" "}
              {applications.length === 1 ? "application" : "applications"}
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-3xl mx-auto mb-5">
                ◉
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No applications found
              </h3>

              <p className="text-gray-500">
                There are currently no teacher applications to review.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {applications.map((application) => (
                <div
                  key={application._id}
                  className="bg-white rounded-3xl border border-purple-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {/* Application Header */}

                  <div className="px-6 md:px-8 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                        {application.fullName?.charAt(0)?.toUpperCase() || "A"}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {application.fullName}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {application.email}
                        </p>
                      </div>
                    </div>

                    {/* Status */}

                    <span
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold w-fit ${
                        application.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : application.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          application.status === "approved"
                            ? "bg-green-500"
                            : application.status === "rejected"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                        }`}
                      ></span>

                      {application.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Application Body */}

                  <div className="p-6 md:p-8">
                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
                      {/* Phone */}

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400">
                          Phone
                        </p>

                        <p className="font-semibold text-gray-800 mt-2">
                          {application.phone || "N/A"}
                        </p>
                      </div>

                      {/* Qualification */}

                      <div className="bg-purple-50 rounded-2xl p-4">
                        <p className="text-[11px] uppercase tracking-wider font-bold text-purple-500">
                          Qualification
                        </p>

                        <p className="font-semibold text-gray-800 mt-2">
                          {application.qualification || "N/A"}
                        </p>
                      </div>

                      {/* Experience */}

                      <div className="bg-indigo-50 rounded-2xl p-4">
                        <p className="text-[11px] uppercase tracking-wider font-bold text-indigo-500">
                          Experience
                        </p>

                        <p className="font-semibold text-gray-800 mt-2">
                          {application.experience || "N/A"}
                        </p>
                      </div>

                      {/* Subjects */}

                      <div className="bg-purple-50 rounded-2xl p-4">
                        <p className="text-[11px] uppercase tracking-wider font-bold text-purple-500">
                          Subjects
                        </p>

                        <p className="font-semibold text-gray-800 mt-2">
                          {application.subjects || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Bio + Motivation */}

                    <div className="grid lg:grid-cols-2 gap-5">
                      <div className="border border-gray-100 rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                            👤
                          </div>

                          <h4 className="font-bold text-gray-900">
                            Applicant Bio
                          </h4>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                          {application.bio || "No bio provided."}
                        </p>
                      </div>

                      <div className="border border-gray-100 rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                            💡
                          </div>

                          <h4 className="font-bold text-gray-900">
                            Motivation
                          </h4>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                          {application.motivation || "No motivation provided."}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}

                    {application.status === "pending" && (
                      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-7 pt-6 border-t border-gray-100">
                        <button
                          onClick={() => rejectApplication(application._id)}
                          className="px-6 py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 font-bold hover:bg-red-100 transition"
                        >
                          ✕ Reject Application
                        </button>

                        <button
                          onClick={() => approveApplication(application._id)}
                          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition shadow-md shadow-purple-200"
                        >
                          ✓ Approve Application
                        </button>
                      </div>
                    )}

                    {/* Completed State */}

                    {application.status !== "pending" && (
                      <div className="mt-7 pt-6 border-t border-gray-100 flex justify-end">
                        <div
                          className={`px-4 py-2.5 rounded-xl text-sm font-semibold ${
                            application.status === "approved"
                              ? "bg-green-50 text-green-700 border border-green-100"
                              : "bg-red-50 text-red-700 border border-red-100"
                          }`}
                        >
                          {application.status === "approved"
                            ? "✓ Application approved"
                            : "✕ Application rejected"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminApplications;
