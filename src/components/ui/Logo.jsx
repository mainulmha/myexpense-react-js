export default function Logo() {
    return (
        <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-600 shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-all duration-300">
                <span className="text-white text-lg font-black">S</span>
            </div>

            <div className="flex items-end">
                <span className="text-xl font-black tracking-tight text-[var(--text)]">Spends</span>
                <span className="text-blue-500 text-2xl font-black leading-none">.</span>
            </div>
        </div>
    );
}
