import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchNavbar, fetchProjects } from "../services/api";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [data, setData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchNavbar()
      .then((res) => {
        const navData = res?.data || res;
        setData(navData);
      })
      .catch(console.log);

    fetchProjects()
      .then((res) => {
        const projData = res?.data || res;
        setProjects(projData.projects || []);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = (href) => {
    setMobileOpen(false);
    setDropdownOpen(false);

    // CONTACT now lives on /projects page
    if (href === "#contact") {
      if (location.pathname === "/projects") {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/projects");
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 400);
      }
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isSubPage = location.pathname.startsWith("/projects");
  const navBg = scrolled || isSubPage;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBg ? "bg-white shadow-lg py-2" : "bg-transparent py-4"
        }`}
    >
      <div className="flex items-center justify-between w-full px-6 mx-auto max-w-7xl lg:px-12">
        {/* Logo / Brand */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          className="flex items-center gap-2"
        >
          {data?.logo ? (
            <img src={data.logo} alt="logo" className="object-contain h-10" />
          ) : null}
          <div className="flex flex-col leading-tight">
            <span
              className={`text-lg font-bold tracking-wide ${navBg ? "text-gray-900" : "text-white"
                }`}
            >
              {data?.brandName || "GURUJI HOMES"}
            </span>
            <span
              className={`text-[9px] tracking-[2px] ${navBg ? "text-gray-400" : "text-gray-300"
                }`}
            >
              WHERE YOUR HOME DESIRE
            </span>
          </div>
        </a>

        {/* Desktop Links - right aligned */}
        <ul className="items-center hidden gap-10 text-sm font-semibold tracking-wider md:flex">
          {data?.links?.map((link, i) =>
            link.hasDropdown ? (
              <li key={i} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-1 transition-colors cursor-pointer hover:text-amber-500 ${navBg ? "text-gray-700" : "text-white"
                    }`}
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${dropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 z-50 py-2 mt-3 bg-white border border-gray-100 shadow-xl top-full rounded-xl min-w-56">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setMobileOpen(false);
                        navigate("/projects");
                      }}
                      className="block w-full px-5 py-2.5 text-left text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors cursor-pointer"
                    >
                      All Projects
                    </button>
                    {projects.slice(0, 5).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setDropdownOpen(false);
                          setMobileOpen(false);
                          navigate(`/projects/${p.id}`);
                        }}
                        className="block w-full px-5 py-2.5 text-left text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors cursor-pointer"
                      >
                        {p.title}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <li key={i}>
                <button
                  onClick={() => handleLinkClick(link.href)}
                  className={`transition-colors cursor-pointer hover:text-amber-500 ${navBg ? "text-gray-700" : "text-white"
                    }`}
                >
                  {link.label}
                </button>
              </li>
            )
          )}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className={navBg ? "text-gray-900" : "text-white"} size={28} />
          ) : (
            <Menu className={navBg ? "text-gray-900" : "text-white"} size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="px-6 pt-4 pb-6 bg-white shadow-lg md:hidden">
          <ul className="flex flex-col gap-4">
            {data?.links?.map((link, i) =>
              link.hasDropdown ? (
                <li key={i}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-sm font-semibold tracking-wider text-gray-700 uppercase transition-colors cursor-pointer hover:text-amber-500"
                  >
                    {link.label}
                  </button>
                  <ul className="pl-4 mt-2 space-y-2">
                    {projects.slice(0, 5).map((p) => (
                      <li key={p.id}>
                        <button
                          onClick={() => {
                            setMobileOpen(false);
                            navigate(`/projects/${p.id}`);
                          }}
                          className="text-sm text-gray-500 transition-colors cursor-pointer hover:text-amber-500"
                        >
                          {p.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={i}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-sm font-semibold tracking-wider text-gray-700 uppercase transition-colors cursor-pointer hover:text-amber-500"
                  >
                    {link.label}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;