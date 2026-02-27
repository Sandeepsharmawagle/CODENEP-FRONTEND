import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHero } from "../services/api";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [data, setData] = useState(null);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHero()
      .then((res) => {
        if (res) {
          setData(res);
          setTimeout(() => setAnimate(true), 300);
        }
      })
      .catch((err) => console.log("Error fetching hero:", err));
  }, []);

  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${data?.backgroundImage})` }}
    >
      {/* Multi-layer Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 px-6 text-center text-white max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-6 transition-all duration-700 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
          Premium Real Estate
        </div>

        {/* Title */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight transition-all duration-1000 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          {data?.title}
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-5 text-xl md:text-2xl font-light tracking-wide text-amber-300 transition-all duration-1000 delay-300 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          {data?.subtitle}
        </p>

        {/* Description */}
        <p
          className={`mt-4 text-sm md:text-base max-w-2xl mx-auto text-gray-300 leading-relaxed transition-all duration-1000 delay-500 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          {data?.description}
        </p>

        {/* Buttons */}
        <div
          className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <button
            onClick={() => scrollToSection(data?.ctaLink || "#projects")}
            className=" px-10 py-1 h-10 text-base font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-full transition-all shadow-xl shadow-amber-500/40 hover:shadow-amber-500/60 hover:-translate-y-0.5 cursor-pointer"
          >
            {data?.ctaText || "Explore Projects"}
          </button>
          <button
            onClick={() => {
              navigate("/projects");
              setTimeout(() => {
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 400);
            }}
            className=" px-10 py-1 h-10 text-base font-bold text-white border-2 border-white/40 rounded-full hover:bg-white/10 hover:border-white/70 transition-all hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm"
          >
            Contact Us
          </button>
        </div>
      </div>



      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection("#about")}
        className="absolute z-10 text-white cursor-pointer bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-60 hover:opacity-100 transition-opacity"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
};

export default Hero;