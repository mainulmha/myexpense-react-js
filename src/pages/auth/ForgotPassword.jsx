import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Mail } from "lucide-react";
import toast from "react-hot-toast";
import InputField from "@/components/ui/Input";
import authAPI from "@/services/authAPI";

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [step, setStep] = useState(() => {
        const saved = localStorage.getItem("forgotPasswordStep");
        return saved ? parseInt(saved) : 1;
    });

    const [form, setForm] = useState(() => {
        const saved = localStorage.getItem("forgotPasswordData");
        return saved ? JSON.parse(saved) : { email: "", otp: "", newPassword: "", confirmPassword: "" };
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        localStorage.setItem("forgotPasswordStep", step.toString());
        localStorage.setItem("forgotPasswordData", JSON.stringify(form));
    }, [step, form]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
        if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
    };

    const startResendTimer = () => {
        setResendDisabled(true);
        setCountdown(60);
        const t = setInterval(() => {
            setCountdown((p) => {
                if (p <= 1) { clearInterval(t); setResendDisabled(false); return 0; }
                return p - 1;
            });
        }, 1000);
    };

    // Step 1 — send OTP
    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!form.email.trim()) { setErrors({ email: "Email is required" }); return; }
        if (!/\S+@\S+\.\S+/.test(form.email)) { setErrors({ email: "Enter a valid email" }); return; }

        setLoading(true);
        try {
            const res = await authAPI.post("/forgot-password", { email: form.email });
            if (res.data.success) {
                toast.success("Reset code sent to your email!");
                setStep(2);
                startResendTimer();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send reset code");
        } finally {
            setLoading(false);
        }
    };

    // Step 2 — verify OTP
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (!form.otp.trim()) { setErrors({ otp: "Code is required" }); return; }
        if (form.otp.length !== 6) { setErrors({ otp: "Code must be 6 digits" }); return; }

        setLoading(true);
        try {
            const res = await authAPI.post("/verify-otp", { email: form.email, otp: form.otp });
            if (res.data.success) {
                toast.success("Code verified!");
                setStep(3);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid code");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        startResendTimer();
        try {
            await authAPI.post("/forgot-password", { email: form.email });
            toast.success("New code sent!");
        } catch {
            toast.error("Failed to resend code");
        }
    };

    // Step 3 — reset password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!form.newPassword) newErrors.newPassword = "Password is required";
        else if (form.newPassword.length < 6) newErrors.newPassword = "Minimum 6 characters";
        if (form.newPassword !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

        setLoading(true);
        try {
            const res = await authAPI.post("/reset-password", {
                email: form.email, otp: form.otp, newPassword: form.newPassword
            });
            if (res.data.success) {
                toast.success("Password reset successfully!");
                localStorage.removeItem("forgotPasswordStep");
                localStorage.removeItem("forgotPasswordData");
                setTimeout(() => navigate("/login"), 1500);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    const stepMeta = [
        { icon: "🔐", title: "Forgot Password?", sub: "Enter your email and we'll send a reset code" },
        { icon: "📧", title: "Verify Code", sub: `We've sent a 6-digit code to ${form.email}` },
        { icon: "🔒", title: "Reset Password", sub: "Create a new password for your account" },
    ];

    const { icon, title, sub } = stepMeta[step - 1];

    return (
        <section className="auth-container">
            <div className="app-card w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl">
                        {icon}
                    </div>
                    <h2 className="text-xl font-black text-(--text) mb-1">{title}</h2>
                    <p className="text-sm text-(--nav-text)">{sub}</p>
                </div>

                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`h-1 flex-1 rounded-full transition-all ${s <= step ? "bg-blue-500" : "bg-(--border)"}`} />
                    ))}
                </div>

                {/* Step 1 */}
                {step === 1 && (
                    <form onSubmit={handleSendOTP} className="space-y-5">
                        <InputField
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={form.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                            leftIcon={<Mail size={16} className="text-(--muted)" />}
                        />
                        <button type="submit" disabled={loading} className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-sm font-semibold text-white transition-all active:scale-[0.98]">
                            {loading ? "Sending..." : "Send Reset Code"}
                        </button>
                        <div className="text-center pt-1">
                            <button type="button" onClick={() => navigate("/login")} className="text-sm text-(--nav-text) hover:text-blue-400 flex items-center justify-center gap-1 mx-auto transition-colors">
                                <ArrowLeft size={14} /> Back to Login
                            </button>
                        </div>
                    </form>
                )}

                {/* Step 2 */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOTP} className="space-y-5">
                        <InputField
                            label="Verification Code"
                            name="otp"
                            type="text"
                            placeholder="Enter 6-digit code"
                            value={form.otp}
                            onChange={handleChange}
                            error={errors.otp}
                            required
                            maxLength={6}
                        />
                        <div className="text-center">
                            <button type="button" onClick={handleResendOTP} disabled={resendDisabled} className="text-sm text-blue-500 hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                {resendDisabled ? `Resend code in ${countdown}s` : "Resend Code"}
                            </button>
                        </div>
                        <button type="submit" disabled={loading} className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-sm font-semibold text-white transition-all active:scale-[0.98]">
                            {loading ? "Verifying..." : "Verify Code"}
                        </button>
                        <div className="text-center pt-1">
                            <button type="button" onClick={() => setStep(1)} className="text-sm text-(--nav-text) hover:text-blue-400 flex items-center justify-center gap-1 mx-auto transition-colors">
                                <ArrowLeft size={14} /> Back to Email
                            </button>
                        </div>
                    </form>
                )}

                {/* Step 3 */}
                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-5">
                        <InputField
                            label="New Password"
                            name="newPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            value={form.newPassword}
                            onChange={handleChange}
                            error={errors.newPassword}
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
                            placeholder="Re-enter new password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            required
                            rightIcon={
                                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-(--nav-text) hover:text-(--text) transition-colors">
                                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            }
                        />
                        <button type="submit" disabled={loading} className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-sm font-semibold text-white transition-all active:scale-[0.98]">
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                        <div className="text-center pt-1">
                            <button type="button" onClick={() => navigate("/login")} className="text-sm text-(--nav-text) hover:text-blue-400 flex items-center justify-center gap-1 mx-auto transition-colors">
                                <ArrowLeft size={14} /> Back to Login
                            </button>
                        </div>
                    </form>
                )}

            </div>
        </section>
    );
}
