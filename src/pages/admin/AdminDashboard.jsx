import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, TrendingUp, CheckCircle, Clock, Plus, ArrowRight, Pencil, Trash2, Loader2, X } from "lucide-react";
import { fetchProjects, deleteProjectById } from "../../services/api";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ total: 0, underConstruction: 0, ready: 0, villas: 0 });
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    const navigate = useNavigate();
    const email = localStorage.getItem("adminEmail") || "Admin";
    const name = email.split("@")[0];

    const loadProjects = () => {
        setLoading(true);
        fetchProjects()
            .then((res) => {
                const list = (res?.data || res)?.projects || [];
                setProjects(list);
                setStats({
                    total: list.length,
                    underConstruction: list.filter((p) => p.status === "Under Construction").length,
                    ready: list.filter((p) => p.status === "Ready to Move").length,
                    villas: list.filter((p) => p.type === "Villa").length,
                });
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => { loadProjects(); }, []);

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await deleteProjectById(deleteTarget._id);
            setDeleteTarget(null);
            loadProjects();
        } catch {
            alert("Failed to delete project");
        } finally {
            setDeleting(false);
        }
    };

    const cards = [
        {
            label: "Total Properties",
            value: stats.total,
            icon: Building2,
            color: "bg-amber-100 text-amber-600",
            change: "+12%",
        },
        {
            label: "Under Construction",
            value: stats.underConstruction,
            icon: Clock,
            color: "bg-blue-100 text-blue-600",
            change: "+23%",
        },
        {
            label: "Ready to Move",
            value: stats.ready,
            icon: CheckCircle,
            color: "bg-green-100 text-green-600",
            change: "+8%",
        },
        {
            label: "Villas",
            value: stats.villas,
            icon: TrendingUp,
            color: "bg-purple-100 text-purple-600",
            change: "+15%",
        },
    ];

    const statusColor = (status) => {
        if (status === "Ready to Move") return "bg-green-100 text-green-700";
        if (status === "Sold Out") return "bg-red-100 text-red-700";
        return "bg-amber-100 text-amber-700";
    };

    const filtered = activeTab === "all"
        ? projects
        : projects.filter((p) => p.status === "Under Construction");

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#0d9488] to-[#0891b2] px-10 py-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Welcome back, {name.charAt(0).toUpperCase() + name.slice(1)}! 👋
                        </h1>
                        <p className="text-teal-100 text-sm mt-1">
                            Manage your properties and listings effectively
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/admin/projects")}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-teal-700 font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                        <Plus size={16} />
                        Add New Project
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-10 -mt-6 pb-10">
                {/* Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    {cards.map(({ label, value, icon: Icon, color, change }) => (
                        <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                                    <Icon size={22} />
                                </div>
                                <span className="text-xs font-semibold text-green-600 flex items-center gap-0.5">
                                    ↑ {change}
                                </span>
                            </div>
                            {loading ? (
                                <div className="h-8 w-12 bg-gray-100 rounded animate-pulse" />
                            ) : (
                                <p className="text-3xl font-bold text-gray-900">{value}</p>
                            )}
                            <p className="text-sm text-gray-500 mt-1">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Projects Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Tabs */}
                    <div className="flex items-center gap-1 px-6 pt-5 border-b border-gray-100">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 transition-colors cursor-pointer ${activeTab === "all"
                                    ? "border-teal-600 text-teal-700"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            <Building2 size={15} />
                            All Projects ({projects.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("construction")}
                            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 transition-colors cursor-pointer ${activeTab === "construction"
                                    ? "border-teal-600 text-teal-700"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            <Clock size={15} />
                            Under Construction ({stats.underConstruction})
                        </button>
                        <div className="ml-auto pb-2">
                            <button
                                onClick={() => navigate("/admin/projects")}
                                className="text-teal-600 hover:text-teal-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                            >
                                Manage All <ArrowRight size={13} />
                            </button>
                        </div>
                    </div>

                    {/* Project Cards */}
                    {loading ? (
                        <div className="flex items-center justify-center py-16 text-gray-400 gap-3">
                            <Loader2 className="animate-spin" size={20} />
                            Loading projects...
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-16 text-gray-400 text-sm">
                            No projects yet. <button onClick={() => navigate("/admin/projects")} className="text-teal-600 font-semibold underline cursor-pointer">Add your first one</button>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {filtered.slice(0, 6).map((p) => (
                                <div key={p._id} className="flex items-start gap-4 px-6 py-5 hover:bg-gray-50/70 transition-colors">
                                    {/* Icon / Image */}
                                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                        {p.image ? (
                                            <img src={p.image} alt={p.title} className="w-full h-full object-cover rounded-xl" />
                                        ) : (
                                            <Building2 size={20} className="text-teal-600" />
                                        )}
                                    </div>
                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-sm font-bold text-gray-900 truncate">{p.title}</h3>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${statusColor(p.status)}`}>
                                                {p.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                                            {p.location && <span>📍 {p.location}</span>}
                                            {p.price && <span>💰 {p.price}</span>}
                                            {p.area && <span>📐 {p.area}</span>}
                                            {p.type && <span>🏠 {p.type}</span>}
                                        </div>
                                    </div>
                                    {/* Actions */}
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => navigate("/admin/projects")}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all cursor-pointer"
                                        >
                                            <Pencil size={12} /> Edit
                                        </button>
                                        <button
                                            onClick={() => setDeleteTarget(p)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-all cursor-pointer"
                                        >
                                            <Trash2 size={12} /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Modal */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-sm mx-4 shadow-2xl">
                        <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mx-auto mb-4">
                            <Trash2 size={24} className="text-red-500" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Project?</h2>
                        <p className="text-sm text-gray-500 text-center mb-6">
                            Are you sure you want to delete <span className="font-semibold text-gray-800">{deleteTarget.title}</span>? This cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="flex-1 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex-1 py-2.5 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                            >
                                {deleting ? <><Loader2 size={14} className="animate-spin" /> Deleting...</> : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
