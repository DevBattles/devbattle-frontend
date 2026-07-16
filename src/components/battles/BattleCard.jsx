import { Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DifficultyBadge from "./DifficultyBadge";

function BattleCard({ battle }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6 transition hover:-translate-y-2 hover:border-emerald-400">

      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs">
        {battle.category}
      </span>

      <h2 className="mt-5 text-2xl font-bold">
        {battle.title}
      </h2>

      <div className="mt-6 flex items-center justify-between">

        <DifficultyBadge level={battle.difficulty} />

        <div className="flex items-center gap-2 text-slate-400">

          <Clock size={18} />

          {battle.duration}

        </div>

      </div>

      <button
        onClick={() => navigate(`/battle/${battle.id}`)}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 font-semibold text-black transition hover:bg-emerald-400"
      >
        Start Battle

        <ArrowRight size={18} />

      </button>

    </div>
  );
}

export default BattleCard;