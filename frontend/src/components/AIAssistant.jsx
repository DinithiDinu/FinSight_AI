import {
  Bot,
  Sparkles,
} from "lucide-react";

function AIAssistant({
  insights,
}) {

  return (
    <div className="fixed bottom-6 right-6 w-96 z-50">

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-blue-600 text-white p-4 flex items-center gap-3">

          <Bot size={24} />

          <div>

            <h2 className="font-bold">
              FinSight AI
            </h2>

            <p className="text-sm text-blue-100">
              Smart Finance Assistant
            </p>

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-5 space-y-4 max-h-96 overflow-y-auto">

          {insights.map((insight, index) => (

            <div
              key={index}
              className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl flex gap-3"
            >

              <Sparkles
                size={18}
                className="mt-1 text-blue-600"
              />

              <p className="text-sm leading-relaxed">
                {insight}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AIAssistant;