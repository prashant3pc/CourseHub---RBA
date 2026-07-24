import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children, role }) => {


  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));



  // No login

  if (!token) {

    return <Navigate to="/login" />;

  }



  // Role checking

  if (role && user?.role !== role) {

    return <Navigate to="/" />;

  }



  return children;


};


export default ProtectedRoute;