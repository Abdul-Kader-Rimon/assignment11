import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Droplet, Users, ShieldCheck, Clock, UsersRound } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } }
};

const child = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const About = () => {
  return (
    <section className="min-h-screen bg-gray-50/50 py-16 md:py-20 px-5 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-3xl md:text-4xl   font-bold text-center text-[#422AD5] mb-10 md:mb-14 leading-tight"
        >
          About BloodCare
        </motion.h1>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="prose prose-lg md:prose-xl max-w-none text-gray-700 space-y-8 md:space-y-10"
        >
          <motion.p variants={child} className="text-lg md:text-xl leading-relaxed">
            BloodCare is a dedicated, community-driven platform that connects voluntary blood donors with patients in urgent need of blood transfusions across Bangladesh.
          </motion.p>

          <motion.p variants={child} className="text-lg md:text-xl leading-relaxed">
            Our sole mission is to ensure <span className="font-semibold text-[#422AD5]">no life is lost</span> due to the unavailability of timely blood matches. We make donation faster, safer, and more accessible for everyone.
          </motion.p>

          <motion.h2 variants={child} className="text-3xl md:text-4xl font-bold text-[#422AD5] mt-12 md:mt-16 mb-8 flex items-center gap-4">
            <HeartHandshake className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.6} />
            What We Provide
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Droplet, title: "Intelligent Matching", desc: "Search and connect donors instantly by blood group, district, and upazila." },
              { icon: Users, title: "Role-Based Dashboards", desc: "Personalized experiences for Donors, Volunteers, and Admins." },
              { icon: Clock, title: "Real-Time Requests", desc: "Create, update, and track urgent blood needs in real time." },
              { icon: ShieldCheck, title: "Privacy & Security", desc: "Your personal information is protected and shared only with consent." },
              { icon: UsersRound, title: "Community Driven", desc: "Thousands of verified donors ready to help save lives." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={child}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-[#422AD5]/10 hover:border-[#422AD5]/30 hover:shadow-xl transition-all duration-300 flex flex-col items-start gap-4"
              >
                <item.icon className="w-12 h-12 md:w-14 md:h-14 text-[#422AD5]" strokeWidth={1.7} />
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-base md:text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p variants={child} className="mt-12 md:mt-16 text-center text-xl md:text-2xl font-medium text-[#422AD5] italic">
            Every drop counts. Every connection saves a life.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;