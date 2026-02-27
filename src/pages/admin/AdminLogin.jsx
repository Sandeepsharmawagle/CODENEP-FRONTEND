import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/api";

export default function AdminLogin() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await adminLogin(form);
            localStorage.setItem("adminToken", res.token);
            localStorage.setItem("adminEmail", res.admin.email);
            navigate("/admin");
        } catch (err) {
            setError(err?.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e]">
            {/* Decorative blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-500/8 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-sm mx-4">
                {/* Logo + Brand */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-2xl mb-5 shadow-xl shadow-amber-500/40">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Guruji Homes</h1>
                    <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
                </div>

                {/* Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-lg font-bold text-white mb-1">Welcome back</h2>
                    <p className="text-gray-400 text-xs mb-6">Sign in to manage your properties</p>

                    {error && (
                        <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1.5 tracking-wide">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="admin@gurujihomes.in"
                                className="w-full px-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1.5 tracking-wide">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-white/8 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-2 cursor-pointer"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                                    </svg>
                                    Signing In...
                                </span>
                            ) : "Sign In to Dashboard"}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 text-xs mt-6">
                        Protected Admin Area · Guruji Homes © {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
}
