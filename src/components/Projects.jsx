import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProjects } from "../services/api";
import "./Projects.css";

const statusConfig = {
  "Ready to Move": { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  "Sold Out": { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  "Under Construction": { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
};

const Projects = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects()
      .then((res) => {
        const projectData = res?.data || res;
        setData(projectData);
      })
      .catch((err) => console.log(err));
  }, []);

  const projects = data?.projects?.slice(0, 6) || [];

  return (
    <section id="projects" className=" custom-padding py-28 bg-gray-50">
      <div className="px-6 custom-padding mx-auto max-w-7xl md:px-12">
        {/* Section Header — no "OUR PROPERTIES" label */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-[42px] leading-tight">
              {data?.sectionTitle || "Explore Properties"}
            </h2>
          </div>
          <button
            onClick={() => navigate("/projects")}
            className=" custom-padding3 flex-shrink-0 px-6 py-3 text-sm font-bold text-amber-600 border-2 border-amber-500 rounded-full hover:bg-amber-500 hover:text-white transition-all"
          >
            View All Projects →
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const sc = statusConfig[project.status] || statusConfig["Under Construction"];
            return (
              <div
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-52">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Status Badge on Image */}
                  <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${sc.bg} ${sc.text} shadow-sm`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    {project.status}
                  </div>
                  {/* Price on Image */}
                  {project.price && (
                    <div className="absolute bottom-3 right-3 bg-gray-900/80 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                      {project.price}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-xs text-gray-400 flex items-center gap-1 mb-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {project.location}
                  </p>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                    {project.title}
                  </h3>

                  {/* Quick Stats */}
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                    {project.bedrooms && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        🛏 {project.bedrooms} BHK
                      </span>
                    )}
                    {project.area && (
                      <span className="text-xs text-gray-500">
                        📐 {project.area}
                      </span>
                    )}
                    {project.type && (
                      <span className="ml-auto text-xs font-semibold text-gray-400">{project.type}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-24 pb-6">
          <button
            onClick={() => navigate("/projects")}
            className="px-10 py-3.5 text-sm font-bold text-white bg-amber-500 rounded-full hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5 cursor-pointer"
          >
            Explore All Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
