import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const ContactUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="w-11/12 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#422ad5]">
            Contact Us
          </h2>
          <p className="text-gray-600 mt-3">
            Have questions or want to get in touch? We’re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl md:text-4xl font-semibold text-[#422ad5] mb-4">
              Get in Touch
            </h3>

            <p className="text-gray-700 mb-6">
              If you need any help regarding blood donation or want to know more
              about our services, feel free to contact us.
            </p>

            <div className="space-y-4 text-gray-700">
              <p className="flex items-center gap-2">
                <FaPhoneAlt /> <span className="font-medium">Phone:</span>{" "}
                <span className="text-[#422ad5]">+880 1234-567890</span>
              </p>
              <p className="flex items-center gap-2">
                <MdEmail /> <span className="font-medium">Email:</span>{" "}
                <span className="text-[#422ad5]">
                  support@blooddonation.com
                </span>
              </p>
              <p className="flex items-center gap-2">
                <FaLocationDot /> <span className="font-medium">Address:</span>{" "}
                Dhaka, Bangladesh
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl md:text-4xl font-semibold text-[#422ad5] mb-6">
              Send Us a Message
            </h3>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full focus:border-[#422ad5]"
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full focus:border-[#422ad5]"
                required
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="textarea textarea-bordered w-full focus:border-[#422ad5]"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#422ad5] text-white py-3 rounded-full font-medium
                transition-all duration-300 hover:bg-[#341fb3] hover:shadow-lg active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
