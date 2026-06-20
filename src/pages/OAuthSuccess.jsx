import { useEffect } from "react";
import authAPI from "@/services/authAPI";

export default function OAuthSuccess() {
    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token");

        if (!token) {
            window.location.replace("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                localStorage.setItem("token", token);
                const response = await authAPI.get("/me");

                if (response.data?.success && response.data?.user) {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    window.location.replace("/dashboard");
                } else {
                    localStorage.removeItem("token");
                    window.location.replace("/login");
                }
            } catch {
                localStorage.removeItem("token");
                window.location.replace("/login");
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-(--bg)">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-sm text-(--nav-text)">Logging you in...</p>
            </div>
        </div>
    );
}
