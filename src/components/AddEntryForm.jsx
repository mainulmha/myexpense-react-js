import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import InputField from "@/components/ui/Input";
import expenseAPI from "@/services/expenseAPI";

const CATEGORIES = {
    expense:    ["Food", "Transport", "Shopping", "Bills", "Medicine", "Rent", "Recharge", "Entertainment", "Other"],
    income:     ["Salary", "Investment", "Freelance", "Other"],
    investment: ["Gold", "FDR", "DPS", "Share", "Other"],
};

const TYPE_CONFIG = {
    expense:    { label: "Expense",    emoji: "💸", color: "text-red-500",   active: "bg-red-500/10 border-red-500/40 text-red-500" },
    income:     { label: "Income",     emoji: "📈", color: "text-green-500", active: "bg-green-500/10 border-green-500/40 text-green-500" },
    investment: { label: "Investment", emoji: "🏦", color: "text-violet-500",active: "bg-violet-500/10 border-violet-500/40 text-violet-500" },
};

export default function AddEntryForm({ onClose, onSuccess }) {
    const [form, setForm] = useState({
        type: "expense",
        amount: "",
        category: CATEGORIES.expense[0],
        description: "",
        date: new Date().toISOString().split("T")[0],
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Reset category when type changes
    useEffect(() => {
        setForm((p) => ({ ...p, category: CATEGORIES[p.type][0] }));
    }, [form.type]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
        if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
    };

    const validate = () => {
        const e = {};
        if (!form.amount || parseFloat(form.amount) <= 0) e.amount = "Enter a valid amount";
        if (!form.category) e.category = "Select a category";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const res = await expenseAPI.post("/add", { ...form, amount: parseFloat(form.amount) });
            if (res.data.success) {
                toast.success("Transaction added!");
                onSuccess?.();
                onClose?.();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add transaction");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            {/* Type selector */}
            <div>
                <p className="app-kicker mb-2">Transaction Type</p>
                <div className="grid grid-cols-3 gap-2">
                    {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setForm((p) => ({ ...p, type: key }))}
                            className={`py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                                form.type === key
                                    ? cfg.active
                                    : "border-(--border) text-(--muted) hover:bg-(--nav-hover)"
                            }`}
                        >
                            {cfg.emoji} {cfg.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Amount + Date */}
            <div className="grid grid-cols-2 gap-4">
                <InputField
                    label="Amount (Tk)"
                    name="amount"
                    type="number"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={handleChange}
                    error={errors.amount}
                    required
                />
                <InputField
                    label="Date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                />
            </div>

            {/* Category */}
            <InputField
                label="Category"
                name="category"
                type="select"
                value={form.category}
                onChange={handleChange}
                error={errors.category}
                options={CATEGORIES[form.type].map((c) => (
                    <option key={c} value={c.toLowerCase()}>{c}</option>
                ))}
            />

            {/* Description */}
            <InputField
                label="Description"
                name="description"
                type="text"
                placeholder="What was this for? (optional)"
                value={form.description}
                onChange={handleChange}
            />

            {/* Actions */}
            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 h-11 rounded-2xl border border-(--border) text-sm font-semibold text-(--text) hover:bg-(--nav-hover) transition-all"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-2 h-11 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-sm font-semibold text-white transition-all active:scale-[0.98]"
                >
                    {loading ? "Adding..." : "Add Transaction"}
                </button>
            </div>

        </form>
    );
}
