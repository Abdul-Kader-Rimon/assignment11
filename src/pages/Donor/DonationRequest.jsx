import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router';
import { MdDelete, MdEditCalendar } from 'react-icons/md';
import Loader from '../../components/Loader/Loader';

const DonationRequest = () => {

      const { user } = useContext(AuthContext);
      const axiosSecure = useAxiosSecure();

      const [requests, setRequests] = useState([]);
      const [loading, setLoading] = useState(true);
      
    useEffect(() => {
        if (!user?.email) return;
        axiosSecure.get(`/donation-requests?email=${user.email}&limit=3`)
            .then((res) => setRequests(res.data || []))
            .catch((error) => console.log("Error fetching requests:", error)
            ).finally(() => setLoading(false));
        
    }, [user, axiosSecure])
    
    const handleStatusChange = (id, newStatus) => {
        axiosSecure
          .patch(`/donation-requests/status/${id}`, { status: newStatus })
          .then(() => {
            setRequests((prev) =>
              prev.map((req) =>
                req._id === id ? { ...req, donation_status: newStatus } : req
              )
            );
          })
          .catch((error) => console.log("Error updating status:", error));
    }


    const handleDelete = (id) => {
        
        if (!window.confirm("Are you sure you want to delete?")) return;

        axiosSecure.delete(`/donation-requests/${id}`)
            .then(() => {
                setRequests((prev) => prev.filter((r) => r._id !== id));

            })
            .catch((error) => console.log("Error deleting request:", error)
            );
    }

     if (loading) return  <Loader/>;
     if (requests.length === 0) return null;

    return (
      <div className="mt-6 bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-xl text-center font-bold mb-4">
          Recent Donation Requests
        </h2>

        <div className="overflow-x-auto">
          <table className="table-auto min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-2 text-left text-sm font-medium text-gray-700">
                  Recipient
                </th>
                <th className="px-2 py-2 text-left text-sm font-medium text-gray-700">
                  Location
                </th>
                <th className="px-2 py-2 text-left text-sm font-medium text-gray-700">
                  Date
                </th>
                <th className="px-2 py-2 text-left text-sm font-medium text-gray-700">
                  Time
                </th>
                <th className="px-2 py-2 text-left text-sm font-medium text-gray-700">
                  Blood
                </th>
                <th className="px-2 py-2 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="px-2 py-2 text-left text-sm font-medium text-gray-700">
                  Donor Info
                </th>
                <th className="px-2 py-2 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {requests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50">
                  <td className="px-2 py-1 text-sm">{req.recipient_name}</td>
                  <td className="px-2 py-1 text-sm">
                    {req.recipient_district}, {req.recipient_upazila}
                  </td>
                  <td className="px-2 py-1 text-sm">{req.donation_date}</td>
                  <td className="px-2 py-1 text-sm">{req.donation_time}</td>
                  <td className="px-2 py-1 text-sm">{req.blood_group}</td>
                  <td className="px-2 py-1 text-sm capitalize font-medium">
                    {req.donation_status}
                  </td>
                  <td className="px-2 py-1 text-sm">
                    {req.donation_status === "inprogress" ? (
                      <div className="text-xs">
                        <p>{user.displayName}</p>
                        <p className="text-gray-500">{user.email}</p>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-2 py-3 flex flex-wrap gap-1 text-sm">
                    {req.donation_status === "inprogress" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(req._id, "done")}
                          className="btn btn-xs btn-success font-bold"
                        >
                          Done
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(req._id, "canceled")
                          }
                          className="btn btn-xs btn-error font-bold"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    <Link
                      to={`/dashboard/edit-request/${req._id}`}
                      className="btn btn-xs btn-warning"
                    >
                      <MdEditCalendar size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-xs btn-danger"
                    >
                      <MdDelete size={16} />
                    </button>
                    <Link
                      to={`/dashboard/view-details/${req._id}`}
                      className="btn btn-xs btn-info font-bold"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default DonationRequest;