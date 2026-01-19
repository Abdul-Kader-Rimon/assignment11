import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Users, Droplet, HandHeart } from 'lucide-react';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Heart, value: 1450, label: "Lives Saved", suffix: "+" },
  { icon: Users, value: 4872, label: "Active Donors" },
  { icon: Droplet, value: 3219, label: "Requests Fulfilled" },
  { icon: HandHeart, value: 870000, label: "Funds Raised", prefix: "৳", suffix: "" },
];

const StatsSection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;

    // Reveal animation on scroll
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Count-up animation for numbers
    cards.forEach((card, i) => {
      const numberElement = card.querySelector('.stat-number');
      if (numberElement) {
        const targetValue = stats[i].value;
        gsap.to(numberElement, {
          textContent: targetValue,
          duration: 2.5,
          snap: { textContent: 1 },
          ease: "power1.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
          onUpdate: function () {
            numberElement.textContent = Math.round(this.targets()[0].textContent);
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl   font-bold text-center text-[#422AD5] mb-16 md:mb-20 tracking-tight">
          Our Real Impact
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={el => (cardRefs.current[index] = el)}
              className="group relative bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100 hover:border-[#422AD5]/30 hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#422AD5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#422AD5]/10 mb-6 mx-auto transition-transform group-hover:scale-110 duration-500">
                  <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-[#422AD5]" strokeWidth={1.6} />
                </div>

                <h3 className="text-xl md:text-3xl lg:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                  <span className="stat-number">
                    {stat.prefix || ''}
                    {stat.value}
                    {stat.suffix || ''}
                  </span>
                </h3>

                <p className="text-lg md:text-xl text-gray-600 font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;