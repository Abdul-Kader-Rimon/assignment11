import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <section className="min-h-screen bg-gray-50/50 py-16 md:py-20 px-5 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-4xl   font-bold text-center text-[#422AD5] mb-10 md:mb-14"
        >
          Contact Us
        </motion.h1>

        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-8 md:p-12 lg:p-16 border border-[#422AD5]/10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-700 text-center mb-10 md:mb-12 leading-relaxed"
          >
            Have a question, need urgent help, or want to share feedback? We're here for you — always.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-10 md:gap-12 mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-[#422AD5] mb-6 flex items-center gap-4">
                <Mail className="w-8 h-8 md:w-10 md:h-10" /> Get in Touch
              </h3>
              <ul className="space-y-5 md:space-y-6 text-gray-700 text-base md:text-lg">
                <li className="flex items-center gap-4"><Mail className="text-[#422AD5] w-6 h-6 md:w-7 md:h-7" /> support@bloodcare-bd.com</li>
                <li className="flex items-center gap-4"><Phone className="text-[#422AD5] w-6 h-6 md:w-7 md:h-7" /> +880 1234-567890 (9 AM – 10 PM)</li>
                <li className="flex items-center gap-4"><MapPin className="text-[#422AD5] w-6 h-6 md:w-7 md:h-7" /> Dhaka, Bangladesh</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-[#422AD5] mb-6">Quick Links</h3>
              <ul className="space-y-4 md:space-y-5 text-base md:text-lg">
                <li><a href="/help" className="text-[#422AD5] hover:text-[#351fa8] hover:underline transition">Help & FAQ</a></li>
                <li><a href="/privacy" className="text-[#422AD5] hover:text-[#351fa8] hover:underline transition">Privacy Policy</a></li>
                <li><a href="/terms" className="text-[#422AD5] hover:text-[#351fa8] hover:underline transition">Terms of Service</a></li>
              </ul>
            </motion.div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full p-4 md:p-5 border border-gray-300 rounded-xl focus:border-[#422AD5] focus:ring-2 focus:ring-[#422AD5]/30 outline-none transition text-base md:text-lg"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 md:p-5 border border-gray-300 rounded-xl focus:border-[#422AD5] focus:ring-2 focus:ring-[#422AD5]/30 outline-none transition text-base md:text-lg"
              required
            />
            <textarea
              rows={5}
              placeholder="Your Message / Query..."
              className="w-full p-4 md:p-5 border border-gray-300 rounded-xl focus:border-[#422AD5] focus:ring-2 focus:ring-[#422AD5]/30 outline-none transition text-base md:text-lg"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#422AD5] text-white py-4 md:py-5 rounded-xl font-semibold text-base md:text-lg hover:bg-[#351fa8] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
            >
              <Send className="w-6 h-6 md:w-7 md:h-7" /> Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;