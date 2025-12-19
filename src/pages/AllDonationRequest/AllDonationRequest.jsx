import React, { useEffect, useState } from 'react';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrash } from 'react-icons/fa';
 
const AllDonationRequest = () => {
     
       const axiosSecure = useAxiosSecure();
       const [requests, setRequests] = useState([]);
      const [loading, setLoading] = useState(true);
       const [filter , setFilter] = useState("")
    
    const fetchRequests = () => {
      setLoading(true);
       const url = filter
         ? `/admin/all-donation-requests?status=${filter}`
         : `/admin/all-donation-requests`;

        axiosSecure.get(url)
            .then((res) => {
            setRequests(res.data);
            })
            .catch((error) => {
               console.log("Failed to fetch donation requests: ", error);  
            })
            .finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchRequests()
    }, [filter])
    
    const handleStatusChange = (id, status) => {
        axiosSecure
          .patch(`/donation-requests/status/${id}`, { status })
          .then(() => {
            setRequests((prev) =>
              prev.map((req) =>
                req._id === id ? { ...req, donation_status: status } : req
              )
            );
          })
          .catch((error) => {
            console.log("Failed to update status:", error);
          });
    }

       const handleDelete = (id) => {
         if (!window.confirm("Are you sure you want to delete this request?"))
           return;

         axiosSecure
           .delete(`/donation-requests/${id}`)
           .then(() => {
             setRequests((prev) => prev.filter((req) => req._id !== id));
           })
           .catch((err) => {
             console.error("Failed to delete request: ", err);
           });
    };
    


      if (loading) return <p className="text-center p-6">Loading donation requests...</p>;




    return (
      <div className="p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          All Blood Donation Requests
        </h2>

        <div className="mb-4">
          <select
            className="select select-bordered w-full max-w-xs"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto min-w-[700px] w-full border border-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-2 text-left">Requester</th>
                <th className="p-2 text-left">Recipient</th>
                <th className="p-2 text-left">Blood Group</th>
                <th className="p-2 text-left">District / Upazila</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="border-t border-slate-200 hover:bg-slate-50"
                >
                  <td className="p-2">
                    <div className="flex flex-col">
                      <span className="font-bold">{req.requester_name}</span>
                      <span className="text-sm opacity-50">
                        {req.requester_email}
                      </span>
                    </div>
                  </td>
                  <td className="p-2">{req.recipient_name}</td>
                  <td className="p-2">{req.blood_group}</td>
                  <td className="p-2">
                    {req.recipient_district} / {req.recipient_upazila}
                  </td>
                  <td className="p-2">
                    <span
                      className={`badge ${
                        req.donation_status === "inprogress"
                          ? "badge-info"
                          : req.donation_status === "canceled"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {req.donation_status || "pending"}
                    </span>
                  </td>
                  <td className="p-2 flex items-center my-5 flex-wrap gap-2">
                    <button
                      onClick={() => handleStatusChange(req._id, "inprogress")}
                      className="btn btn-xs btn-info"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleStatusChange(req._id, "canceled")}
                      className="btn btn-xs btn-error"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No donation requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
 };
 
 export default AllDonationRequest;