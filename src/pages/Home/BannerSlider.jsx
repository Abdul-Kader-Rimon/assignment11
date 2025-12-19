import { useEffect, useState } from "react";
import { Link } from "react-router";

const BannerSlider = () => {
  const slides = [
    "https://i.ibb.co.com/BHgPWskL/images-1.jpg",
    "https://i.ibb.co.com/chgWS0Y5/medical-blood-donation-testing-vector-illustration-1308-182435.avif",
    "https://i.ibb.co.com/prG1Dhc0/images-2.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {slides.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt="Blood Donation"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center">
        <div className="w-11/12 mx-auto text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fadeIn">
            Donate Blood, Save Lives
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join our community of blood donors and help people in need.
          </p>

          <div className="flex justify-center gap-6 mt-6">
            <Link
              to="/register"
              className="fancy-btn fancy-red px-10 py-3 bg-red-600 text-white font-semibold text-lg  hover:bg-red-700"
            >
              Join as a Donor 
            </Link>

            <Link
              to="/search"
              className=" fancy-btn fancy-outline px-10 py-3   border-2 border-white text-white font-semibold text-lg   hover:bg-white hover:text-red-600   "
            >
              Search Donors 
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === current ? "bg-red-500" : "bg-white/60"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default BannerSlider;
