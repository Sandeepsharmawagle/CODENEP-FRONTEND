import { useEffect, useState } from "react";
import { fetchFooter, fetchProjects } from "../services/api";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [data, setData] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFooter()
      .then((res) => {
        const footerData = res?.data || res;
        setData(footerData);
      })
      .catch((err) => console.log(err));
    fetchProjects()
      .then((res) => {
        const list = (res?.data || res)?.projects || [];
        setProjects(list.slice(0, 6));
      })
      .catch(() => { });
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1a1a2e] border-t border-gray-800">
      {/* Main Footer */}
      <div className="px-6 mx-auto max-w-7xl md:px-12 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Logo + Brand */}
          <div>
            {/* Logo box */}
            <div className="flex flex-col items-start mb-4">
              <div className="flex items-center gap-2 mb-1">
                {/* House icon */}
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                    <path d="M8 22L24 8L40 22V40H30V30H18V40H8V22Z" fill="none" stroke="#d4a853" strokeWidth="3" strokeLinejoin="round" />
                    <rect x="20" y="30" width="8" height="10" fill="none" stroke="#d4a853" strokeWidth="2.5" />
                    <line x1="14" y1="40" x2="34" y2="40" stroke="#d4a853" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-extrabold text-white leading-none tracking-wide">
                    {data?.brandName || "GURUJI HOMES"}
                  </p>
                  <p className="text-[9px] text-gray-400 tracking-[2px] font-medium uppercase">
                    Where Your Dream Home Begins
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {data?.description || "Your trusted partner in creating beautiful and functional spaces."}
            </p>
          </div>

          {/* Col 2 — Information */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5">Information</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollTo("#about")}
                  className="text-sm text-gray-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="text-sm text-gray-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Enquiry
                </button>
              </li>
              {data?.quickLinks?.filter(l => !["Home", "About", "Projects", "Contact"].includes(l.label)).map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-gray-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Projects */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5">Projects</h4>
            <ul className="space-y-3">
              {projects.length > 0 ? projects.map((p) => (
                <li key={p._id}>
                  <button
                    onClick={() => navigate(`/projects/${p._id}`)}
                    className="text-sm text-gray-400 hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    {p.title}
                  </button>
                </li>
              )) : (
                <li>
                  <button
                    onClick={() => navigate("/projects")}
                    className="text-sm text-gray-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Residential
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5">Contact</h4>
            <div className="space-y-3 text-sm text-gray-400">
              {data?.contactInfo?.address && (
                <p className="leading-relaxed">{data.contactInfo.address}</p>
              )}
              {data?.contactInfo?.phone && (
                <p>
                  Phone:{" "}
                  <a href={`tel:${data.contactInfo.phone}`} className="hover:text-amber-600 transition-colors">
                    {data.contactInfo.phone}
                  </a>
                </p>
              )}
              {data?.contactInfo?.email && (
                <p>
                  <a href={`mailto:${data.contactInfo.email}`} className="hover:text-amber-600 transition-colors">
                    {data.contactInfo.email}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-700 py-4 px-6">
        <p className="text-xs text-gray-400 text-right max-w-7xl mx-auto md:px-12">
          {data?.copyright || `Copyright © ${new Date().getFullYear()} GuruJi Homes. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
