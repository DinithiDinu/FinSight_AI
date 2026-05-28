import {
  Bot,
  Sparkles,
} from "lucide-react";

function AIAssistant({
  insights,
}) {

  return (
    <div className="fixed bottom-6 right-6 w-96 z-50">

      <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER - Modern gradient */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex items-center gap-3">

          <Bot size={24} className="drop-shadow-sm" />

          <div>

            <h2 className="font-bold tracking-tight">
              FinSight AI
            </h2>

            <p className="text-sm text-indigo-100">
              Smart Finance Assistant
            </p>

          </div>

        </div>

        {/* CONTENT - Clean neutral background */}
        <div className="bg-gradient-to-b from-slate-50 to-white p-5 space-y-4 max-h-96 overflow-y-auto">

          {insights.map((insight, index) => (

            <div
              key={index}
              className="bg-white border border-slate-200/80 p-4 rounded-2xl flex gap-3 shadow-sm hover:shadow-md transition-shadow duration-200"
            >

              <Sparkles
                size={18}
                className="mt-1 text-indigo-500 flex-shrink-0"
              />

              <p className="text-sm leading-relaxed text-slate-700">
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