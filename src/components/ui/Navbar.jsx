import useTheme from "@/hooks/useTheme";
import Logo from "@/components/ui/Logo";

import {
    Moon,
    Sun,
    Bell,
    Menu,
} from "lucide-react";

export default function Navbar() {

    const { dark, toggleTheme } = useTheme();

    return (

        <nav className="container border-b border-(--border) bg-(--navbar) backdrop-blur-xl">
            <div className="h-20 grid grid-cols-3 items-center">
                {/* LEFT */}
                <div className="flex items-center">
                    <Logo />
                </div>

                {/* CENTER */}
                <div className="flex justify-center">
                    <ul className="hidden md:flex items-center gap-2 p-1 rounded-xl">
                        <li className={`nav-li hover:bg-blue-600 `}>Dashboard</li>
                        <li className={`nav-li hover:bg-blue-600`}>Analytics</li>
                        <li className={`nav-li hover:bg-blue-600`}>Reports</li>
                    </ul>
                </div>

                {/* RIGHT */}

                <div className="flex items-center justify-end gap-2">

                    {/* Notification */}

                    <button className="nav-icons">
                        <Bell size={24} />
                    </button>

                    {/* Theme Toggle */}

                    <button
                        onClick={toggleTheme}
                        className="nav-icons"
                    >

                        {
                            dark
                                ? <Sun size={24} />
                                : <Moon size={24} />
                        }

                    </button>

                    {/* Profile */}

                    <div
                        className="
                            hidden
                            ml-1

                            w-10
                            h-10

                            rounded-full

                            bg-blue-600

                            md:flex
                            items-center
                            justify-center

                            text-sm
                            font-bold
                            text-white

                            cursor-pointer

                            transition-all
                            hover:scale-105
                        "
                    >
                        M
                    </div>

                    <button className="md:hidden font-black ml-3">
                        <Menu size={24} />
                    </button>
                </div>



            </div>

        </nav>
    );
}
