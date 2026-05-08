import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { Outlet } from "react-router-dom";


export default function AppLayout() {

    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
