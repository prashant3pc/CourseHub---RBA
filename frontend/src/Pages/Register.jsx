import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    course: "",
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
      const res = await api.post("/auth/register", formData);

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex min-h-[680px]">
        {/* Left Branding Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white p-12 flex-col justify-between relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full"></div>

          <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-white/10 rounded-full"></div>

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center text-xl font-bold backdrop-blur-sm">
                C
              </div>

              <h1 className="text-2xl font-bold tracking-tight">CourseHub</h1>
            </div>

            {/* Main Text */}
            <div className="max-w-md">
              <h2 className="text-4xl font-bold leading-tight mb-5">
                Start Your
                <br />
                Learning Journey.
              </h2>

              <p className="text-purple-100 text-lg leading-relaxed">
                Create your CourseHub account and discover courses designed to
                help you learn new skills and achieve your goals.
              </p>
            </div>

            {/* Features */}
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                  ✓
                </div>

                <p className="text-purple-100">
                  Access quality learning resources
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                  ✓
                </div>

                <p className="text-purple-100">
                  Learn from experienced teachers
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                  ✓
                </div>

                <p className="text-purple-100">Build skills for your future</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10">
            <p className="text-sm text-purple-200">
              © 2026 CourseHub. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Registration Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center justify-center gap-2 mb-8">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center font-bold">
                C
              </div>

              <h1 className="text-2xl font-bold text-gray-900">CourseHub</h1>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <p className="text-purple-600 font-semibold text-sm mb-2">
                GET STARTED
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create your account
              </h2>

              <p className="text-gray-500">
                Join CourseHub and start your learning journey.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-20 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white"
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

              {/* Phone */}
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white"
                  required
                />
              </div>

              {/* Course */}
              <div className="mb-6">
                <label
                  htmlFor="course"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Course
                </label>

                <input
                  id="course"
                  type="text"
                  name="course"
                  placeholder="e.g. BCA, BIM, CSIT"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:bg-white"
                  required
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold py-3.5 rounded-xl transition duration-200 shadow-lg shadow-purple-200 hover:shadow-purple-300"
              >
                Create Account
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-7 text-center">
              <p className="text-gray-500 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-600 font-semibold hover:text-purple-700 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Footer */}
            <div className="mt-7 pt-5 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                Create your account and start learning with CourseHub
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
