import { useEffect, useState } from "react";

import API from "../services/api";

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

  useEffect(() => {

    fetchTransactions();

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

  const COLORS = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Financial Dashboard
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-gray-900 p-6 rounded-2xl">

          <h2 className="text-gray-400">
            Total Balance
          </h2>

          <p className="text-3xl font-bold mt-2">
            Rs. {balance}
          </p>

        </div>

        <div className="bg-gray-900 p-6 rounded-2xl">

          <h2 className="text-gray-400">
            Total Income
          </h2>

          <p className="text-3xl font-bold mt-2 text-green-400">
            Rs. {totalIncome}
          </p>

        </div>

        <div className="bg-gray-900 p-6 rounded-2xl">

          <h2 className="text-gray-400">
            Total Expenses
          </h2>

          <p className="text-3xl font-bold mt-2 text-red-400">
            Rs. {totalExpenses}
          </p>

        </div>

      </div>

      {/* CHART */}
      <div className="bg-gray-900 p-6 rounded-2xl">

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

            {/* MONTHLY TREND CHART */}
<div className="bg-gray-900 p-6 rounded-2xl mt-8">

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

      {/* AI INSIGHTS */}
<div className="bg-gray-900 p-6 rounded-2xl mt-8">

  <h2 className="text-2xl font-bold mb-6">
    AI Financial Insights
  </h2>

  <div className="space-y-4">

    {insights.map((insight, index) => (

      <div
        key={index}
        className="bg-gray-800 p-4 rounded-lg"
      >

        <p>{insight}</p>

      </div>

    ))}

  </div>

</div>

    </div>
    

  )}

</div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;