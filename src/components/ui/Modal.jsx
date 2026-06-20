export default function Modal({ open, onClose, title, children }) {
    return (
        <div className={`fixed inset-0 z-200 flex items-center justify-center transition-all duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className={`relative bg-(--card) border border-(--border) rounded-3xl w-full max-w-lg mx-4 shadow-2xl transition-all duration-200 ${open ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>

                {/* Header */}
                {title && (
                    <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-(--border)">
                        <h2 className="text-base font-black text-(--text) uppercase tracking-wider">{title}</h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full border border-(--border) flex items-center justify-center text-(--muted) hover:bg-(--nav-hover) hover:text-(--text) transition-colors text-lg leading-none"
                        >
                            ×
                        </button>
                    </div>
                )}

                {/* Content */}
                <div className="p-6">
                    {children}
                </div>

            </div>
        </div>
    );
}
