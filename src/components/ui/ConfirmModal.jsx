export default function ConfirmModal({
    open,
    onClose,
    onConfirm,
    icon,
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    confirmClassName = "bg-blue-600 hover:bg-blue-500 text-white",
}) {
    return (
        <div className={`fixed inset-0 z-200 flex items-center justify-center transition-all duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className={`relative bg-(--card) border border-(--border) rounded-3xl p-7 w-full max-w-sm mx-4 shadow-2xl transition-all duration-200 ${open ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>

                {/* Icon */}
                {icon && (
                    <div className="w-14 h-14 bg-(--nav-surface) rounded-2xl flex items-center justify-center mx-auto mb-5">
                        {icon}
                    </div>
                )}

                {/* Text */}
                <h3 className="text-lg font-black text-(--text) text-center mb-1">{title}</h3>
                {description && (
                    <p className="text-sm text-(--muted) text-center mb-7">{description}</p>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 h-11 rounded-2xl border border-(--border) text-sm font-semibold text-(--text) hover:bg-(--nav-hover) transition-all"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 h-11 rounded-2xl text-sm font-semibold transition-all active:scale-[0.97] ${confirmClassName}`}
                    >
                        {confirmLabel}
                    </button>
                </div>

            </div>
        </div>
    );
}
