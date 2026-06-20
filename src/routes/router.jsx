import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import Signin from "@/pages/auth/Signin";
import Signup from "@/pages/auth/Signup";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Dashboard from "@/pages/auth/Dashboard";
import AppLayout from "@/layouts/AppLayout";
import Charts from "@/pages/Charts";
import Profile from "@/pages/Profile";
import Report from "@/pages/Report";
import PrivateRoute from "./PrivateRoute";
import Settings from "@/pages/Settings";
import OAuthSuccess from "@/pages/OAuthSuccess";

const router = createBrowserRouter([
    // Private Routes
    {
        element: (
            <PrivateRoute>
                <AppLayout />
            </PrivateRoute>
        ),
        children: [
            { path: "/", element: <Navigate to="/dashboard" /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/charts", element: <Charts /> },
            { path: "/profile", element: <Profile /> },
            { path: "/settings", element: <Settings /> },
            { path: "/report", element: <Report /> },
        ],
    },

    // Public Routes
    {
        element: <AuthLayout />,
        children: [
            { path: "/login", element: <Signin /> },
            { path: "/signup", element: <Signup /> },
            { path: "/verify-email", element: <VerifyEmail /> },
            { path: "/forgot-password", element: <ForgotPassword /> },
            { path: "/oauth-success", element: <OAuthSuccess /> },
        ],
    },
]);

export default router;
