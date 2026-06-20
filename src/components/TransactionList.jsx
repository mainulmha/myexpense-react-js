import { useState, useEffect, useCallback } from "react";
import { Search, ListFilter } from "lucide-react";
import { getCategoryIcon } from "@/constants/categoryIcons";
import expenseAPI from "@/services/expenseAPI";

const ALL_CATEGORIES = [
    "food", "transport", "shopping", "bills", "medicine", "rent",
    "recharge", "entertainment", "travel", "gold", "internet bill", "dish bill",
    "salary", "freelance", "investment", "dps", "fdr", "share", "other",
];

const TYPE_BADGE = {
    expense:    "bg-red-500/10 text-red-500 border-red-500/20",
    income:     "bg-green-500/10 text-green-500 border-green-500/20",
    investment: "bg-violet-500/10 text-violet-500 border-violet-500/20",
};

const AMOUNT_COLOR = {
    expense:    "text-red-400",
    income:     "text-green-400",
    investment: "text-violet-400",
};

const AMOUNT_SIGN = { expense: "−", income: "+", investment: "+" };

function groupByDate(transactions) {
    const groups = {};
    transactions.forEach((t) => {
        const d = new Date(t.date);
        const key = d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }).toUpperCase();
        if (!groups[key]) groups[key] = [];
        groups[key].push(t);
    });
    return Object.entries(groups);
}

export default function TransactionList({ refreshTrigger }) {
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [type, setType] = useState("all");
    const [category, setCategory] = useState("all");

    const fetchTransactions = useCallback(async (overrides = {}) => {
        setLoading(true);
        try {
            const sd  = overrides.startDate  ?? startDate;
            const ed  = overrides.endDate    ?? endDate;
            const tp  = overrides.type       ?? type;
            const cat = overrides.category   ?? category;

            let url = "/report/all?limit=100";
            if (sd)          url += `&startDate=${sd}`;
            if (ed)          url += `&endDate=${ed}`;
            if (tp !== "all")  url += `&type=${tp}`;
            if (cat !== "all") url += `&category=${cat}`;

            const res = await expenseAPI.get(url);
            setTransactions(res.data?.data || []);
            setTotal(res.data?.pagination?.totalItems ?? (res.data?.data?.length ?? 0));
        } catch {
            // 401 handled by expenseAPI interceptor
        } finally {
            setLoading(false);
        }
    }, [startDate, endDate, type, category]);

    useEffect(() => { fetchTransactions(); }, [refreshTrigger]); // eslint-disable-line react-hooks/exhaustive-deps

    const applyFilters = () => fetchTransactions();

    const resetFilters = () => {
        setStartDate(""); setEndDate(""); setType("all"); setCategory("all");
        fetchTransactions({ startDate: "", endDate: "", type: "all", category: "all" });
    };

    const grouped = groupByDate(transactions);

    return (
        <div className="space-y-4">

            {/* Quick Filters */}
            <div className="app-card p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Search size={13} className="text-(--muted)" />
                    <span className="section-title">Quick Filters</span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                        <label className="app-kicker block mb-1.5">Start Date</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                            className="app-field" />
                    </div>
                    <div>
                        <label className="app-kicker block mb-1.5">End Date</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                            className="app-field" />
                    </div>
                    <div>
                        <label className="app-kicker block mb-1.5">Type</label>
                        <select value={type} onChange={(e) => setType(e.target.value)} className="app-field">
                            <option value="all">All Types</option>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                            <option value="investment">Investment</option>
                        </select>
                    </div>
                    <div>
                        <label className="app-kicker block mb-1.5">Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="app-field">
                            <option value="all">All Categories</option>
                            {ALL_CATEGORIES.map((c) => (
                                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-(--border)">
                    <button onClick={applyFilters}
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95">
                        Apply Filters
                    </button>
                    <button onClick={resetFilters}
                        className="px-5 py-2 bg-(--input-bg) hover:bg-(--nav-hover) text-(--muted) rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                        Reset
                    </button>
                </div>
            </div>

            {/* Transaction Logs */}
            <div className="app-card overflow-hidden p-0">

                {/* Header */}
                <div className="px-5 py-3 border-b border-(--border) flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <ListFilter size={13} className="text-(--muted)" />
                        <span className="section-title">Transaction Logs</span>
                    </div>
                    <span className="text-[9px] font-black text-blue-500 bg-blue-500/5 px-2 py-1 rounded-lg border border-blue-500/10 uppercase">
                        {total} Items
                    </span>
                </div>

                {/* Body */}
                {loading ? (
                    <div className="py-16 flex justify-center">
                        <div className="w-7 h-7 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                    </div>
                ) : grouped.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-(--muted)">No Transactions Found</p>
                    </div>
                ) : (
                    grouped.map(([date, items]) => (
                        <div key={date}>
                            {/* Date header */}
                            <div className="px-5 py-2 bg-(--nav-surface) border-y border-(--border) flex justify-between items-center">
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{date}</span>
                                <span className="text-[9px] font-bold uppercase text-(--muted)">{items.length} TXNS</span>
                            </div>

                            {/* Items */}
                            <div className="divide-y divide-(--border)">
                                {items.map((t, idx) => {
                                    const icon = getCategoryIcon(t.category);
                                    return (
                                        <div key={idx} className="flex items-center justify-between px-5 py-3.5 hover:bg-(--nav-surface) transition-colors">
                                            <div className="flex items-center gap-3 flex-1 overflow-hidden">
                                                {/* Icon */}
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl"
                                                    style={{ backgroundColor: icon.bg }}>
                                                    {icon.emoji}
                                                </div>
                                                {/* Info */}
                                                <div className="overflow-hidden">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[11px] font-black uppercase text-(--text) tracking-tight">
                                                            {t.category}
                                                        </span>
                                                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border uppercase ${TYPE_BADGE[t.type]}`}>
                                                            {t.type}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] text-(--muted) mt-0.5 truncate">
                                                        {t.description || "..."}
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Amount */}
                                            <p className={`text-sm font-black shrink-0 ml-4 ${AMOUNT_COLOR[t.type]}`}>
                                                {AMOUNT_SIGN[t.type]}৳{t.amount.toLocaleString()}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
