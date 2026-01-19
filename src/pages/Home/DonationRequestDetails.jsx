import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import axios from 'axios';
import { MapPin, Droplet, Clock, User, AlertCircle } from 'lucide-react';

const DonationRequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/donation-requests/public/${id}`);
        setRequest(response.data);
      } catch (err) {
        console.error("Error fetching request:", err);
        setError("Failed to load donation request details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#422AD5] text-xl">Loading details...</div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Request Not Found</h1>
        <p className="text-gray-600 mb-8 text-center">{error || "This donation request may not exist or has been removed."}</p>
        <Link 
          to="/pending-requests" 
          className="text-[#422AD5] hover:underline font-medium"
        >
          Back to All Requests
        </Link>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50/50 py-16 px-5 sm:px-8 lg:px-12"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
    
        <div className="bg-[#422AD5] text-white p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{request.recipient_name}</h1>
          <div className="flex items-center gap-3">
            <Droplet className="w-8 h-8" />
            <span className="text-2xl font-semibold">{request.blood_group}</span>
          </div>
        </div>

  
        <div className="p-8 md:p-10 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-[#422AD5]" /> Location
              </h3>
              <p className="text-gray-700 text-lg">
                {request.recipient_district}, {request.recipient_upazila}
              </p>
              {request.hospital_name && (
                <p className="text-gray-600 mt-2">Hospital: {request.hospital_name}</p>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-[#422AD5]" /> Posted On
              </h3>
              <p className="text-gray-700 text-lg">
                {new Date(request.createdAt).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          {request.additional_info && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Additional Information
              </h3>
              <p className="text-gray-700 leading-relaxed">{request.additional_info}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              to="/login"
              className="flex-1 bg-[#422AD5] text-white py-4 rounded-xl font-medium text-center hover:bg-[#351fa8] transition"
            >
              Login to Contact Donor
            </Link>
            <Link
              to="/pending-requests"
              className="flex-1 border-2 border-[#422AD5] text-[#422AD5] py-4 rounded-xl font-medium text-center hover:bg-[#422AD5] hover:text-white transition"
            >
              Back to Requests
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default DonationRequestDetails;