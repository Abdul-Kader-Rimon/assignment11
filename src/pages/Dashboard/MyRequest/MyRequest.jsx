 import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { Link } from 'react-router';
import { MdDelete, MdEditCalendar } from 'react-icons/md';
 
 
 
const MyRequest = () => {
     const { user } = useContext(AuthContext);
     const axiosSecure = useAxiosSecure();

     const [totalRequest, setTotalRequests] = useState(0);
     const [myRequests, setMyRequests] = useState([]);
     const [itemsPerPage, setItemsPerPage] = useState(10);
     const [currentPage, setCurrentPage] = useState(1);
     
  
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        setMyRequests(res.data.request || []);
        setTotalRequests(res.data.totalRequest || 0);
      })
      .catch((error)=> console.log(error)
      )
    
  }, [axiosSecure, currentPage, itemsPerPage, user])
  
  const numberOfPages = Math.ceil(totalRequest / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < pages.length && setCurrentPage(currentPage + 1);
  

  const handleStatusChange = (id, newStatus) => {
    axiosSecure.patch(`/donation-requests/status/${id}`, { status: newStatus })
      .then(() => {
      setMyRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, donation_status: newStatus } : req
        )
      );
      })
      .catch((error)=> console.log("Error updating status:", error)
      )
  }

    const handleDelete = (id) => {
      if (!window.confirm("Are you sure you want to delete?")) return;

      axiosSecure.delete(`/donation-requests/${id}`)
        .then(() => {
          setMyRequests((prev) => prev.filter((r) => r._id !== id));
        })
        .catch((err) => console.log("Error deleting request:", err));
    };
  
  return (
    <div className="mt-6 bg-white rounded-lg shadow p-4 md:p-6 ">
      <h2 className="text-xl text-[#422ad5] md:text-3xl  font-bold mb-4 text-center">
        My Donation Requests
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                #
              </th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                Recipient
              </th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                Hospital
              </th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                Blood
              </th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                Donor Info
              </th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {myRequests.map((req, index) => (
              <tr key={req._id} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-sm">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-3 py-2 text-sm">{req.recipient_name}</td>
                <td className="px-3 py-2 text-sm">{req.hospital_name}</td>
                <td className="px-3 py-2 text-sm">{req.blood_group}</td>
                <td className="px-3 py-2 text-sm capitalize font-medium">
                  {req.donation_status || "-"}
                </td>
                <td className="px-3 py-2 text-sm">
                  {req.donation_status === "inprogress" ? (
                    <div className="text-xs">
                      <p>{user.displayName}</p>
                      <p className="text-gray-500">{user.email}</p>
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-3 py-2 flex flex-wrap gap-1 text-sm">
                  {req.donation_status === "inprogress" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(req._id, "done")}
                        className="btn btn-xs btn-success font-bold"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleStatusChange(req._id, "canceled")}
                        className="btn btn-xs btn-error font-bold"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <Link
                    to={`/dashboard/edit-request/${req._id}`}
                    className="btn btn-xs btn-warning flex items-center gap-1"
                  >
                    <MdEditCalendar size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-xs btn-danger flex items-center gap-1"
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

      <div className="flex justify-center items-center mt-4 gap-2 flex-wrap">
        <button
          onClick={handlePrev}
          className="btn btn-sm"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn btn-sm ${
              page === currentPage ? "bg-blue-600 text-white" : ""
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNext}
          className="btn btn-sm"
          disabled={currentPage === pages.length}
        >
          Next
        </button>
      </div>
    </div>
  );
 };
 
 export default MyRequest;