import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, ShieldCheck, Award, Droplet } from 'lucide-react';

 
gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Heart,
    title: "Save Multiple Lives",
    desc: "One donation can save up to 3 people — become a real lifesaver.",
  },
  {
    icon: ShieldCheck,
    title: "Free Health Check",
    desc: "Every donation includes a mini health screening (blood pressure, hemoglobin, etc.).",
  },
  {
    icon: Award,
    title: "Donor Recognition",
    desc: "Get certificates, badges, and community recognition for your contribution.",
  },
  {
    icon: Droplet,
    title: "Health Benefits",
    desc: "Reduce excess iron, improve circulation, and support heart health.",
  },
];

const WhyDonateSection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;

 
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        stagger: 0.15,
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
          y: -12,
          scale: 1.05,
          boxShadow: "0 25px 50px -12px rgba(66, 42, 213, 0.25)",
          duration: 0.5,
          ease: "power2.out",
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          duration: 0.5,
          ease: "power2.out",
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#422AD5] mb-16 tracking-tight">
          Why Donate Blood?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              ref={el => (cardRefs.current[i] = el)}
              className="group relative bg-white rounded-2xl shadow-lg p-8 border border-gray-100 overflow-hidden transition-all duration-500 hover:border-[#422AD5]/30"
            >
              
              <div className="absolute inset-0 bg-gradient-to-br from-[#422AD5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#422AD5]/10 mb-6 mx-auto transition-transform group-hover:scale-110 duration-500">
                  <benefit.icon className="w-8 h-8 text-[#422AD5]" strokeWidth={1.6} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 text-base leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDonateSection;