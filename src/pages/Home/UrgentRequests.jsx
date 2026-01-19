// src/components/home/UrgentRequestsSection.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Droplet, MapPin, Clock } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router';

const UrgentRequestsSection = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://assignment11-beta.vercel.app/search-requests?status=pending')
      .then(res => {
        setRequests(res.data.slice(0, 6));
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#422AD5] mb-12"
        >
          Urgent Blood Requests
        </motion.h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {requests.map((req, i) => (
            <motion.div
              key={req._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-[#422AD5]/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Droplet className="w-10 h-10 text-[#422AD5]" />
                  <h3 className="text-2xl font-bold text-[#422AD5]">{req.blood_group}</h3>
                </div>

                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#422AD5]" />
                    {req.recipient_district}, {req.recipient_upazila}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#422AD5]" />
                    {new Date(req.createdAt).toLocaleString()}
                  </p>
                </div>

                <Link
                  to={`/donation-request/${req._id}`}
                  className="mt-6 block w-full bg-[#422AD5] text-white py-3 rounded-xl text-center font-medium hover:bg-[#351fa8] transition"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/all-pending-request"
            className="text-[#422AD5] font-semibold text-lg hover:underline"
          >
            View All Urgent Requests →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UrgentRequestsSection;