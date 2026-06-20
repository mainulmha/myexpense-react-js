import { LayoutDashboard, PieChart, TrendingUp } from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PieChartComponent from "@/components/charts/PieChartComponent";
import AreaChartComponent from "@/components/charts/AreaChartComponent";
import ChartCard from "@/components/ChartCard";

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
            {/* Card Elements - Income, Expense, Invest and Balance */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card title="Total Income" value="2500" type="income" icon="📈" />
                <Card title="Total Expense" value="500" type="expense" icon="🔻" />
                <Card title="Total Balance" value="1500" type="default" icon="🏦" />
                <Card title="Total Invest" value="500" type="invest" icon="⚖️" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                <ChartCard
                    title="Expense Split"
                    subtitle="By Category"
                    icon={PieChart}
                >
                    <PieChartComponent />
                </ChartCard>

                <ChartCard
                    title="Monthly Trend"
                    subtitle="Cash Flow Analysis"
                    icon={TrendingUp}
                >
                    <AreaChartComponent />
                </ChartCard>
            </div>

        </div>
    )
}
