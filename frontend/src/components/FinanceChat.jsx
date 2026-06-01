import { useState } from "react";
import { Bot, Send } from "lucide-react";

function FinanceChat({ transactions }) {

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm FinSight AI. Ask me about your finances."
    }
  ]);

  const [input, setInput] = useState("");

  const generateResponse = (question) => {

    const q = question.toLowerCase();

    // FOOD SPENDING
    if (q.includes("food")) {

      const totalFood = transactions
        .filter(
          t =>
            t.category?.toLowerCase() === "food"
        )
        .reduce(
          (sum, t) => sum + t.amount,
          0
        );

      return `You spent Rs. ${totalFood.toFixed(2)} on Food.`;
    }

    // TOTAL EXPENSES
    if (
      q.includes("expense") ||
      q.includes("spent")
    ) {

      const totalExpenses = transactions
        .filter(
          t => t.type === "expense"
        )
        .reduce(
          (sum, t) => sum + t.amount,
          0
        );

      return `Your total expenses are Rs. ${totalExpenses.toFixed(2)}.`;
    }

    // LARGEST CATEGORY
    if (
      q.includes("largest") ||
      q.includes("highest")
    ) {

      const categories = {};

      transactions.forEach((t) => {

        if (t.type === "expense") {

          categories[t.category] =
            (categories[t.category] || 0)
            + t.amount;
        }
      });

      const largest = Object.entries(
        categories
      ).sort(
        (a, b) => b[1] - a[1]
      )[0];

      if (largest) {

        return `Your largest expense category is ${largest[0]} with Rs. ${largest[1].toFixed(2)}.`;
      }

      return "No expense data available.";
    }

    return "I couldn't understand that. Try asking about food spending, expenses, or largest category.";
  };

  const sendMessage = () => {

    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input
    };

    const aiMessage = {
      sender: "ai",
      text: generateResponse(input)
    };

    setMessages(prev => [
      ...prev,
      userMessage,
      aiMessage
    ]);

    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 w-[90vw] md:w-96 z-50">

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-blue-600 text-white p-4 flex items-center gap-3">

          <Bot size={24} />

          <div>

            <h2 className="font-bold">
              FinSight AI
            </h2>

            <p className="text-sm">
              Finance Assistant
            </p>

          </div>

        </div>

        <div className="h-72 overflow-y-auto p-4 space-y-3">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`p-3 rounded-2xl ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white ml-auto max-w-[80%]"
                  : "bg-slate-100 dark:bg-slate-800 max-w-[80%]"
              }`}
            >
              {msg.text}
            </div>

          ))}

        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 p-3 flex gap-2">

          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              sendMessage()
            }
            placeholder="Ask about your finances..."
            className="flex-1 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 bg-white dark:bg-slate-900"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white p-3 rounded-xl"
          >
            <Send size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default FinanceChat;