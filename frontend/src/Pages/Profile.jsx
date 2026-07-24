import Sidebar from "../components/Sidebar";


const Profile = () => {


  const user = JSON.parse(
    localStorage.getItem("user")
  );



  return (

    <div className="flex min-h-screen bg-gray-100">


      <Sidebar />



      <div className="flex-1 p-8">


        <h1 className="text-3xl font-bold text-purple-600 mb-6">
          Profile
        </h1>




        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">


          <div className="mb-4">


            <h3 className="font-semibold text-gray-500">
              Name
            </h3>


            <p className="text-lg">
              {user?.name}
            </p>


          </div>





          <div className="mb-4">


            <h3 className="font-semibold text-gray-500">
              Email
            </h3>


            <p className="text-lg">
              {user?.email}
            </p>


          </div>





          <div>


            <h3 className="font-semibold text-gray-500">
              Role
            </h3>


            <p className="text-lg capitalize">
              {user?.role}
            </p>


          </div>




        </div>


      </div>


    </div>

  );

};


export default Profile;