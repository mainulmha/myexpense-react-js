import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authAPI from "@/services/authAPI";
import toast from "react-hot-toast";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [status, setStatus] = useState("verifying");
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [resending, setResending] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [inputEmail, setInputEmail] = useState("");
    const [resendSuccess, setResendSuccess] = useState(false);

    const hasVerified = useRef(false);

    useEffect(() => {
        if (!token) { setStatus("no-token"); return; }
        if (hasVerified.current) return;
        hasVerified.current = true;
        verifyEmail();
    }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

    const verifyEmail = async () => {
        try {
            const response = await authAPI.get(`/verify-email?token=${token}`);
            if (response.data.success) {
                setStatus("success");
                toast.success("Email verified successfully!");
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                }
                setTimeout(() => navigate("/dashboard"), 2000);
            } else {
                setStatus("invalid");
                setErrorMessage(response.data.message || "Invalid verification link");
            }
        } catch (error) {
            const errorData = error.response?.data;
            if (errorData?.expired || errorData?.message?.includes("expired")) {
                setStatus("expired");
                setEmail(errorData?.email || "");
            } else if (errorData?.message === "Invalid verification token") {
                setStatus("invalid");
                setErrorMessage("This verification link is invalid or already used.");
            } else {
                setStatus("error");
                setErrorMessage(errorData?.message || "Something went wrong");
            }
        }
    };

    const handleResend = async () => {
        let userEmail = email;
        if (!userEmail && !showEmailInput) { setShowEmailInput(true); return; }
        if (!userEmail && showEmailInput) {
            userEmail = inputEmail;
            if (!userEmail) { toast.error("Please enter your email"); return; }
        }
        setResending(true);
        try {
            const res = await authAPI.post("/resend-verification", { email: userEmail });
            if (res.data.success) {
                setResendSuccess(true);
                toast.success("New verification email sent!");
            } else {
                toast.error(res.data.message || "Failed to resend");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to resend email");
        } finally {
            setResending(false);
        }
    };

    const states = {
        verifying:  { icon: null,  spin: true,  title: "Verifying your email...", sub: "Please wait a moment" },
        success:    { icon: "✅",  spin: false, title: "Email Verified!", sub: "Redirecting to dashboard..." },
        invalid:    { icon: "❌",  spin: false, title: "Invalid Link", sub: errorMessage || "This link is invalid or already used." },
        error:      { icon: "⚠️", spin: false, title: "Something Went Wrong", sub: errorMessage || "Please try again later." },
        "no-token": { icon: "🔗",  spin: false, title: "No Token Found", sub: "Please check your email and click the correct link." },
    };

    const current = states[status];

    return (
        <section className="auth-container">
            <div className="app-card w-full max-w-md text-center p-8">

                {current?.spin ? (
                    <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                ) : (
                    <div className="w-20 h-20 mx-auto mb-6 bg-blue-500/10 rounded-2xl flex items-center justify-center text-5xl">
                        {current?.icon}
                    </div>
                )}

                <h2 className="text-xl font-black text-(--text) mb-2">{current?.title}</h2>
                <p className="text-sm text-(--nav-text) mb-6">{current?.sub}</p>

                {status === "expired" && (
                    resendSuccess ? (
                        <p className="text-blue-500 text-sm font-medium">Check your inbox for the new verification link.</p>
                    ) : (
                        <>
                            {showEmailInput && (
                                <input
                                    type="email"
                                    value={inputEmail}
                                    onChange={(e) => setInputEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="app-field mb-4"
                                />
                            )}
                            <button
                                onClick={handleResend}
                                disabled={resending}
                                className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-sm font-semibold text-white transition-all"
                            >
                                {resending ? "Sending..." : "Resend Verification Email"}
                            </button>
                        </>
                    )
                )}

                {["invalid", "error", "no-token"].includes(status) && (
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white transition-all"
                    >
                        Back to Login
                    </button>
                )}
            </div>
        </section>
    );
}
