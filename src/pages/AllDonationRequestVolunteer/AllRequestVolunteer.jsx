import React, { useEffect, useState } from 'react';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllRequestVolunteer = () => {
    const axiosSecure = useAxiosSecure();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

        const fetchRequests = () => {
          setLoading(true);

          axiosSecure.get("/admin/all-donation-requests")
            .then((res) => {
              setRequests(res.data);
            })
            .catch((error) => {
              console.log("Failed to fetch donation requests: ", error);
            })
            .finally(() => {
              setLoading(false);
            });
    };
    
        useEffect(() => {
            fetchRequests()
        }, [])
    
        const handleStatusChange = (id, status) => {
          axiosSecure.patch(`/donation-requests/status/${id}`, { status })
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
        };

      if (loading) return <p className="text-center p-6">Loading donation requests...</p>;

    return (
      <div className="p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          All Blood Donation Requests
        </h2>

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
                  <td className="p-2 flex flex-wrap gap-2">
                    {/* Only status update buttons for volunteers */}
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

export default AllRequestVolunteer;