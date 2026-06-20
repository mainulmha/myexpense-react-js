import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getCategoryIcon } from "@/constants/categoryIcons";

const TYPE_STYLE = {
    income:     { label: "Income",     text: "text-green-500",  border: "border-green-500/15",  bg: "bg-green-500/5"  },
    expense:    { label: "Expense",    text: "text-red-500",    border: "border-red-500/15",    bg: "bg-red-500/5"    },
    investment: { label: "Investment", text: "text-violet-500", border: "border-violet-500/15", bg: "bg-violet-500/5" },
};

function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function Section({ type, items }) {
    const s = TYPE_STYLE[type];
    return (
        <div className={`rounded-2xl border p-4 ${s.border} ${s.bg}`}>
            <div className={`flex items-center justify-between mb-3 pb-2 border-b ${s.border}`}>
                <span className={`text-[10px] font-black uppercase tracking-widest ${s.text}`}>{s.label}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 ${s.text}`}>{items.length}</span>
            </div>
            <div className="space-y-3">
                {items.length === 0 ? (
                    <p className="text-xs text-(--muted) italic py-1">Empty</p>
                ) : items.map((item) => {
                    const icon = getCategoryIcon(item.category);
                    return (
                        <div key={item._id} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 overflow-hidden">
                                <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base"
                                    style={{ backgroundColor: icon.bg }}
                                >
                                    {icon.emoji}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs font-bold text-(--text) truncate leading-tight">{capitalize(item.category)}</p>
                                    {item.description && (
                                        <p className="text-[11px] text-(--muted) truncate mt-0.5">{item.description}</p>
                                    )}
                                </div>
                            </div>
                            <p className={`text-xs font-black shrink-0 ${s.text}`}>৳{item.amount.toLocaleString()}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function TransactionList({ data = [], loading }) {
    const [openIndex, setOpenIndex] = useState(0);

    if (loading) return (
        <div className="flex justify-center py-12">
            <div className="w-7 h-7 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        </div>
    );

    if (data.length === 0) return (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span className="text-4xl">🗒️</span>
            <p className="text-xs font-black uppercase tracking-widest text-(--muted)">No Transactions Yet</p>
        </div>
    );

    return (
        <div className="space-y-3">
            {data.map((group, index) => {
                const isOpen = openIndex === index;
                const date = new Date(group._id.year, group._id.month - 1, group._id.day);

                return (
                    <div
                        key={index}
                        className={`rounded-2xl border transition-all duration-300 ${isOpen ? "border-(--border) bg-(--card)" : "border-(--border) bg-(--nav-surface)"}`}
                    >
                        {/* Row header */}
                        <div
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="flex items-center justify-between p-4 cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                {/* Date badge */}
                                <div className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center font-bold border shrink-0 ${isOpen ? "bg-blue-600 border-blue-500 text-white" : "bg-(--input-bg) border-(--border) text-(--muted)"}`}>
                                    <span className="text-sm leading-none">{group._id.day}</span>
                                    <span className="text-[9px] uppercase mt-0.5 opacity-80">
                                        {date.toLocaleString("default", { month: "short" })}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-(--text) leading-tight">
                                        {date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
                                    </p>
                                    <p className="text-[10px] font-black uppercase tracking-wider text-(--muted) mt-0.5">{group.count} transaction{group.count !== 1 ? "s" : ""}</p>
                                </div>
                            </div>
                            <ChevronDown
                                size={18}
                                className={`text-(--muted) transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-500" : ""}`}
                            />
                        </div>

                        {/* Expandable content */}
                        {isOpen && (
                            <div className="px-4 pb-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
                                <Section type="income"     items={group.items.filter(i => i.type === "income")} />
                                <Section type="expense"    items={group.items.filter(i => i.type === "expense")} />
                                <Section type="investment" items={group.items.filter(i => i.type === "investment")} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
