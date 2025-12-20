import React, { useContext } from "react";
 
import { Navigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Loader from "../components/Loader/Loader";
 

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="scale-130">
          <Loader />
        </div>
      </div>
    );

  if (user) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export default PublicRoute;
