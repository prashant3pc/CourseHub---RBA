// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../api/api";
// import Navbar from "../components/Navbar";
// import { FaUserGraduate, FaEye, FaEyeSlash } from "react-icons/fa";

// function StudentRegister() {
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);

//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     course: "",
//   });

//   const change = (e) => {
//     setData({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     if (
//       !data.name ||
//       !data.email ||
//       !data.password ||
//       !data.phone ||
//       !data.course
//     ) {
//       return alert("Please fill all fields.");
//     }

//     try {
//       const res = await API.post("/student/register", data);


//       alert("Student Registered Successfully!");

//       navigate("/student-login");
//     } catch (error) {
//       alert(
//         error.response?.data?.message ||
//         "Registration Failed"
//       );
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex justify-center items-center py-10">

//         <div className="bg-white w-[450px] rounded-3xl shadow-2xl p-8">

//           <div className="text-center mb-8">

//             <FaUserGraduate className="text-7xl text-blue-600 mx-auto mb-4" />

//             <h1 className="text-3xl font-bold">
//               Student Registration
//             </h1>

//             <p className="text-gray-500 mt-2">
//               Create your student account
//             </p>

//           </div>

//           <form
//             onSubmit={submit}
//             className="space-y-5"
//           >

//             <input
//               type="text"
//               name="name"
//               value={data.name}
//               onChange={change}
//               placeholder="Full Name"
//               className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//             />

//             <input
//               type="email"
//               name="email"
//               value={data.email}
//               onChange={change}
//               placeholder="Email Address"
//               className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//             />

//             <div className="relative">

//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={data.password}
//                 onChange={change}
//                 placeholder="Password"
//                 className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//               />

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowPassword(!showPassword)
//                 }
//                 className="absolute right-4 top-4"
//               >
//                 {showPassword ? (
//                   <FaEyeSlash />
//                 ) : (
//                   <FaEye />
//                 )}
//               </button>

//             </div>

//             <input
//               type="text"
//               name="phone"
//               value={data.phone}
//               onChange={change}
//               placeholder="Phone Number"
//               className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//             />

//             <select
//               name="course"
//               value={data.course}
//               onChange={change}
//               className="w-full border rounded-xl p-3"
//             >
//               <option value="">
//                 Select Course
//               </option>

//               <option value="React JS">
//                 React JS
//               </option>

//               <option value="Node JS">
//                 Node JS
//               </option>

//               <option value="Express JS">
//                 Express JS
//               </option>

//               <option value="MongoDB">
//                 MongoDB
//               </option>

//             </select>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 duration-300"
//             >
//               Register
//             </button>

//           </form>

//           <div className="text-center mt-6">

//             <p className="text-gray-600">
//               Already have an account?
//             </p>

//             <Link
//               to="/student-login"
//               className="text-blue-600 font-semibold hover:underline"
//             >
//               Login Here
//             </Link>

//           </div>

//         </div>

//       </div>
//     </>
//   );
// }

// export default StudentRegister;