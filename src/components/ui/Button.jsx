import { Plus } from "lucide-react";

export default function Button({ title }) {
  return (
    <button
      className="bg-blue-600 hover:bg-blue-500 
        hover:bg-blue-700 
        text-white px-5 py-2.5 rounded-xl
        flex items-center gap-2 transition-all
        shadow-lg px-4 py-2 rounded-sm
        active:scale-95 group"
    >
      <Plus size={16} className="group-hover:rotate-90 transition-transform" />
      <span className="text-[10px] font-black uppercase tracking-widest">{title}</span>

    </button>
  );
}
