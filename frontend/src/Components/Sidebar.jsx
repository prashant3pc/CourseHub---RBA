import { Link } from "react-router-dom";


const Sidebar = () => {


  const user = JSON.parse(localStorage.getItem("user"));


  return (

    <aside className="w-64 min-h-screen bg-gray-900 text-white p-5">


      <h2 className="text-xl font-bold mb-6">
        Dashboard
      </h2>



      <div className="flex flex-col gap-4">


        <Link to="/profile">
          Profile
        </Link>



        {
          user?.role === "student" && (

            <>

              <Link to="/student-dashboard">
                Student Dashboard
              </Link>


              <Link to="/courses">
                Browse Courses
              </Link>


              <Link to="/become-teacher">
                Become Teacher
              </Link>


            </>

          )
        }



        {
          user?.role === "teacher" && (

            <>

              <Link to="/teacher-dashboard">
                Teacher Dashboard
              </Link>


              <Link to="/courses">
                My Courses
              </Link>


            </>

          )
        }




        {
          user?.role === "admin" && (

            <>

              <Link to="/admin-dashboard">
                Admin Dashboard
              </Link>


              <Link to="/courses">
                Manage Courses
              </Link>


            </>

          )
        }


      </div>


    </aside>

  );

};


export default Sidebar;