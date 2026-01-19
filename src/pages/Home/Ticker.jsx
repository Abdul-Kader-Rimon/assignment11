import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Droplet } from 'lucide-react';

const facts = [
  "Every 2 seconds, someone in the world needs blood — one donation can save up to 3 lives.",
  "Blood cannot be manufactured — it can only come from generous voluntary donors.",
  "WHO recommends at least 1% of the population should donate blood regularly to ensure a safe supply.",
  "A single platelet donation can help up to 3 cancer patients or accident victims.",
  "Donating blood is completely safe — your body replaces the donated volume within 24–48 hours.",
  "Regular donors have a lower risk of heart disease due to reduced iron levels.",
  "O-negative blood is the universal donor type — it can be given to anyone in emergencies.",
  "Voluntary unpaid blood donation is the safest way to maintain a reliable blood supply.",
  "One unit of blood can help patients with thalassemia, anemia, or during childbirth complications.",
  "World Blood Donor Day is celebrated on 14 June to thank lifesaving blood donors worldwide.",
];

const TickerSection = () => {
  const tickerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const ticker = tickerRef.current;

    if (!wrapper || !ticker) return;

    
    const originalContent = ticker.innerHTML;
    ticker.innerHTML = originalContent + originalContent + originalContent;

    const totalWidth = ticker.scrollWidth / 3;  

   
    gsap.to(ticker, {
      x: -totalWidth,
      duration: 60,  
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth),
      },
    });

 
    const pauseTween = () => gsap.to(ticker, { paused: true });
    const resumeTween = () => gsap.to(ticker, { paused: false });

    wrapper.addEventListener('mouseenter', pauseTween);
    wrapper.addEventListener('mouseleave', resumeTween);

  
    return () => {
      gsap.killTweensOf(ticker);
      wrapper.removeEventListener('mouseenter', pauseTween);
      wrapper.removeEventListener('mouseleave', resumeTween);
    };
  }, []);

  return (
    <section className="  mt-8 overflow-hidden relative">
       

      <div className="relative z-20   mx-auto px-5">
        <h3 className="text-3xl md:text-4xl font-bold text-[#422ad5] text-center mb-5 opacity-90 tracking-wide">
          Blood Donation Facts
        </h3>

        <div
          ref={wrapperRef}
          className="relative overflow-hidden whitespace-nowrap cursor-default select-none py-4"
        >
          <div
            ref={tickerRef}
            className="inline-block text-base md:text-lg lg:text-xl font-medium tracking-wide"
            style={{ willChange: 'transform' }}
          >
            {facts.map((fact, i) => (
              <span
                key={i}
                className="mx-16 inline-flex items-center gap-4 hover:scale-105 transition-transform duration-300"
              >
                <Droplet className="w-5 h-5 md:w-6 md:h-6 text-white opacity-90" />
                {fact}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TickerSection;