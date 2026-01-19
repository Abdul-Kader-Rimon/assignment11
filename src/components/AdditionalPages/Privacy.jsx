import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Users, FileText } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const Privacy = () => {
  return (
    <section className="min-h-screen bg-gray-50/50 py-16 md:py-20 px-5 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-3xl md:text-4xl  font-bold text-center text-[#422AD5] mb-6 md:mb-10"
        >
          Privacy Policy
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
            At BloodCare, your trust and privacy are our top priorities. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our platform (website and mobile app).
          </motion.p>

          <motion.section variants={child}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#422AD5] mb-6 flex items-center gap-4">
              <Shield className="w-9 h-9 md:w-10 md:h-10" strokeWidth={1.6} /> 1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-base md:text-lg">
              <li><strong>Personal Information</strong>: Name, email, phone number, blood group, district, upazila, date of birth (for eligibility), profile photo (optional).</li>
              <li><strong>Health-related Information</strong>: Only blood group and donation history — we do not store full medical records.</li>
              <li><strong>Technical Information</strong>: IP address, device type, browser, app usage data, location (approximate, only when searching or posting requests).</li>
              <li><strong>Payment Information</strong>: Handled securely by Stripe — we never store card details.</li>
            </ul>
          </motion.section>

          <motion.section variants={child}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#422AD5] mb-6 flex items-center gap-4">
              <Lock className="w-9 h-9 md:w-10 md:h-10" strokeWidth={1.6} /> 2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-base md:text-lg">
              <li>Connect donors with people in need (matching by blood group & location)</li>
              <li>Send important notifications (request matches, donation status updates)</li>
              <li>Improve platform features and prevent fraud/abuse</li>
              <li>Comply with legal obligations (Bangladesh laws on health data & digital platforms)</li>
            </ul>
          </motion.section>

          <motion.section variants={child}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#422AD5] mb-6 flex items-center gap-4">
              <Users className="w-9 h-9 md:w-10 md:h-10" strokeWidth={1.6} /> 3. Sharing of Information
            </h2>
            <p className="mb-4">
              We do <strong>not</strong> sell your personal data. Limited sharing occurs only in these cases:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-base md:text-lg">
              <li>With matched donors/recipients (after verification & consent)</li>
              <li>With service providers (Stripe for payments, cloud hosting, analytics — under strict contracts)</li>
              <li>If required by law or to protect the safety of users</li>
            </ul>
          </motion.section>

          <motion.section variants={child}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#422AD5] mb-6 flex items-center gap-4">
              <FileText className="w-9 h-9 md:w-10 md:h-10" strokeWidth={1.6} /> 4. Your Rights
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-base md:text-lg">
              <li>Access, correct, or delete your personal data</li>
              <li>Withdraw consent for certain uses (may limit platform features)</li>
              <li>Request data portability (export of your profile)</li>
              <li>Contact us at support@bloodcare-bd.com to exercise these rights</li>
            </ul>
          </motion.section>

          <motion.p variants={child} className="italic text-gray-600 mt-12 text-center">
            By using BloodCare, you agree to this Privacy Policy. We may update it from time to time — significant changes will be notified via email or in-app notice.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Privacy;