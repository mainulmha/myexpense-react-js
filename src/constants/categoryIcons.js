export const categoryIconMap = {
    // Expense
    food:           { emoji: "🍔", color: "#EF4444", bg: "#EF444420" },
    travel:         { emoji: "✈️",  color: "#FFC053", bg: "#FFC05320" },
    rent:           { emoji: "🏠", color: "#6B7280", bg: "#6B728020" },
    transport:      { emoji: "🚗", color: "#F59E0B", bg: "#F59E0B20" },
    shopping:       { emoji: "🛍️", color: "#EC4899", bg: "#EC489920" },
    medicine:       { emoji: "💊", color: "#DC2626", bg: "#DC262620" },
    gold:           { emoji: "🥇", color: "#FBBF24", bg: "#FBBF2420" },
    recharge:       { emoji: "📱", color: "#8B5CF6", bg: "#8B5CF620" },
    "internet bill":{ emoji: "🌐", color: "#3B82F6", bg: "#3B82F620" },
    "dish bill":    { emoji: "📡", color: "#EC4899", bg: "#EC489920" },
    entertainment:  { emoji: "🎬", color: "#F472B6", bg: "#F472B620" },
    bills:          { emoji: "🧾", color: "#94A3B8", bg: "#94A3B820" },
    // Income
    salary:         { emoji: "💼", color: "#22C55E", bg: "#22C55E20" },
    freelance:      { emoji: "💻", color: "#10B981", bg: "#10B98120" },
    investment:     { emoji: "📊", color: "#10B981", bg: "#10B98120" },
    // Investment
    dps:            { emoji: "🏦", color: "#10B981", bg: "#10B98120" },
    fdr:            { emoji: "📈", color: "#10B981", bg: "#10B98120" },
    share:          { emoji: "📉", color: "#8B5CF6", bg: "#8B5CF620" },
    // Default
    other:          { emoji: "📁", color: "#6B7280", bg: "#6B728020" },
};

export const getCategoryIcon = (category) =>
    categoryIconMap[category?.toLowerCase()] ?? categoryIconMap.other;
