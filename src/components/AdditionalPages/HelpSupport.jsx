import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, Phone, Mail, Shield, Clock, Search, Users } from 'lucide-react';
import { Link } from 'react-router';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 }
  }
};

const child = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const faqs = [
  {
    question: "How do I create a new blood donation request?",
    answer: "Log in to your dashboard → Click 'Create Request' → Fill in recipient details (name, blood group, location, hospital, urgency) → Submit. The request will appear in the pending list immediately and donors will be notified."
  },
  {
    question: "Is my personal information safe and private?",
    answer: "Yes. We use industry-standard encryption and strict access controls. Your phone number and exact address are only shared with verified, matched donors after your explicit consent. We never sell or misuse your data."
  },
  {
    question: "Who can see my blood donation requests?",
    answer: "Pending requests are publicly visible (without sensitive contact info) so donors can find and respond quickly. Full details (phone, hospital name) are only shown to matched & approved donors."
  },
  {
    question: "How long does it usually take to find a donor?",
    answer: "It depends on your location, blood group rarity, and urgency — but many requests receive responses within 1–4 hours thanks to real-time notifications and smart matching."
  },
  {
    question: "What are the eligibility criteria to become a donor?",
    answer: "Age 18–65, weight ≥50 kg, good health, no recent tattoos/piercing (6 months), no major surgery in last 6 months, hemoglobin ≥12.5 g/dL (women) / ≥13.0 g/dL (men). Full guidelines are in your donor dashboard."
  },
  {
    question: "How can volunteers help on BloodCare?",
    answer: "Volunteers can view all active requests, update statuses (e.g., 'in-progress', 'completed'), coordinate between donors & recipients, and assist admins. Contact support to become a volunteer."
  },
  {
    question: "What should I do if my request is urgent (emergency)?",
    answer: "Mark it as 'Emergency' when creating the request. It gets priority in notifications. You can also call our support line (available 24/7) for faster assistance."
  },
  {
    question: "I forgot my password or can't log in",
    answer: "Click 'Forgot Password' on the login page → Enter your email → Follow the reset link sent to your inbox. If you still face issues, contact us immediately."
  }
];

const HelpSupport = () => {
  return (
    <section className="min-h-screen bg-gray-50/50 py-16 md:py-20 px-5 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
 
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-3xl md:text-4xl   font-bold text-center text-[#422AD5] mb-10 md:mb-14"
        >
          Help & Support
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-center text-gray-700 mb-12 md:mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          Find quick answers to the most common questions. If you can't find what you're looking for, our team is here to help 24/7.
        </motion.p>

      
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="space-y-6 md:space-y-8"
        >
          {faqs.map((faq, index) => (
            <motion.details
              key={index}
              variants={child}
              className="group bg-white rounded-2xl shadow-md border border-[#422AD5]/10 hover:border-[#422AD5]/30 transition-all duration-300 overflow-hidden"
            >
              <summary className="flex justify-between items-center p-6 md:p-8 cursor-pointer list-none">
                <div className="flex items-start gap-5">
                  <HelpCircle className="w-7 h-7 md:w-8 md:h-8 text-[#422AD5] mt-1 flex-shrink-0" strokeWidth={1.8} />
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-[#422AD5] transition-colors">
                    {faq.question}
                  </h3>
                </div>
                <span className="text-[#422AD5] text-3xl font-light group-open:rotate-45 transition-transform duration-300">
                  +
                </span>
              </summary>

              <div className="px-6 md:px-8 pb-6 md:pb-8 text-gray-700 text-base md:text-lg border-t border-gray-100 pt-5">
                {faq.answer}
              </div>
            </motion.details>
          ))}
        </motion.div>

 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 md:mt-20 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Still Need Help?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Our support team is available 24/7. Feel free to reach out — we're here to assist you.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="tel:+8801712345678"
              className="inline-flex items-center gap-3 bg-[#422AD5] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#351fa8] transition shadow-md hover:shadow-lg"
            >
              <Phone className="w-5 h-5" /> Call Support
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 border-2 border-[#422AD5] text-[#422AD5] px-8 py-4 rounded-xl font-semibold hover:bg-[#422AD5] hover:text-white transition"
            >
              <Mail className="w-5 h-5" /> Send Message
            </Link>
          </div>
        </motion.div>

      
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-10 border-t border-gray-200 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-6">Quick Links</h3>
          <div className="flex flex-wrap justify-center gap-6 text-[#422AD5]">
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
            <Link to="/about" className="hover:underline">About Us</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HelpSupport;