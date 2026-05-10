
export default function Card({ title, value, type = "default", icon }) {

    const style = {
        income: {
            border: "border-[var(--income)]/20",
            color: "text-[var(--income)]",
        },
        expense: {
            border: "border-[var(--expense)]/20",
            color: "text-[var(--expense)]",
        },
        invest: {
            color: "text-[var(--invest)]",
            border: "border-[var(--invest)]/20",
        },
        default: {
            color: "text-[var(--text)]",
            border: "border-[var(--border)]",
        }
    }

    const activeStyle = style[type] || style.default;

    return (
        <div className={`app-card ${activeStyle.border}`}>
            <div className="flex items-center justify-between">
                <div>
                    <div className="card-title">{title}</div>
                    <div className={`card-value ${activeStyle.color}`}>{value}</div>
                </div>
                <div className={`card-icon ${activeStyle.color} border ${activeStyle.border}`}>{icon}</div>
            </div>
        </div>
    )
}
