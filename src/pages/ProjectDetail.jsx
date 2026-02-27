import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProjectById, fetchProjects, submitEnquiry } from "../services/api";
import {
  MapPin, Waves, Dumbbell, Baby, Flower2, Home, ArrowUpFromLine,
  Car, ShieldCheck, Zap, Flame, Lock, PersonStanding, Building2,
  Droplets, Cctv, TreePine, CircleDot, Users, ShoppingCart,
  Droplet, ShieldAlert, Trees, CookingPot, Gem, Smartphone, TrainFront,
  CircleParking, Phone, Leaf, Drama, Bike, BookOpen, Wifi,
  User, Mail, MessageSquare, Send
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const amenityIcons = {
  "Swimming Pool": Waves,
  "Badminton Court": CircleDot,
  "Play Area": Baby,
  "Yoga Deck": Flower2,
  "Gymnasium": Dumbbell,
  "Club House": Home,
  "Lift": ArrowUpFromLine,
  "Parking": Car,
  "Security": ShieldCheck,
  "Power Backup": Zap,
  "Fire Sprinklers": Flame,
  "24x7 Security": Lock,
  "Gym": Dumbbell,
  "Jogging Track": PersonStanding,
  "Community Hall": Building2,
  "Rain Water Harvesting": Droplets,
  "CCTV Surveillance": Cctv,
  "Landscaped Gardens": TreePine,
  "Tennis Court": CircleDot,
  "Multipurpose Hall": Building2,
  "Senior Citizen Area": Users,
  "Shopping Complex": ShoppingCart,
  "24/7 Water Supply": Droplet,
  "Fire Safety": ShieldAlert,
  "Private Garden": Trees,
  "Modular Kitchen": CookingPot,
  "Italian Marble": Gem,
  "Home Automation": Smartphone,
  "Metro Connectivity": TrainFront,
  "Covered Parking": CircleParking,
  "Intercom": Phone,
  "Green Landscape": Leaf,
  "Yoga Area": Flower2,
  "Amphitheatre": Drama,
  "Cycling Track": Bike,
  "Library": BookOpen,
  "Wi-Fi Campus": Wifi,
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", phone: "", email: "", project: "", message: "" });
  const [formStatus, setFormStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjectById(id)
      .then((res) => {
        const projData = res?.data || res;
        setProject(projData);
        setForm((f) => ({ ...f, project: projData?.title || "" }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
    fetchProjects()
      .then((res) => {
        const list = (res?.data || res)?.projects || [];
        setAllProjects(list);
      })
      .catch(() => { });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitEnquiry({ ...form });
      setFormStatus("success");
      setForm({ name: "", phone: "", email: "", project: project?.title || "", message: "" });
    } catch {
      setFormStatus("error");
    } finally {
      setSending(false);
      setTimeout(() => setFormStatus(null), 4000);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-10 h-10 border-4 rounded-full border-amber-500 border-t-transparent animate-spin"></div>
        </div>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold text-gray-900">Project Not Found</h2>
          <a href="/" className="mt-4 text-amber-500 hover:underline">Go back home</a>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section
        className="relative flex items-end min-h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${project.bannerImage || project.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="relative z-10 w-full px-6 pb-10 mx-auto max-w-7xl md:px-12">
          <div className="inline-block px-6 py-4 bg-gray-900/80 backdrop-blur-sm rounded-lg">
            <h1 className="text-2xl font-bold text-white md:text-3xl">
              {project.title}
            </h1>
            <p className="flex items-center gap-1 mt-1 text-sm text-gray-300">
              <MapPin size={14} />
              {project.location}
            </p>
          </div>
        </div>
      </section>

      {/* About Section - image + text side by side */}
      <section className="py-16 bg-white">
        <div className="px-6 mx-auto max-w-7xl md:px-12">
          <h2 className="inline-block pb-3 mb-10 text-3xl font-bold text-gray-900 border-b-2 border-gray-900">
            About
          </h2>
          <div className="grid items-start gap-12 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg">
              <img
                src={project.aboutImage || project.image}
                alt={project.title}
                className="object-cover w-full h-[350px]"
              />
            </div>
            <div>
              <p className="leading-relaxed text-gray-600">{project.about}</p>
              {project.aboutDetails && (
                <div className="mt-6 space-y-1">
                  {project.aboutDetails.split("\n").map((line, i) => (
                    <p key={i} className="text-sm text-gray-700">{line}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      {project.amenities && project.amenities.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="px-6 mx-auto max-w-7xl md:px-12">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Amenities</h2>
              <p className="mt-2 text-sm text-gray-500">
                Discover the features that make {project.title} exceptional
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {project.amenities.map((item, i) => {
                const IconComponent = amenityIcons[item] || ShieldCheck;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-md hover:border-amber-200 transition-all"
                  >
                    <IconComponent size={18} className="text-amber-500 flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-700 truncate">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Floor Plans */}
      {project.floorPlans && project.floorPlans.length > 0 && (
        <section className="py-16 bg-white">
          <div className="px-6 mx-auto max-w-7xl md:px-12">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Floor Plan</h2>
              <p className="mt-2 text-sm text-gray-500">
                {project.title} in {project.location}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {project.floorPlans.map((plan, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl group"
                >
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="object-cover w-full h-[350px]"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-amber-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-6 text-white">
                      <h3 className="text-lg font-bold">{plan.title}</h3>
                      <p className="mt-1 text-sm text-white/90">{plan.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="px-6 mx-auto max-w-7xl md:px-12">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Gallery</h2>
              <p className="mt-2 text-sm text-gray-500">
                {project.title} in {project.location}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((img, i) => (
                <div key={i} className="overflow-hidden rounded-xl">
                  <img
                    src={img}
                    alt={`${project.title} gallery ${i + 1}`}
                    className="object-cover w-full h-56 transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enquiry Form */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-6xl md:px-12">
          <div className="grid overflow-hidden bg-white md:grid-cols-2 rounded-3xl shadow-xl border border-gray-100">
            {/* Form Side */}
            <div className="px-10 py-14 md:px-14 md:py-16">
              {/* Header */}
              <div className="mb-10">
                <p className="text-xs font-bold tracking-[4px] text-amber-500 uppercase mb-3">Get In Touch</p>
                <h2 className="text-3xl font-bold text-gray-900">Enquire About This Property</h2>
                <p className="mt-2 text-sm text-gray-400">Fill in your details and we'll get back to you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Your Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-4 text-base text-gray-800 placeholder-gray-300 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-4 text-base text-gray-800 placeholder-gray-300 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Email Address *</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-4 text-base text-gray-800 placeholder-gray-300 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all"
                  />
                </div>

                {/* Project dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Interested In</label>
                  <select
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    className="w-full px-4 py-4 text-base text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all cursor-pointer"
                  >
                    <option value="">Select a project...</option>
                    {allProjects.map((p) => (
                      <option key={p._id} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Message</label>
                  <textarea
                    placeholder="Tell us what you're looking for..."
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-4 text-base text-gray-800 placeholder-gray-300 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all"
                  />
                </div>

                {/* Status Messages */}
                {formStatus === "success" && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm font-medium text-green-700">
                    ✓ Enquiry submitted successfully! We'll contact you soon.
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm font-medium text-red-600">
                    ✕ Something went wrong. Please try again.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 text-base font-bold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>Send Enquiry →</>
                  )}
                </button>
              </form>
            </div>

            {/* Image Side */}
            <div className="hidden md:block relative">
              <img
                src={project.enquiryImage || project.image}
                alt={project.title}
                className="object-cover w-full h-full"
              />
              {/* Overlay with project info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                <div>
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">{project.type}</p>
                  <h3 className="text-white text-xl font-bold">{project.title}</h3>
                  <p className="text-white/80 text-sm mt-1">{project.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </>
  );
};

export default ProjectDetail;
