 import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loader from '../../../components/Loader/Loader';
 
const ViewDetails = () => {
      const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

     if (!id) return;

    setLoading(true);
    
        
        axiosSecure.get(`/donation-requests/${id}`)
            .then((res) => setRequest(res.data))
            .catch((error) => console.error("Failed to fetch request:", error)
            )
            .finally(() => setLoading(false));

        
    }, [id, axiosSecure])
    
      if (loading) return  <Loader/>;
    if (!request) return (
          <p className="text-center p-6 text-gray-500">No request found.</p>
        );


    return (
      <div className="max-w-md mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Donation Request Details
        </h2>

        <div className='space-y-4'>
          {[
            { label: "Recipient Name", value: request.recipient_name },
            {
              label: "Location",
              value: `${request.recipient_district}, ${request.recipient_upazila}`,
            },
            { label: "Donation Date", value: request.donation_date },
            { label: "Donation Time", value: request.donation_time },
            { label: "Blood Group", value: request.blood_group },
            { label: "Status", value: request.donation_status },
          ].map((field) => (
            <div
               key={field.label}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm"
            >
              <span className="font-medium text-gray-700">{field.label}:</span>
              <span className="text-gray-800">{field.value || "-"}</span>
            </div>
          ))}
        </div>
      </div>
    );
 };
 
 export default ViewDetails;