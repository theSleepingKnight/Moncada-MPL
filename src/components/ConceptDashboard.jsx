
import React from 'react';
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import {
    Bell, Search, Menu, ArrowUpRight, ArrowDownRight, Users, CreditCard,
    Wallet, TrendingUp, MoreHorizontal, Calendar, Download, RefreshCw
} from 'lucide-react';

// --- Mock Data ---

const revenueData = [
    { name: 'Jan', income: 45000, expense: 12000 },
    { name: 'Feb', income: 52000, expense: 15000 },
    { name: 'Mar', income: 48000, expense: 18000 },
    { name: 'Apr', income: 61000, expense: 20000 },
    { name: 'May', income: 55000, expense: 25000 },
    { name: 'Jun', income: 67000, expense: 22000 },
    { name: 'Jul', income: 72000, expense: 28000 },
];

const transactionHistory = [
    { id: 'TXN-001', user: 'Maria Santos', type: 'Repayment', amount: 5000, date: '12 Oct, 2:30 PM', status: 'Completed', method: 'GCash' },
    { id: 'TXN-002', user: 'Juan dela Cruz', type: 'Disbursement', amount: 15000, date: '12 Oct, 1:15 PM', status: 'Pending', method: 'Bank Transfer' },
    { id: 'TXN-003', user: 'Lorna Reyes', type: 'Repayment', amount: 2300, date: '11 Oct, 9:45 AM', status: 'Completed', method: 'Cash' },
    { id: 'TXN-004', user: 'Pedro Penduko', type: 'Loan Fee', amount: 500, date: '11 Oct, 8:20 AM', status: 'Completed', method: 'Maya' },
];

const activeLoans = [
    { user: 'BDO Unibank', value: 45 },
    { user: 'Metrobank', value: 30 },
    { user: 'BPI', value: 15 },
    { user: 'Others', value: 10 }
];

// --- Components ---

const StatCard = ({ title, value, trend, trendValue, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
            <Icon size={64} />
        </div>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-brand-700`}>
                <Icon size={24} className="text-current" />
            </div>
            {trend && (
                <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {trend === 'up' ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                    {trendValue}
                </span>
            )}
        </div>
        <div>
            <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
        </div>
    </div>
);

const ConceptDashboard = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* Top Navigation Bar - Concept Style */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-8 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-2 rounded-lg font-bold text-xl shadow-lg shadow-blue-500/30">
                        PF
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-800">PhilFinance Pro</h1>
                        <p className="text-xs text-slate-500">Executive Dashboard</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 w-64 transition-all"
                        />
                    </div>

                    <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-slate-800">Admin User</p>
                            <p className="text-xs text-slate-500">Super Admin</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
                        <p className="text-slate-500">Here's what's happening with your lending portfolio today.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm transition-all">
                            <Calendar size={16} />
                            Oct 12, 2023
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all">
                            <Download size={16} />
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Disbursements"
                        value="₱2,450,000"
                        trend="up"
                        trendValue="+12.5%"
                        icon={Wallet}
                        color="text-blue-600 bg-blue-500"
                    />
                    <StatCard
                        title="Active Borrowers"
                        value="1,234"
                        trend="up"
                        trendValue="+5.2%"
                        icon={Users}
                        color="text-indigo-600 bg-indigo-500"
                    />
                    <StatCard
                        title="Collection Rate"
                        value="94.8%"
                        trend="up"
                        trendValue="+1.1%"
                        icon={TrendingUp}
                        color="text-emerald-600 bg-emerald-500"
                    />
                    <StatCard
                        title="Outstanding Balance"
                        value="₱850,400"
                        trend="down"
                        trendValue="-2.4%"
                        icon={CreditCard}
                        color="text-amber-600 bg-amber-500"
                    />
                </div>

                {/* Main Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Revenue Chart */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Revenue Analytics</h3>
                                <p className="text-sm text-slate-400">Income vs Expenses (Monthly)</p>
                            </div>
                            <div className="flex bg-slate-100 p-1 rounded-lg">
                                <button className="px-3 py-1 bg-white shadow-sm rounded-md text-xs font-semibold text-slate-800">Monthly</button>
                                <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-800">Weekly</button>
                            </div>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(val) => `₱${val / 1000}k`} />
                                    <RechartsTooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                        formatter={(value) => `₱${value.toLocaleString()}`}
                                    />
                                    <Area type="monotone" dataKey="income" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                                    <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Quick Transfer / Action Panel */}
                    <div className="space-y-8">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-lg text-white">
                            <h3 className="text-lg font-bold mb-1">Quick Disbursement</h3>
                            <p className="text-slate-400 text-sm mb-6">Send funds instantly via:</p>

                            <div className="space-y-4">
                                <button className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/5 group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xs">G</div>
                                        <div className="text-left">
                                            <p className="font-semibold text-sm">GCash</p>
                                            <p className="text-xs text-slate-300">E-Wallet</p>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="text-slate-400 group-hover:text-white transition-colors" size={18} />
                                </button>

                                <button className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/5 group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold text-xs">M</div>
                                        <div className="text-left">
                                            <p className="font-semibold text-sm">Maya</p>
                                            <p className="text-xs text-slate-300">Digital Bank</p>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="text-slate-400 group-hover:text-white transition-colors" size={18} />
                                </button>
                            </div>

                            <button className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-900/50">
                                Initiate Transfer
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Payment Methods</h3>
                            <div className="flex gap-4 items-end h-40">
                                {activeLoans.map((item, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                                        <div className="w-full bg-slate-100 rounded-t-lg relative overflow-hidden transition-all group-hover:bg-blue-50" style={{ height: `${item.value * 2}%` }}>
                                            <div className="absolute bottom-0 left-0 right-0 bg-blue-500 h-0 transition-all duration-1000 group-hover:h-full opacity-20"></div>
                                        </div>
                                        <span className="text-xs font-medium text-slate-500 text-center truncate w-full">{item.user}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
                        <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Transaction ID</th>
                                    <th className="px-6 py-4">Borrower</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Method</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {transactionHistory.map((txn) => (
                                    <tr key={txn.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{txn.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                                    {txn.user.charAt(0)}
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">{txn.user}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{txn.type}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-800">₱{txn.amount.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            <span className="flex items-center gap-1">
                                                {txn.method === 'GCash' ? <span className="w-2 h-2 rounded-full bg-blue-500"></span> :
                                                    txn.method === 'Maya' ? <span className="w-2 h-2 rounded-full bg-green-500"></span> :
                                                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                                                {txn.method}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${txn.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                                }`}>
                                                {txn.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-slate-600">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ConceptDashboard;
