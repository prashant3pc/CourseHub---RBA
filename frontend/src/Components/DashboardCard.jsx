// import Sidebar from "../components/Sidebar";
// import DashboardCard from "../components/DashboardCard";

// function StudentDashboard() {
//   return (
//     <div className="flex">

//       <Sidebar role="student" />

//       <div className="flex-1 bg-gray-100 min-h-screen p-8">

//         <h1 className="text-4xl font-bold mb-8">
//           Student Dashboard
//         </h1>

//         <div className="grid md:grid-cols-3 gap-6">

//           <DashboardCard
//             title="Enrolled Courses"
//             value="1"
//             color="bg-blue-600"
//           />

//           <DashboardCard
//             title="Completed"
//             value="0"
//             color="bg-green-600"
//           />

//           <DashboardCard
//             title="Certificates"
//             value="0"
//             color="bg-purple-600"
//           />

//         </div>

//         <div className="mt-10 bg-white rounded-xl shadow-lg p-8">

//           <h2 className="text-2xl font-bold mb-6">
//             Student Information
//           </h2>

//           <div className="space-y-3">

//             <p>
//               <strong>Name:</strong> Student Name
//             </p>

//             <p>
//               <strong>Email:</strong> student@gmail.com
//             </p>

//             <p>
//               <strong>Phone:</strong> 9800000000
//             </p>

//             <p>
//               <strong>Registered Course:</strong> React JS
//             </p>

//           </div>

//         </div>

//         <div className="mt-10">

//           <h2 className="text-2xl font-bold mb-6">
//             Available Courses
//           </h2>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//             {["React JS", "Node JS", "Express JS", "MongoDB"].map((course) => (
//               <div
//                 key={course}
//                 className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 duration-300"
//               >
//                 <h2 className="text-xl font-bold">
//                   {course}
//                 </h2>

//                 <p className="text-gray-500 mt-2">
//                   Learn {course} from beginner to advanced.
//                 </p>

//                 <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
//                   View
//                 </button>
//               </div>
//             ))}

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default StudentDashboard;