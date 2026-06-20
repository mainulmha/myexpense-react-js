import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Moon, Sun, Bell, Menu, X, User, Settings, LogOut, LayoutDashboard, BarChart2, FileText, ChevronRight } from "lucide-react";
import useTheme from "@/hooks/useTheme";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/ui/Logo";

const NAV_LINKS = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/charts",    label: "Analytics",  icon: <BarChart2 size={18} /> },
    { path: "/report",    label: "Reports",    icon: <FileText size={18} /> },
];

export default function Navbar() {
    const { dark, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const handleNav = (path) => {
        navigate(path);
        setSidebarOpen(false);
    };

    const handleLogout = () => {
        logout();
        setSidebarOpen(false);
        navigate("/login");
    };

    const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

    return (
        <>
            <nav className="container border-b border-(--border) bg-(--navbar) backdrop-blur-xl sticky top-0 z-50">
                <div className="h-20 grid grid-cols-3 items-center">

                    {/* LEFT */}
                    <div className="flex items-center">
                        <Logo />
                    </div>

                    {/* CENTER */}
                    <div className="flex justify-center">
                        <ul className="hidden md:flex items-center gap-1 p-1 rounded-xl">
                            {NAV_LINKS.map((link) => (
                                <li
                                    key={link.path}
                                    onClick={() => handleNav(link.path)}
                                    className={`nav-li cursor-pointer transition-all ${
                                        isActive(link.path)
                                            ? "bg-blue-600 text-white"
                                            : "hover:bg-(--nav-hover)"
                                    }`}
                                >
                                    {link.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center justify-end gap-2">
                        <button className="nav-icons">
                            <Bell size={20} />
                        </button>

                        <button onClick={toggleTheme} className="nav-icons">
                            {dark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Profile Avatar */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="hidden md:flex ml-1 w-10 h-10 rounded-full bg-blue-600 items-center justify-center text-sm font-bold text-white cursor-pointer transition-all hover:scale-105 hover:bg-blue-500"
                        >
                            {initial}
                        </button>

                        {/* Mobile menu */}
                        <button onClick={() => setSidebarOpen(true)} className="md:hidden nav-icons ml-1">
                            <Menu size={22} />
                        </button>
                    </div>

                </div>
            </nav>

            {/* Sidebar overlay — always in DOM, animated with opacity/translate */}
            <>
                    <div
                        onClick={() => setSidebarOpen(false)}
                        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-100 transition-opacity duration-300 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                    />

                    <div className={`fixed top-0 right-0 h-full w-full max-w-75 bg-(--card) border-l border-(--border) z-110 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}>

                        {/* Sidebar Header */}
                        <div className="p-7 border-b border-(--border)">
                            <div className="flex justify-between items-center mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/20">
                                    {initial}
                                </div>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="w-9 h-9 rounded-full border border-(--border) flex items-center justify-center text-(--nav-text) hover:bg-(--nav-hover) transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <h2 className="text-base font-bold text-(--text) tracking-tight">{user?.name || "Member"}</h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-500 mt-0.5">{user?.email}</p>
                        </div>

                        {/* Navigation */}
                        <div className="flex-1 p-5 space-y-6 overflow-y-auto">
                            <div>
                                <h3 className="text-[9px] font-black uppercase tracking-[0.25em] text-(--muted) mb-3 px-2">Navigation</h3>
                                <div className="space-y-0.5">
                                    {NAV_LINKS.map((link) => (
                                        <button
                                            key={link.path}
                                            onClick={() => handleNav(link.path)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${
                                                isActive(link.path)
                                                    ? "bg-blue-600/10 border border-blue-500/20 text-(--text)"
                                                    : "text-(--muted) hover:bg-(--nav-hover) hover:text-(--text)"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={isActive(link.path) ? "text-blue-500" : ""}>{link.icon}</span>
                                                <span className="text-xs font-black uppercase tracking-wider">{link.label}</span>
                                            </div>
                                            <ChevronRight size={14} className={isActive(link.path) ? "opacity-100 text-blue-500" : "opacity-0"} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[9px] font-black uppercase tracking-[0.25em] text-(--muted) mb-3 px-2">Account</h3>
                                <div className="space-y-0.5">
                                    <button
                                        onClick={() => handleNav("/profile")}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-(--muted) hover:bg-(--nav-hover) hover:text-(--text) transition-all"
                                    >
                                        <User size={18} />
                                        <span className="text-xs font-black uppercase tracking-wider">Profile</span>
                                    </button>
                                    <button
                                        onClick={() => handleNav("/settings")}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-(--muted) hover:bg-(--nav-hover) hover:text-(--text) transition-all"
                                    >
                                        <Settings size={18} />
                                        <span className="text-xs font-black uppercase tracking-wider">Settings</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Logout */}
                        <div className="p-5 border-t border-(--border)">
                            <button
                                onClick={handleLogout}
                                className="w-full py-3.5 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <LogOut size={15} />
                                Sign Out
                            </button>
                        </div>

                    </div>
                </>
            )}
        </>
    );
}
