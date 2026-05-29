import { useEffect, useState } from "react";

import API from "../services/api";

import BudgetForm from "../components/BudgetForm";

import DashboardLayout from "../layouts/DashboardLayout";

import PageWrapper from "../components/PageWrapper";

import AIAssistant from "../components/AIAssistant";

import { 
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Dashboard() {

  const [transactions, setTransactions] =
    useState([]);

  const [budgets, setBudgets] =
    useState([]);

  const fetchTransactions = async () => {

    try {

      const response = await API.get(
        "/transactions"
      );
    
      setTransactions(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const fetchBudgets = async () => {

  try {

    const response = await API.get(
      "/budgets"
    );

    setBudgets(response.data);

  } catch (error) {

    console.error(error);
  }
};

  useEffect(() => {

    fetchTransactions();
    fetchBudgets();

  }, []);

  // TOTAL INCOME
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) =>
      acc + curr.amount, 0);

  // TOTAL EXPENSES
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) =>
      acc + curr.amount, 0);

  // BALANCE
  const balance =
    totalIncome - totalExpenses;

// SPENDING BEHAVIOR CLASSIFICATION

let savingsRate = 0;

if (totalIncome > 0) {

  savingsRate =
    (balance / totalIncome) * 100;
}

let behaviorType = "";
let behaviorColor = "";

if (savingsRate >= 40) {

  behaviorType = "🟢 Smart Saver";

  behaviorColor =
    "text-emerald-500";

} else if (savingsRate >= 20) {

  behaviorType =
    "🟡 Balanced Spender";

  behaviorColor =
    "text-yellow-500";

} else {

  behaviorType =
    "🔴 Impulsive Spender";

  behaviorColor =
    "text-rose-500";
}
// SPENDING BEHAVIOR CLASSIFICATION END


  // CATEGORY ANALYTICS
  const expenseCategories = {};

  transactions.forEach((t) => {

    if (t.type === "expense") {

      if (!expenseCategories[t.category]) {
        expenseCategories[t.category] = 0;
      }

      expenseCategories[t.category] += t.amount;
    }
  });

  const chartData = Object.entries(
    expenseCategories
  ).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  // Monthly Expense trends
  const monthlyData = {};

  transactions.forEach((t) => {

    if (t.type === "expense") {

      const month = new Date(t.date)
      .toLocaleString("default", {
        month: "short",
      });

      if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }

    monthlyData[month] += t.amount;
  }
});

const trendData = Object.entries(
  monthlyData
).map(([month, amount]) => ({
  month,
  amount,
}));

// ML FORECASTING
let forecast = 0;

if (trendData.length > 0) {

  const total = trendData.reduce(
    (acc, curr) =>
      acc + curr.amount,
    0
  );

  forecast =
    total / trendData.length;
}

// AI INSIGHTS
const insights = [];

// Highest expense category
if (chartData.length > 0) {

  const highestCategory = chartData.reduce(
    (max, current) =>
      current.value > max.value
        ? current
        : max
  );

  insights.push(
    `💡 Highest spending category: ${highestCategory.name}`
  );
}

// Spending trend
if (trendData.length >= 2) {

  const latest =
    trendData[trendData.length - 1].amount;

  const previous =
    trendData[trendData.length - 2].amount;

  if (latest > previous) {

    insights.push(
      "📈 Your expenses increased recently"
    );

  } else {

    insights.push(
      "✅ Your expenses are decreasing"
    );
  }
}

// Balance insight
if (balance > 0) {

  insights.push(
    "💰 Your income exceeds expenses"
  );

} else {

  insights.push(
    "⚠️ Your expenses exceed income"
  );
}

insights.push(
         `🧠 Financial behavior classified as: ${behaviorType}`
       );

// BUDGET ALERTS
const budgetAlerts = [];

budgets.forEach((budget) => {

  const spent = transactions
    .filter(
      (t) =>
        t.type === "expense" &&
        t.category === budget.category
    )
    .reduce(
      (acc, curr) =>
        acc + curr.amount,
      0
    );

  if (spent > budget.limit_amount) {

    budgetAlerts.push(
      `⚠️ ${budget.category} budget exceeded`
    );

  } else if (
    spent > budget.limit_amount * 0.8
  ) {

    budgetAlerts.push(
      `⚠️ ${budget.category} spending close to limit`
    );

  } else {

    budgetAlerts.push(
      `✅ ${budget.category} within budget`
    );
  }
});

  const COLORS = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
  ];

  return (
    <DashboardLayout>
      <PageWrapper>
    <div className="min-h-screen bg-slate-100 text-slate-800 p-8">

      <div className="mb-8">

  <h1 className="text-5xl font-bold tracking-tight">
    FinSight AI
  </h1>

  <p className="text-slate-500 mt-2 text-lg">
    Smart personal finance analytics
  </p>

</div>

      <BudgetForm
        fetchBudgets={fetchBudgets}
      />

{/* SUMMARY CARDS */}
<div className="grid md:grid-cols-4 gap-6 mb-8">

  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
    <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium">
      Total Balance
    </h2>
    <p className="text-4xl font-bold mt-3 tracking-tight text-slate-800 dark:text-white">
      Rs. {balance}
    </p>
  </div>

  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
    <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium">
      Total Income
    </h2>
    <p className="text-3xl font-bold mt-2 text-emerald-600 dark:text-emerald-400">
      Rs. {totalIncome}
    </p>
  </div>

  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
    <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium">
      Total Expenses
    </h2>
    <p className="text-3xl font-bold mt-2 text-rose-600 dark:text-rose-400">
      Rs. {totalExpenses}
    </p>
  </div>

  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
    <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium">
      Spending Profile
    </h2>
    <p className={`text-3xl font-bold mt-3 ${behaviorColor}`}>
      {behaviorType}
    </p>
    <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm">
      Savings Rate: {savingsRate.toFixed(1)}%
    </p>
  </div>

</div>

      {/* CHART */}
<div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">

  <h2 className="text-2xl font-bold mb-6">
    Expense Categories
  </h2>

  {chartData.length === 0 ? (

    <p>No expense data yet.</p>

  ) : (

    <div style={{ width: "100%", height: 400 }}>

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={140}
            label
          >

            {chartData.map((entry, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>

  )}

</div>

{/* MONTHLY TREND CHART */}
<div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mt-8">

  <h2 className="text-2xl font-bold mb-6">
    Monthly Expense Trends
  </h2>

  {trendData.length === 0 ? (

    <p>No trend data available.</p>

  ) : (

    <div style={{ width: "100%", height: 400 }}>

      <ResponsiveContainer>

        <LineChart data={trendData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3B82F6"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  )}

</div>

{/* ML FORECAST PANEL */}
<div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 mt-8">

  <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
    ML Forecast Analysis
  </h2>

  <div className="space-y-4">

    <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">

      <p className="text-slate-500 dark:text-slate-400 mb-2 text-sm font-medium">
        Predicted Next Month Expenses
      </p>

      <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
        Rs. {forecast.toFixed(0)}
      </h3>

    </div>

    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
      This prediction uses moving average forecasting
      based on historical monthly spending patterns.
    </p>

  </div>

</div>

{/* Spending Behavior Analysis Panel */}
<div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 mt-6">

  <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
    Spending Behavior Analysis
  </h2>

  <div className="grid grid-cols-2 gap-4">

    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
      <p className="text-slate-500 dark:text-slate-400 mb-1 text-xs font-medium">
        User Classification
      </p>
      <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">
        Impulsive Spender
      </h3>
    </div>

    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
      <p className="text-slate-500 dark:text-slate-400 mb-1 text-xs font-medium">
        Savings Efficiency
      </p>
      <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
        0.0%
      </h3>
    </div>

  </div>

</div>

{/* AI INSIGHTS */}
<div className="bg-white p-6 rounded-2xl mt-8">

  <h2 className="text-2xl font-bold mb-6">
    AI Financial Insights
  </h2>

  <div className="space-y-4">

    {insights.map((insight, index) => (

      <div
        key={index}
        className="bg-slate-50 p-4 rounded-lg"
      >

        <p>{insight}</p>

      </div>

    ))}

  </div>

</div>

{/* BUDGET ALERTS */}
<div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mt-8">

  <h2 className="text-2xl font-bold mb-6">
    Budget Monitoring
  </h2>

  <div className="space-y-4">

    {budgetAlerts.length === 0 ? (

      <p>No budgets configured.</p>

    ) : (

      budgetAlerts.map((alert, index) => (

        <div
          key={index}
          className="bg-slate-50 p-4 rounded-lg"
        >

          <p>{alert}</p>

        </div>

      ))

    )}

  </div>

</div>

    <AIAssistant
  insights={insights}
  forecast={forecast}
  behaviorType={behaviorType}
/>

    </div>
    </PageWrapper>
    </DashboardLayout>
    
  );
}

export default Dashboard;