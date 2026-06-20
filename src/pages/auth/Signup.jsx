import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InputField from "@/components/ui/Input";
import OAuthButtons from "@/components/ui/OAuthButtons";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function SignupPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        setLoading(true);
        const success = await register({ name: form.name, email: form.email, password: form.password });
        if (success) navigate("/login");
        setLoading(false);
    };

    return (
        <section className="auth-container">
            <div className="w-full max-w-md rounded-4xl border border-(--border) bg-(--card) p-6 sm:p-8 shadow-xl">

                {/* Header */}
                <div className="text-center mb-8">
                    <span className="text-6xl">💰</span>
                    <h1 className="text-3xl font-black tracking-tight text-(--text) mb-2">Spends</h1>
                    <p className="text-sm text-(--nav-text)">Create your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <InputField
                        label="Full Name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <InputField
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        rightIcon={
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-(--nav-text) hover:text-(--text) transition-colors">
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        }
                    />

                    <InputField
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Re-enter your password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        rightIcon={
                            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-(--nav-text) hover:text-(--text) transition-colors">
                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        }
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-sm font-semibold text-white transition-all active:scale-[0.98]"
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>

                    <div className="relative py-1">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-(--border)" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-3 bg-(--card) text-xs font-medium tracking-widest text-(--nav-text)">OR CONTINUE WITH</span>
                        </div>
                    </div>

                    <OAuthButtons />

                    <div className="pt-2 text-center">
                        <p className="text-sm text-(--nav-text)">
                            Already have an account?{" "}
                            <button type="button" onClick={() => navigate("/login")} className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
                                Sign in
                            </button>
                        </p>
                    </div>

                </form>
            </div>
        </section>
    );
}
