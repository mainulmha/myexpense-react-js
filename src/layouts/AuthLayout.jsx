import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="auth-bg">

            {/* Blobs */}
            <div className="auth-blob auth-blob-1" />
            <div className="auth-blob auth-blob-2" />
            <div className="auth-blob auth-blob-3" />

            {/* Dot grid */}
            <div className="auth-dots" />

            {/* Page content */}
            <div className="relative z-10">
                <Outlet />
            </div>
        </div>
    );
}
