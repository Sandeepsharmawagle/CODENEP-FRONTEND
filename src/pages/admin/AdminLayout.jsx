import { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Building2, LogOut, ExternalLink } from "lucide-react";

export default function AdminLayout() {
    const navigate = useNavigate();
    const email = localStorage.getItem("adminEmail") || "Admin";

    useEffect(() => {
        if (!localStorage.getItem("adminToken")) {
            navigate("/admin/login");
        }
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        navigate("/admin/login");
    };

    const navItems = [
        { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
        { to: "/admin/projects", label: "Projects", icon: Building2 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-30 shadow-sm">
                {/* Brand */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm">Guruji Homes</p>
                            <p className="text-xs text-gray-400">Admin Panel</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(({ to, label, icon: Icon, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                    ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md shadow-teal-500/20"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`
                            }
                        >
                            <Icon size={18} />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 space-y-1">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all w-full"
                    >
                        <ExternalLink size={18} />
                        View Website
                    </a>
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all w-full text-left cursor-pointer"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                    <div className="px-4 py-2">
                        <p className="text-xs text-gray-400 truncate">{email}</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 min-h-screen bg-gray-50 overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    );
}
