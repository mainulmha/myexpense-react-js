import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AreaChartComponent() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Format data


    const data = [
        {
            _id: { month: 1 },
            income: 4200,
            expense: 1800,
            investment: 1200,
        },
        {
            _id: { month: 2 },
            income: 5100,
            expense: 2400,
            investment: 1600,
        },
        {
            _id: { month: 3 },
            income: 4800,
            expense: 2100,
            investment: 1900,
        },
        {
            _id: { month: 4 },
            income: 6200,
            expense: 3200,
            investment: 2500,
        },
        {
            _id: { month: 5 },
            income: 7100,
            expense: 2800,
            investment: 3100,
        },
        {
            _id: { month: 6 },
            income: 6800,
            expense: 3500,
            investment: 2700,
        },
    ];


    const formattedData = data.map((item) => ({
        monthName: `${monthNames[item._id.month - 1]}`,
        income: item.income || 0,
        expense: item.expense || 0,
        investment: item.investment || 0,
    }));

    if (!data || data.length === 0) {
        return <div className="h-full flex items-center justify-center text-[10px] uppercase font-black text-gray-600 tracking-widest">No Data</div>;
    }

    return (
        <div className="w-full h-full min-h-60">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={formattedData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }} // Left margin negative to align with axis
                >
                    <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorInvestment" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

                    <XAxis
                        dataKey="monthName"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                        dy={10}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 10 }}
                        tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#0f172a",
                            border: "1px solid #1e293b",
                            borderRadius: "12px",
                            fontSize: "11px",
                            fontWeight: "bold",
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)"
                        }}
                        itemStyle={{ padding: "2px 0" }}
                    />

                    <Area
                        type="monotone"
                        dataKey="income"
                        name="Income"
                        stroke="#22c55e"
                        fill="url(#colorIncome)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="expense"
                        name="Expense"
                        stroke="#ef4444"
                        fill="url(#colorExpense)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="investment"
                        name="Investment"
                        stroke="#3b82f6"
                        fill="url(#colorInvestment)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}