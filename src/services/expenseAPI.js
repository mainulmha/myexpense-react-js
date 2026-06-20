import axios from "axios";

const expenseAPI = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/expense`,
    headers: { "Content-Type": "application/json" },
});

expenseAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

expenseAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default expenseAPI;
