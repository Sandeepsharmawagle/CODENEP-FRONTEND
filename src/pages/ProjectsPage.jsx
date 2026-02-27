import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProjects, submitEnquiry } from "../services/api";
import { ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProjectsPage = () => {
  const [data, setData] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", project: "", message: "" });
  const [formStatus, setFormStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects()
      .then(setData)
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitEnquiry(form);
      setFormStatus("success");
      setForm({ name: "", phone: "", email: "", project: "", message: "" });
    } catch {
      setFormStatus("error");
    } finally {
      setSending(false);
      setTimeout(() => setFormStatus(null), 4000);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl md:px-12">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-[42px]">
            {data?.sectionTitle || "Explore Properties"}
          </h1>
          <p className="mt-3 text-gray-500">
            Browse our complete collection of premium properties
          </p>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-16 bg-white">
        <div className="px-6 mx-auto max-w-7xl md:px-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data?.projects?.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="overflow-hidden transition-all duration-300 bg-white cursor-pointer group hover:shadow-lg rounded-xl"
              >
                <div className="relative overflow-hidden rounded-xl h-56">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="pt-4 pb-2">
                  <p className="text-sm text-gray-400">{project.location}</p>
                  <h3 className="mt-1 text-lg font-bold text-gray-900">
                    {project.title}
                  </h3>
                  <span className="inline-block px-3 py-1 mt-2 text-xs font-semibold text-amber-700 bg-amber-100 rounded">
                    {project.status}
                  </span>
                  <p className="mt-2 text-sm text-gray-500">{project.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="contact" className="py-16 bg-gray-100">
        <div className="px-6 mx-auto max-w-7xl md:px-12">
          <div className="grid overflow-hidden bg-white md:grid-cols-2 rounded-2xl shadow-sm">
            {/* Form */}
            <div className="px-8 py-10 md:px-12 md:py-14">
              <h2 className="mb-1 text-xl font-bold text-gray-900">Enquiry</h2>
              <p className="mb-8 text-xs text-gray-400">Reach out to us and we'll respond as soon as we can.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 text-sm text-gray-700 placeholder-amber-300 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-400 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 text-sm text-gray-700 placeholder-amber-300 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-400 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 text-sm text-gray-700 placeholder-amber-300 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-amber-400 transition-colors"
                />
                <div className="relative">
                  <select
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md appearance-none focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                  >
                    <option value="">Select a Project</option>
                    {data?.projects?.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                </div>
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 text-sm text-gray-700 placeholder-amber-300 bg-white border border-gray-200 rounded-md resize-none focus:outline-none focus:border-amber-400 transition-colors"
                />

                {formStatus === "success" && (
                  <p className="text-sm font-medium text-green-600">Enquiry submitted successfully!</p>
                )}
                {formStatus === "error" && (
                  <p className="text-sm font-medium text-red-500">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="px-7 py-2.5 text-sm font-bold text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {sending ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>

            {/* Image */}
            <div className="hidden md:block">
              <img
                src={data?.projects?.[0]?.enquiryImage || data?.projects?.[0]?.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=500&fit=crop"}
                alt="Property"
                className="object-cover w-full h-full rounded-r-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProjectsPage;
