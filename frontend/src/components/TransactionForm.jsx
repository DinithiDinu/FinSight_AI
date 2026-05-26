import { useState } from "react";
import API from "../services/api";

function TransactionForm({ fetchTransactions }) {

  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    category: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post(
        "/transactions",
        formData
      );

      alert("Transaction added!");

      setFormData({
        amount: "",
        type: "expense",
        category: "",
        description: "",
        date: "",
      });

      fetchTransactions();

    } catch (error) {

      console.error(error);

      alert("Failed to add transaction");
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl">

      <h2 className="text-2xl font-bold mb-4">
        Add Transaction
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        >
          <option value="expense">
            Expense
          </option>

          <option value="income">
            Income
          </option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold"
        >
          Add Transaction
        </button>

      </form>

    </div>
  );
}

export default TransactionForm;