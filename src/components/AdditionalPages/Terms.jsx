import React from 'react';
import { motion } from 'framer-motion';
import { Scale, AlertTriangle, Heart, FileCheck } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const Terms = () => {
  return (
    <section className="min-h-screen bg-gray-50/50 py-16 md:py-20 px-5 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-3xl md:text-4xl   font-bold text-center text-[#422AD5] mb-6 md:mb-10"
        >
          Terms of Service
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-600 mb-12 md:mb-16 text-lg"
        >
          Last updated: January 19, 2026
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="prose prose-lg md:prose-xl max-w-none text-gray-700 space-y-8 md:space-y-10"
        >
          <motion.p variants={child}>
            Welcome to BloodCare. These Terms of Service govern your use of our platform. By accessing or using BloodCare, you agree to be bound by these terms. If you do not agree, please do not use the service.
          </motion.p>

          <motion.section variants={child}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#422AD5] mb-6 flex items-center gap-4">
              <Scale className="w-9 h-9 md:w-10 md:h-10" strokeWidth={1.6} /> 1. Eligibility & Account
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-base md:text-lg">
              <li>You must be at least 18 years old (or have parental/guardian consent) to register.</li>
              <li>You are responsible for maintaining the confidentiality of your account and password.</li>
              <li>Provide accurate information — false information may lead to account suspension.</li>
            </ul>
          </motion.section>

          <motion.section variants={child}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#422AD5] mb-6 flex items-center gap-4">
              <Heart className="w-9 h-9 md:w-10 md:h-10" strokeWidth={1.6} /> 2. Donation & Matching Process
            </h2>
            <p className="mb-4">
              BloodCare is a <strong>connecting platform only</strong>. We do not:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-base md:text-lg">
              <li>Perform medical screening, blood collection, or transfusion</li>
              <li>Guarantee donor availability or compatibility</li>
              <li>Take responsibility for the outcome of any donation</li>
            </ul>
            <p className="mt-4">
              All medical decisions must be made with qualified healthcare professionals.
            </p>
          </motion.section>

          <motion.section variants={child}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#422AD5] mb-6 flex items-center gap-4">
              <AlertTriangle className="w-9 h-9 md:w-10 md:h-10" strokeWidth={1.6} /> 3. User Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-base md:text-lg">
              <li>Provide truthful information in requests and profiles</li>
              <li>Do not harass, spam, or misuse the platform</li>
              <li>Respect privacy — do not share contact info outside approved matching</li>
              <li>Follow national blood donation guidelines and laws</li>
            </ul>
          </motion.section>

          <motion.section variants={child}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#422AD5] mb-6 flex items-center gap-4">
              <FileCheck className="w-9 h-9 md:w-10 md:h-10" strokeWidth={1.6} /> 4. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, BloodCare is not liable for any injury, loss, damage, or death arising from:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-base md:text-lg mt-4">
              <li>Use of the platform</li>
              <li>Any donation or matching facilitated through the service</li>
              <li>Technical issues, delays, or unavailability</li>
            </ul>
          </motion.section>

          <motion.p variants={child} className="italic text-gray-600 mt-12 text-center">
            These Terms are governed by the laws of Bangladesh. Disputes will be resolved in the courts of Dhaka.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Terms;