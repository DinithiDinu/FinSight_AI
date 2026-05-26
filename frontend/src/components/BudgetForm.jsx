import { useState } from "react";
import API from "../services/api";

function BudgetForm({ fetchBudgets }) {

  const [formData, setFormData] = useState({
    category: "",
    limit_amount: "",
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
        "/budgets",
        formData
      );

      alert("Budget saved!");

      setFormData({
        category: "",
        limit_amount: "",
      });

      fetchBudgets();

    } catch (error) {

      console.error(error);

      alert("Failed to save budget");
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl">

      <h2 className="text-2xl font-bold mb-4">
        Set Budget
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />

        <input
          type="number"
          name="limit_amount"
          placeholder="Budget Limit"
          value={formData.limit_amount}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />

        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 p-3 rounded-lg font-semibold"
        >
          Save Budget
        </button>

      </form>

    </div>
  );
}

export default BudgetForm;