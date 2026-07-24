import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  return (

    <nav className="bg-purple-600 text-white px-6 py-4 flex justify-between items-center">


      <Link
        to="/"
        className="text-xl font-bold"
      >
        CourseSystem
      </Link>



      <div className="flex gap-5 items-center">


        <Link to="/">
          Home
        </Link>


        <Link to="/courses">
          Courses
        </Link>



        {
          user ? (

            <>

              <Link to="/profile">
                Profile
              </Link>


              {
                user.role === "student" && (

                  <Link to="/student-dashboard">
                    Dashboard
                  </Link>

                )
              }



              {
                user.role === "teacher" && (

                  <Link to="/teacher-dashboard">
                    Dashboard
                  </Link>

                )
              }



              {
                user.role === "admin" && (

                  <Link to="/admin-dashboard">
                    Dashboard
                  </Link>

                )
              }



              <button
                onClick={logout}
                className="bg-white text-purple-600 px-3 py-1 rounded"
              >
                Logout
              </button>


            </>


          ) : (

            <>

              <Link to="/login">
                Login
              </Link>


              <Link to="/register">
                Register
              </Link>


            </>

          )

        }


      </div>


    </nav>

  );

};


export default Navbar;