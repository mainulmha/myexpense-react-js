import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="relative min-h-screen bg-(--bg) overflow-hidden">

            {/* Decorative blobs */}
            <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Dot grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.3]"
                style={{
                    backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            {/* Page content */}
            <div className="relative z-10">
                <Outlet />
            </div>
        </div>
    );
}
