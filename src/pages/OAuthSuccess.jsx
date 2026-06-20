import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import authAPI from "@/services/authAPI";

export default function OAuthSuccess() {
    const navigate = useNavigate();
    const { setAuthData } = useAuth();

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token");

        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        const fetchUser = async () => {
            try {
                localStorage.setItem("token", token);
                const response = await authAPI.get("/me");

                if (response.data?.success && response.data?.user) {
                    setAuthData(response.data.user, token);
                } else {
                    localStorage.removeItem("token");
                }
            } catch (error) {
                console.error("OAuth error:", error);
                localStorage.removeItem("token");
            } finally {
                navigate("/dashboard", { replace: true });
            }
        };

        fetchUser();
    }, [navigate, setAuthData]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-(--bg)">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-sm text-(--nav-text)">Logging you in...</p>
            </div>
        </div>
    );
}
