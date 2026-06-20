import { Plus } from "lucide-react";

export default function Button({ title, onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg active:scale-95 group"
        >
            <Plus size={16} className="group-hover:rotate-90 transition-transform duration-200" />
            <span className="text-[10px] font-black uppercase tracking-widest">{title}</span>
        </button>
    );
}
