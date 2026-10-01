import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      // Step 1: Login and get token
      const res = await api.post("/auth/login", formData);

      const token = res.data.data;

      // Step 2: Save token
      localStorage.setItem("token", token);

      // Step 3: Get logged-in user's information
      const userRes = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = userRes.data.data;

      // Step 4: Save user
      localStorage.setItem("user", JSON.stringify(user));

      // Step 5: Redirect based on role
      if (user.role === "admin") {
        navigate("/admin-dashboard");
        return;
      }

      if (user.role === "teacher" && user.teacherApproved) {
        navigate("/teacher-dashboard");
        return;
      }

      navigate("/student-dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex min-h-[650px]">
        {/* Left Branding Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white p-12 flex-col justify-between relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-white/10 rounded-full"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center text-xl font-bold backdrop-blur-sm">
                C
              </div>

              <h1 className="text-2xl font-bold tracking-tight">CourseHub</h1>
            </div>

            <div className="max-w-md">
              <h2 className="text-4xl font-bold leading-tight mb-5">
                Learn. Grow.
                <br />
                Achieve More.
              </h2>

              <p className="text-purple-100 text-lg leading-relaxed">
                Discover courses, learn from experienced teachers, and build the
                skills you need for your future.
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full bg-purple-200 border-2 border-purple-600"></div>
                <div className="w-9 h-9 rounded-full bg-indigo-200 border-2 border-purple-600"></div>
                <div className="w-9 h-9 rounded-full bg-pink-200 border-2 border-purple-600"></div>
              </div>

              <p className="text-sm text-purple-100">
                Learn with a growing community
              </p>
            </div>

            <p className="text-sm text-purple-200">
              © 2026 CourseHub. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Login Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center justify-center gap-2 mb-10">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center font-bold">
                C
              </div>

              <h1 className="text-2xl font-bold text-gray-900">CourseHub</h1>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="text-purple-600 font-semibold text-sm mb-2">
                WELCOME BACK
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Sign in to your account
              </h2>

              <p className="text-gray-500">
                Enter your details to continue learning.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-7">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 pr-20 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-purple-600 hover:text-purple-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold py-3.5 rounded-xl transition duration-200 shadow-lg shadow-purple-200 hover:shadow-purple-300"
              >
                Sign In
              </button>
            </form>

            {/* Register */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-purple-600 font-semibold hover:text-purple-700 hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* Small Footer */}
            <div className="mt-10 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                Secure access to your CourseHub account
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
