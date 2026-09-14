import { Link } from "react-router-dom";

const Home = () => {

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      <h1 className="text-4xl font-bold text-purple-600 mb-4">
        Student Course System
      </h1>

      <p className="text-gray-600 text-lg mb-8 text-center">
        Learn courses, become a teacher, and manage your learning journey.
      </p>

      <div className="flex gap-4">

        <Link
          to="/courses"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg"
        >
          Explore Courses
        </Link>

        {
          !localStorage.getItem("token") && (

            <Link
              to="/register"
              className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg"
            >
              Get Started
            </Link>

          )
        }


      </div>


    </div>

  );

};


export default Home;