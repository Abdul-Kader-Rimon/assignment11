import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

 
gsap.registerPlugin(ScrollTrigger);

const compatibility = [
  { donor: "O-", canDonateTo: "Everyone", className: "bg-[#422AD5]/10 text-[#422AD5]" },
  { donor: "O+", canDonateTo: "O+, A+, B+, AB+", className: "bg-[#422AD5]/5 text-[#422AD5]" },
  { donor: "A-", canDonateTo: "A-, A+, AB-, AB+", className: "bg-[#422AD5]/10 text-[#422AD5]" },
  { donor: "A+", canDonateTo: "A+, AB+", className: "bg-[#422AD5]/5 text-[#422AD5]" },
  { donor: "B-", canDonateTo: "B-, B+, AB-, AB+", className: "bg-[#422AD5]/10 text-[#422AD5]" },
  { donor: "B+", canDonateTo: "B+, AB+", className: "bg-[#422AD5]/5 text-[#422AD5]" },
  { donor: "AB-", canDonateTo: "AB-, AB+", className: "bg-[#422AD5]/10 text-[#422AD5]" },
  { donor: "AB+", canDonateTo: "AB+", className: "bg-[#422AD5]/5 text-[#422AD5]" },
];

const BloodCompatibilitySection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;

  
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

   
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          scale: 1.04,
          boxShadow: "0 20px 40px rgba(66, 42, 213, 0.15)",
          duration: 0.4,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#422AD5] mb-16 tracking-tight">
          Blood Group Compatibility
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {compatibility.map((item, i) => (
            <div
              key={i}
              ref={el => (cardRefs.current[i] = el)}
              className={`p-6 rounded-2xl text-center shadow-md border border-[#422AD5]/10 hover:border-[#422AD5]/30 transition-all duration-300 cursor-pointer ${item.className}`}
            >
              <h3 className="text-2xl font-bold mb-3">{item.donor}</h3>
              <p className="text-sm md:text-base font-medium opacity-90">Can donate to:</p>
              <p className="font-semibold mt-1">{item.canDonateTo}</p>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-gray-600 italic text-lg">
          O- is the universal donor. AB+ can receive from everyone.
        </p>
      </div>
    </section>
  );
};

export default BloodCompatibilitySection;