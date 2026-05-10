import useTheme from "@/hooks/useTheme"

export default function Navbar() {

    const { dark, toggleTheme } = useTheme();

    return (
        <div className="flex justify-between mb-4">
            <p>Navigation</p>
            <button
                onClick={toggleTheme}
                className="app-button px-4 py-2"
            >
                {dark ? "Light" : "Dark"}
            </button>
        </div>
    )
}
