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

    const checkAuth = () => {
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

    const setAuthData = (userData, token) => {
        if (token) localStorage.setItem("token", token);
        if (userData) localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(Boolean(userData && token));
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
        toast.success("Logged out successfully");
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, logout, updateUser, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};
