import Card from "@/components/ui/Card";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card title="Total Income" value="2500" type="income" icon="📈" />
            <Card title="Total Expense" value="500" type="expense" icon="🔻" />
            <Card title="Total Balance" value="1500" type="default" icon="🏦" />
            <Card title="Total Invest" value="500" type="invest" icon="⚖️" />
        </div>
    )
}
