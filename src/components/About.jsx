import { useEffect, useState } from "react";
import { fetchAbout } from "../services/api";
import "./Projects.css";
const About = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAbout()
      .then((res) => {
        const aboutData = res?.data || res;
        setData(aboutData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section id="about" className="py-28 bg-white">
      <div className="grid items-center gap-16 px-6 mx-auto max-w-7xl md:grid-cols-2 md:px-12">
        {/* Left - Image Frame with Experience Inside */}
        <div className="flex items-center justify-center">
          <div
            className="relative h-[420px] w-full max-w-[380px] bg-cover bg-center"
            style={{ backgroundImage: `url(${data?.image})` }}
          >
            {/* White box overlay inside */}
            <div className="absolute inset-4 md:inset-6 flex flex-col items-center justify-center bg-white/90 border-[3px] border-gray-200">
              <h2 className="font-bold leading-none text-7xl md:text-8xl text-blue-950">
                {data?.experience}
              </h2>
              <p className="mt-4 text-xs font-semibold tracking-[4px] text-blue-950 uppercase text-center">
                Years of
                <br />
                Exper
                <span className="text-amber-500">ience</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right - Text Content */}
        <div>
          <p className="mb-2 custom-padding2 text-xs font-medium tracking-[4px] text-gray-400 uppercase">
            About Us
          </p>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-[42px]">
            {data?.title}
          </h2>
          <p className="mb-4 leading-relaxed text-gray-500 text-[15px]">
            {data?.description}
          </p>
          <p className="mb-8 leading-relaxed text-gray-500 text-[15px]">
            Let Guruji Homes guide you toward your next real estate success. Your dream home is waiting!
          </p>

          {/* Stats - only customers & sales */}
          <div className="flex gap-16 mb-10">
            <div>
              <h3 className="text-4xl font-bold text-blue-950">
                {data?.customers}
              </h3>
              <p className="mt-1 text-sm text-gray-400">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-950">
                {data?.sales}
              </h3>
              <p className="mt-1 text-sm text-gray-400">Successful Sales</p>
            </div>
          </div>

          <button
            onClick={() => {
              const el = document.querySelector("#projects");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block px-10 py-3.5 text-sm font-semibold tracking-wider text-gray-900 uppercase transition-all border-2 border-gray-900 cursor-pointer hover:bg-gray-900 hover:text-white"
          >
            Explore It
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;