import React from "react";
import { Link } from "react-router";
import Image1 from "../../assets/blood-donation-1.avif"
import Image2 from "../../assets/blood-donation-2.avif"
import Image3 from "../../assets/blood-donation-3.avif"

const Featured = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="w-11/12 mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold  text-[#422ad5]">
          Featured
        </h2>
        <p className="text-gray-600 mt-2">
          Explore ways to contribute and save lives through blood donation
        </p>
      </div>

      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link
          to="/all-pending-request"
          className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(66,42,213,0.35)]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-500 animate-[shine_2s_linear_infinite] pointer-events-none"></span>

          <div className="h-48 overflow-hidden rounded-t-xl">
            <img
              src={Image1}
              alt="Emergency Blood Requests"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <div className="p-6 flex flex-col gap-3 relative z-10">
            <h3 className="text-2xl font-bold text-[#422ad5]">
              Emergency Blood Requests
            </h3>
            <p className="text-gray-700">
              Find urgent blood requests in your area and help save lives
              immediately.
            </p>
            <span className="font-medium underline text-[#422ad5] mt-2">
              Learn More →
            </span>
          </div>
        </Link>
        <Link
          to="/register"
          className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(66,42,213,0.35)]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-500 animate-[shine_2s_linear_infinite] pointer-events-none"></span>

          <div className="h-48 overflow-hidden rounded-t-xl">
            <img
              src={Image2}
              alt="Emergency Blood Requests"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <div className="p-6 flex flex-col gap-3 relative z-10">
            <h3 className="text-2xl font-bold text-[#422ad5]">
              Join as a Donor
            </h3>
            <p className="text-gray-700">
              Become a registered donor and contribute to saving lives
              regularly.
            </p>
            <span className="font-medium underline text-[#422ad5] mt-2">
              Learn More →
            </span>
          </div>
        </Link>

        <Link
          to="/donate"
          className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(66,42,213,0.35)]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-500 animate-[shine_2s_linear_infinite] pointer-events-none"></span>

          <div className="h-48 overflow-hidden rounded-t-xl">
            <img
              src={Image3}
              alt="Blood Donation Events"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <div className="p-6 flex flex-col gap-3 relative z-10">
            <h3 className="text-2xl font-bold text-[#422ad5]">
              Donate for Blood Donation Events
            </h3>
            <p className="text-gray-700">
              Your contribution supports blood donation camps, emergency needs,
              and helps bring donors and patients together.
            </p>
            <span className="font-medium text-[#422ad5]  underline mt-2">
              Learn More →
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Featured;
