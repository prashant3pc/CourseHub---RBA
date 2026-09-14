import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentDashboard from "./pages/StudentDashboard";
import BecomeTeacher from "./pages/BecomeTeacher";
import Courses from "./pages/Courses";

import TeacherDashboard from "./pages/TeacherDashboard";

import AdminDashboard from "./pages/AdminDashboard";
import AdminApplications from "./pages/AdminApplications";
import AdminStudents from "./pages/AdminStudents";
import AdminTeachers from "./pages/AdminTeachers";
import AdminCourses from "./pages/AdminCourses";


import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

       <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["student"]}
            >
              <StudentDashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/courses"
          element={
            <ProtectedRoute
              allowedRoles={["student"]}
            >
              <Courses />
            </ProtectedRoute>
          }
        />


        <Route
          path="/become-teacher"
          element={
            <ProtectedRoute
              allowedRoles={["student"]}
            >
              <BecomeTeacher />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["teacher"]}
            >
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <AdminApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <AdminStudents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/teachers"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <AdminTeachers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <AdminCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;