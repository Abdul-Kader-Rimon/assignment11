import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Droplet } from 'lucide-react';

const messages = [
  "One donation = 3 lives saved",
  "Your blood can be someone's miracle",
  "Be the reason someone smiles today",
  "Every drop counts — donate now",
  "Blood has no substitute — only you can give it",
  "A hero doesn't always wear a cape — sometimes they donate blood",
  "Your blood can fight cancer, accidents, and childbirth emergencies",
];

const BloodDropWave = () => {
  const waveRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const wave = waveRef.current;
    const texts = textRefs.current;

    if (!wave || texts.length === 0) return;

    // Wave animation (continuous flow)
    gsap.to(wave, {
      attr: { d: "M0,160 C200,80 400,240 600,160 C800,80 1000,240 1200,160 L1200,320 L0,320 Z" },
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Messages flow from bottom to top
    texts.forEach((text, i) => {
      gsap.fromTo(
        text,
        { y: 400, opacity: 0 },
        {
          y: -400,
          opacity: 1,
          duration: 12,
          delay: i * 2,
          repeat: -1,
          ease: "none",
          onRepeat: () => {
            gsap.set(text, { y: 400, opacity: 0 });
          },
        }
      );
    });

    return () => {
      gsap.killTweensOf(wave);
      gsap.killTweensOf(texts);
    };
  }, []);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="  mx-auto px-5 lg:px-8 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#422AD5] mb-16 tracking-tight">
          Every Drop Tells a Story
        </h2>

     
        <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden bg-white shadow-2xl border border-gray-200">
        
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1200 320"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#422AD5" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#422AD5" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#422AD5" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <path
              ref={waveRef}
              fill="url(#waveGradient)"
              d="M0,160 C200,80 400,240 600,160 C800,80 1000,240 1200,160 L1200,320 L0,320 Z"
            />
          </svg>

 
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {messages.map((msg, i) => (
              <div
                key={i}
                ref={el => (textRefs.current[i] = el)}
                className="text-center px-6 py-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#422AD5]/20 max-w-lg mx-auto transform"
              >
                <Droplet className="w-6 h-6 text-[#422AD5] mx-auto mb-2" />
                <p className="text-lg md:text-xl font-medium text-gray-800">
                  {msg}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center mt-10 text-gray-600 italic text-lg">
          Your donation creates waves of hope — join the flow today.
        </p>
      </div>
    </section>
  );
};

export default BloodDropWave;