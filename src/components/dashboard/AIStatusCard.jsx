import { Bot, CheckCircle2, Clock3 } from "lucide-react";

function AIStatusCard() {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-8">

      <div className="flex items-center gap-3">

        <Bot className="text-emerald-400" size={34} />

        <div>
          <h2 className="text-2xl font-bold">
            AI Assistant
          </h2>

          <p className="text-slate-400">
            System Status
          </p>
        </div>

      </div>

      <div className="mt-8 space-y-5">

        <div className="flex items-center justify-between">

          <span>Authentication Backend</span>

          <span className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 size={18} />
            Connected
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span>AI Agent Backend</span>

          <span className="flex items-center gap-2 text-yellow-400">
            <Clock3 size={18} />
            In Progress
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span>Last Sync</span>

          <span className="text-slate-400">
            Just Now
          </span>

        </div>

      </div>

    </div>
  );
}

export default AIStatusCard;