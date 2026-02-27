import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({ baseURL: API_BASE });
const AdminAPI = axios.create({ baseURL: API_BASE });

// Attach token to admin requests
AdminAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Public fetch helpers (unwrap {success, data})
const unwrap = (res) => res.data?.data || res.data;

// Navbar
export const fetchNavbar = () => API.get("/navbar").then(unwrap);
// Hero
export const fetchHero = () => API.get("/hero").then(unwrap);
// About
export const fetchAbout = () => API.get("/about").then(unwrap);
// Services
export const fetchServices = () => API.get("/services").then(unwrap);
// Projects
export const fetchProjects = () => API.get("/projects").then(unwrap);
export const fetchProjectById = (id) => API.get(`/projects/${id}`).then(unwrap);
// Testimonials
export const fetchTestimonials = () => API.get("/testimonials").then(unwrap);
// Contact
export const fetchContact = () => API.get("/contact").then(unwrap);
export const submitEnquiry = (data) => API.post("/contact/enquiry", data).then(unwrap);
// Footer
export const fetchFooter = () => API.get("/footer").then(unwrap);

// --- Admin Auth ---
export const adminLogin = (data) => API.post("/auth/login", data).then((res) => res.data);

// --- Admin Project CRUD ---
export const createProject = (formData) =>
  AdminAPI.post("/projects", formData, { headers: { "Content-Type": "multipart/form-data" } }).then(unwrap);

export const updateProjectById = (id, formData) =>
  AdminAPI.put(`/projects/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } }).then(unwrap);

export const deleteProjectById = (id) =>
  AdminAPI.delete(`/projects/${id}`).then(unwrap);

export default API;