import { LayoutDashboard } from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Dashboard() {
    return (
        <div>

            <div className="flex items-center justify-between pb-4 pt-4">
                <div className="flex items-center gap-2">
                    <LayoutDashboard size={14} className="text-blue-500" />
                    <span className="section-title">Overview</span>
                </div>
                <Button title="New Entry" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card title="Total Income" value="2500" type="income" icon="📈" />
                <Card title="Total Expense" value="500" type="expense" icon="🔻" />
                <Card title="Total Balance" value="1500" type="default" icon="🏦" />
                <Card title="Total Invest" value="500" type="invest" icon="⚖️" />
            </div>
        </div>
    )
}
