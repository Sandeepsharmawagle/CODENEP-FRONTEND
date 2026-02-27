import { useEffect, useState, useRef } from "react";
import { Plus, Pencil, Trash2, Search, X, Upload, Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { fetchProjects, createProject, updateProjectById, deleteProjectById } from "../../services/api";

const STATUS_OPTIONS = ["Under Construction", "Ready to Move", "Sold Out"];
const TYPE_OPTIONS = ["Apartment", "Villa", "Plot", "Commercial"];

const EMPTY_PROJECT = {
    title: "", location: "", price: "", type: "Apartment", status: "Under Construction",
    area: "", bedrooms: "", bathrooms: "", developer: "", possession: "",
    about: "", aboutDetails: "", image: "", bannerImage: "", aboutImage: "", enquiryImage: "",
    amenities: "", gallery: "", floorPlans: "",
};

function Toast({ msg, type, onClose }) {
    useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
    return (
        <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-white text-sm font-medium ${type === "success" ? "bg-green-600" : "bg-red-600"}`}>
            {type === "success" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
            {msg}
            <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={14} /></button>
        </div>
    );
}

function ProjectModal({ project, onClose, onSaved }) {
    const [form, setForm] = useState(project || EMPTY_PROJECT);
    const [files, setFiles] = useState({});
    const [saving, setSaving] = useState(false);
    const isEdit = !!project?.id;

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) setFiles((prev) => ({ ...prev, [field]: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => {
                if (v !== undefined && v !== null) fd.append(k, v);
            });
            Object.entries(files).forEach(([k, file]) => fd.append(k, file));

            if (isEdit) {
                await updateProjectById(project.id, fd);
            } else {
                await createProject(fd);
            }
            onSaved(`Project ${isEdit ? "updated" : "created"} successfully!`);
        } catch (err) {
            onSaved(err?.response?.data?.message || "Failed to save project", "error");
        } finally {
            setSaving(false);
        }
    };

    const inputCls = "w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500";
    const labelCls = "block text-xs font-medium text-gray-400 mb-1.5";

    const ImageField = ({ label, field }) => (
        <div>
            <label className={labelCls}>{label}</label>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Image URL or upload below"
                    value={form[field] || ""}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className={inputCls + " flex-1"}
                />
                <label className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-xl text-xs text-gray-300 cursor-pointer transition-all">
                    <Upload size={14} />
                    {files[field] ? files[field].name.slice(0, 10) + "…" : "Upload"}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, field)} />
                </label>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
                    <h2 className="text-lg font-bold text-white">{isEdit ? "Edit Project" : "Add New Project"}</h2>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all">
                        <X size={16} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Basic Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className={labelCls}>Project Title *</label>
                            <input required placeholder="e.g. Whispering Heights" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Location *</label>
                            <input required placeholder="Sector 88, Faridabad" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Price</label>
                            <input placeholder="₹1.5 Cr" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Type</label>
                            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputCls}>
                                {TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelCls}>Status</label>
                            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputCls}>
                                {STATUS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelCls}>Area</label>
                            <input placeholder="2468 Sq. Ft." value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Bedrooms</label>
                            <input placeholder="4" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Bathrooms</label>
                            <input placeholder="3" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Developer</label>
                            <input placeholder="GuruJi Homes Developers" value={form.developer} onChange={(e) => setForm({ ...form, developer: e.target.value })} className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Possession Date</label>
                            <input placeholder="Q4 2025" value={form.possession} onChange={(e) => setForm({ ...form, possession: e.target.value })} className={inputCls} />
                        </div>
                    </div>

                    {/* Images */}
                    <div className="border-t border-gray-800 pt-5">
                        <h3 className="text-sm font-semibold text-gray-300 mb-4">Images (URL or upload)</h3>
                        <div className="space-y-3">
                            <ImageField label="Card Image" field="image" />
                            <ImageField label="Banner Image (wide hero)" field="bannerImage" />
                            <ImageField label="About Section Image" field="aboutImage" />
                            <ImageField label="Enquiry Form Image" field="enquiryImage" />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="border-t border-gray-800 pt-5 space-y-3">
                        <h3 className="text-sm font-semibold text-gray-300 mb-1">Description</h3>
                        <div>
                            <label className={labelCls}>About the Project</label>
                            <textarea rows={3} placeholder="Describe the project..." value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} className={inputCls + " resize-none"} />
                        </div>
                        <div>
                            <label className={labelCls}>Additional Details (pricing, units etc.)</label>
                            <textarea rows={3} placeholder="3+1 BHK size 1975 sqft..." value={form.aboutDetails} onChange={(e) => setForm({ ...form, aboutDetails: e.target.value })} className={inputCls + " resize-none"} />
                        </div>
                    </div>

                    {/* Arrays */}
                    <div className="border-t border-gray-800 pt-5 space-y-3">
                        <h3 className="text-sm font-semibold text-gray-300 mb-1">Arrays (JSON format)</h3>
                        <div>
                            <label className={labelCls}>Amenities — comma-separated or JSON array</label>
                            <input placeholder='["Swimming Pool", "Gym", "Parking"]' value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Gallery URLs — JSON array of image URLs</label>
                            <textarea rows={2} placeholder='["https://...", "https://..."]' value={form.gallery} onChange={(e) => setForm({ ...form, gallery: e.target.value })} className={inputCls + " resize-none"} />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t border-gray-800 pt-5">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl transition-all">
                            Cancel
                        </button>
                        <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50">
                            {saving ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : (isEdit ? "Save Changes" : "Create Project")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function AdminProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(null); // null | 'add' | project
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [toast, setToast] = useState(null);

    const loadProjects = () => {
        setLoading(true);
        fetchProjects()
            .then((res) => {
                const data = res?.data || res;
                setProjects(data?.projects || []);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => { loadProjects(); }, []);

    const handleSaved = (msg, type = "success") => {
        setModal(null);
        setToast({ msg, type });
        loadProjects();
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await deleteProjectById(deleteTarget.id);
            setToast({ msg: "Project deleted successfully", type: "success" });
            loadProjects();
        } catch {
            setToast({ msg: "Failed to delete project", type: "error" });
        } finally {
            setDeleting(false);
            setDeleteTarget(null);
        }
    };

    const filtered = projects.filter((p) =>
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.location?.toLowerCase().includes(search.toLowerCase())
    );

    const statusColor = (status) => {
        if (status === "Ready to Move") return "bg-green-500/10 text-green-400 border-green-500/20";
        if (status === "Sold Out") return "bg-red-500/10 text-red-400 border-red-500/20";
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    };

    return (
        <div className="p-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-2xl font-bold text-white">Projects</h1>
                    <p className="text-sm text-gray-400 mt-1">{projects.length} total properties</p>
                </div>
                <button
                    onClick={() => setModal("add")}
                    className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20"
                >
                    <Plus size={18} />
                    Add Project
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-8">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
            </div>

            {/* Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20 text-gray-400 gap-3">
                        <Loader2 className="animate-spin" size={20} />
                        Loading projects...
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No projects found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-800">
                                <tr className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                    <th className="px-5 py-4 text-left">Property</th>
                                    <th className="px-5 py-4 text-left">Type</th>
                                    <th className="px-5 py-4 text-left">Status</th>
                                    <th className="px-5 py-4 text-left">Price</th>
                                    <th className="px-5 py-4 text-left">Area</th>
                                    <th className="px-5 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {filtered.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-800/50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {p.image ? (
                                                    <img src={p.image} alt={p.title} className="w-12 h-10 object-cover rounded-lg flex-shrink-0" />
                                                ) : (
                                                    <div className="w-12 h-10 bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center text-gray-500">
                                                        <span className="text-xs">No img</span>
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-sm font-semibold text-white">{p.title}</p>
                                                    <p className="text-xs text-gray-500">{p.location}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-gray-300">{p.type}</td>
                                        <td className="px-5 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColor(p.status)}`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-gray-300">{p.price || "—"}</td>
                                        <td className="px-5 py-4 text-sm text-gray-300">{p.area || "—"}</td>
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setModal(p)}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg transition-all"
                                                >
                                                    <Pencil size={12} />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => setDeleteTarget(p)}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={12} />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {modal && (
                <ProjectModal
                    project={modal === "add" ? null : modal}
                    onClose={() => setModal(null)}
                    onSaved={handleSaved}
                />
            )}

            {/* Delete Confirmation */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
                        <div className="flex items-center justify-center w-14 h-14 bg-red-500/10 rounded-full mx-auto mb-4">
                            <Trash2 size={24} className="text-red-400" />
                        </div>
                        <h2 className="text-lg font-bold text-white text-center mb-2">Delete Project?</h2>
                        <p className="text-sm text-gray-400 text-center mb-6">
                            Are you sure you want to delete <span className="text-white font-semibold">{deleteTarget.title}</span>? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 text-sm font-semibold text-gray-400 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all">
                                Cancel
                            </button>
                            <button onClick={handleDelete} disabled={deleting} className="flex-1 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                                {deleting ? <><Loader2 size={14} className="animate-spin" /> Deleting...</> : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
}
