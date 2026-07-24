// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../api/api";
// import Navbar from "../components/Navbar";
// import {
//   FaUserGraduate,
//   FaEye,
//   FaEyeSlash,
// } from "react-icons/fa";

// function StudentLogin() {
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);

//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   const change = (e) => {
//     setData({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await API.post("/student/login", data);

//       const student = res.data.student;

//       localStorage.setItem("studentId", student._id);
//       localStorage.setItem("studentName", student.name);
//       localStorage.setItem("studentEmail", student.email);
//       localStorage.setItem("studentPhone", student.phone);
//       localStorage.setItem("studentCourse", student.course);

//       navigate("/student-dashboard");

//     } catch (error) {
//       alert(
//         error.response?.data?.message ||
//         "Login Failed"
//       );
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex justify-center items-center">

//         <div className="bg-white w-[430px] rounded-3xl shadow-2xl p-8">

//           <div className="text-center mb-8">

//             <FaUserGraduate className="text-7xl text-blue-600 mx-auto mb-4" />

//             <h1 className="text-3xl font-bold">
//               Student Login
//             </h1>

//             <p className="text-gray-500 mt-2">
//               Welcome Back
//             </p>

//           </div>

//           <form
//             onSubmit={submit}
//             className="space-y-5"
//           >

//             <input
//               type="email"
//               name="email"
//               value={data.email}
//               onChange={change}
//               placeholder="Email Address"
//               className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             <div className="relative">

//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={data.password}
//                 onChange={change}
//                 placeholder="Password"
//                 className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
//               />

//               <button
//                 type="button"
//                 className="absolute right-4 top-4"
//                 onClick={() =>
//                   setShowPassword(!showPassword)
//                 }
//               >
//                 {showPassword ? (
//                   <FaEyeSlash />
//                 ) : (
//                   <FaEye />
//                 )}
//               </button>

//             </div>

//             <button
//               className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 duration-300"
//             >
//               Login
//             </button>

//           </form>

//           <div className="text-center mt-6">

//             <p className="text-gray-600">
//               Don't have an account?
//             </p>

//             <Link
//               to="/student-register"
//               className="text-blue-600 font-semibold hover:underline"
//             >
//               Register Here
//             </Link>

//           </div>

//         </div>

//       </div>
//     </>
//   );
// }

// export default StudentLogin;