import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { Outlet } from "react-router-dom";


export default function AppLayout() {

    return (
        <div>
            <Navbar />
            <main className="max-w-11/12 mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
