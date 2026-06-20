import axios from "axios";

const authAPI = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/auth`,
    headers: { "Content-Type": "application/json" },
});

authAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

export default authAPI;
