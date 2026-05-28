import { useEffect, useState } from "react";

import API from "../services/api";

import TransactionForm from "../components/TransactionForm";

import TransactionList from "../components/TransactionList";

import DashboardLayout from "../layouts/DashboardLayout";

import PageWrapper from "../components/PageWrapper";

function Transactions() {

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

  return (
    <DashboardLayout>
      <PageWrapper>
    <div className="min-h-screen bg-gray-950 text-slate-800 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Transactions
      </h1>

      <TransactionForm
        fetchTransactions={fetchTransactions}
      />

      <TransactionList
        transactions={transactions}
      />

    </div>
    </PageWrapper>
    </DashboardLayout>
  );
}

export default Transactions;