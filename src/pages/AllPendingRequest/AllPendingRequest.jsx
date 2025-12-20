import React, { useContext, useEffect, useState } from 'react';
 
import { useNavigate } from 'react-router';
import useAxios from '../../../Hooks/useAxios';
import { AuthContext } from '../../Context/AuthContext';
import Loader from '../../components/Loader/Loader';

const AllPendingRequest = () => {
  const { user } =  useContext(AuthContext)
  const axiosInstance = useAxios();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  

  useEffect(() => {
    setLoading(true)


    axiosInstance
      .get("/search-requests?status=pending")
      .then((res) => setRequests(res.data))
      .catch((error) => console.error("Failed to fetch requests:", error))
      .finally(() => setLoading(false));
  }, [])
  
  const handleView = (id) => {
      if (!user) {
        navigate("/login");
      } else {
        navigate(`/donation-request/${id}`);
      }
  }



  return (
    <div className="w-11/12 mx-auto mt-8">
      <h2 className= "text-2xl md:text-5xl font-bold text-center text-primary mb-6 py-4">
        Pending Blood Donation Requests
      </h2>

      {loading && (
         <Loader/>
      )}

      {!loading && requests.length === 0 && (
        <p className="text-center text-gray-500">No pending requests found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading &&
          requests.map((req) => (
            <div
              key={req._id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col gap-3
                   transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-white"
            >
              <h3 className="font-bold text-xl text-blue-600">
                <span className="text-black">Recipient Name :</span>{" "}
                {req.recipient_name}
              </h3>

              <p className="text-gray-700">
                Location:{" "}
                <span className="font-medium">
                  {req.recipient_district}, {req.recipient_upazila}
                </span>
              </p>

              <p className="text-gray-700">
                Blood Group:{" "}
                <span className="font-semibold text-red-500">
                  {req.blood_group}
                </span>
              </p>

              <p className="text-gray-700">
                Date:{" "}
                <span className="font-medium">
                  {new Date(req.createdAt).toLocaleDateString()}
                </span>
              </p>

              <p className="text-gray-700">
                Time:{" "}
                <span className="font-medium">
                  {new Date(req.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </p>

              <button
                onClick={() => handleView(req._id)}
                className="mt-3 bg-blue-600 text-white font-medium py-2 px-4 rounded-full
                     hover:bg-blue-700 transition-colors duration-300"
              >
                View
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllPendingRequest;