import { useEffect, useState } from "react";

import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
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

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;