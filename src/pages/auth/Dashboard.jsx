import { useState, useEffect, useCallback } from "react";
import { LayoutDashboard, PieChart, TrendingUp, List } from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import AddEntryForm from "@/components/AddEntryForm";
import TransactionList from "@/components/TransactionList";
import PieChartComponent from "@/components/charts/PieChartComponent";
import AreaChartComponent from "@/components/charts/AreaChartComponent";
import ChartCard from "@/components/ChartCard";
import expenseAPI from "@/services/expenseAPI";

export default function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);

    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState({ income: 0, expense: 0, balance: 0, investment: 0 });
    const [monthlyTrend, setMonthlyTrend] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        try {
            const [reportRes, balanceRes, trendRes, catRes] = await Promise.all([
                expenseAPI.get("/report/all?page=1&limit=10"),
                expenseAPI.get("/balance"),
                expenseAPI.get("/report/monthly-trend"),
                expenseAPI.get("/chart/category?type=expense"),
            ]);

            setTransactions(reportRes.data?.data || []);

            const b = balanceRes.data?.data || balanceRes.data || {};
            setBalance({
                income:     b.income     ?? 0,
                expense:    b.expense    ?? 0,
                balance:    b.balance    ?? 0,
                investment: b.investment ?? 0,
            });

            setMonthlyTrend(trendRes.data?.data || []);
            setCategoryData(catRes.data?.data || []);
        } catch {
            // errors handled by expenseAPI interceptor (401 → /login)
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 pt-4">
                <div className="flex items-center gap-2">
                    <LayoutDashboard size={14} className="text-blue-500" />
                    <span className="section-title">Overview</span>
                </div>
                <Button title="New Entry" onClick={() => setModalOpen(true)} />
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card title="Total Income"  value={balance.income}     type="income"  icon="📈" />
                <Card title="Total Expense" value={balance.expense}    type="expense" icon="🔻" />
                <Card title="Total Balance" value={balance.balance}    type="default" icon="🏦" />
                <Card title="Total Invest"  value={balance.investment} type="invest"  icon="⚖️" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <ChartCard title="Expense Split" subtitle="By Category" icon={PieChart}>
                    <PieChartComponent data={categoryData} />
                </ChartCard>
                <ChartCard title="Monthly Trend" subtitle="Cash Flow Analysis" icon={TrendingUp}>
                    <AreaChartComponent data={monthlyTrend} />
                </ChartCard>
            </div>

            {/* Transaction List */}
            <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                    <List size={14} className="text-blue-500" />
                    <span className="section-title">Recent Transactions</span>
                </div>
                <TransactionList data={transactions} loading={loading} />
            </div>

            {/* New Entry Modal */}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Entry">
                <AddEntryForm
                    onClose={() => setModalOpen(false)}
                    onSuccess={fetchAll}
                />
            </Modal>
        </div>
    );
}
