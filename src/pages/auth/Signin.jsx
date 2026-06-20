import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import InputField from "@/components/ui/Input";
import OAuthButtons from "@/components/ui/OAuthButtons";

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <section className="auth-container">
            <div className="app-card w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-8">
                    <span className="text-6xl">💰</span>
                    <p className="text-3xl font-black tracking-tight text-(--text) mb-2">Spends</p>
                    <p className="text-sm text-(--nav-text)">Sign in to your account</p>
                </div>

                {/* Form */}
                <form className="space-y-5">

                    <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                    />

                    <InputField
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        rightIcon={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-(--nav-text) hover:text-(--text) transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        }
                    />

                    <div className="text-right">
                        <button type="button" className="text-sm text-blue-500 hover:text-blue-400 transition-colors">
                            Forgot Password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white transition-all active:scale-[0.98]"
                    >
                        Sign In
                    </button>

                    {/* Divider */}
                    <div className="relative py-1">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-(--border)" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-3 bg-(--card) text-xs font-medium tracking-widest text-(--nav-text)">
                                OR CONTINUE WITH
                            </span>
                        </div>
                    </div>

                    <OAuthButtons />

                    <div className="pt-2 text-center">
                        <p className="text-sm text-(--nav-text)">
                            Don&apos;t have an account?{" "}
                            <button type="button" className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
                                Sign up
                            </button>
                        </p>
                    </div>

                </form>
            </div>
        </section>
    );
}
