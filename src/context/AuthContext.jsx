import { createContext, useState, useContext, useEffect } from "react";
import authAPI from "@/services/authAPI";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const checkAuth = async () => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (token && userData) {
            try {
                setUser(JSON.parse(userData));
                setIsAuthenticated(true);
            } catch {
                logout();
            }
        }
        setLoading(false);
    };

    const login = async (credentials) => {
        try {
            const res = await authAPI.post("/login", credentials);
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                setUser(res.data.user);
                setIsAuthenticated(true);
                toast.success("Welcome back!");
                return true;
            }
        } catch (error) {
            if (error.response?.data?.needsVerification) {
                toast.error("Please verify your email first! Check your inbox.");
            } else {
                toast.error(error.response?.data?.message || "Login failed");
            }
            return false;
        }
    };

    const register = async (userData) => {
        try {
            const res = await authAPI.post("/register", userData);
            if (res.data.success) {
                toast.success(res.data.message || "Registration successful! Check your email to verify.");
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
            return false;
        }
    };

    const setAuthData = (userData, token) => {
        if (token) localStorage.setItem("token", token);
        if (userData) localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(Boolean(userData && token));
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("forgotPasswordStep");
        localStorage.removeItem("forgotPasswordData");
        setUser(null);
        setIsAuthenticated(false);
        toast.success("Logged out successfully");
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, logout, updateUser, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};
