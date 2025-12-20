import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#422ad5] text-white pt-16">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4 ">BloodCare</h2>
            <p className="text-white/80 leading-relaxed">
              BloodCare is a community-driven platform dedicated to saving lives
              by connecting blood donors with those in need.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-pending-request"
                  className="hover:text-white transition"
                >
                  Donation Requests
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-white transition">
                  Search Donors
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-white transition">
                  Donate Funds
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link to="/register" className="hover:text-white transition">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-center gap-2"> <FaLocationDot /> Dhaka, Bangladesh</li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt /> +880 1234-567890
              </li>
              <li className="flex items-center gap-2">
                <MdEmail /> support@bloodcare.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 py-6 text-center text-white/80 text-sm">
          © {new Date().getFullYear()} BloodCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
